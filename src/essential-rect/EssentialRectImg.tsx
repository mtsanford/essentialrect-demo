import React, { CSSProperties } from "react";

import { fitRect } from "./fit-essential-rect";
import useClientRect from "./use-client-rect";
import { Rect, rectEmpty } from "./Rect";
import useImageRect from "./use-image-rect";

const containerStyles: CSSProperties = {
  position: "relative",
  backgroundColor: "black",
  overflow: "hidden",
  border: "0px",
  margin: "0px",
};

const EssentialRectImg: React.FC<{
  src: string;
  essentialRect?: Rect;
}> = ({ src, essentialRect }) => {
  let imageStyles: CSSProperties = { display: 'none' };
  const [imageRef, imageRect, onImageLoad] = useImageRect();
  const [containerRef, containerRect] = useClientRect();

  if (imageRect && !rectEmpty(containerRect)) {
    if (!essentialRect) {
      essentialRect = imageRect;
    }
    const renderedImageRect = fitRect(imageRect, essentialRect, containerRect);

    imageStyles = {
      position: "absolute",
      display: "block",
      left: `${renderedImageRect.left}px`,
      top: `${renderedImageRect.top}px`,
      width: `${renderedImageRect.width}px`,
      height: `${renderedImageRect.height}px`,
    };
  }

  return (
    <div
      className="EssentialRectImg"
      style={containerStyles}
      ref={containerRef}
    >
      <img
        src={src}
        alt=""
        style={imageStyles}
        ref={imageRef}
        onLoad={onImageLoad}
      />
    </div>
  );
};

export default EssentialRectImg;
