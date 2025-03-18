import { useState } from "react";
import moment from "moment/min/moment-with-locales";
import styles from "./Plot.module.scss";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  TooltipProps,
} from "recharts";

moment.locale("ru");

interface PlotProps {
  chartData: {
    B2B: {
      date: string;
      expanses: number;
      income: number;
      revenue: number;
      debt: number;
      total: number;
    }[];
    B2C: {
      date: string;
      expanses: number;
      income: number;
      revenue: number;
      debt: number;
      total: number;
    }[];
    Total: {
      date: string;
      expanses: number;
      income: number;
      revenue: number;
      debt: number;
      total: number;
    }[];
  };
  activeCardIndex: number | null;
  activeInterval: string;
}

const Plot: React.FC<PlotProps> = ({
  chartData,
  activeCardIndex,
  activeInterval,
}) => {
  const formattedNumber = (num: number) => num.toLocaleString("ru-RU");

  const selectedData =
    activeCardIndex === 1
      ? chartData.B2B
      : activeCardIndex === 2
      ? chartData.B2C
      : chartData.Total;

  const [hoveredLine, setHoveredLine] = useState<string | null>(null);

  const CustomTooltip: React.FC<TooltipProps<number, string>> = ({
    active,
    payload,
  }) => {
    if (active && payload && payload.length && hoveredLine) {
      const activeData = payload.find((entry) => entry.dataKey === hoveredLine);
      if (!activeData) return null;

      return (
        <div
          className={styles.plot_tooltip}
          style={{ borderColor: activeData.color }}
        >
          <p>
            <strong>
              ₽ {formattedNumber(Math.round(activeData.value ?? 0))}
            </strong>
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomDot = ({
    cx,
    cy,
    stroke,
  }: {
    cx?: number;
    cy?: number;
    stroke?: string;
  }) => {
    if (cx === undefined || cy === undefined || !stroke || hoveredLine === null)
      return null;

    return (
      <>
        <circle
          cx={cx}
          cy={cy}
          r={6}
          stroke={stroke}
          strokeWidth={3}
          fill="none"
        />
        <circle cx={cx} cy={cy} r={4.5} fill="#FFFFFF" />
      </>
    );
  };

  const CustomLegend: React.FC = () => {
    const legendItems = [
      { key: "revenue", label: "Выручка", color: "#73CF7A" },
      { key: "expanses", label: "Затраты", color: "#30C7DC" },
      { key: "income", label: "Прибыль", color: "#45AAF2" },
      { key: "debt", label: "Задолженность", color: "#F5E230" },
      { key: "total", label: "Итог", color: "#AC74FC" },
    ];

    const getTotalValue = (
      key: Exclude<keyof (typeof selectedData)[0], "date">
    ) => selectedData.reduce((sum, item) => sum + item[key], 0);

    return (
      <div className={styles.legend_container}>
        {legendItems.map(({ key, label, color }) => (
          <div key={key} className={styles.legend_item}>
            <div className={styles.legend_circle}>
              <span
                className={styles.legend_color}
                style={{ backgroundColor: color }}
              />
            </div>

            <div className={styles.legend_item__info}>
              <p className={styles.legend_text}>{label}</p>
              <p className={styles.legend_value}>
                ₽{" "}
                {Math.round(
                  getTotalValue(
                    key as "revenue" | "expanses" | "income" | "debt" | "total"
                  )
                ).toLocaleString("ru-RU")}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={selectedData}
        margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
        onMouseLeave={() => setHoveredLine(null)}
      >
        <CartesianGrid
          strokeDasharray="4 4"
          strokeWidth={2}
          horizontal={false}
          stroke="#f8f8f8"
        />
        <XAxis
          dataKey="date"
          tickFormatter={(tick) =>
            activeInterval === "Год"
              ? moment(tick).format("MMM")
              : activeInterval === "Месяц"
              ? moment(tick).format("D")
              : moment(tick).format("dddd")
          }
          minTickGap={10}
          axisLine={false}
          tickLine={false}
          tick={{
            fill: "#D2D1D1",
            fontSize: 14,
            fontWeight: 600,
            letterSpacing: "-0.56px",
          }}
        />
        <YAxis hide />
        <Tooltip content={<CustomTooltip />} />
        <Legend content={<CustomLegend />} />
        {["revenue", "expanses", "income", "debt", "total"].map(
          (key, index) => (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              onMouseMove={() => setHoveredLine(key)}
              stroke={
                ["#73CF7A", "#30C7DC", "#45AAF2", "#F5E230", "#AC74FC"][index]
              }
              strokeWidth={3}
              dot={false}
              activeDot={({ cx, cy }) =>
                hoveredLine === key ? (
                  <CustomDot
                    cx={cx}
                    cy={cy}
                    stroke={
                      ["#73CF7A", "#30C7DC", "#45AAF2", "#F5E230", "#AC74FC"][
                        index
                      ]
                    }
                  />
                ) : null
              }
              onMouseEnter={() => setHoveredLine(key)}
              onMouseLeave={() => setHoveredLine(null)}
              name={
                {
                  revenue: "Выручка",
                  expanses: "Затраты",
                  income: "Прибыль",
                  debt: "Задолженность",
                  total: "Итог",
                }[key]
              }
            />
          )
        )}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Plot;
