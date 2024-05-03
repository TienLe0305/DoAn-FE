import React from "react";

const LoadingIcon = () => (
  <svg
    className="cwa_loading-icon"
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M45 24a21.001 21.001 0 0 1-42 0m11 0a10 10 0 0 1 20 0"
      stroke="#000"
      strokeWidth="3"
    />
  </svg>
);

const SendIcon = ({ fill = "#000" }) => (
  <svg
    width="30"
    height="30"
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="m12.813 23.187 4.974 11.606a1.17 1.17 0 0 0 1.05.707h.023a1.17 1.17 0 0 0 1.054-.667L35.386 2.166A1.164 1.164 0 0 0 33.835.613L1.168 16.086a1.167 1.167 0 0 0 .039 2.126zM31.879 4.12 18.913 31.496l-4.14-9.656a1.16 1.16 0 0 0-.613-.613l-9.656-4.142z"
      fill={fill}
    />
  </svg>
);

const ExitIcon = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 16 16"
    width="20px"
    height="20px"
    fill="#000"
  >
    <path d="M6.823 7.823a.25.25 0 0 1 0 .354l-2.396 2.396A.25.25 0 0 1 4 10.396V5.604a.25.25 0 0 1 .427-.177Z" />
    <path d="M1.75 0h12.5C15.216 0 16 .784 16 1.75v12.5A1.75 1.75 0 0 1 14.25 16H1.75A1.75 1.75 0 0 1 0 14.25V1.75C0 .784.784 0 1.75 0M1.5 1.75v12.5c0 .138.112.25.25.25H9.5v-13H1.75a.25.25 0 0 0-.25.25M11 14.5h3.25a.25.25 0 0 0 .25-.25V1.75a.25.25 0 0 0-.25-.25H11Z" />
  </svg>
);

const RemoveIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 15 15"
    fill="none"
    cursor="pointer"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="15" height="15" rx="7.5" fill="#fff" />
    <path
      d="m8.381 7.5 2.688-2.681a.628.628 0 1 0-.888-.888L7.5 6.62 4.819 3.93a.628.628 0 0 0-.888.888L6.62 7.5l-2.69 2.681a.626.626 0 0 0 .204 1.025.63.63 0 0 0 .684-.137L7.5 8.38l2.681 2.688a.626.626 0 0 0 1.073-.444.63.63 0 0 0-.185-.444z"
      fill="#FF4F4F"
    />
  </svg>
);

const UploadImageIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 15 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g
      clip-path="url(#a)"
      stroke="#000001"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M2.01 13.5h11a1 1 0 0 0 1-1v-11a1 1 0 0 0-1-1h-11a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1" />
      <path d="M9.75 6.5a1.75 1.75 0 1 0 0-3.5 1.75 1.75 0 0 0 0 3.5m.15 7a7.36 7.36 0 0 0-7.4-6 8 8 0 0 0-1.5.14" />
      <path d="M14 9.91a7.8 7.8 0 0 0-2.5-.41 7.9 7.9 0 0 0-3.13.64" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M.5 0h14v14H.5z" />
      </clipPath>
    </defs>
  </svg>
);

