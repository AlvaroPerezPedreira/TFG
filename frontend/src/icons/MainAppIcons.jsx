import React from "react";

export function MailIcon() {
  return (
    <svg
      id="Layer_1"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      width="20"
      height="20"
      color="#FFDB58" // Este color ya no tiene efecto aquí
    >
      <defs>
        <style>
          {`.cls-6374f8d9b67f094e4896c64c-1 {
            fill: none;
            stroke: currentColor;
            stroke-miterlimit: 10;
          }`}
        </style>
      </defs>
      <rect
        x="1.5"
        y="4.36"
        width="21"
        height="15.27"
        stroke="#FFDB58" // Aplico el color aquí
      />
      <polyline
        points="1.5 4.36 12 14.86 22.5 4.36"
        stroke="#FFDB58" // Aplico el color aquí también
      />
    </svg>
  );
}

export function PhoneIcon() {
  return (
    <svg
      id="Layer_1"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      width="20"
      height="20"
      color="#FFDB58" // Esto no afecta en JSX, se usa directamente el atributo stroke
    >
      <defs>
        <style>
          {`.cls-6376396cc3a86d32eae6f0dc-1 {
              fill: none;
              stroke: currentColor;
              stroke-miterlimit: 10;
            }`}
        </style>
      </defs>
      <path
        className="cls-6376396cc3a86d32eae6f0dc-1"
        d="M19.64,21.25c-2.54,2.55-8.38.83-13-3.84S.2,6.9,2.75,4.36L5.53,1.57,10.9,6.94l-2,2A2.18,2.18,0,0,0,8.9,12L12,15.1a2.18,2.18,0,0,0,3.07,0l2-2,5.37,5.37Z"
        stroke="#FFDB58" // Color aplicado aquí
      />
    </svg>
  );
}

export function LockIcon() {
  return (
    <svg
      id="Layer_1"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      width="20"
      height="20"
      color="#FFDB58"
    >
      <defs>
        <style>
          {`.cls-6374f8d9b67f094e4896c64a-1 {
            fill: none;
            stroke: currentColor;
            stroke-miterlimit: 10;
          }`}
        </style>
      </defs>
      <rect
        className="cls-6374f8d9b67f094e4896c64a-1"
        x="5.32"
        y="10.09"
        width="13.36"
        height="12.41"
      ></rect>
      <path
        className="cls-6374f8d9b67f094e4896c64a-1"
        d="M12,1.5h0a4.77,4.77,0,0,1,4.77,4.77v3.82a0,0,0,0,1,0,0H7.23a0,0,0,0,1,0,0V6.27A4.77,4.77,0,0,1,12,1.5Z"
      ></path>
      <circle
        className="cls-6374f8d9b67f094e4896c64a-1"
        cx="12"
        cy="14.86"
        r="0.95"
      ></circle>
      <line
        className="cls-6374f8d9b67f094e4896c64a-1"
        x1="12"
        y1="19.64"
        x2="12"
        y2="15.82"
      ></line>
    </svg>
  );
}

export function UserIcon() {
  return (
    <svg
      id="Layer_1"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      width="20"
      height="20"
      color="#FFDB58"
    >
      <defs>
        <style>
          {`.cls-6374f8d9b67f094e4896c670-1 {
            fill: none;
            stroke: currentColor;
            stroke-miterlimit: 10;
          }`}
        </style>
      </defs>
      <circle
        className="cls-6374f8d9b67f094e4896c670-1"
        cx="12"
        cy="7.25"
        r="5.73"
      ></circle>
      <path
        className="cls-6374f8d9b67f094e4896c670-1"
        d="M1.5,23.48l.37-2.05A10.3,10.3,0,0,1,12,13h0a10.3,10.3,0,0,1,10.13,8.45l.37,2.05"
      ></path>
    </svg>
  );
}

export function MoneyIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      width="20"
      height="20"
      color="#FFDB58"
    >
      <defs>
        <style>
          {`.cls-6375f1aeb67f094e4896ca13-1, .cls-6375f1aeb67f094e4896ca13-2 {
            fill: none;
            stroke: currentColor;
            stroke-miterlimit: 10;
          }
          .cls-6375f1aeb67f094e4896ca13-1 {
            stroke-linecap: square;
          }`}
        </style>
      </defs>
      <g id="money_1" data-name="money 1">
        <rect
          className="cls-6375f1aeb67f094e4896ca13-1"
          x="1.5"
          y="5.32"
          width="21"
          height="13.36"
        ></rect>
        <circle
          className="cls-6375f1aeb67f094e4896ca13-1"
          cx="12"
          cy="12"
          r="3.82"
        ></circle>
        <line
          className="cls-6375f1aeb67f094e4896ca13-2"
          x1="4.36"
          y1="9.14"
          x2="6.27"
          y2="9.14"
        ></line>
        <line
          className="cls-6375f1aeb67f094e4896ca13-2"
          x1="17.73"
          y1="14.86"
          x2="19.64"
          y2="14.86"
        ></line>
        <line
          className="cls-6375f1aeb67f094e4896ca13-2"
          x1="4.36"
          y1="9.14"
          x2="6.27"
          y2="9.14"
        ></line>
        <line
          className="cls-6375f1aeb67f094e4896ca13-2"
          x1="17.73"
          y1="14.86"
          x2="19.64"
          y2="14.86"
        ></line>
      </g>
    </svg>
  );
}

export function BedIcon() {
  return (
    <svg
      id="Layer_1"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      width="20"
      height="20"
      color="#FFDB58"
    >
      <defs>
        <style>
          {`.cls-637b7068f95e86b59c579dfd-1 {
            fill: none;
            stroke: currentColor;
            stroke-miterlimit: 10;
          }`}
        </style>
      </defs>
      <path
        className="cls-637b7068f95e86b59c579dfd-1"
        d="M3.41,12H20.59a1.91,1.91,0,0,1,1.91,1.91v3.82a0,0,0,0,1,0,0H1.5a0,0,0,0,1,0,0V13.93A1.91,1.91,0,0,1,3.41,12Z"
      ></path>
      <path
        className="cls-637b7068f95e86b59c579dfd-1"
        d="M4.36,4.39H19.64A1.91,1.91,0,0,1,21.55,6.3V12a0,0,0,0,1,0,0H2.45a0,0,0,0,1,0,0V6.3A1.91,1.91,0,0,1,4.36,4.39Z"
      ></path>
      <path
        className="cls-637b7068f95e86b59c579dfd-1"
        d="M7.23,8.2h2.86A1.91,1.91,0,0,1,12,10.11V12a0,0,0,0,1,0,0H5.32a0,0,0,0,1,0,0V10.11A1.91,1.91,0,0,1,7.23,8.2Z"
      ></path>
      <path
        className="cls-637b7068f95e86b59c579dfd-1"
        d="M13.91,8.2h2.86a1.91,1.91,0,0,1,1.91,1.91V12a0,0,0,0,1,0,0H12a0,0,0,0,1,0,0V10.11A1.91,1.91,0,0,1,13.91,8.2Z"
      ></path>
      <line
        className="cls-637b7068f95e86b59c579dfd-1"
        x1="2.45"
        y1="20.61"
        x2="2.45"
        y2="17.75"
      ></line>
      <line
        className="cls-637b7068f95e86b59c579dfd-1"
        x1="21.55"
        y1="20.61"
        x2="21.55"
        y2="17.75"
      ></line>
    </svg>
  );
}
