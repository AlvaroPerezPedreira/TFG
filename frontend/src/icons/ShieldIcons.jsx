import React from "react";

export function ShieldCloseIcon() {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        width="20"
        height="20"
        stroke="currentColor"
        fill="none"
      >
        <path d="M12,22.5h0A11.87,11.87,0,0,1,2.45,10.86V3.41L12,1.5l9.55,1.91v7.45A11.87,11.87,0,0,1,12,22.5Z" />
        <line x1="15.82" y1="8.18" x2="8.18" y2="15.82" />
        <line x1="8.18" y1="8.18" x2="15.82" y2="15.82" />
      </svg>
    </>
  );
}

export function ShieldOpenIcon() {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        width="20"
        height="20"
        stroke="currentColor"
        fill="none"
      >
        <path d="M12,22.5h0A11.87,11.87,0,0,1,2.45,10.86V3.41L12,1.5l9.55,1.91v7.45A11.87,11.87,0,0,1,12,22.5Z" />
        <polyline points="7.23 10.93 10.81 14.51 16.77 8.54" />
      </svg>
    </>
  );
}
