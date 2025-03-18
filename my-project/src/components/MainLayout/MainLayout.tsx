import { useState, useEffect } from "react";
import styles from "./MainLayout.module.scss";
import ProblemZones from "../ProblemZones/ProblemZones";
import Plot from "../Plot/Plot";
import Intervals from "../Intervals/Intervals";
import Card from "../Card/Card";
import { generateData } from "../../utils/dataGenerator";

const MainLayout = () => {
  const [activeInterval, setActiveInterval] = useState<
    "Неделя" | "Месяц" | "Год"
  >("Неделя");
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(0);

  const [initialData] = useState(() => generateData(activeInterval));
  const [chartData, setChartData] = useState(initialData);

  useEffect(() => {
    setChartData(generateData(activeInterval));
  }, [activeInterval]);

  const lastTotal =
    initialData.Total.length > 0
      ? initialData.Total[initialData.Total.length - 1].total
      : 0;
  const lastB2B =
    initialData.B2B.length > 0
      ? initialData.B2B[initialData.B2B.length - 1].total
      : 0;
  const lastB2C =
    initialData.B2C.length > 0
      ? initialData.B2C[initialData.B2C.length - 1].total
      : 0;

  return (
    <main className={styles.main}>
      <h2 className={styles.main_text}>Сводный отчёт</h2>
      <section className={styles.chart_section}>
        <div className={styles.chart_data}>
          <div className={styles.chart_cards}>
            {[
              { label: "Итоги", total: lastTotal },
              { label: "B2B", total: lastB2B },
              { label: "B2C", total: lastB2C },
            ].map((item, index) => (
              <Card
                key={index}
                label={item.label}
                isActive={activeCardIndex === index}
                onClick={() => setActiveCardIndex(index)}
                total={item.total}
              />
            ))}
          </div>
          <div className={styles.chart_plot}>
            <div className={styles.chart_plot__header}>
              <h3 className={styles.chart_plot__sign}>Общая статистика</h3>
              <div className={styles.chart_plot__intervals}>
                <Intervals
                  activeInterval={activeInterval}
                  setActiveInterval={setActiveInterval}
                />
              </div>
            </div>
            <Plot
              chartData={chartData}
              activeCardIndex={activeCardIndex}
              activeInterval={activeInterval}
            />
          </div>
        </div>
        <div className={styles.chart_zones}>
          <ProblemZones />
        </div>
      </section>
    </main>
  );
};

export default MainLayout;
