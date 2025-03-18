import React, { forwardRef } from "react";
import styles from "./IntervalButton.module.scss";

interface IntervalButtonProps {
  children: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}

const IntervalButton = forwardRef<HTMLButtonElement, IntervalButtonProps>(
  ({ children, isActive, onClick }, ref) => {
    return (
      <button
        ref={ref}
        className={`${styles.intervals_btn} ${isActive ? styles.active : ""}`}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }
);

export default IntervalButton;
