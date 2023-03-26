import React from "react";

const FavoriteIconFilled = (props: { onClick: () => void }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="22"
      viewBox="0 0 25 22"
      fill="none"
      onClick={props.onClick}
    >
      <path
        d="M12.5898 21.9398C3.64984 16.4389 0.589844 11.0407 0.589844 6.98379C0.589844 -1.00133 10.2518 -1.99062 12.5898 3.257C14.9418 -2.01954 24.5898 -0.956457 24.5898 6.98379C24.5898 11.0407 21.5298 16.4389 12.5898 21.9398Z"
        fill="#1C62CD"
      />
    </svg>
  );
};

// onClick={props.onClick}

export default FavoriteIconFilled;
