import React from "react";

const FavoriteIcon = (props: { onClick: () => void }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="23"
      viewBox="0 0 24 23"
      fill="none"
      onClick={props.onClick}
    >
      <path
        d="M12 9.02016C12.234 7.90322 13.547 2.80818 17.382 2.80818C19.602 2.80818 22 4.35494 22 7.79751C22 11.6938 18.373 16.2444 12 20.392C5.627 16.2444 2 11.6938 2 7.79751C2 4.32303 4.369 2.80619 6.577 2.80619C10.5 2.80619 11.722 7.91818 12 9.02016ZM0 7.79751C0 11.8544 3.06 17.2526 12 22.7535C20.94 17.2526 24 11.8544 24 7.79751C24 -0.142736 14.352 -1.20582 12 4.07072C9.662 -1.1769 0 -0.187613 0 7.79751Z"
        fill="black"
      />
    </svg>
  );
};

export default FavoriteIcon;