const CloseCWA = () => (
  <svg
    width="23"
    height="20"
    viewBox="0 0 23 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#filter0_d_1_273)">
      <rect x="4" width="15" height="15" rx="7.5" fill="white" />
      <path
        d="M12.3813 7.49999L15.0688 4.81874C15.1865 4.70105 15.2526 4.54143 15.2526 4.37499C15.2526 4.20856 15.1865 4.04893 15.0688 3.93124C14.9511 3.81355 14.7915 3.74744 14.625 3.74744C14.4586 3.74744 14.299 3.81355 14.1813 3.93124L11.5 6.61874L8.81877 3.93124C8.70108 3.81355 8.54146 3.74744 8.37502 3.74744C8.20858 3.74744 8.04896 3.81355 7.93127 3.93124C7.81358 4.04893 7.74747 4.20856 7.74747 4.37499C7.74747 4.54143 7.81358 4.70105 7.93127 4.81874L10.6188 7.49999L7.93127 10.1812C7.87269 10.2393 7.8262 10.3085 7.79447 10.3846C7.76274 10.4608 7.7464 10.5425 7.7464 10.625C7.7464 10.7075 7.76274 10.7892 7.79447 10.8654C7.8262 10.9415 7.87269 11.0106 7.93127 11.0687C7.98937 11.1273 8.0585 11.1738 8.13466 11.2056C8.21082 11.2373 8.29252 11.2536 8.37502 11.2536C8.45753 11.2536 8.53922 11.2373 8.61538 11.2056C8.69155 11.1738 8.76067 11.1273 8.81877 11.0687L11.5 8.38124L14.1813 11.0687C14.2394 11.1273 14.3085 11.1738 14.3847 11.2056C14.4608 11.2373 14.5425 11.2536 14.625 11.2536C14.7075 11.2536 14.7892 11.2373 14.8654 11.2056C14.9415 11.1738 15.0107 11.1273 15.0688 11.0687C15.1274 11.0106 15.1739 10.9415 15.2056 10.8654C15.2373 10.7892 15.2536 10.7075 15.2536 10.625C15.2536 10.5425 15.2373 10.4608 15.2056 10.3846C15.1739 10.3085 15.1274 10.2393 15.0688 10.1812L12.3813 7.49999Z"
        fill="#FF4F4F"
      />
    </g>
    <defs>
      <filter
        id="filter0_d_1_273"
        x="0"
        y="0"
        width="23"
        height="23"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="2" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_1_273"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_1_273"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);

const ArrowButton = () => (
  <svg
    width="25"
    height="20"
    viewBox="0 0 15 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g
      clip-path="url(#a)"
      stroke="#000001"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M1.25 7h13m-3.5 3.5 3.5-3.5-3.5-3.5" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M.75 0h14v14h-14z" />
      </clipPath>
    </defs>
  </svg>
);

const ChatIconSideBar = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 15 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g
      clip-path="url(#a)"
      stroke="#000001"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M4.75 7a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1M8 7a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1m3.25 0a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1" />
      <path d="m5 12.5-4 1 1-3v-9a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1z" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M.5 0h14v14H.5z" />
      </clipPath>
    </defs>
  </svg>
);

const QuestionIconSideBar = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g
      clip-path="url(#a)"
      stroke="#000001"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M12.5.5h-11a1 1 0 0 0-1 1V10a1 1 0 0 0 1 1h2v2.5L6.62 11h5.88a1 1 0 0 0 1-1V1.5a1 1 0 0 0-1-1" />
      <path d="M5.5 4.5A1.5 1.5 0 1 1 7 6v.5M7 9a.25.25 0 0 1 0-.5M7 9a.25.25 0 0 0 0-.5" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h14v14H0z" />
      </clipPath>
    </defs>
  </svg>
);

const WriteIconSideBar = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 15 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g
      clip-path="url(#a)"
      stroke="#000001"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="m8.02 9-3 .54.5-3.04L11.25.79a1 1 0 0 1 1.42 0l1.06 1.06a1 1 0 0 1 0 1.42z" />
      <path d="M12.52 9.5v3a1 1 0 0 1-1 1h-9.5a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h3" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M.52 0h14v14h-14z" />
      </clipPath>
    </defs>
  </svg>
);

const PDFIconSideBar = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2.5 6.5V6H2v.5zm4 0V6H6v.5zm0 4H6v.5h.5zm7-7h.5v-.207l-.146-.147zm-3-3 .354-.354L10.707 0H10.5zM2.5 7h1V6h-1zm.5 4V8.5H2V11zm0-2.5v-2H2v2zm.5-.5h-1v1h1zm.5-.5a.5.5 0 0 1-.5.5v1A1.5 1.5 0 0 0 5 7.5zM3.5 7a.5.5 0 0 1 .5.5h1A1.5 1.5 0 0 0 3.5 6zM6 6.5v4h1v-4zm.5 4.5h1v-1h-1zM9 9.5v-2H8v2zM7.5 6h-1v1h1zM9 7.5A1.5 1.5 0 0 0 7.5 6v1a.5.5 0 0 1 .5.5zM7.5 11A1.5 1.5 0 0 0 9 9.5H8a.5.5 0 0 1-.5.5zM10 6v5h1V6zm.5 1H13V6h-2.5zm0 2H12V8h-1.5zM2 5V1.5H1V5zm11-1.5V5h1V3.5zM2.5 1h8V0h-8zm7.646-.146 3 3 .708-.708-3-3zM2 1.5a.5.5 0 0 1 .5-.5V0A1.5 1.5 0 0 0 1 1.5zM1 12v1.5h1V12zm1.5 3h10v-1h-10zM14 13.5V12h-1v1.5zM12.5 15a1.5 1.5 0 0 0 1.5-1.5h-1a.5.5 0 0 1-.5.5zM1 13.5A1.5 1.5 0 0 0 2.5 15v-1a.5.5 0 0 1-.5-.5z"
      fill="#000"
    />
  </svg>
);

