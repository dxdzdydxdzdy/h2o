import styles from "./LeftArrow.module.scss";

const LeftArrow = ({ onClick }: { onClick: () => void }) => {
  return (
    <button className={styles.left_arrow}>
      <svg
        onClick={onClick}
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="20" cy="20" r="20" fill="white" />
        <path
          d="M14.0167 19.6799L21.1992 11.0609C21.4986 10.7017 22.0833 10.9134 22.0833 11.381V28.619C22.0833 29.0866 21.4986 29.2983 21.1992 28.9391L14.0167 20.3201C13.8622 20.1347 13.8622 19.8653 14.0167 19.6799Z"
          fill="#989FA3"
        />
      </svg>
    </button>
  );
};

export default LeftArrow;
