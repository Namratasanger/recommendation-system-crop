import React, { Component } from "react";
import "./App.css";
import CropRecommendation from "./components/cropRecommendation/cropRecommendation.jsx";

class App extends Component {
  render() {
    return (
      <div>
        <CropRecommendation />
      </div>
    );
  }
}

export default App;
