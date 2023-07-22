import React, { useEffect, useRef, useState } from "react";
import CompletedIcon from "../icons/CompletedIcon";
import { removeTodo, toggleTodo } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import styles from "./style.module.scss";
import CircleIcon from "../icons/circleIcon";
import CrossIcon from "../icons/crossIcon";
import FilterBar from "../FilterBar";
import classNames from "classnames";
import useDragDrop from "../../hooks/useDragDrop";

const TodoList = () => {
  const [presentableTodos, setPresentableTodos] = useState([]);
  const [condition, setCondition] = useState("all");
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);
  const theme = useSelector((state) => state.theme);
  const dragItem = useRef();
  const dragOverItem = useRef();
  const { handleDragStart, handleDragEnter, handleDrop } = useDragDrop(
    dragItem,
    dragOverItem
  );

  function handleRemoveTodo(id) {
    dispatch(removeTodo(id));
  }

  function handleToggleTodo(id) {
    dispatch(toggleTodo(id));
  }

  function handleFilters(filter) {
    setCondition(filter);
  }

  useEffect(() => {
    switch (condition) {
      case "completed":
        setPresentableTodos(todos.filter((todo) => todo.completed === true));
        break;
      case "active":
        setPresentableTodos(todos.filter((todo) => todo.completed === false));
        break;
      case "all":
        setPresentableTodos(todos);
        break;
      default:
        break;
    }
  }, [todos, condition]);

  return (
    <div
      className={classNames(styles.todoList, {
        [styles.darkTheme]: theme === "dark",
      })}
    >
      <ul>
        {presentableTodos.map((todo, index) => (
          <li
            key={todo.id}
            onClick={() => handleToggleTodo(todo.id)}
            className={classNames(styles.todo, {
              [styles.completedTodo]: todo.completed,
            })}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragEnter={() => handleDragEnter(index)}
            onDragEnd={handleDrop}
          >
            <div className={styles.checkAndText}>
              {todo.completed ? <CompletedIcon /> : <CircleIcon />}
              <div>{todo.text}</div>
            </div>
            <CrossIcon handleRemoveTodo={handleRemoveTodo} id={todo.id} />
          </li>
        ))}
      </ul>
      <FilterBar handleFilters={handleFilters} condition={condition} />
    </div>
  );
};

export default TodoList;
