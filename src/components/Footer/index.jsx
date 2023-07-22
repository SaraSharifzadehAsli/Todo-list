import React from "react";
import styles from "./style.module.scss";
import { useSelector } from "react-redux";
import classNames from "classnames";

const Footer = () => {
  const theme = useSelector((state) => state.theme);

  return (
    <footer
      className={classNames(styles.footer, {
        [styles.darkTheme]: theme === "dark",
      })}
    >
      <p className={styles.dragDrop}>drag and drop to reorder list</p>
      <div className={styles.attribution}>
        Coded by <a href="#">Sara Sharifzadeh</a>.
      </div>
    </footer>
  );
};

export default Footer;
