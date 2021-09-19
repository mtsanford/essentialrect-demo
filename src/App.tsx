import React, {
  CSSProperties,
  MouseEventHandler,
  useState,
  useReducer,
  useEffect,
} from "react";

import "./App.css";
import slides from "./slides";
import RegularFitImage from "./components/RegularFitImage";
import EssentialRectImg from "./essential-rect/EssentialRectImg";
import useClientRect from "./essential-rect/use-client-rect";

import rotatePortrait from "./assets/icons/rotate_portrait.png";
import rotateLandscape from "./assets/icons/rotate_landscape.png";

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
      <img src={rotatePortrait} alt="" />
      <p>Best viewed on a phone with orientation lock off, and controls hidden.</p>
    </div>
  );
}

type Orientation = "portrait" | "landscape" | undefined;

interface OrientationState {
  slideIndex: number;
  initialOrientation: Orientation;
  currentOrientation: Orientation;
  orientationChanged: boolean;
}

const orientationInitialState: OrientationState = {
  slideIndex: 0,
  initialOrientation: undefined,
  currentOrientation: undefined,
  orientationChanged: false,
};

const orientationReducer = (
  state: OrientationState,
  action: any
): OrientationState => {
  switch (action.type) {
    case "resize":
      const orientation: Orientation =
        action.rect.width >= action.rect.height ? "landscape" : "portrait";
      if (state.initialOrientation === undefined) {
        return {
          slideIndex: state.slideIndex,
          initialOrientation: orientation,
          currentOrientation: orientation,
          orientationChanged: false,
        };
      } else {
        const orientationChanged =
          state.initialOrientation !== orientation || state.orientationChanged;
        if (orientationChanged) {
          console.log(`orientation changed`);
        }
        return {
          ...state,
          currentOrientation: orientation,
          orientationChanged: orientationChanged,
        };
      }
    case "next":
      if (state.slideIndex >= slides.length - 1) return state;
      return {
        slideIndex: state.slideIndex + 1,
        initialOrientation: state.currentOrientation,
        currentOrientation: state.currentOrientation,
        orientationChanged: false,
      };
    case "previous":
      if (state.slideIndex <= 0) return state;
      return {
        slideIndex: state.slideIndex - 1,
        initialOrientation: state.currentOrientation,
        currentOrientation: state.currentOrientation,
        orientationChanged: false,
      };
    default:
      return { ...state };
  }
};

function RequestRotate(props: any) {
  const icon =
    props.orientation === "portrait" ? rotateLandscape : rotatePortrait;
  const orientationText =
    props.orientation === "portrait" ? "landscape" : "portrait";

  return (
    <div className="requestrotate-wrapper">
      <img src={icon} alt="" />
      <p>
        View this image in {orientationText} orientation, by rotating the phone or resizing the browser.
      </p>
    </div>
  );
}

function App() {
  let content;
  // const [slideIndex, setSlideIndex] = useState<number>(0);
  const [orientation, dispatchOrientation] = useReducer(
    orientationReducer,
    orientationInitialState
  );
  const [appRef, appRect] = useClientRect();
  const slide: any = slides[orientation.slideIndex];
  const caption = slide.caption;

  const requireRotate = slide.requireRotate && !orientation.orientationChanged;
  const nextEnabled =
    orientation.slideIndex < slides.length - 1 && !requireRotate;
  const previousEnabled = orientation.slideIndex > 0;
  const captionText = !requireRotate && caption;

  useEffect(() => {
    dispatchOrientation({
      type: "resize",
      rect: appRect,
    });
  }, [appRect]);

  // useEffect( () => {
  //   const dynamicAppHeight = () => {
  //     const doc = document.documentElement
  //     doc.style.setProperty('--app-height', `${window.innerHeight}px`)    
  //   }
  //   window.addEventListener('resize', dynamicAppHeight);
  //   dynamicAppHeight();
  // }, []);

  const previousHandler: MouseEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    if (!previousEnabled) return;
    console.log("previous");
    dispatchOrientation({ type: "previous" });
  };

  const nextHandler: MouseEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    if (!nextEnabled) return;
    console.log("next");
    dispatchOrientation({ type: "next" });
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
    <div className="App" ref={appRef}>
      <div className="overlay">
        <div className="overlay-content">
          {requireRotate && (
            <RequestRotate orientation={orientation.currentOrientation} />
          )}
          {captionText && <div className="caption">{captionText}</div>}
          <div className="controls">
            <div
              className="controls-previous"
              style={prevStyles}
              onClick={previousHandler}
            >
              previous
            </div>
            <div
              className="controls-next"
              style={nextStyles}
              onClick={nextHandler}
            >
              next
            </div>
          </div>
        </div>
      </div>
      {content}
    </div>
  );
}

export default App;
