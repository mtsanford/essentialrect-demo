/*
 *  Stay up to date on a divs client area!
 *
 *  const [myref, myClientRect] = useClientRect();
 *  return <>
 *    <div ref={myref} />
 *    <p>width: {myClientRect.width}, height: {myClientRect.height}</p>
 *  <>;
*/

import { useCallback, useRef, useState } from "react";
import { Rect, emptyRect } from "./Rect";

const useClientRect = () => {
  const [clientRect, setClientRect] = useState<Rect>(emptyRect);
  const resizeObserver = useRef<ResizeObserver>(
    new ResizeObserver((entries: ResizeObserverEntry[]) => {
      const newClientRect: Rect = {
        left: 0,
        top: 0,
        width: entries[0].contentRect.width,
        height: entries[0].contentRect.height,
      };

      setClientRect(newClientRect);
    })
  );

  const setRef = useCallback((domElement: HTMLDivElement) => {
    if (domElement === null) {
      if (resizeObserver.current) {
        resizeObserver.current.disconnect();
      }
    } else {
      resizeObserver.current.observe(domElement);
    }
  }, []);

  return [setRef, clientRect] as const;
};

export default useClientRect;
