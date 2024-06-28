import React from "react";

const LoadingIcon = () => (
  <svg className="snurra" width="48" height="48" viewBox="0 0 200 200">
    <defs>
      <linearGradient id="linjärGradient">
        <stop className="stopp1" offset="0" />
        <stop className="stopp2" offset="1" />
      </linearGradient>
      <linearGradient
        y2="160"
        x2="160"
        y1="40"
        x1="40"
        gradientUnits="userSpaceOnUse"
        id="gradient"
        xlinkHref="#linjärGradient"
      />
    </defs>
    <path
      className="halvan"
      d="m 164,100 c 0,-35.346224 -28.65378,-64 -64,-64 -35.346224,0 -64,28.653776 -64,64 0,35.34622 28.653776,64 64,64 35.34622,0 64,-26.21502 64,-64 0,-37.784981 -26.92058,-64 -64,-64 -37.079421,0 -65.267479,26.922736 -64,64 1.267479,37.07726 26.703171,65.05317 64,64 37.29683,-1.05317 64,-64 64,-64"
    />
    <circle className="strecken" cx="100" cy="100" r="64" />
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

const UploadImageIcon = ({ isSelected }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 15 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g
      clipPath="url(#a)"
      stroke="#000001"
      strokeLinecap="round"
      strokeLinejoin="round"
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
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
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
      clipPath="url(#a)"
      stroke="#000001"
      strokeLinecap="round"
      strokeLinejoin="round"
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

const ChatIconSideBar = ({ isSelected }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 15 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g
      clipPath="url(#a)"
      stroke={isSelected ? "#fff" : "#000001"}
      strokeLinecap="round"
      strokeLinejoin="round"
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

const QuestionIconSideBar = ({ isSelected }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g
      clipPath="url(#a)"
      stroke={isSelected ? "#fff" : "#000001"}
      strokeLinecap="round"
      strokeLinejoin="round"
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

const WriteIconSideBar = ({ isSelected }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 15 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g
      clipPath="url(#a)"
      stroke={isSelected ? "#fff" : "#000001"}
      strokeLinecap="round"
      strokeLinejoin="round"
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

const FileIconSideBar = ({ isSelected }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4 4v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8.342a2 2 0 0 0-.602-1.43l-4.44-4.342A2 2 0 0 0 13.56 2H6a2 2 0 0 0-2 2m5 9h6m-6 4h3"
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M14 2v4a2 2 0 0 0 2 2h4" stroke="#000" strokeLinejoin="round" />
  </svg>
);

const UrlIconSideBar = ({ isSelected }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 511 511"
    width="20"
    height="20"
  >
    <path
      fill={isSelected ? "#fff" : "#000001"}
      d="M487.5 16h-464C10.542 16 0 26.542 0 39.5v432C0 484.458 10.542 495 23.5 495h464c12.958 0 23.5-10.542 23.5-23.5v-432c0-12.958-10.542-23.5-23.5-23.5m-464 15h464c4.687 0 8.5 3.813 8.5 8.5V80H15V39.5c0-4.687 3.813-8.5 8.5-8.5m464 449h-464c-4.687 0-8.5-3.813-8.5-8.5V95h481v376.5c0 4.687-3.813 8.5-8.5 8.5"
    />
    <path
      fill={isSelected ? "#fff" : "#000001"}
      d="M39.5 63c1.97 0 3.91-.8 5.3-2.2 1.4-1.39 2.2-3.33 2.2-5.3s-.8-3.91-2.2-5.3a7.5 7.5 0 0 0-5.3-2.2c-1.97 0-3.91.8-5.3 2.2a7.53 7.53 0 0 0-2.2 5.3c0 1.97.8 3.91 2.2 5.3a7.53 7.53 0 0 0 5.3 2.2m24 0c1.97 0 3.91-.8 5.3-2.2 1.4-1.39 2.2-3.33 2.2-5.3s-.8-3.91-2.2-5.3a7.5 7.5 0 0 0-5.3-2.2c-1.97 0-3.91.8-5.3 2.2a7.53 7.53 0 0 0-2.2 5.3c0 1.97.8 3.91 2.2 5.3a7.53 7.53 0 0 0 5.3 2.2m24 0c1.97 0 3.91-.8 5.3-2.2 1.4-1.39 2.2-3.33 2.2-5.3s-.8-3.91-2.2-5.3a7.5 7.5 0 0 0-5.3-2.2c-1.97 0-3.91.8-5.3 2.2a7.53 7.53 0 0 0-2.2 5.3c0 1.97.8 3.91 2.2 5.3a7.53 7.53 0 0 0 5.3 2.2M215 271.5c0-12.958-10.542-23.5-23.5-23.5-10.336 0-19.128 6.71-22.266 16h-43.469a23.5 23.5 0 0 0-5.179-8.609l11.051-16.577c1.064.11 2.135.186 3.218.186H183.5c17.369 0 31.5-14.131 31.5-31.5v-56a7.5 7.5 0 0 0-7.5-7.5H84.023l-3.64-7.148A15.55 15.55 0 0 0 66.381 128H55.5a7.5 7.5 0 0 0 0 15h10.881c.194 0 .373.114.454.29q.061.132.127.261l39.358 77.289c2.438 5.214 6.23 9.539 10.828 12.668l-9.867 14.8A23.6 23.6 0 0 0 103.5 248C90.542 248 80 258.542 80 271.5S90.542 295 103.5 295c10.336 0 19.128-6.71 22.266-16h43.469c3.138 9.29 11.93 16 22.266 16C204.458 295 215 284.458 215 271.5M91.662 159H200v48.5c0 9.098-7.402 16.5-16.5 16.5h-48.644a16.55 16.55 0 0 1-14.981-9.586l-.126-.26zM103.5 280c-4.687 0-8.5-3.813-8.5-8.5s3.813-8.5 8.5-8.5 8.5 3.813 8.5 8.5-3.813 8.5-8.5 8.5m88 0c-4.687 0-8.5-3.813-8.5-8.5s3.813-8.5 8.5-8.5 8.5 3.813 8.5 8.5-3.813 8.5-8.5 8.5m112 40h-96c-8.547 0-15.5 6.953-15.5 15.5v48c0 8.547 6.953 15.5 15.5 15.5h96c8.547 0 15.5-6.953 15.5-15.5v-48c0-8.547-6.953-15.5-15.5-15.5m.5 63.5a.5.5 0 0 1-.5.5h-96a.5.5 0 0 1-.5-.5v-48a.5.5 0 0 1 .5-.5h96a.5.5 0 0 1 .5.5zM159.5 320h-96c-8.547 0-15.5 6.953-15.5 15.5v48c0 8.547 6.953 15.5 15.5 15.5h96c8.547 0 15.5-6.953 15.5-15.5v-48c0-8.547-6.953-15.5-15.5-15.5m.5 63.5a.5.5 0 0 1-.5.5h-96a.5.5 0 0 1-.5-.5v-48a.5.5 0 0 1 .5-.5h96a.5.5 0 0 1 .5.5zM447.5 320h-96c-8.547 0-15.5 6.953-15.5 15.5v48c0 8.547 6.953 15.5 15.5 15.5h96c8.547 0 15.5-6.953 15.5-15.5v-48c0-8.547-6.953-15.5-15.5-15.5m.5 63.5a.5.5 0 0 1-.5.5h-96a.5.5 0 0 1-.5-.5v-48a.5.5 0 0 1 .5-.5h96a.5.5 0 0 1 .5.5zM167.5 416h-112a7.5 7.5 0 0 0 0 15h112a7.5 7.5 0 0 0 0-15m144 0h-112a7.5 7.5 0 0 0 0 15h112a7.5 7.5 0 0 0 0-15m144 0h-112a7.5 7.5 0 0 0 0 15h112a7.5 7.5 0 0 0 0-15m-56 32h-56a7.5 7.5 0 0 0 0 15h56a7.5 7.5 0 0 0 0-15m-144 0h-56a7.5 7.5 0 0 0 0 15h56a7.5 7.5 0 0 0 0-15m-144 0h-56a7.5 7.5 0 0 0 0 15h56a7.5 7.5 0 0 0 0-15m152-305h72a7.5 7.5 0 0 0 0-15h-72a7.5 7.5 0 0 0 0 15m192 17h-192a7.5 7.5 0 0 0 0 15h192a7.5 7.5 0 0 0 0-15m0 48h-152a7.5 7.5 0 0 0 0 15h152a7.5 7.5 0 0 0 0-15m0 32h-152a7.5 7.5 0 0 0 0 15h152a7.5 7.5 0 0 0 0-15m0 32h-152a7.5 7.5 0 0 0 0 15h152a7.5 7.5 0 0 0 0-15m-192-49h8a7.5 7.5 0 0 0 0-15h-8a7.5 7.5 0 0 0 0 15m0 32h8a7.5 7.5 0 0 0 0-15h-8a7.5 7.5 0 0 0 0 15m0 32h8a7.5 7.5 0 0 0 0-15h-8a7.5 7.5 0 0 0 0 15"
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
      strokeLinejoin="round"
    ></path>
    <path
      d="M12.5417 2.04167H9.33333C8.04466 2.04167 7 3.08633 7 4.37501V12.25C7 11.2835 7.7835 10.5 8.75 10.5H12.5417V2.04167Z"
      stroke="currentColor"
      stroke-width="1.2"
      strokeLinejoin="round"
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
    <g clipPath="url(#a)">
      <path d="M0 14h14V0H0z" fill="#fff" fill-opacity=".01" />
      <path
        d="M7 11.375H1.75m10.5-2.625H1.75m10.5-3.208H1.75m10.5-2.917H1.75"
        stroke="currentColor"
        stroke-width="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
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
    <g clipPath="url(#a)">
      <path d="M14 0H0v14h14z" fill="#fff" fill-opacity=".01" />
      <path
        d="M7 2.625h5.25M7 5.542h5.25M1.75 8.458h10.5m-10.5 2.917h10.5M2.042 4.958h2.333m-2.625.584.292-.584zm2.917 0-.292-.584zm-2.625-.584 1.166-2.333 1.167 2.333z"
        stroke="currentColor"
        stroke-width="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
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
    <g clipPath="url(#a)">
      <path d="M14 0H0v14h14z" fill="#fff" fill-opacity=".01" />
      <path
        d="M7.583 7h5.25m-8.75 0H5.25m0 4.083h7.583m-11.083 0h1.167M5.25 2.917h7.583m-11.083 0h1.167"
        stroke="currentColor"
        stroke-width="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
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
      strokeLinecap="round"
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
        strokeLinecap="round"
        strokeLinejoin="round"
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
      fillRule="evenodd"
      clipRule="evenodd"
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
      strokeLinejoin="round"
    />
    <path
      d="M7.583 7h-3.5m5.834-2.625H4.083m5.25 5.25h-5.25"
      stroke="currentColor"
      stroke-width="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
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
    <g clipPath="url(#a)">
      <path d="M14 0H0v14h14z" fill="#fff" fill-opacity=".01" />
      <path
        d="M7 12.833A5.833 5.833 0 1 0 7 1.167a5.833 5.833 0 0 0 0 11.666Z"
        stroke="currentColor"
        stroke-width="1.2"
        strokeLinejoin="round"
      />
      <path
        d="M9.042 5.25v.292M4.958 5.25v.292m2.625 2.625H6.417a1.167 1.167 0 1 0 0 2.333h1.166a1.167 1.167 0 0 0 0-2.333"
        stroke="currentColor"
        stroke-width="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
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
    <g clipPath="url(#a)">
      <path d="M0 14h14V0H0z" fill="#fff" fill-opacity=".01" />
      <path
        d="M9 12H2m10-3H2m7-4H2m10-3H2"
        stroke="currentColor"
        stroke-width="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
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
    <g opacity=".65" clipPath="url(#a)">
      <path d="M14 0H0v14h14z" fill="#fff" fill-opacity=".01" />
      <path
        d="M8.25 10.792h3.333m.667 1.458-.667-1.458zm-4.667 0 .667-1.458zm.667-1.458L9.917 7l1.666 3.792zM4.667 1.75l.291.875m-3.208.583h6.417m-5.25 1.459s.522 1.826 1.826 2.84c1.305 1.015 3.424 1.826 3.424 1.826"
        stroke="currentColor"
        stroke-width="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 3.208s-.522 2.397-1.827 3.729C3.868 8.268 1.75 9.333 1.75 9.333"
        stroke="currentColor"
        stroke-width="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
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
      fillRule="evenodd"
      clipRule="evenodd"
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

const LogoIconForTools = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
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

const UploadFileIcon = () => (
  <svg
    width="80"
    viewBox="0 0 48 48"
    version="1"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path fill="#90CAF9" d="M40 45H8V3h22l10 10z" />
    <path fill="#E1F5FE" d="M38.5 14H29V4.5z" />
  </svg>
);

const UploadImageIconInput = () => (
  <svg
    width="80"
    viewBox="0 0 24 24"
    data-name="Flat Line"
    xmlns="http://www.w3.org/2000/svg"
    className="icon flat-line"
  >
    <path
      d="M21 5v14a1 1 0 0 1-.29.71L14 13l-3 3-2-2-5.71 5.71A1 1 0 0 1 3 19V5a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1"
      style={{ fill: "#2ca9bc", strokeWidth: 2 }}
    />
    <path
      style={{
        fill: "none",
        stroke: "#000",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 2,
      }}
      d="M20.71 19.71 14 13l-3 3-2-2-5.71 5.71"
    />
    <path
      style={{
        fill: "none",
        stroke: "#000",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 2.5,
      }}
      d="M10.95 9h.1"
    />
    <rect
      data-name="primary"
      x="3"
      y="4"
      width="18"
      height="16"
      rx="1"
      style={{
        fill: "none",
        stroke: "#000",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 2,
      }}
    />
  </svg>
);

const UploadFileIconInMessage = () => (
  <svg
    height="35px"
    width="35px"
    viewBox="0 0 24 24"
    data-name="Flat Line"
    xmlns="http://www.w3.org/2000/svg"
    className="icon flat-line"
  >
    <path
      d="M19 8.41V20a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h7.59a1 1 0 0 1 .7.29l4.42 4.42a1 1 0 0 1 .29.7"
      style={{ fill: "#fff", strokeWidth: 1 }}
    />
    <path
      d="M19 8.41V20a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h7.59a1 1 0 0 1 .7.29l4.42 4.42a1 1 0 0 1 .29.7"
      style={{
        fill: "none",
        stroke: "#378ba5",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 1,
      }}
    />
  </svg>
);

const LoadingMessageIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid"
    width="40"
    height="30"
  >
    <circle fill="#f1eef6" r="10" cy="50" cx="84">
      <animate
        begin="0s"
        keySplines="0 0.5 0.5 1"
        values="10;0"
        keyTimes="0;1"
        calcMode="spline"
        dur="0.25s"
        repeatCount="indefinite"
        attributeName="r"
      />
      <animate
        begin="0s"
        values="#f1eef6;#2b8cbe;#74a9cf;#bdc9e1;#f1eef6"
        keyTimes="0;0.25;0.5;0.75;1"
        calcMode="discrete"
        dur="1s"
        repeatCount="indefinite"
        attributeName="fill"
      />
    </circle>
    <circle fill="#f1eef6" r="10" cy="50" cx="16">
      <animate
        begin="0s"
        keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
        values="0;0;10;10;10"
        keyTimes="0;0.25;0.5;0.75;1"
        calcMode="spline"
        dur="1s"
        repeatCount="indefinite"
        attributeName="r"
      />
      <animate
        begin="0s"
        keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
        values="16;16;16;50;84"
        keyTimes="0;0.25;0.5;0.75;1"
        calcMode="spline"
        dur="1s"
        repeatCount="indefinite"
        attributeName="cx"
      />
    </circle>
    <circle fill="#bdc9e1" r="10" cy="50" cx="50">
      <animate
        begin="-0.25s"
        keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
        values="0;0;10;10;10"
        keyTimes="0;0.25;0.5;0.75;1"
        calcMode="spline"
        dur="1s"
        repeatCount="indefinite"
        attributeName="r"
      />
      <animate
        begin="-0.25s"
        keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
        values="16;16;16;50;84"
        keyTimes="0;0.25;0.5;0.75;1"
        calcMode="spline"
        dur="1s"
        repeatCount="indefinite"
        attributeName="cx"
      />
    </circle>
    <circle fill="#74a9cf" r="10" cy="50" cx="84">
      <animate
        begin="-0.5s"
        keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
        values="0;0;10;10;10"
        keyTimes="0;0.25;0.5;0.75;1"
        calcMode="spline"
        dur="1s"
        repeatCount="indefinite"
        attributeName="r"
      />
      <animate
        begin="-0.5s"
        keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
        values="16;16;16;50;84"
        keyTimes="0;0.25;0.5;0.75;1"
        calcMode="spline"
        dur="1s"
        repeatCount="indefinite"
        attributeName="cx"
      />
    </circle>
    <circle fill="#2b8cbe" r="10" cy="50" cx="16">
      <animate
        begin="-0.75s"
        keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
        values="0;0;10;10;10"
        keyTimes="0;0.25;0.5;0.75;1"
        calcMode="spline"
        dur="1s"
        repeatCount="indefinite"
        attributeName="r"
      />
      <animate
        begin="-0.75s"
        keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
        values="16;16;16;50;84"
        keyTimes="0;0.25;0.5;0.75;1"
        calcMode="spline"
        dur="1s"
        repeatCount="indefinite"
        attributeName="cx"
      />
    </circle>
    <g />
  </svg>
);

const CopyIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9 3.25A5.75 5.75 0 0 0 3.25 9v7.107a.75.75 0 0 0 1.5 0V9A4.25 4.25 0 0 1 9 4.75h7.013a.75.75 0 0 0 0-1.5z"
      fill="#6c757d"
    />
    <path
      d="M18.403 6.793a44.4 44.4 0 0 0-9.806 0 2.01 2.01 0 0 0-1.774 1.76 42.6 42.6 0 0 0 0 9.894 2.01 2.01 0 0 0 1.774 1.76c3.241.362 6.565.362 9.806 0a2.01 2.01 0 0 0 1.774-1.76 42.6 42.6 0 0 0 0-9.894 2.01 2.01 0 0 0-1.774-1.76M8.764 8.284c3.13-.35 6.342-.35 9.472 0a.51.51 0 0 1 .45.444 41 41 0 0 1 0 9.544.51.51 0 0 1-.45.444c-3.13.35-6.342.35-9.472 0a.51.51 0 0 1-.45-.444 41 41 0 0 1 0-9.544.51.51 0 0 1 .45-.444"
      fill="#6c757d"
    />
  </svg>
);

const AddNewChatIcon = ({ isSelected }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    data-name="Flat Line"
    xmlns="http://www.w3.org/2000/svg"
    className="icon flat-line"
  >
    <path
      d="M5 12h14m-7-7v14"
      style={{
        fill: "none",
        stroke: "#000",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 2,
      }}
    />
  </svg>
);

const OpenListConversationsIcon = ({ isSelected }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.507 12.324a7 7 0 0 0 .065-8.56A7 7 0 0 0 2 4.393V2H1v3.5l.5.5H5V5H2.811a6.008 6.008 0 1 1-.135 5.77l-.887.462a7 7 0 0 0 11.718 1.092m-3.361-.97.708-.707L8 7.792V4H7v4l.146.354z"
    />
  </svg>
);

const HideListConversationsIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="-77 0 512 512"
    xmlns="http://www.w3.org/2000/svg"
    fill="#fff"
  >
    <path d="m98 460-34-34 163-164L64 98l34-34 196 198z" />
  </svg>
);

const PageSummaryIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
  >
    {" "}
    <g filter="url(#filter0_ii_1429_4304)">
      {" "}
      <rect
        x="4"
        y="2"
        width="16"
        height="20"
        rx="2"
        fill="url(#paint0_linear_1429_4304)"
      ></rect>{" "}
    </g>{" "}
    <g filter="url(#filter1_d_1429_4304)">
      {" "}
      <rect
        x="10.5"
        y="6.5"
        width="6.5"
        height="1.5"
        rx="0.75"
        fill="white"
      ></rect>{" "}
    </g>{" "}
    <g filter="url(#filter2_d_1429_4304)">
      {" "}
      <rect
        x="10.5"
        y="11.25"
        width="6.5"
        height="1.5"
        rx="0.75"
        fill="white"
      ></rect>{" "}
    </g>{" "}
    <g filter="url(#filter3_d_1429_4304)">
      {" "}
      <rect
        x="10.5"
        y="16"
        width="6.5"
        height="1.5"
        rx="0.75"
        fill="white"
      ></rect>{" "}
    </g>{" "}
    <g filter="url(#filter4_d_1429_4304)">
      {" "}
      <circle cx="8" cy="7.25" r="1" fill="white"></circle>{" "}
    </g>{" "}
    <g filter="url(#filter5_d_1429_4304)">
      {" "}
      <circle cx="8" cy="12" r="1" fill="white"></circle>{" "}
    </g>{" "}
    <g filter="url(#filter6_d_1429_4304)">
      {" "}
      <circle cx="8" cy="16.75" r="1" fill="white"></circle>{" "}
    </g>{" "}
    <defs>
      {" "}
      <filter
        id="filter0_ii_1429_4304"
        x="3"
        y="1"
        width="18"
        height="22"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        {" "}
        <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>{" "}
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        ></feBlend>{" "}
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        ></feColorMatrix>{" "}
        <feOffset dx="1" dy="1"></feOffset>{" "}
        <feGaussianBlur stdDeviation="1"></feGaussianBlur>{" "}
        <feComposite
          in2="hardAlpha"
          operator="arithmetic"
          k2="-1"
          k3="1"
        ></feComposite>{" "}
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.2 0"
        ></feColorMatrix>{" "}
        <feBlend
          mode="normal"
          in2="shape"
          result="effect1_innerShadow_1429_4304"
        ></feBlend>{" "}
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        ></feColorMatrix>{" "}
        <feOffset dx="-1" dy="-1"></feOffset>{" "}
        <feGaussianBlur stdDeviation="1"></feGaussianBlur>{" "}
        <feComposite
          in2="hardAlpha"
          operator="arithmetic"
          k2="-1"
          k3="1"
        ></feComposite>{" "}
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
        ></feColorMatrix>{" "}
        <feBlend
          mode="normal"
          in2="effect1_innerShadow_1429_4304"
          result="effect2_innerShadow_1429_4304"
        ></feBlend>{" "}
      </filter>{" "}
      <filter
        id="filter1_d_1429_4304"
        x="9.3"
        y="6"
        width="8.9"
        height="3.9"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        {" "}
        <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>{" "}
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        ></feColorMatrix>{" "}
        <feOffset dy="0.7"></feOffset>{" "}
        <feGaussianBlur stdDeviation="0.6"></feGaussianBlur>{" "}
        <feComposite in2="hardAlpha" operator="out"></feComposite>{" "}
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"
        ></feColorMatrix>{" "}
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_1429_4304"
        ></feBlend>{" "}
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_1429_4304"
          result="shape"
        ></feBlend>{" "}
      </filter>{" "}
      <filter
        id="filter2_d_1429_4304"
        x="9.3"
        y="10.75"
        width="8.9"
        height="3.9"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        {" "}
        <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>{" "}
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        ></feColorMatrix>{" "}
        <feOffset dy="0.7"></feOffset>{" "}
        <feGaussianBlur stdDeviation="0.6"></feGaussianBlur>{" "}
        <feComposite in2="hardAlpha" operator="out"></feComposite>{" "}
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"
        ></feColorMatrix>{" "}
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_1429_4304"
        ></feBlend>{" "}
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_1429_4304"
          result="shape"
        ></feBlend>{" "}
      </filter>{" "}
      <filter
        id="filter3_d_1429_4304"
        x="9.3"
        y="15.5"
        width="8.9"
        height="3.9"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        {" "}
        <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>{" "}
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        ></feColorMatrix>{" "}
        <feOffset dy="0.7"></feOffset>{" "}
        <feGaussianBlur stdDeviation="0.6"></feGaussianBlur>{" "}
        <feComposite in2="hardAlpha" operator="out"></feComposite>{" "}
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"
        ></feColorMatrix>{" "}
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_1429_4304"
        ></feBlend>{" "}
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_1429_4304"
          result="shape"
        ></feBlend>{" "}
      </filter>{" "}
      <filter
        id="filter4_d_1429_4304"
        x="5.8"
        y="5.75"
        width="4.4"
        height="4.4"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        {" "}
        <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>{" "}
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        ></feColorMatrix>{" "}
        <feOffset dy="0.7"></feOffset>{" "}
        <feGaussianBlur stdDeviation="0.6"></feGaussianBlur>{" "}
        <feComposite in2="hardAlpha" operator="out"></feComposite>{" "}
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"
        ></feColorMatrix>{" "}
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_1429_4304"
        ></feBlend>{" "}
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_1429_4304"
          result="shape"
        ></feBlend>{" "}
      </filter>{" "}
      <filter
        id="filter5_d_1429_4304"
        x="5.8"
        y="10.5"
        width="4.4"
        height="4.4"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        {" "}
        <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>{" "}
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        ></feColorMatrix>{" "}
        <feOffset dy="0.7"></feOffset>{" "}
        <feGaussianBlur stdDeviation="0.6"></feGaussianBlur>{" "}
        <feComposite in2="hardAlpha" operator="out"></feComposite>{" "}
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"
        ></feColorMatrix>{" "}
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_1429_4304"
        ></feBlend>{" "}
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_1429_4304"
          result="shape"
        ></feBlend>{" "}
      </filter>{" "}
      <filter
        id="filter6_d_1429_4304"
        x="5.8"
        y="15.25"
        width="4.4"
        height="4.4"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        {" "}
        <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>{" "}
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        ></feColorMatrix>{" "}
        <feOffset dy="0.7"></feOffset>{" "}
        <feGaussianBlur stdDeviation="0.6"></feGaussianBlur>{" "}
        <feComposite in2="hardAlpha" operator="out"></feComposite>{" "}
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"
        ></feColorMatrix>{" "}
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_1429_4304"
        ></feBlend>{" "}
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_1429_4304"
          result="shape"
        ></feBlend>{" "}
      </filter>{" "}
      <linearGradient
        id="paint0_linear_1429_4304"
        x1="11.8785"
        y1="23.1396"
        x2="6.08902"
        y2="-1.45662"
        gradientUnits="userSpaceOnUse"
      >
        {" "}
        <stop stop-color="#3733FF"></stop>{" "}
        <stop offset="1" stop-color="#AD73FF"></stop>{" "}
      </linearGradient>{" "}
    </defs>{" "}
  </svg>
);

const SuggestionIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
  >
    {" "}
    <g filter="url(#filter0_ii_1429_4315)">
      {" "}
      <path
        d="M2 4C2 3.44772 2.44772 3 3 3H5C5.55228 3 6 3.44772 6 4V20C6 20.5523 5.55228 21 5 21H3C2.44772 21 2 20.5523 2 20V4Z"
        fill="url(#paint0_linear_1429_4315)"
      ></path>{" "}
      <path
        d="M8 4C8 3.44772 8.44772 3 9 3H11C11.5523 3 12 3.44772 12 4V20C12 20.5523 11.5523 21 11 21H9C8.44772 21 8 20.5523 8 20V4Z"
        fill="url(#paint1_linear_1429_4315)"
      ></path>{" "}
      <path
        d="M14.6042 6.8969C14.465 6.36245 14.7854 5.81634 15.3198 5.67714L17.2553 5.17306C17.7897 5.03386 18.3358 5.35428 18.475 5.88873L21.8776 18.9529C22.0168 19.4874 21.6964 20.0335 21.1619 20.1727L19.2265 20.6767C18.692 20.8159 18.1459 20.4955 18.0067 19.9611L14.6042 6.8969Z"
        fill="url(#paint2_linear_1429_4315)"
      ></path>{" "}
    </g>{" "}
    <defs>
      {" "}
      <filter
        id="filter0_ii_1429_4315"
        x="1"
        y="2"
        width="21.9102"
        height="20"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        {" "}
        <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>{" "}
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        ></feBlend>{" "}
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        ></feColorMatrix>{" "}
        <feOffset dx="-1" dy="-1"></feOffset>{" "}
        <feGaussianBlur stdDeviation="0.5"></feGaussianBlur>{" "}
        <feComposite
          in2="hardAlpha"
          operator="arithmetic"
          k2="-1"
          k3="1"
        ></feComposite>{" "}
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.109804 0 0 0 0 0.101961 0 0 0 0 0.698039 0 0 0 0.35 0"
        ></feColorMatrix>{" "}
        <feBlend
          mode="normal"
          in2="shape"
          result="effect1_innerShadow_1429_4315"
        ></feBlend>{" "}
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        ></feColorMatrix>{" "}
        <feOffset dx="1" dy="1"></feOffset>{" "}
        <feGaussianBlur stdDeviation="0.5"></feGaussianBlur>{" "}
        <feComposite
          in2="hardAlpha"
          operator="arithmetic"
          k2="-1"
          k3="1"
        ></feComposite>{" "}
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.588235 0 0 0 0 0.776471 0 0 0 0 1 0 0 0 0.35 0"
        ></feColorMatrix>{" "}
        <feBlend
          mode="normal"
          in2="effect1_innerShadow_1429_4315"
          result="effect2_innerShadow_1429_4315"
        ></feBlend>{" "}
      </filter>{" "}
      <linearGradient
        id="paint0_linear_1429_4315"
        x1="14.9628"
        y1="22.0237"
        x2="5.39879"
        y2="5.27108"
        gradientUnits="userSpaceOnUse"
      >
        {" "}
        <stop offset="0.0446053" stop-color="#3733FF"></stop>{" "}
        <stop offset="0.929005" stop-color="#73B3FF"></stop>{" "}
      </linearGradient>{" "}
      <linearGradient
        id="paint1_linear_1429_4315"
        x1="14.9628"
        y1="22.0237"
        x2="5.39879"
        y2="5.27108"
        gradientUnits="userSpaceOnUse"
      >
        {" "}
        <stop offset="0.0446053" stop-color="#3733FF"></stop>{" "}
        <stop offset="0.929005" stop-color="#73B3FF"></stop>{" "}
      </linearGradient>{" "}
      <linearGradient
        id="paint2_linear_1429_4315"
        x1="14.9628"
        y1="22.0237"
        x2="5.39879"
        y2="5.27108"
        gradientUnits="userSpaceOnUse"
      >
        {" "}
        <stop offset="0.0446053" stop-color="#3733FF"></stop>{" "}
        <stop offset="0.929005" stop-color="#73B3FF"></stop>{" "}
      </linearGradient>{" "}
    </defs>{" "}
  </svg>
);

const HighlightIcon = () => (
  <svg
    className="icon-PIRQLq"
    width="18"
    height="18"
    fill="none"
    viewBox="0 0 16 16"
    style={{ minWidth: "18px", minHeight: "18px", width: 18, height: 18 }}
  >
    <g>
      <g fill="currentColor" data-follow-fill="#545C66">
        <path d="M11.684 4.584A.625.625 0 1 0 10.8 3.7L7.955 6.544a.625.625 0 0 0 .884.884l2.845-2.844Z"></path>
        <path
          d="M12.242 1.043a1.558 1.558 0 0 0-2.13-.069L4.013 6.336a1.559 1.559 0 0 0-.362 1.874l-.766.767c-.392.392-.487.969-.285 1.45l-1.1 1.1a.574.574 0 0 0 0 .813c.442.441 1.066.649 1.684.56l1.59-.227c.506.288 1.16.216 1.592-.215l.767-.767a1.559 1.559 0 0 0 1.879-.37L14.34 5.19a1.558 1.558 0 0 0-.074-2.123l-2.024-2.023ZM2.577 11.865l.661-.661.595.594-.79.113a.984.984 0 0 1-.466-.046Zm3.617-1.003L4.481 9.148l-.712.713a.075.075 0 0 0 0 .105l1.607 1.608c.03.03.077.03.106 0l.712-.712Zm1.424-.344a.308.308 0 0 0 .45-.016l5.329-6.133a.308.308 0 0 0-.015-.42l-2.024-2.023a.308.308 0 0 0-.42-.013l-6.1 5.362a.308.308 0 0 0-.014.449l2.794 2.794Z"
          clip-rule="evenodd"
          fill-rule="evenodd"
        ></path>
      </g>
    </g>
  </svg>
);

const SummarizeIcon = () => (
  <svg
    width="18"
    height="18"
    fill="none"
    viewBox="0 0 256 256"
    style={{ minWidth: "18px", minHeight: "18px" }}
  >
    <path
      fill="currentColor"
      d="M128.745 22h-1.49c-21.995 0-39.519 0-53.256 1.846-14.18 1.907-25.814 5.945-35.011 15.142s-13.235 20.83-15.142 35.01C22 87.737 22 105.26 22 127.256v1.49c0 21.995 0 39.519 1.846 53.257 1.907 14.179 5.945 25.813 15.142 35.01s20.83 13.235 35.01 15.141C87.737 234 105.26 234 127.256 234h1.49c21.995 0 39.519 0 53.257-1.847 14.179-1.906 25.813-5.944 35.01-15.141s13.235-20.831 15.141-35.01C234 168.264 234 150.74 234 128.745v-1.49c0-21.995 0-39.52-1.847-53.256-1.906-14.18-5.944-25.814-15.141-35.011s-20.831-13.235-35.01-15.142C168.264 22 150.74 22 128.745 22M70 44.823c-7.946 1.745-12.995 4.432-16.87 8.307-4.862 4.862-7.854 11.571-9.462 23.533C42.021 88.913 42 105.09 42 128s.021 39.087 1.668 51.337c1.608 11.962 4.6 18.671 9.462 23.533 3.875 3.875 8.924 6.562 16.87 8.307zM90 213.48c10.182.51 22.562.52 38 .52 22.91 0 39.087-.021 51.337-1.668 11.962-1.608 18.671-4.6 23.533-9.462s7.854-11.571 9.462-23.533C213.979 167.087 214 150.91 214 128s-.021-39.087-1.668-51.337c-1.608-11.962-4.6-18.671-9.462-23.533s-11.571-7.854-23.533-9.462C167.087 42.021 150.91 42 128 42c-15.438 0-27.818.01-38 .52zM112 82c-5.523 0-10 4.477-10 10s4.477 10 10 10h80c5.523 0 10-4.477 10-10s-4.477-10-10-10zm0 72c-5.523 0-10 4.477-10 10s4.477 10 10 10h80c5.523 0 10-4.477 10-10s-4.477-10-10-10z"
      clip-rule="evenodd"
      fill-rule="evenodd"
      data-follow-fill="#000"
    />
  </svg>
);

const TranslateIcon = () => (
  <svg
    width="18"
    height="18"
    fill="none"
    viewBox="0 0 256 256"
    style={{ minWidth: "18px", minHeight: "18px" }}
  >
    <path
      fill="currentColor"
      d="M158 32c0-5.523 4.477-10 10-10h16c27.614 0 50 22.386 50 50v16c0 5.523-4.477 10-10 10s-10-4.477-10-10V72c0-16.569-13.431-30-30-30h-16c-5.523 0-10-4.477-10-10m35.861 96.595c-4.855-11.293-20.866-11.293-25.722 0l-39.326 91.454c-2.181 5.074.163 10.955 5.237 13.137 5.074 2.181 10.955-.163 13.137-5.237l7.742-18.006q.528.057 1.071.057h51.095l7.718 17.949c2.182 5.074 8.064 7.418 13.137 5.237s7.418-8.063 5.237-13.137zM198.495 190 181 149.314 163.505 190zM88 234c5.523 0 10-4.477 10-10s-4.477-10-10-10H72c-16.569 0-30-13.431-30-30v-16c0-5.523-4.477-10-10-10s-10 4.477-10 10v16c0 27.614 22.386 50 50 50zM79.479 22c5.523 0 10 4.477 10 10v4.816h36.615c5.523 0 10 4.478 10 10s-4.477 10-10 10h-13.012c-2.009 17.644-9.301 34.296-20.983 47.511l.063.044c11.92 8.206 26.187 12.63 40.838 12.63 5.523 0 10 4.477 10 10s-4.477 10-10 10c-18.663 0-36.892-5.633-52.179-16.156a91 91 0 0 1-4.068-2.97C63.585 126.852 48.061 131.771 32 131.771c-5.523 0-10-4.478-10-10s4.477-10 10-10c10.581 0 20.92-2.871 30.052-8.242a88 88 0 0 1-14.416-25.404c-1.887-5.19.79-10.928 5.98-12.816s10.928.79 12.816 5.98a68 68 0 0 0 10.99 19.44c8.238-9.457 13.623-21.266 15.493-33.913H32c-5.523 0-10-4.477-10-10s4.477-10 10-10h37.479V32c0-5.523 4.477-10 10-10"
      clip-rule="evenodd"
      fill-rule="evenodd"
      data-follow-fill="#000"
    />
  </svg>
);

const MoreToolsIcon = () => (
  <svg
    width="18"
    height="18"
    fill="none"
    viewBox="0 0 16 16"
    style={{ minWidth: "18px", minHeight: "18px" }}
  >
    <g clip-path="url(#a)">
      <path
        data-follow-fill="currentColor"
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M6.667 12.667a1.333 1.333 0 1 0 2.666 0 1.333 1.333 0 0 0-2.666 0m.39-8.39A1.333 1.333 0 1 1 8.943 2.39a1.333 1.333 0 0 1-1.886 1.885Zm0 4.666a1.333 1.333 0 1 1 1.886-1.886 1.333 1.333 0 0 1-1.886 1.886"
        fill="currentColor"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path d="M0 0h16v16H0z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);

const ClosesIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 32 32"
    xmlSpace="preserve"
  >
    <circle cx="16" cy="16" r="13" style={{ fill: "#e54d2e" }} />
    <path
      d="M16 3v26c7.18 0 13-5.82 13-13S23.18 3 16 3"
      style={{ fill: "#f27261" }}
    />
    <path
      d="M16 3c7.168 0 13 5.832 13 13s-5.832 13-13 13S3 23.168 3 16 8.832 3 16 3m0-3C7.163 0 0 7.163 0 16s7.163 16 16 16 16-7.163 16-16S24.837 0 16 0m2.121 16 2.475-2.475a1.5 1.5 0 1 0-2.121-2.121L16 13.879l-2.475-2.475a1.5 1.5 0 1 0-2.121 2.121L13.879 16l-2.475 2.475a1.5 1.5 0 1 0 2.122 2.121L16 18.121l2.475 2.475c.293.293.677.439 1.061.439s.768-.146 1.061-.439a1.5 1.5 0 0 0 0-2.121z"
      style={{ fill: "#f4d6b0" }}
    />
  </svg>
);

const RewriteIcon = () => (
  <svg
    width="18"
    height="18"
    fill="none"
    viewBox="0 0 256 256"
    style={{ minWidth: "18px", minHeight: "18px" }}
  >
    <path
      fill="currentColor"
      d="M170.396 32.995a30 30 0 0 1 24.922 0c2.914 1.33 5.33 3.168 7.583 5.157 2.142 1.892 4.574 4.324 7.393 7.142l.001.001.41.41c2.818 2.819 5.251 5.251 7.142 7.393 1.99 2.253 3.828 4.67 5.158 7.584a30 30 0 0 1 0 24.921c-1.33 2.915-3.168 5.33-5.158 7.584-1.891 2.142-4.323 4.574-7.142 7.392v.001l-20.456 20.456a9 9 0 0 1-.666.665L97.285 214H224c5.523 0 10 4.477 10 10s-4.477 10-10 10H60.516q-1.259.004-2.552.001h-.002l-.524-.001H49l-.12-.001c-3.584 0-7.124-.02-10.087-.419-3.56-.478-7.741-1.66-11.227-5.146s-4.668-7.667-5.146-11.227c-.421-3.127-.42-6.898-.42-10.684v-8.484c-.01-6.789-.02-12.814 2.285-18.378 2.304-5.564 6.57-9.818 11.378-14.61l.983-.981L155.42 45.295c2.818-2.819 5.251-5.251 7.393-7.143 2.253-1.99 4.669-3.827 7.583-5.157m12.449 67.16 13.512-13.512c3.082-3.082 5.068-5.074 6.499-6.695 1.379-1.56 1.788-2.283 1.956-2.652a10 10 0 0 0 0-8.307c-.168-.369-.577-1.091-1.956-2.652-1.431-1.62-3.417-3.613-6.499-6.695-3.081-3.081-5.074-5.067-6.694-6.498-1.561-1.379-2.284-1.788-2.652-1.956a10 10 0 0 0-8.308 0c-.368.168-1.091.577-2.652 1.956-1.62 1.43-3.613 3.417-6.694 6.498l-13.512 13.513zm-41.143-12.858 27.001 27-90.915 90.916c-6.358 6.357-7.692 7.441-9.102 8.025s-3.12.762-12.112.761h-6.573c-3.915 0-6.23-.016-7.838-.162-.146-1.608-.162-3.923-.162-7.838v-6.573c0-8.991.176-10.701.76-12.111s1.668-2.745 8.026-9.103z"
      clip-rule="evenodd"
      fill-rule="evenodd"
      data-follow-fill="#000"
    />
  </svg>
);

const ExpandIcon = () => (
  <svg
    width="18"
    height="18"
    fill="none"
    viewBox="0 0 256 256"
    style={{ minWidth: "18px", minHeight: "18px" }}
  >
    <g>
      <path
        fill="currentColor"
        d="M200.858 41H161c-5.523 0-10-4.477-10-10s4.477-10 10-10h48.319c2.524 0 4.982 0 7.063.17 2.286.186 4.984.627 7.698 2.01a19.998 19.998 0 0 1 8.74 8.74c1.383 2.715 1.824 5.412 2.011 7.698.17 2.081.169 4.54.169 7.063V95c0 5.523-4.477 10-10 10s-10-4.477-10-10V55.142l-57.596 57.596c-3.905 3.905-10.237 3.905-14.142 0-3.905-3.905-3.905-10.237 0-14.142L200.858 41ZM55.475 214.667l57.596-57.596c3.905-3.905 3.905-10.237 0-14.142-3.905-3.905-10.237-3.905-14.142 0l-57.596 57.596v-39.858c0-5.523-4.477-10-10-10s-10 4.477-10 10v48.319c0 2.524 0 4.982.17 7.063.186 2.286.627 4.984 2.01 7.698a19.998 19.998 0 0 0 8.74 8.74c2.715 1.383 5.412 1.824 7.698 2.011 2.081.17 4.538.169 7.062.169h48.321c5.522 0 9.999-4.477 9.999-10s-4.477-10-10-10H55.475Z"
        clip-rule="evenodd"
        fill-rule="evenodd"
        data-follow-fill="#000"
      ></path>
    </g>
  </svg>
);

const ExplainIcon = () => (
  <svg
    width="18"
    height="18"
    fill="none"
    viewBox="0 0 256 256"
    style={{ minWidth: "18px", minHeight: "18px" }}
  >
    <g>
      <path
        fill="currentColor"
        d="M110.8 15c5.523 0 10 4.477 10 10v83.021l18.399-13.776a10 10 0 0 1 11.985-.001l18.416 13.782V25c0-5.523 4.477-10 10-10s10 4.477 10 10v103a10 10 0 0 1-15.992 8.006l-28.414-21.265-28.401 21.264A10 10 0 0 1 100.8 128V25c0-5.523 4.477-10 10-10ZM51.9 221c-.688-4.852-4.858-8.584-9.9-8.584-5.523 0-10 4.478-10 10C32 232.68 40.32 241 50.583 241H196.8c5.523 0 10-4.477 10-10s-4.477-10-10-10H51.9Z"
        clip-rule="evenodd"
        fill-rule="evenodd"
        data-follow-fill="#000"
      ></path>
      <path
        fill="currentColor"
        d="M66 35c-7.732 0-14 6.268-14 14v141.337a35.831 35.831 0 0 1 15.8-3.67H190c7.732 0 14-6.268 14-14V49c0-7.732-6.268-14-14-14H66ZM32 222.416V49c0-18.778 15.222-34 34-34h124c18.778 0 34 15.222 34 34v123.667c0 18.777-15.222 34-34 34H67.8a15.825 15.825 0 0 0-11.18 4.62 15.724 15.724 0 0 0-4.62 11.13c0 5.522-4.477 10-10 10s-10-4.478-10-10.001Z"
        clip-rule="evenodd"
        fill-rule="evenodd"
        data-follow-fill="#000"
      ></path>
    </g>
  </svg>
);

const GrammarIcon = () => (
  <svg
    width="18"
    height="18"
    fill="none"
    viewBox="0 0 256 256"
    style={{ minWidth: "18px", minHeight: "18px" }}
  >
    <g>
      <path
        fill="currentColor"
        d="M32.1 43C26.522 43 22 47.477 22 53s4.522 10 10.1 10h181.8c5.578 0 10.1-4.477 10.1-10s-4.522-10-10.1-10H32.1Zm-.1 61c-5.523 0-10 4.477-10 10s4.477 10 10 10h80c5.523 0 10-4.477 10-10s-4.477-10-10-10H32Zm125.666 23.48c6.443-13.917 26.225-13.917 32.668 0l42.741 92.319c2.32 5.012.138 10.955-4.874 13.276-5.012 2.32-10.955.138-13.276-4.874L206.962 211h-65.924l-7.963 17.201c-2.321 5.012-8.264 7.194-13.276 4.874-5.012-2.321-7.194-8.264-4.874-13.276l42.741-92.319ZM174 139.803 197.702 191h-47.405L174 139.803ZM22 175c0-5.523 4.477-10 10-10h80c5.523 0 10 4.477 10 10s-4.477 10-10 10H32c-5.523 0-10-4.477-10-10Z"
        clip-rule="evenodd"
        fill-rule="evenodd"
        data-follow-fill="#000"
      ></path>
    </g>
  </svg>
);

const SearchIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="m21 21-6-6"
      style={{
        fill: "none",
        stroke: "#2ca9bc",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 2,
      }}
    />
    <circle
      cx="10"
      cy="10"
      r="7"
      style={{
        fill: "none",
        stroke: "#000",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 2,
      }}
    />
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
  FileIconSideBar,
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
  UploadFileIcon,
  UploadFileIconInMessage,
  LoadingMessageIcon,
  UrlIconSideBar,
  AddNewChatIcon,
  OpenListConversationsIcon,
  HideListConversationsIcon,
  CopyIcon,
  UploadImageIconInput,
  SuggestionIcon,
  PageSummaryIcon,
  HighlightIcon,
  SummarizeIcon,
  TranslateIcon,
  MoreToolsIcon,
  LogoIcon,
  LogoIconForTools,
  ClosesIcon,
  RewriteIcon,
  ExpandIcon,
  ExplainIcon,
  GrammarIcon,
  SearchIcon
};
