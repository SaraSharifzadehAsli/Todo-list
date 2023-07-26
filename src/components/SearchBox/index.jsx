import { useDispatch, useSelector } from "react-redux";
import React, { useRef, useState } from "react";
import classNames from "classnames";

import CompletedIcon from "src/components/icons/completedIcon";
import CircleIcon from "src/components/icons/circleIcon";

import { addTodo } from "src/redux/store";

import styles from "./style.module.scss";

const SearchBox = () => {
  const [isChecked, setIsChecked] = useState(false);
  const inputRef = useRef();
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);

  function handleChecked() {
    setIsChecked((prevState) => !prevState);
    inputRef.current.focus();
  }

  function handleAddTodo(event) {
    event.preventDefault();
    const newTodo = event.target.todo.value;
    if (newTodo.trim() === "") return;
    dispatch(
      addTodo({
        id: Date.now(),
        text: newTodo,
        completed: isChecked,
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
        <div className={styles.iconContainer} onClick={handleChecked}>
          {isChecked ? <CompletedIcon /> : <CircleIcon />}
        </div>
        <form onSubmit={handleAddTodo}>
          <input
            ref={inputRef}
            type="text"
            placeholder="Create a new todo…"
            name="todo"
            autoFocus
            autoComplete="off"
          />
        </form>
      </div>
    </div>
  );
};

export default SearchBox;
