import React from "react";

export default function CarIcon() {
  return (
    <div>
      <svg
        width="20"
        height="20"
        viewBox="0 0 32 32"
        style={{ enableBackground: "new 0 0 32 32" }}
      >
        <style type="text/css">
          {`
                .st0 {
                    fill: none;
                    stroke: #ffffff; /* Cambia a blanco */
                    stroke-width: 2;
                    stroke-linecap: round;
                    stroke-linejoin: round;
                    stroke-miterlimit: 10;
                }
            `}
        </style>
        <circle className="st0" cx="7" cy="23" r="3"></circle>
        <circle className="st0" cx="23" cy="23" r="3"></circle>
        <line className="st0" x1="28" y1="19" x2="30" y2="19"></line>
        <line className="st0" x1="4" y1="16" x2="24" y2="16"></line>
        <line className="st0" x1="13" y1="10" x2="10" y2="16"></line>
        <path
          className="st0"
          d="M26,23h4c0.6,0,1-0.4,1-1v-2c0-2.2-1.8-4-4-4h-3l-3.8-4.6c-0.8-0.9-1.9-1.4-3.1-1.4H9.5c-1.5,0-2.9,0.9-3.6,2.2L4,16H3c-1.1,0-2,0.9-2,2v4c0,0.6,0.4,1,1,1h2"
        ></path>
        <line className="st0" x1="10" y1="23" x2="20" y2="23"></line>
      </svg>
    </div>
  );
}
