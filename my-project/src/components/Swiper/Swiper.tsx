import { useState } from "react";
import { motion } from "framer-motion";
import styles from "./Swiper.module.scss";
import LeftArrow from "../../assets/arrows/LeftArrow";
import RightArrow from "../../assets/arrows/RightArrow";

interface Report {
  text: string;
}

const reports: Report[] = [
  { text: "Свод данных по сотрудникам" },
  { text: "Сводный отчёт внутри компании" },
  { text: "Сводный отчёт по сделкам" },
  { text: "Ещё один отчёт" },
  { text: "Дополнительный отчёт" },
  { text: "Аналитика по рынку" },
];

const Swiper = () => {
  const [currentIndex, setCurrentIndex] = useState(1);

  const updateScroll = (index: number) => {
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, reports.length - 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className={styles.navbar_swiper}>
      <div className={styles.navbar_arrows}>
        <LeftArrow onClick={prevSlide} />
        <RightArrow onClick={nextSlide} />
      </div>
      <div className={styles.swiperContainer}>
        <motion.div
          className={styles.swiper}
          animate={{ x: -currentIndex * 160 }}
          transition={{ type: "tween", duration: 0.6, ease: "easeInOut" }}
        >
          {reports.map((report, index) => (
            <div
              key={report.text}
              className={`${styles.report} ${
                index === currentIndex ? styles.active : ""
              }`}
              onClick={() => updateScroll(index)}
            >
              {report.text}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Swiper;
