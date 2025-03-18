import React from "react";
import styles from "./RightArrow.module.scss";

const RightArrow = ({ onClick }: { onClick: () => void }) => {
  return (
    <svg
      onClick={onClick}
      className={styles.right_arrow}
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="20" cy="20" r="20" fill="white" />
      <path
        d="M25.9833 20.3201L18.8008 28.9391C18.5014 29.2983 17.9167 29.0866 17.9167 28.619V11.381C17.9167 10.9134 18.5014 10.7017 18.8008 11.0609L25.9833 19.6799C26.1378 19.8653 26.1378 20.1347 25.9833 20.3201Z"
        fill="#989FA3"
      />
    </svg>
  );
};

export default RightArrow;
