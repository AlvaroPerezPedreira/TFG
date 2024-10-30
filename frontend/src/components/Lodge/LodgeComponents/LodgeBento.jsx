import React from "react";
import "./styles/bento.css";
import { startTransition } from "react";

export default function LodgeBento() {
  const handleClick = (country) => () => {
    console.log("You clicked on " + country);
  };

  return (
    <div id="bento-div" className="bt-div">
      <div
        className="bento-item bento-item-1"
        onClick={handleClick("United States of America")}
      >
        <img src="http://localhost:8080/images/bento/USABento.jpg" alt="" />
      </div>
      <div className="bento-item bento-item-2" onClick={handleClick("Italy")}>
        <img src="http://localhost:8080/images/bento/ItalyBento.jpg" alt="" />
      </div>
      <div
        className="bento-item bento-item-3"
        onClick={handleClick("United Kingdom")}
      >
        <img src="http://localhost:8080/images/bento/UKBento.jpg" alt="" />
      </div>
      <div className="bento-item bento-item-4" onClick={handleClick("France")}>
        <img src="http://localhost:8080/images/bento/FranceBento.jpg" alt="" />
      </div>
    </div>
  );
}
