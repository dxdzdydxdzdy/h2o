import moment from "moment/min/moment-with-locales";

moment.locale("ru");

type MoneyData = {
  expanses: number;
  income: number;
  revenue: number;
  debt: number;
  total: number;
};

type MoneyByDate = Record<string, MoneyData>;

type ResultData = {
  B2B: MoneyItem[];
  B2C: MoneyItem[];
  Total: MoneyItem[];
};

type MoneyItem = MoneyData & { date: string };

export function generateData(interval: "Месяц" | "Год" | "Неделя"): ResultData {
  const today = moment().subtract(1, "days");
  const count =
    interval === "Месяц" ? today.daysInMonth() : interval === "Год" ? 12 : 7;
  const data: { B2B: MoneyByDate; B2C: MoneyByDate } = { B2B: {}, B2C: {} };

  for (let i = count - 1; i >= 0; i--) {
    const date = today
      .clone()
      .subtract(i, interval === "Год" ? "months" : "days")
      .format(interval === "Год" ? "YYYY-MM" : "YYYY-MM-DD");

    ["B2B", "B2C"].forEach((key) => {
      const type = key as keyof typeof data;
      data[type][date] ??= {
        expanses: 0,
        income: 0,
        revenue: 0,
        debt: 0,
        total: 0,
      };

      (
        ["expanses", "income", "revenue", "debt"] as (keyof MoneyData)[]
      ).forEach((field) => {
        data[type][date][field] += Math.random() * 100000;
      });

      data[type][date].total =
        data[type][date].income +
        data[type][date].revenue -
        data[type][date].expanses;
    });
  }

  return {
    B2B: Object.entries(data.B2B).map(([date, values]) => ({
      date,
      ...values,
    })),
    B2C: Object.entries(data.B2C).map(([date, values]) => ({
      date,
      ...values,
    })),
    Total: Object.keys(data.B2B).map((date) => ({
      date,
      expanses: data.B2B[date].expanses + data.B2C[date].expanses,
      income: data.B2B[date].income + data.B2C[date].income,
      revenue: data.B2B[date].revenue + data.B2C[date].revenue,
      debt: data.B2B[date].debt + data.B2C[date].debt,
      total: data.B2B[date].total + data.B2C[date].total,
    })),
  };
}
