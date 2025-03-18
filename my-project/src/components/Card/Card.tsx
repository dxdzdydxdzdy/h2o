import { useEffect, useState } from "react";
import styles from "./Card.module.scss";
import { motion } from "framer-motion";

interface CardProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  total: number;
}

const Card: React.FC<CardProps> = ({ label, isActive, onClick, total }) => {
  const formattedNumber = (num: number) => num.toLocaleString("ru-RU");
  const [randomPercent, setRandomPercent] = useState(
    () => Math.floor(Math.random() * 201) - 100
  );

  useEffect(() => {
    setRandomPercent(Math.floor(Math.random() * 201) - 100);
  }, [total]);

  const isPercentPositive = randomPercent > 0;

  // Общие стили
  const bgColor = isActive
    ? isPercentPositive
      ? "rgba(84, 211, 194)"
      : "rgba(252, 92, 101)"
    : "#FFFFFF";
  const textColor = isActive ? "#FFFFFF" : "#323F47";
  const percentBgColor = isActive
    ? "rgba(256, 256, 256, 0.15)"
    : isPercentPositive
    ? "rgba(84, 211, 194, 0.15)"
    : "rgba(252, 92, 101, 0.15)";
  const percentTextColor = isActive
    ? "#FFFFFF"
    : isPercentPositive
    ? "rgba(84, 211, 194)"
    : "rgba(252, 92, 101)";

  return (
    <motion.div
      className={styles.card_item}
      onClick={onClick}
      style={{ backgroundColor: bgColor, color: percentTextColor }}
      initial={{ scale: 0.95, opacity: 0.8 }}
      animate={{
        scale: 1,
        opacity: 1,
        backgroundColor: bgColor,
        color: percentTextColor,
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      whileHover={{ scale: 1.05 }}
    >
      <motion.div
        className={styles.card_percent}
        style={{ backgroundColor: percentBgColor, color: percentTextColor }}
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <i
          className={`fa-solid ${
            isPercentPositive ? "fa-arrow-up" : "fa-arrow-down"
          }`}
        ></i>
        {randomPercent} %
      </motion.div>

      <motion.p
        className={styles.card_summ}
        style={{ color: textColor }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <span>₽</span> {formattedNumber(Math.round(total || 0))}
      </motion.p>

      <motion.p
        className={styles.card_label}
        style={{ color: textColor }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {label}
      </motion.p>
    </motion.div>
  );
};

export default Card;
