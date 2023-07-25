import React from "react";
import { useSelector } from "react-redux";
import classNames from "classnames";
import CompletedIcon from "src/components/icons/completedIcon";
import CircleIcon from "src/components/icons/circleIcon";
import CrossIcon from "src/components/icons/crossIcon";
import styles from "./style.module.scss";

const TodoItem = ({
  onClick,
  onDragStart,
  onDragEnter,
  onDragEnd,
  isCompleted,
  text,
  handleRemoveTodo,
}) => {
  const theme = useSelector((state) => state.theme);

  return (
    <li
      onClick={onClick}
      className={classNames(
        styles.todo,
        {
          [styles.completedTodo]: isCompleted,
        },
        { [styles.darkTheme]: theme === "dark" }
      )}
      draggable
      onDragStart={onDragStart}
      onDragEnter={onDragEnter}
      onDragEnd={onDragEnd}
    >
      <div className={styles.checkAndText}>
        {isCompleted ? <CompletedIcon /> : <CircleIcon />}
        <div>{text}</div>
      </div>
      <CrossIcon onClick={handleRemoveTodo} />
    </li>
  );
};

export default TodoItem;
