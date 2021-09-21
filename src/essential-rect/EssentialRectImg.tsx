import React, { CSSProperties } from "react";

import { fitRect } from "./fit-essential-rect";
import useClientRect from "./use-client-rect";
import { Rect, rectEmpty } from "./Rect";
import useImageRect from "./use-image-rect";

import './essential-rect-img.css';

const erIconDefaultStyles: CSSProperties = {
  backgroundColor: "red",
  zIndex: 10,
  position: "absolute",
};

const EssentialRectImg: React.FC<{
  src: string;
  essentialRect?: Rect;
  showIcon?: boolean;
}> = ({ src, essentialRect, showIcon }) => {
  let icon;
  let imageStyles: CSSProperties = { display: "none" };
  const [imageRef, imageRect, onImageLoad] = useImageRect();
  const [containerRef, containerRect] = useClientRect();

  const iconSize = Math.max(containerRect.width, containerRect.height) * 0.03;
  const iconMargin = iconSize * 0.5;

  if (showIcon) {
    const erIconStyles = {
      ...erIconDefaultStyles,
      top: `${iconMargin}px`,
      left: `${iconMargin}px`,
      width: `${iconSize}px`,
      height: `${iconSize * 0.4}px`,
      border: `solid black ${iconSize * 0.08}px`,
    }
    icon =  <div style={erIconStyles} />
  }

  if (imageRect && !rectEmpty(containerRect)) {
    if (!essentialRect) {
      essentialRect = imageRect;
    }
    const renderedImageRect = fitRect(imageRect, essentialRect, containerRect);

    imageStyles = {
      left: `${renderedImageRect.left}px`,
      top: `${renderedImageRect.top}px`,
      width: `${renderedImageRect.width}px`,
      height: `${renderedImageRect.height}px`,
    };
  }

  return (
    <div
      className="EssentialRectImg"
      ref={containerRef}
    >
      {icon}
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
