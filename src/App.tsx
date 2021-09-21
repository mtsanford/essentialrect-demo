import React, {
  CSSProperties,
  MouseEventHandler,
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
import rotateLandscape512 from "./assets/icons/rotate_landscape_512.png";
import leftArrow from "./assets/icons/left-arrow.png";
import rightArrow from "./assets/icons/right-arrow.png";

function Logo() {
  return (
    <div className="logo-wrapper">
      <img src="./images/essentialrect-logo.png" alt="" />
      <p>Agnostic composition for responsive image display</p>
    </div>
  );
}

function ScreenRecommendation() {
  return (
    <div className="screen-recommendation-wrapper">
      <img src={rotateLandscape512} alt="" />
      <p>
        Best viewed on a phone with orientation lock off, and controls hidden.
      </p>
    </div>
  );
}

function Text(props: any) {
  const { title, text } = props;

  return (
    <div className="text-wrapper">
      {title && <h1>{title}</h1>}
      {text && <p>{text}</p>}
    </div>
  );
}

type Orientation = "portrait" | "landscape" | undefined;

interface OrientationState {
  slideIndex: number;
  orientationChanged: boolean[];
  initialOrientation: Orientation;
  currentOrientation: Orientation;
}

const orientationInitialState: OrientationState = {
  slideIndex: 0,
  orientationChanged: [],
  initialOrientation: undefined,
  currentOrientation: undefined,
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
          orientationChanged: state.orientationChanged,
          initialOrientation: orientation,
          currentOrientation: orientation,
        };
      } else {
        const orientationChanged = state.initialOrientation !== orientation;

        let orientationChangedNew = [...state.orientationChanged];
        if (orientationChanged) {
          orientationChangedNew[state.slideIndex] = true;
        }

        return {
          ...state,
          orientationChanged: orientationChangedNew,
          currentOrientation: orientation,
        };
      }
    case "next":
      if (state.slideIndex >= slides.length - 1) return state;
      return {
        slideIndex: state.slideIndex + 1,
        orientationChanged: state.orientationChanged,
        initialOrientation: state.currentOrientation,
        currentOrientation: state.currentOrientation,
      };
    case "previous":
      if (state.slideIndex <= 0) return state;
      return {
        slideIndex: state.slideIndex - 1,
        orientationChanged: state.orientationChanged,
        initialOrientation: state.currentOrientation,
        currentOrientation: state.currentOrientation,
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
    <div className="requestscreen-recommendation-wrapper">
      <img src={icon} alt="" />
      <p>
        View this image in {orientationText} orientation, by rotating the phone
        or resizing the browser.
      </p>
    </div>
  );
}

const setBackgroundColor = (color: string) => {
  if (document && document.body) {
    document.body.style.background = color;
  }
}


function App() {
  let content;
  const [orientation, dispatchOrientation] = useReducer(
    orientationReducer,
    orientationInitialState
  );
  const [appRef, appRect] = useClientRect();
  const slide: any = slides[orientation.slideIndex];
  const caption = slide.caption;

  const requireRotate =
    slide.requireRotate &&
    !orientation.orientationChanged[orientation.slideIndex];
  const nextEnabled =
    orientation.slideIndex < slides.length - 1 && !requireRotate;
  const previousEnabled = orientation.slideIndex > 0;
  const captionText = caption;

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
      setBackgroundColor('white');
      content = <Logo />;
      break;
    case "rotate":
      setBackgroundColor('white');
      content = <ScreenRecommendation />;
      break;
    case "essentialRect":
      setBackgroundColor('black');
      content = <EssentialRectImg src={url} essentialRect={essentialRect} />;
      break;
    case "regular":
      setBackgroundColor('black');
      content = <RegularFitImage imageURL={url} />;
      break;
    case "text":
      setBackgroundColor('white');
      content = <Text title={slide.title} text={slide.text} />;
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
            <div style={prevStyles} onClick={previousHandler}>
              <img src={leftArrow} alt="" />
            </div>
            <div style={nextStyles} onClick={nextHandler}>
              <img src={rightArrow} alt="" />
            </div>
          </div>
        </div>
      </div>
      {content}
    </div>
  );
}

export default App;
