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
      <img src="./images/rotate-phone.png" />
      <p>Best viewed on a phone in full screen.</p>
      <p>
        Rotate phone to view in different orientations, or resize browser
        window.
      </p>
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
        To continue, rotate phone to {orientationText} orientation, or resize
        browser
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

  useEffect(() => {
    dispatchOrientation({
      type: "resize",
      rect: appRect,
    });
  }, [appRect]);

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
    <div className="App" ref={appRef}>
      <div className="overlay">
        <div className="overlay-content">
          {true && (
            <RequestRotate orientation={orientation.currentOrientation} />
          )}
          {caption && <div className="caption">{caption}</div>}
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
      </div>
      {content}
    </div>
  );
}

export default App;
