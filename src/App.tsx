import React, {
  CSSProperties,
  MouseEvent,
  MouseEventHandler,
  useState,
} from "react";

import "./App.css";
import RegularFitImage from "./components/RegularFitImage";
import EssentialRectImg from "./essential-rect/EssentialRectImg";

function Logo() {
  return (
    <div className="logo-wrapper">
      <img src="./images/essentialrect-logo.png" />
      <p>Agnostic composition for responsive image display</p>
    </div>
  );
}

function Rotate() {
  return (
    <div className="rotate-wrapper">
      <img src="./images/rotate-phone.png" />
      <p>Best viewed on a phone in full screen.</p>
      <p>
        Rotate phone to view in different orientations, or resize browser
        window.
      </p>
    </div>
  );
}

const slides = [
  {
    type: "logo",
  },
  {
    type: "rotate",
  },
  {
    url: "./images/downtown.jpg",
    type: "regular",
    caption: "This is a typical photo taken on a phone before editing",
  },
  {
    url: "./images/downtown_cropped.jpg",
    type: "regular",
    caption: "Photos are typically cropped before publishing to give it a good composition",
  },
  {
    url: "./images/downtown_cropped.jpg",
    type: "regular",
    caption: "This is an 'opinionated composition', and does not look good on different displays.  Try it.",
  },
  {
    url: "./images/downtown_essentialrect.jpg",
    type: "regular",
    caption: "Instead, an essentialRect can be defined for the image, defining what is most important.",
  },
  {
    url: "./images/downtown_essentialrect.jpg",
    type: "regular",
    caption: "This is 'agnostic composition', and allows an image to look good on different displays",
  },
  {
    url: "./images/downtown.jpg",
    essentialRect: { left: 537, top: 72, width: 645, height: 602 },
    type: "essentialRect",
    caption: "Try rotating phone, or resizing the browser."
  },
  {
    url: "./images/downtown.jpg",
    essentialRect: { left: 537, top: 72, width: 645, height: 602 },
    type: "essentialRect",
  },
  {
    url: "./images/sax.jpg",
    type: "regular",
    caption: "Here is another example",
  },
  {
    url: "./images/sax-hd-responsive-fit.jpg",
    essentialRect: {left:825,top:75,width:621,height:755},
    type: "regular",
  },
  {
    url: "./images/sax.jpg",
    essentialRect: {left:825,top:75,width:621,height:755},
    type: "essentialRect",
  },
  {
    type: "logo",
  },
];

function App() {
  let content;
  const [slideIndex, setSlideIndex] = useState<number>(0);
  const slide: any = slides[slideIndex];
  const caption = slide.caption;

  const nextEnabled = slideIndex < slides.length - 1;
  const previousEnabled = slideIndex > 0;

  const previousHandler: MouseEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    if (!previousEnabled) return;
    console.log("previous");
    setSlideIndex((prev: number) => prev - 1);
  };

  const nextHandler: MouseEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    if (!nextEnabled) return;
    console.log("next");
    setSlideIndex((prev: number) => prev + 1);
  };

  const fullScreenHandler: MouseEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    console.log("fullscreen");
  };

  const url = slide.url || "";
  const essentialRect = slide.essentialRect || {};

  const prevStyles: CSSProperties = {
    visibility: previousEnabled ? "visible" : "hidden",
  };
  const nextStyles: CSSProperties = {
    visibility: nextEnabled ? "visible" : "hidden",
  };

  switch (slide.type) {
    case "logo":
      content = <Logo />;
      break;
    case "rotate":
      content = <Rotate />;
      break;
    case "essentialRect":
      content = <EssentialRectImg src={url} essentialRect={essentialRect} />;
      break;
    case "regular":
      content = <RegularFitImage imageURL={url} />;
      break;
  }

  return (
    <div className="App">
      <div className="overlay">
        <div className="controls">
          <div
            className="controls-previous"
            style={prevStyles}
            onClick={previousHandler}
          >
            previous
          </div>
          {/* <div className="controls-fullscreen" onClick={fullScreenHandler}>
            fullscreen
          </div> */}
          <div
            className="controls-next"
            style={nextStyles}
            onClick={nextHandler}
          >
            next
          </div>
        </div>
      </div>
      {caption && (
        <div className="caption">
          <p>{caption}</p>
        </div>
      )}
      {content}
    </div>
  );
}

export default App;
