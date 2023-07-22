import React from "react";
import styles from "./style.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { removeCompletedTodos } from "../../redux/store";
import classNames from "classnames";

const FilterBar = ({ handleFilters, condition }) => {
  const todos = useSelector((state) => state.todos);
  const theme = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  function handleRemoveCompletedTodos() {
    dispatch(removeCompletedTodos());
  }

  const activeItemsLength = todos.filter(
    (todo) => todo.completed === false
  ).length;

  return (
    <div className={styles.filterBarDesktop}>
      <p className={styles.activeItemsLength}>{activeItemsLength} items left</p>
      <ul
        className={classNames(styles.filterBarMobile, {
          [styles.darkTheme]: theme === "dark",
        })}
      >
        <li>
          <button
            className={classNames(styles.all, {
              [styles.blue]: condition === "all",
            })}
            onClick={() => handleFilters("all")}
          >
            All
          </button>
        </li>
        <li>
          <button
            className={classNames(styles.active, {
              [styles.blue]: condition === "active",
            })}
            onClick={() => handleFilters("active")}
          >
            Active
          </button>
        </li>
        <li>
          <button
            className={classNames(styles.completed, {
              [styles.blue]: condition === "completed",
            })}
            onClick={() => handleFilters("completed")}
          >
            Completed
          </button>
        </li>
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
