import React from "react";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, toggleAllTodos } from "src/redux/store";
import styles from "./style.module.scss";
import CircleIcon from "src/components/icons/circleIcon";

const SearchBox = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);

  function handleToggleAllTodos(params) {
    dispatch(toggleAllTodos());
  }

  function handleAddTodo(event) {
    event.preventDefault();
    const newTodo = event.target.todo.value;
    if (newTodo.trim() === "") return;
    dispatch(
      addTodo({
        id: Date.now(),
        text: newTodo,
        completed: false,
      })
    );
    event.target.todo.value = "";
  }

  return (
    <div
      className={classNames(styles.searchBox, {
        [styles.darkTheme]: theme === "dark",
      })}
    >
      <div className={styles.container}>
        <CircleIcon onClick={handleToggleAllTodos} />
        <form onSubmit={handleAddTodo}>
          <input type="text" placeholder="Create a new todo…" name="todo" />
        </form>
      </div>
    </div>
  );
};

export default SearchBox;
