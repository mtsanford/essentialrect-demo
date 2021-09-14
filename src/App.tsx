import React from 'react';

import './App.css';
import RegularFitImage from './components/RegularFitImage';

function App() {
  const url = "./images/boy.jpg";
  return (
    <div className="App">
      <RegularFitImage imageURL={url} />
    </div>
  );
}

export default App;
