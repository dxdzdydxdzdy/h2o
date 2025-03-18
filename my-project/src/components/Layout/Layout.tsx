import React from "react";
import Header from "../Header/Header";
import MainLayout from "../MainLayout/MainLayout";
import styles from "./Layout.module.scss";
import classNames from "classnames";

const Layout = () => {
  return (
    <div className={classNames(styles.layout)}>
      <Header />
      <MainLayout />
    </div>
  );
};

export default Layout;
