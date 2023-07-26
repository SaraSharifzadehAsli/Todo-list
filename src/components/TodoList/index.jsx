import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";

import { removeTodo, toggleTodo } from "src/redux/store";

import FilterBar from "src/components/FilterBar/index";
import TodoItem from "src/components/TodoItem";

import useDragDrop from "src/hooks/useDragDrop";

import { FILTER } from "src/constant";

import styles from "./style.module.scss";

const TodoList = () => {
  const [presentableTodos, setPresentableTodos] = useState([]);
  const [filter, setfilter] = useState(FILTER.ALL);
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
    setfilter(filter);
  }

  useEffect(() => {
    switch (filter) {
      case FILTER.COMPLETED:
        setPresentableTodos(todos.filter((todo) => todo.completed));
        break;
      case FILTER.ACTIVE:
        setPresentableTodos(todos.filter((todo) => !todo.completed));
        break;
      case FILTER.ALL:
        setPresentableTodos(todos);
        break;
      default:
        break;
    }
  }, [todos, filter]);

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
      <FilterBar handleFilters={handleFilters} filter={filter} />
    </div>
  );
};

export default TodoList;
