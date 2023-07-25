import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { addTodo } from "src/redux/store";
import styles from "./style.module.scss";
import CircleIcon from "src/components/icons/circleIcon";
import CompletedIcon from "../icons/completedIcon";

const SearchBox = () => {
  const [isChecked, setIsChecked] = useState(false);
  const inputRef = useRef();
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);

  function handleChecked() {
    isChecked ? setIsChecked(false) : setIsChecked(true);
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
          />
        </form>
      </div>
    </div>
  );
};

export default SearchBox;