const IconEssay = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1.45834 2.04167H4.66668C5.95535 2.04167 7.00001 3.08633 7.00001 4.37501V12.25C7.00001 11.2835 6.21651 10.5 5.25001 10.5H1.45834V2.04167Z"
      stroke="currentColor"
      stroke-width="1.2"
      stroke-linejoin="round"
    ></path>
    <path
      d="M12.5417 2.04167H9.33333C8.04466 2.04167 7 3.08633 7 4.37501V12.25C7 11.2835 7.7835 10.5 8.75 10.5H12.5417V2.04167Z"
      stroke="currentColor"
      stroke-width="1.2"
      stroke-linejoin="round"
    ></path>
  </svg>
);

const IconBlogFacebook = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#a)">
      <path d="M0 14h14V0H0z" fill="#fff" fill-opacity=".01" />
      <path
        d="M7 11.375H1.75m10.5-2.625H1.75m10.5-3.208H1.75m10.5-2.917H1.75"
        stroke="currentColor"
        stroke-width="1.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h14v14H0z" />
      </clipPath>
    </defs>
  </svg>
);

const IconEmail = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 16 16"
    width="14"
    height="14"
    fill="currentColor"
    style={{
      display: "inline-block",
      userSelect: "none",
      verticalAlign: "text-bottom",
      overflow: "visible",
    }}
  >
    <path d="M1.75 2h12.5c.966 0 1.75.784 1.75 1.75v8.5A1.75 1.75 0 0 1 14.25 14H1.75A1.75 1.75 0 0 1 0 12.25v-8.5C0 2.784.784 2 1.75 2M1.5 12.251c0 .138.112.25.25.25h12.5a.25.25 0 0 0 .25-.25V5.809L8.38 9.397a.75.75 0 0 1-.76 0L1.5 5.809zm13-8.181v-.32a.25.25 0 0 0-.25-.25H1.75a.25.25 0 0 0-.25.25v.32L8 7.88Z" />
  </svg>
);

const IconIdeas = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 16 16"
    width="14"
    height="14"
    fill="currentColor"
    style={{
      display: "inline-block",
      userSelect: "none",
      verticalAlign: "text-bottom",
      overflow: "visible",
    }}
  >
    <path d="M8 1.5c-2.363 0-4 1.69-4 3.75 0 .984.424 1.625.984 2.304l.214.253c.223.264.47.556.673.848.284.411.537.896.621 1.49a.75.75 0 0 1-1.484.211c-.04-.282-.163-.547-.37-.847a9 9 0 0 0-.542-.68l-.268-.32C3.201 7.75 2.5 6.766 2.5 5.25 2.5 2.31 4.863 0 8 0s5.5 2.31 5.5 5.25c0 1.516-.701 2.5-1.328 3.259q-.142.172-.268.319c-.207.245-.383.453-.541.681-.208.3-.33.565-.37.847a.751.751 0 0 1-1.485-.212c.084-.593.337-1.078.621-1.489.203-.292.45-.584.673-.848l.213-.253c.561-.679.985-1.32.985-2.304 0-2.06-1.637-3.75-4-3.75M5.75 12h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1 0-1.5M6 15.25a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75" />
  </svg>
);

const IconBlog = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#a)">
      <path d="M14 0H0v14h14z" fill="#fff" fill-opacity=".01" />
      <path
        d="M7 2.625h5.25M7 5.542h5.25M1.75 8.458h10.5m-10.5 2.917h10.5M2.042 4.958h2.333m-2.625.584.292-.584zm2.917 0-.292-.584zm-2.625-.584 1.166-2.333 1.167 2.333z"
        stroke="currentColor"
        stroke-width="1.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h14v14H0z" />
      </clipPath>
    </defs>
  </svg>
);

