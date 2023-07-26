import React from "react";

import styles from "./style.module.scss";

const FilterItem = ({ item, onClick, isActive }) => {
  return (
    <li>
      <button className={isActive ? styles.blue : ""} onClick={onClick}>
        {item}
      </button>
    </li>
  );
};

export default FilterItem;
