import { useDispatch, useSelector } from "react-redux";
import React, { useMemo } from "react";
import classNames from "classnames";

import FilterItem from "src/components/FilterItem";

import { removeCompletedTodos } from "src/redux/store";

import { filters } from "src/constant";

import styles from "./style.module.scss";

const FilterBar = ({ handleFilters, filter }) => {
  const todos = useSelector((state) => state.todos);
  const theme = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  function handleRemoveCompletedTodos() {
    dispatch(removeCompletedTodos());
  }

  const activeItemsLength = useMemo(() => {
    return todos.filter((todo) => !todo.completed).length;
  }, [todos]);

  return (
    <div className={styles.filterBarDesktop}>
      <p className={styles.activeItemsLength}>{activeItemsLength} items left</p>
      <ul
        className={classNames(styles.filterBarMobile, {
          [styles.darkTheme]: theme === "dark",
        })}
      >
        {filters.map((item, index) => (
          <FilterItem
            key={index}
            item={item}
            onClick={() => handleFilters(item)}
            isActive={filter === item}
          />
        ))}
      </ul>
      <button
        className={styles.clearCompleted}
        onClick={handleRemoveCompletedTodos}
      >
        Clear Completed
      </button>
    </div>
  );
};

export default FilterBar;