const IconOutline = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#a)">
      <path d="M14 0H0v14h14z" fill="#fff" fill-opacity=".01" />
      <path
        d="M7.583 7h5.25m-8.75 0H5.25m0 4.083h7.583m-11.083 0h1.167M5.25 2.917h7.583m-11.083 0h1.167"
        stroke="currentColor"
        stroke-width="1.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h14v14H0z" />
      </clipPath>
    </defs>
  </svg>
);

const IconMarketing = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1.39999 2.79999V11.2C1.39999 11.9732 2.02679 12.6 2.79999 12.6H11.2C11.9732 12.6 12.6 11.9732 12.6 11.2V2.79999M1.39999 2.79999C1.39999 2.0268 2.0268 1.39999 2.79999 1.39999H11.2C11.9732 1.39999 12.6 2.0268 12.6 2.79999M1.39999 2.79999C1.39999 3.57319 2.0268 4.19999 2.79999 4.19999H11.2C11.9732 4.19999 12.6 3.57319 12.6 2.79999M3.84999 8.39999H6.64999M3.84999 10.5H5.59999"
      stroke="currentColor"
      stroke-width="1.2"
      stroke-linecap="round"
    ></path>
  </svg>
);

const IconComment = () => (
  <svg
    aria-hidden="true"
    focusable="false"
    role="img"
    viewBox="0 0 16 16"
    width="14"
    height="14"
    fill="currentColor"
    style={{
      display: "inline-block",
      userSelect: "none",
      verticalAlign: "text-bottom",
      overflow: "visible",
    }}
  >
    <path d="M1 2.75C1 1.784 1.784 1 2.75 1h10.5c.966 0 1.75.784 1.75 1.75v7.5A1.75 1.75 0 0 1 13.25 12H9.06l-2.573 2.573A1.458 1.458 0 0 1 4 13.543V12H2.75A1.75 1.75 0 0 1 1 10.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h2a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h4.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path>
  </svg>
);

const IconMessage = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      <path
        d="M9.80019 7.05266V7.00002M7.00019 7.05266V7.00002M4.20019 7.05266V7.00002M1.40019 7.00002C1.40019 7.80504 1.57005 8.57038 1.87589 9.26216L1.39913 12.5995L4.25917 11.8845C5.06939 12.3401 6.00444 12.6 7.00019 12.6C10.093 12.6 12.6002 10.0928 12.6002 7.00002C12.6002 3.90723 10.093 1.40002 7.00019 1.40002C3.9074 1.40002 1.40019 3.90723 1.40019 7.00002Z"
        stroke="currentColor"
        stroke-width="1.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
    </g>
  </svg>
);

const IconTwitter = () => (
  <svg
    stroke="currentColor"
    fill="none"
    stroke-width="0"
    viewBox="0 0 15 15"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M7.233 4.696c0-1.727 1.4-3.127 3.127-3.127 1.014 0 1.823.479 2.365 1.175a5.3 5.3 0 0 0 1.626-.629 2.63 2.63 0 0 1-1.148 1.45l.002.003a5.3 5.3 0 0 0 1.5-.413l-.001.002c-.337.505-.76.95-1.248 1.313q.04.266.04.53c0 3.687-2.809 7.975-7.975 7.975a7.93 7.93 0 0 1-4.296-1.26.5.5 0 0 1-.108-.748.45.45 0 0 1 .438-.215c.916.108 1.83-.004 2.637-.356a3.1 3.1 0 0 1-1.69-1.876.45.45 0 0 1 .103-.448 3.07 3.07 0 0 1-1.045-2.31v-.034a.45.45 0 0 1 .365-.442 3.1 3.1 0 0 1-.344-1.416c0-.468.003-1.058.332-1.59a.45.45 0 0 1 .323-.208.5.5 0 0 1 .538.161 6.96 6.96 0 0 0 4.46 2.507zm-1.712 7.279a7 7 0 0 1-2.249-.373 5.3 5.3 0 0 0 2.39-1.042.45.45 0 0 0-.27-.804 2.17 2.17 0 0 1-1.714-.888q.285-.023.556-.096a.45.45 0 0 0-.028-.876 2.18 2.18 0 0 1-1.644-1.474q.301.073.623.084a.45.45 0 0 0 .265-.824 2.18 2.18 0 0 1-.97-1.812q-.001-.25.013-.453a7.95 7.95 0 0 0 5.282 2.376.5.5 0 0 0 .513-.61 2.127 2.127 0 0 1 2.071-2.614c1.234 0 2.136 1.143 2.136 2.432 0 3.256-2.476 6.974-6.975 6.974Z"
      fill="currentColor"
      stroke="none"
    />
  </svg>
);

