import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "src/redux/store";
import styles from "./style.module.scss";

import moonIcon from "images/icon-moon.svg";
import sunIcon from "images/icon-sun.svg";

const Header = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);
  const srcImage = theme === "dark" ? moonIcon : sunIcon;

  function handleToggleTheme() {
    dispatch(toggleTheme());
  }

  return (
    <header className={styles.header}>
      <h1>TODO</h1>
      <img onClick={handleToggleTheme} src={srcImage} alt="moon-sun" />
    </header>
  );
};

export default Header;
