import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./style.module.scss";
import classNames from "classnames";
import FilterBar from "src/components/FilterBar/index";
import useDragDrop from "src/hooks/useDragDrop";
import { removeTodo, toggleTodo } from "src/redux/store";
import TodoItem from "src/components/TodoItem";

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
        {presentableTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            onClick={() => handleToggleTodo(todo.id)}
            onDragStart={() => handleDragStart(todo.id)}
            onDragEnter={() => handleDragEnter(todo.id)}
            onDragEnd={handleDrop}
            isCompleted={todo.completed}
            text={todo.text}
            handleRemoveTodo={() => handleRemoveTodo(todo.id)}
          />
        ))}
      </ul>
      <FilterBar handleFilters={handleFilters} condition={condition} />
    </div>
  );
};

export default TodoList;