const IconType = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.375 1.75h-8.75a.875.875 0 0 0-.875.875v8.75c0 .483.392.875.875.875h8.75a.875.875 0 0 0 .875-.875v-8.75a.875.875 0 0 0-.875-.875Z"
      stroke="currentColor"
      stroke-width="1.2"
      stroke-linejoin="round"
    />
    <path
      d="M7.583 7h-3.5m5.834-2.625H4.083m5.25 5.25h-5.25"
      stroke="currentColor"
      stroke-width="1.2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const IconTone = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#a)">
      <path d="M14 0H0v14h14z" fill="#fff" fill-opacity=".01" />
      <path
        d="M7 12.833A5.833 5.833 0 1 0 7 1.167a5.833 5.833 0 0 0 0 11.666Z"
        stroke="currentColor"
        stroke-width="1.2"
        stroke-linejoin="round"
      />
      <path
        d="M9.042 5.25v.292M4.958 5.25v.292m2.625 2.625H6.417a1.167 1.167 0 1 0 0 2.333h1.166a1.167 1.167 0 0 0 0-2.333"
        stroke="currentColor"
        stroke-width="1.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h14v14H0z" />
      </clipPath>
    </defs>
  </svg>
);

const IconLength = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#a)">
      <path d="M0 14h14V0H0z" fill="#fff" fill-opacity=".01" />
      <path
        d="M9 12H2m10-3H2m7-4H2m10-3H2"
        stroke="currentColor"
        stroke-width="1.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h14v14H0z" />
      </clipPath>
    </defs>
  </svg>
);

const IconLanguage = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g opacity=".65" clip-path="url(#a)">
      <path d="M14 0H0v14h14z" fill="#fff" fill-opacity=".01" />
      <path
        d="M8.25 10.792h3.333m.667 1.458-.667-1.458zm-4.667 0 .667-1.458zm.667-1.458L9.917 7l1.666 3.792zM4.667 1.75l.291.875m-3.208.583h6.417m-5.25 1.459s.522 1.826 1.826 2.84c1.305 1.015 3.424 1.826 3.424 1.826"
        stroke="currentColor"
        stroke-width="1.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M7 3.208s-.522 2.397-1.827 3.729C3.868 8.268 1.75 9.333 1.75 9.333"
        stroke="currentColor"
        stroke-width="1.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h14v14H0z" />
      </clipPath>
    </defs>
  </svg>
);

