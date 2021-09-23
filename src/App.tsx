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
import Info from "./info";

import rotatePortrait from "./assets/icons/rotate_portrait.png";
import rotateLandscape from "./assets/icons/rotate_landscape.png";
import rotateLandscapeLarge from "./assets/icons/rotate_landscape_large.png";
import leftArrow from "./assets/icons/left-arrow.png";
import rightArrow from "./assets/icons/right-arrow.png";

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

/****** Helper components ******/

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
      <img src={rotateLandscapeLarge} alt="" />
      <p>
        Best viewed on a mobile device with orientation lock off, and controls
        hidden. (But a desktop browser is fine!)
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

function RequestRotate(props: any) {
  const icon =
    props.orientation === "portrait" ? rotateLandscape : rotatePortrait;
  const orientationText =
    props.orientation === "portrait" ? "landscape" : "portrait";

  const showClass = props.show
    ? "requestscreen-recommendation-shown"
    : "requestscreen-recommendation-hidden";
  const classes = `requestscreen-recommendation-wrapper ${showClass}`;

  return (
    <div className={classes}>
      <img src={icon} alt="" />
      <p>
        View this image in {orientationText} orientation, by rotating the device
        or resizing the browser.
      </p>
    </div>
  );
}

function slideContent(slide: any) {
  switch (slide.type) {
    case "logo":
      return <Logo />;
    case "rotate":
      return <ScreenRecommendation />;
    case "essentialRect":
      return (
        <EssentialRectImg
          src={slide.url}
          essentialRect={slide.essentialRect}
          showIcon={true}
        />
      );
    case "regular":
      return <RegularFitImage imageURL={slide.url} />;
    case "text":
      return <Text title={slide.title} text={slide.text} />;
    case "info":
      return <Info />;
  }
}

function SlideListContent(props: any) {
  const { currentSlide } = props;
  return (
    <>
      {slides.map((slide: any, index) => (
        <div
          key={index}
          className="slide-wrapper"
          style={{ display: index === currentSlide ? "block" : "none" }}
        >
          {slideContent(slide)}
        </div>
      ))}
    </>
  );
}

/************************* */

function App() {
  const [orientation, dispatchOrientation] = useReducer(
    orientationReducer,
    orientationInitialState
  );
  const [appRef, appRect] = useClientRect();
  const slide: any = slides[orientation.slideIndex];

  const requireRotate =
    slide.requireRotate &&
    !orientation.orientationChanged[orientation.slideIndex];
  const nextEnabled =
    orientation.slideIndex < slides.length - 1 && !requireRotate;
  const previousEnabled = orientation.slideIndex > 0;
  const captionText = slide.caption;

  useEffect(() => {
    dispatchOrientation({
      type: "resize",
      rect: appRect,
    });
  }, [appRect]);

  const previousHandler: MouseEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    if (!previousEnabled) return;
    dispatchOrientation({ type: "previous" });
  };

  const nextHandler: MouseEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    if (!nextEnabled) return;
    dispatchOrientation({ type: "next" });
  };

  const prevStyles: CSSProperties = {
    visibility: previousEnabled ? "visible" : "hidden",
  };
  const nextStyles: CSSProperties = {
    visibility: nextEnabled ? "visible" : "hidden",
  };

  useEffect(() => {
    const color = ["essentialRect", "regular"].includes(slide.type)
      ? "black"
      : "white";
    if (document && document.body) {
      document.body.style.background = color;
    }
  }, [slide.type]);

  return (
    <div className="App" ref={appRef}>
      <div className="overlay">
        <div className="overlay-content">
          <RequestRotate
            orientation={orientation.currentOrientation}
            show={requireRotate}
          />
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
      <SlideListContent currentSlide={orientation.slideIndex} />
    </div>
  );
}

export default App;
