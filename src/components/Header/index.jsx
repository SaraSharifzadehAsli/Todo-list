import React from "react";
import styles from "./style.module.scss";
import { toggleTheme } from "src/redux/store";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);

  console.log(theme);

  function handleToggleTheme() {
    dispatch(toggleTheme());
  }

  const srcImage =
    theme === "dark" ? "../images/icon-sun.svg" : "../images/icon-moon.svg";

  return (
    <header className={styles.header}>
      <h1>TODO</h1>
      <img onClick={handleToggleTheme} src={srcImage} alt="moon-sun" />
    </header>
  );
};

export default Header;