const USFlag = () => (
  <svg
    width="30"
    height="30"
    className="me-2"
    viewBox="0 0 512 512"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M503.202 322.783C508.939 301.492 512 279.104 512 256L503.202 189.218C496.784 165.404 487.018 142.965 474.438 122.435L415.379 55.652C371.675 20.8387 316.323 0.0256442 256.111 0H255.889C195.677 0.0256336 140.325 20.8387 96.6209 55.652L37.5621 122.435C24.9824 142.965 15.2155 165.404 8.79798 189.218L0 256L2.41187e-05 256.112C0.00992806 279.176 3.0698 301.527 8.7982 322.783L37.5622 389.565C53.2303 415.135 73.262 437.741 96.621 456.348L256 512L415.379 456.348C438.738 437.741 458.77 415.135 474.438 389.565L503.202 322.783Z"
      fill="#EEEEEE"
    />
    <path
      d="M503.202 189.217C508.939 210.508 512 232.896 512 256H0C0 232.896 3.06051 210.508 8.79822 189.217H503.202Z"
      fill="#D80027"
    />
    <path
      d="M415.379 55.6519C438.738 74.2588 458.77 96.8653 474.438 122.435H37.5622C53.2303 96.8653 73.262 74.2588 96.621 55.6519H415.379Z"
      fill="#D80027"
    />
    <path
      d="M474.438 389.565C487.018 369.035 496.784 346.596 503.202 322.782H8.79796C15.2155 346.596 24.9823 369.035 37.5621 389.565H474.438Z"
      fill="#D80027"
    />
    <path
      d="M415.379 456.348H96.6208C140.299 491.141 195.611 511.95 255.781 512H256.219C316.389 511.95 371.701 491.141 415.379 456.348Z"
      fill="#D80027"
    />
    <path
      d="M0 245.585C5.46421 109.029 117.896 0 255.792 0C255.861 0 255.931 2.75698e-05 256 8.2699e-05V256H0V245.585Z"
      fill="#0052B4"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M109.506 46.0312C117.873 40.1825 126.606 34.8212 135.664 29.9885L136.621 32.9341H164.521L141.95 49.3329L150.571 75.8666L128 59.4679L105.429 75.8666L114.05 49.3329L109.506 46.0312ZM29.5876 136.419C35.4946 125.258 42.2026 114.586 49.6351 104.48L53.4214 116.133H81.3206L58.7497 132.532L67.371 159.066L44.8001 142.667L22.2291 159.066L29.5876 136.419ZM211.2 6.40039L219.821 32.9341H247.721L225.15 49.3329L233.771 75.8666L211.2 59.4679L188.629 75.8666L197.25 49.3329L174.68 32.9341H202.579L211.2 6.40039ZM128 89.5996L136.621 116.133H164.521L141.95 132.532L150.571 159.066L128 142.667L105.429 159.066L114.05 132.532L91.4794 116.133H119.379L128 89.5996ZM219.821 116.133L211.2 89.5996L202.579 116.133H174.68L197.25 132.532L188.629 159.066L211.2 142.667L233.771 159.066L225.15 132.532L247.721 116.133H219.821ZM44.8001 172.8L53.4214 199.334H81.3206L58.7497 215.732L67.371 242.266L44.8001 225.867L22.2291 242.266L30.8504 215.732L8.27948 199.334H36.1787L44.8001 172.8ZM136.621 199.334L128 172.8L119.379 199.334H91.4794L114.05 215.732L105.429 242.266L128 225.867L150.571 242.266L141.95 215.732L164.521 199.334H136.621ZM211.2 172.8L219.821 199.334H247.721L225.15 215.732L233.771 242.266L211.2 225.867L188.629 242.266L197.25 215.732L174.68 199.334H202.579L211.2 172.8Z"
      fill="#EEEEEE"
    />
  </svg>
);

const VNFlag = () => (
  <svg
    width="30"
    height="30"
    className="me-2"
    viewBox="0 0 512 512"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="256" cy="256" r="256" fill="#D80027" />
    <path
      d="M256 132.96L283.624 217.979L373.018 217.979L300.697 270.523L328.321 355.541L256 302.997L183.679 355.541L211.303 270.523L138.982 217.979L228.376 217.979L256 132.96Z"
      fill="#FFDA44"
    />
  </svg>
);

const JPFlag = () => (
  <svg
    width="30"
    height="30"
    className="me-2"
    viewBox="0 0 512 512"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="256" cy="256" r="256" fill="#EEEEEE" />
    <path
      d="M256 368C317.856 368 368 317.856 368 256C368 194.144 317.856 144 256 144C194.144 144 144 194.144 144 256C144 317.856 194.144 368 256 368Z"
      fill="#D80027"
    />
  </svg>
);

const LogoIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="30"
    height="30"
    viewBox="0 0 44.729 44.729"
  >
    <path
      d="M1.732 30.985c1.218-9.961 6.295-13.156 10.841-15.987 4.642-2.892 8.657-5.425 8.174-14.942a22.2 22.2 0 0 0-6.191 1.348c.202 7.553-3.376 9.793-6.848 11.956C4.041 15.644.577 17.802.36 26.318c.29 1.621.751 3.186 1.372 4.667"
      fill='url("#a")'
    />
    <path
      d="M6.65 11.662c3.236-2.017 5.853-3.667 5.912-9.399C6.672 5.15 2.232 10.551.643 17.059c1.631-2.669 3.898-4.084 6.007-5.397m.591 27.161c.788-10.616 5.446-14.321 9.963-17.908 4.907-3.896 9.544-7.588 9.283-20.54A22.4 22.4 0 0 0 22.743 0c.518 10.661-4.367 13.739-9.113 16.695-4.808 2.995-9.77 6.104-10.152 17.621a22.5 22.5 0 0 0 3.763 4.507m23.951-11.672c4.482-3.597 8.71-7.021 8.484-18.957A22.5 22.5 0 0 0 35.54 4.29c-.063 13.04-5.132 17.116-10.045 21.058-4.624 3.711-8.989 7.222-9.309 18.515 1.844.53 3.783.831 5.787.867.527-10.573 4.938-14.142 9.219-17.579m7.512 4.665c-3.21 1.956-5.994 3.671-6.318 10.549 6.155-3.093 10.692-8.941 11.984-15.92-1.442 2.794-3.629 4.13-5.666 5.371"
      fill='url("#a")'
    />
    <path
      d="M37.664 30.109c3.438-2.096 6.687-4.074 6.291-13.271l.103-.004a22.2 22.2 0 0 0-2.416-5.829c-.473 10.67-4.895 14.254-9.196 17.706-4.093 3.282-7.954 6.409-8.465 15.963a22.3 22.3 0 0 0 6.372-1.41c.122-8.774 3.94-11.101 7.311-13.155m-13.419-6.321c4.915-3.943 9.559-7.678 9.287-20.806A22.3 22.3 0 0 0 28.499.848c.143 13.54-5.037 17.652-10.051 21.633-4.566 3.625-8.875 7.069-9.286 17.922a22.3 22.3 0 0 0 5.059 2.789c.494-11.725 5.332-15.639 10.024-19.404"
      fill='url("#a")'
    />
    <defs>
      <linearGradient id="a">
        <stop stop-color="rgba(4, 98, 126)" offset="0" />
        <stop stop-color="rgba(55, 139, 165)" offset=".484" />
        <stop stop-color="rgba(176, 214, 223)" offset="1" />
      </linearGradient>
    </defs>
  </svg>
);

const UploadPDFIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 309.267 309.267"
    xmlSpace="preserve"
    width="80"
  >
    <path
      style={{ fill: "#e2574c" }}
      d="M38.658 0h164.23l87.049 86.711v203.227c0 10.679-8.659 19.329-19.329 19.329H38.658c-10.67 0-19.329-8.65-19.329-19.329V19.329C19.329 8.65 27.989 0 38.658 0"
    />
    <path
      style={{ fill: "#b53629" }}
      d="M289.658 86.981h-67.372c-10.67 0-19.329-8.659-19.329-19.329V.193z"
    />
    <path
      style={{ fill: "#fff" }}
      d="M217.434 146.544c3.238 0 4.823-2.822 4.823-5.557 0-2.832-1.653-5.567-4.823-5.567h-18.44c-3.605 0-5.615 2.986-5.615 6.282v45.317c0 4.04 2.3 6.282 5.412 6.282 3.093 0 5.403-2.242 5.403-6.282v-12.438h11.153c3.46 0 5.19-2.832 5.19-5.644 0-2.754-1.73-5.49-5.19-5.49h-11.153v-16.903zm-62.327-11.124h-13.492c-3.663 0-6.263 2.513-6.263 6.243v45.395c0 4.629 3.74 6.079 6.417 6.079h14.159c16.758 0 27.824-11.027 27.824-28.047-.009-17.995-10.427-29.67-28.645-29.67m.648 46.526h-8.225v-35.334h7.413c11.221 0 16.101 7.529 16.101 17.918 0 9.723-4.794 17.416-15.289 17.416M106.33 135.42H92.964c-3.779 0-5.886 2.493-5.886 6.282v45.317c0 4.04 2.416 6.282 5.663 6.282s5.663-2.242 5.663-6.282v-13.231h8.379c10.341 0 18.875-7.326 18.875-19.107.001-11.529-8.233-19.261-19.328-19.261m-.222 27.738h-7.703v-17.097h7.703c4.755 0 7.78 3.711 7.78 8.553-.01 4.833-3.025 8.544-7.78 8.544"
    />
  </svg>
);

