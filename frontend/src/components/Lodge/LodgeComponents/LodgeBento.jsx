import React from "react";
import "./styles/bento.css";
import { startTransition } from "react";

export default function LodgeBento() {
  const handleClick = (country) => () => {
    console.log("You clicked on " + country);
  };

  return (
    <div id="bento-div" className="bt-div">
      <div className="bento-item bento-item-1" onClick={handleClick("France")}>
        <img src="http://localhost:8080/images/Hab1.jpg" alt="" />
      </div>
      <div className="bento-item bento-item-2" onClick={handleClick("Italy")}>
        <img src="http://localhost:8080/images/Hab1.jpg" alt="" />
      </div>
      <div className="bento-item bento-item-3" onClick={handleClick("Spain")}>
        <img src="http://localhost:8080/images/Hab1.jpg" alt="" />
      </div>
      <div
        className="bento-item bento-item-4"
        onClick={handleClick("United States of America")}
      >
        <img src="http://localhost:8080/images/Hab1.jpg" alt="" />
      </div>
    </div>
  );
}
