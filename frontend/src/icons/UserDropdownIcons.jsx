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

export function NbHammerIcon() {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="20"
        height="20"
        strokeWidth="1.5"
        fill="none"
        stroke="currentColor"
      >
        <rect
          x="10.39"
          y="2.21"
          width="7.6"
          height="15.19"
          transform="translate(-2.78 12.91) rotate(-45)"
          strokeMiterlimit="10"
        />
        <path
          d="M13,14,4.79,22.14a2,2,0,0,1-1.47.61,2.07,2.07,0,0,1-2.07-2.07,2,2,0,0,1,.61-1.47L10,11Z"
          strokeMiterlimit="10"
        />
        <path
          d="M20.41,5.66a2.05,2.05,0,0,1-.6,1.46L18.34,8.59,15.41,5.66l1.47-1.47a2.07,2.07,0,0,1,3.53,1.47Z"
          strokeMiterlimit="10"
        />
      </svg>
    </>
  );
}

export function NbLodgesIcon() {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        width="20"
        height="20"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819"
        />
      </svg>
    </>
  );
}

export function NbBookingIcon() {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        width="20"
        height="20"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
        />
      </svg>
    </>
  );
}
