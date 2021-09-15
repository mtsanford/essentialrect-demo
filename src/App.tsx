import React, { CSSProperties, MouseEvent, MouseEventHandler, useState } from "react";

import "./App.css";
import RegularFitImage from "./components/RegularFitImage";
import EssentialRectImg from "./essential-rect/EssentialRectImg";

{
  /* <RegularFitImage imageURL={url} /> */
}

const slides = [
  {
    url: "./images/boy.jpg",
    essentialRect: {
      left: 300,
      top: 0,
      width: 400,
      height: 500,
    },
    type: "essentialRect",
  },
  {
    url: "./images/SF_DOWNTOWN_001.JPG",
    essentialRect: { left: 537, top: 72, width: 645, height: 602 },
    type: "essentialRect",
  },
];

function App() {
  const [ slideIndex, setSlideIndex ] = useState<number>(0);

  const nextEnabled = slideIndex < slides.length - 1;
  const previousEnabled = slideIndex > 0;

  const previousHandler: MouseEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    if (!previousEnabled) return;
    console.log("previous");
    setSlideIndex( (prev: number) => prev - 1 );
  };

  const nextHandler: MouseEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    if (!nextEnabled) return;
    console.log("next");
    setSlideIndex( (prev: number) => prev + 1 );
  };

  const fullScreenHandler: MouseEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    console.log("fullscreen");
  };

  const url = slides[slideIndex].url;
  const essentialRect = slides[slideIndex].essentialRect;

  const prevStyles: CSSProperties = {
    visibility: previousEnabled ? 'visible' : 'hidden',
  }
  const nextStyles: CSSProperties = {
    visibility: nextEnabled ? 'visible' : 'hidden',
  }

  return (
    <div className="App">
      <div className="overlay">
        <div className="controls">
          <div className="controls-previous" style={prevStyles} onClick={previousHandler}>previous</div>
          {/* <div className="controls-fullscreen" onClick={fullScreenHandler}>
            fullscreen
          </div> */}
          <div className="controls-next" style={nextStyles} onClick={nextHandler}>next</div>
        </div>
      </div>
      <EssentialRectImg src={url} essentialRect={essentialRect} />
    </div>
  );
}

export default App;
