import { useReducer, useState, useRef } from "react";
import "./app.scss";
import {useCallbackRef} from './packacgs/useCallbackRef'
const APP = () => {
  const [position, setPosition] = useState({
    left: 0,
    top: 0,
  });

  const moveDraggier = (function () {
    // 使用到useRef 的特性 事实记录数据
    const currentPosition = useRef({
      startTop: 0,
      startLeft: 0,
      startX: 0,
      startY: 0,
    });

    const mousedown = useCallbackRef((e: React.MouseEvent<HTMLDivElement>) => {
        const { left, top } = position;
  
        document.addEventListener("mousemove", mousemove);
        document.addEventListener("mouseup", mouseup);
  
        currentPosition.current = {
          startTop: top,
          startLeft: left,
          startX: e.clientX,
          startY: e.clientY,
        };
        
      });

    const mouseup = useCallbackRef((e: MouseEvent) => {
        document.removeEventListener("mousemove", mousemove);
        document.removeEventListener("mouseup", mouseup);

    })

    const mousemove = useCallbackRef(({clientX,clientY}: MouseEvent) => {

        // hook 的值一直都是旧的
        console.log(position);
        

        const {startLeft,startTop,startX,startY} = currentPosition.current;
        // 计算差值
        const durX = clientX - startX;
        const durY = clientY - startY;
        setPosition({
            top:startTop + durY,
            left:startLeft + durX
        })
    })

    return {
      mousedown,
    };
  })();

  return (
    <div className={"app-home"}>
      <div
        style={{
          width: "50px",
          height: "50px",
          backgroundColor: "rgba(0,0,0.64)",
          position: "relative",
          top: `${position.top}px`,
          left: `${position.left}px`,
        }}
        onMouseDown={moveDraggier.mousedown}
      />
    </div>
  );
};

export default APP;
