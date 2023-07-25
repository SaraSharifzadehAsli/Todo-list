import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeCompletedTodos } from "src/redux/store";
import classNames from "classnames";
import styles from "./style.module.scss";
import FilterItem from "src/components/FilterItem";

const FilterBar = ({ handleFilters, condition }) => {
  const todos = useSelector((state) => state.todos);
  const theme = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  const filters = ["All", "Active", "Completed"];

  function handleRemoveCompletedTodos() {
    dispatch(removeCompletedTodos());
  }

  const activeItemsLength = useMemo(() => {
    todos.filter((todo) => todo.completed === false).length;
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
            onClick={() => handleFilters(item.toLowerCase())}
            isActive={condition === item.toLowerCase()}
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
