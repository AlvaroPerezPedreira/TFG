import React from "react";

export function HomeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="size-6"
      width="16" // Ajusta el ancho
      height="16" // Ajusta el alto
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
      />
    </svg>
  );
}

export function EditIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="size-6"
      width="20"
      height="20"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
      />
    </svg>
  );
}

export function CreateIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      width="20"
      height="20"
      className="icon" // Esta clase puede tener tu color actual aplicado
    >
      <defs>
        <style>
          {`.cls-6374f8d9b67f094e4896c652-1{fill:none;stroke:currentColor;stroke-miterlimit:10;}`}
        </style>
      </defs>
      <circle
        className="cls-6374f8d9b67f094e4896c652-1"
        cx="12"
        cy="12"
        r="10.5"
      ></circle>
      <line
        className="cls-6374f8d9b67f094e4896c652-1"
        x1="6.27"
        y1="12"
        x2="17.73"
        y2="12"
      ></line>
      <line
        className="cls-6374f8d9b67f094e4896c652-1"
        x1="12"
        y1="6.27"
        x2="12"
        y2="17.73"
      ></line>
    </svg>
  );
}

export function LogoutIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      width="20"
      height="20"
      color="currentColor"
    >
      <defs>
        <style>
          {`
        .cls-63ce7424ea57ea6c8380055e-1 {
          fill: none;
          stroke: currentColor;
          stroke-miterlimit: 10;
        }
      `}
        </style>
      </defs>
      <polyline
        className="cls-63ce7424ea57ea6c8380055e-1"
        points="14.89 18.68 14.89 22.5 2.48 22.5 2.48 1.5 14.89 1.5 14.89 5.32"
      />
      <line
        className="cls-63ce7424ea57ea6c8380055e-1"
        x1="22.52"
        y1="12"
        x2="9.16"
        y2="12"
      />
      <polyline
        className="cls-63ce7424ea57ea6c8380055e-1"
        points="13.93 7.23 9.16 12 13.93 16.77"
      />
    </svg>
  );
}
