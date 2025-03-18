import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./Intervals.module.scss";
import IntervalButton from "../IntervalButton/IntervalButton";

interface IntervalsProps {
  activeInterval: "Неделя" | "Месяц" | "Год";
  setActiveInterval: React.Dispatch<
    React.SetStateAction<"Неделя" | "Месяц" | "Год">
  >;
}

const Intervals: React.FC<IntervalsProps> = ({ setActiveInterval }) => {
  const [active, setActive] = useState("Неделя");
  const [underlineProps, setUnderlineProps] = useState({ width: 0, left: 0 });
  const intervalOptions: ("Неделя" | "Месяц" | "Год")[] = [
    "Неделя",
    "Месяц",
    "Год",
  ];

  const buttonsRef = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  useEffect(() => {
    if (buttonsRef.current[active]) {
      const { offsetWidth, offsetLeft } = buttonsRef.current[active]!;
      setUnderlineProps({ width: offsetWidth, left: offsetLeft });
    }
  }, [active]);

  return (
    <div className={styles.intervals_container}>
      {intervalOptions.map((label) => (
        <IntervalButton
          key={label}
          isActive={active === label}
          onClick={() => {
            setActive(label);
            setActiveInterval(label);
          }}
          ref={(el) => {
            if (el) buttonsRef.current[label] = el;
          }}
        >
          {label}
        </IntervalButton>
      ))}

      <motion.div
        className={styles.underline}
        animate={{ width: underlineProps.width, left: underlineProps.left }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />
    </div>
  );
};

export default Intervals;
