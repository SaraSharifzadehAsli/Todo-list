import React from "react";
import styles from "./style.module.scss";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo } from "../../redux/store";
import CircleIcon from "../icons/circleIcon";
import classNames from "classnames";

const SearchBox = () => {
  const [newTodo, setNewTodo] = useState("");
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);

  function handleInputChange(event) {
    setNewTodo(event.target.value);
  }

  function handleAddTodo(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      if (newTodo.trim() !== "") {
        dispatch(
          addTodo({
            id: Date.now(),
            text: newTodo,
            completed: false,
          })
        );
      }
      setNewTodo("");
    }
  }

  return (
    <div
      className={classNames(styles.searchBox, {
        [styles.darkTheme]: theme === "dark",
      })}
    >
      <div className={styles.container}>
        <CircleIcon />
        <input
          type="text"
          placeholder="Create a new todo…"
          value={newTodo}
          onChange={handleInputChange}
          onKeyDown={handleAddTodo}
        />
      </div>
    </div>
  );
};

export default SearchBox;
