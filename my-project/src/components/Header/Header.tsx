import styles from "./Header.module.scss";
import classNames from "classnames";
import Swiper from "../Swiper/Swiper";
import Profile from "../Profile/Profile";

const Header = () => {
  return (
    <header className={classNames(styles.header)}>
      <nav className={classNames(styles.navbar)}>
        <Swiper />
      </nav>
      <div className={classNames(styles.profile)}>
        <Profile />
      </div>
    </header>
  );
};

export default Header;
