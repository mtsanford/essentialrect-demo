import React from 'react';

import './App.css';
import RegularFitImage from './components/RegularFitImage';
import EssentialRectImg from './essential-rect/EssentialRectImg';

{/* <RegularFitImage imageURL={url} /> */}


function App() {
  const url = "./images/boy.jpg";
  const essentialRect = {
    left: 300,
    top: 0,
    width: 400,
    height: 500,
  };

  return (
    <div className="App">
      <EssentialRectImg src={url} essentialRect={essentialRect} />
    </div>
  );
}

export default App;
