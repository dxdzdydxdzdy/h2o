import styles from "./ProblemZones.module.scss";

const ProblemZones = () => {
  interface Zones {
    name: string;
    value: number;
  }

  const zonesList: Zones[] = [
    {
      name: "Линейный персонал",
      value: 3003670,
    },

    {
      name: "Подразделение разовых работ ФОТ",
      value: 901470,
    },
    {
      name: "Бензин (наличные)",
      value: 278325,
    },
    {
      name: "Закупка инвентаря",
      value: 44742,
    },
    {
      name: "Закупка спецодежды/СИЗ",
      value: 16810,
    },
    {
      name: "Ремонт оборудования",
      value: 28570,
    },
    {
      name: "Обслуживание автомобиля",
      value: 47868,
    },
    {
      name: "Форс-мажоры",
      value: 13750,
    },
    {
      name: "Рекламные бюджеты (Блогеры)",
      value: 101500,
    },
    {
      name: "Рекламные бюджеты (Контекст)",
      value: 200000,
    },
  ];

  const formattedNumber = (num: number) => num.toLocaleString("ru-RU");

  return (
    <div className={styles.problem_zone}>
      <h2 className={styles.problem_header}>Проблемные зоны</h2>
      <div className={styles.problem_list}>
        {zonesList.map((zone: Zones) => {
          return (
            <div className={styles.zone_item}>
              <div className={styles.zone_circle}>
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="15"
                    cy="15"
                    r="15"
                    fill={zone.value <= 50000 ? "#F7B731" : "#FC5C65"}
                  />
                  <circle cx="15" cy="19.5" r="1.5" fill="white" />
                  <path
                    d="M13.0383 11.0356C13.0176 10.7462 13.2468 10.5 13.537 10.5H16.463C16.7532 10.5 16.9824 10.7462 16.9617 11.0356L16.5332 17.0356C16.5145 17.2973 16.2968 17.5 16.0344 17.5H13.9656C13.7032 17.5 13.4855 17.2973 13.4668 17.0356L13.0383 11.0356Z"
                    fill="white"
                  />
                </svg>
              </div>
              <div className={styles.zone_info}>
                <li className={styles.zone_item__name}>{zone.name}</li>
                <p className={styles.zone_item__value}>
                  ₽ {formattedNumber(zone.value)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProblemZones;