const UploadPDFIconInMessage = () => (
  <svg
    className="fa-file-pdf"
    aria-hidden="true"
    data-prefix="far"
    data-icon="file-pdf"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    fill="#f40f02"
    height="35px"
    width="35px"
  >
    <path
      fill="currentColor"
      d="M64 464h32v48H64c-35.3 0-64-28.7-64-64V64C0 28.7 28.7 0 64 0h165.5c17 0 33.3 6.7 45.3 18.7l90.5 90.5c12 12 18.7 28.3 18.7 45.3V288h-48V160h-80c-17.7 0-32-14.3-32-32V48H64c-8.8 0-16 7.2-16 16v384c0 8.8 7.2 16 16 16m112-112h32c30.9 0 56 25.1 56 56s-25.1 56-56 56h-16v32c0 8.8-7.2 16-16 16s-16-7.2-16-16V368c0-8.8 7.2-16 16-16m32 80c13.3 0 24-10.7 24-24s-10.7-24-24-24h-16v48zm96-80h32c26.5 0 48 21.5 48 48v64c0 26.5-21.5 48-48 48h-32c-8.8 0-16-7.2-16-16V368c0-8.8 7.2-16 16-16m32 128c8.8 0 16-7.2 16-16v-64c0-8.8-7.2-16-16-16h-16v96zm80-112c0-8.8 7.2-16 16-16h48c8.8 0 16 7.2 16 16s-7.2 16-16 16h-32v32h32c8.8 0 16 7.2 16 16s-7.2 16-16 16h-32v48c0 8.8-7.2 16-16 16s-16-7.2-16-16z"
    ></path>
  </svg>
);

const LoadingMessageIcon = () => (
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" width="40" height="30">
  <circle fill="#f1eef6" r="10" cy="50" cx="84">
    <animate begin="0s" keySplines="0 0.5 0.5 1" values="10;0" keyTimes="0;1" calcMode="spline" dur="0.25s" repeatCount="indefinite" attributeName="r"/>
    <animate begin="0s" values="#f1eef6;#2b8cbe;#74a9cf;#bdc9e1;#f1eef6" keyTimes="0;0.25;0.5;0.75;1" calcMode="discrete" dur="1s" repeatCount="indefinite" attributeName="fill"/>
  </circle>
  <circle fill="#f1eef6" r="10" cy="50" cx="16">
    <animate begin="0s" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" values="0;0;10;10;10" keyTimes="0;0.25;0.5;0.75;1" calcMode="spline" dur="1s" repeatCount="indefinite" attributeName="r"/>
    <animate begin="0s" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" values="16;16;16;50;84" keyTimes="0;0.25;0.5;0.75;1" calcMode="spline" dur="1s" repeatCount="indefinite" attributeName="cx"/>
  </circle>
  <circle fill="#bdc9e1" r="10" cy="50" cx="50">
    <animate begin="-0.25s" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" values="0;0;10;10;10" keyTimes="0;0.25;0.5;0.75;1" calcMode="spline" dur="1s" repeatCount="indefinite" attributeName="r"/>
    <animate begin="-0.25s" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" values="16;16;16;50;84" keyTimes="0;0.25;0.5;0.75;1" calcMode="spline" dur="1s" repeatCount="indefinite" attributeName="cx"/>
  </circle>
  <circle fill="#74a9cf" r="10" cy="50" cx="84">
    <animate begin="-0.5s" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" values="0;0;10;10;10" keyTimes="0;0.25;0.5;0.75;1" calcMode="spline" dur="1s" repeatCount="indefinite" attributeName="r"/>
    <animate begin="-0.5s" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" values="16;16;16;50;84" keyTimes="0;0.25;0.5;0.75;1" calcMode="spline" dur="1s" repeatCount="indefinite" attributeName="cx"/>
  </circle>
  <circle fill="#2b8cbe" r="10" cy="50" cx="16">
    <animate begin="-0.75s" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" values="0;0;10;10;10" keyTimes="0;0.25;0.5;0.75;1" calcMode="spline" dur="1s" repeatCount="indefinite" attributeName="r"/>
    <animate begin="-0.75s" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" values="16;16;16;50;84" keyTimes="0;0.25;0.5;0.75;1" calcMode="spline" dur="1s" repeatCount="indefinite" attributeName="cx"/>
  </circle>
  <g/>
</svg>
);

export {
  SendIcon,
  ExitIcon,
  RemoveIcon,
  CloseCWA,
  LoadingIcon,
  UploadImageIcon,
  ArrowButton,
  ChatIconSideBar,
  QuestionIconSideBar,
  WriteIconSideBar,
  PDFIconSideBar,
  IconEssay,
  IconTwitter,
  IconMessage,
  IconComment,
  IconMarketing,
  IconOutline,
  IconBlog,
  IconIdeas,
  IconBlogFacebook,
  IconEmail,
  IconType,
  IconTone,
  IconLength,
  IconLanguage,
  USFlag,
  VNFlag,
  JPFlag,
  LogoIcon,
  UploadPDFIcon,
  UploadPDFIconInMessage,
  LoadingMessageIcon,
};
