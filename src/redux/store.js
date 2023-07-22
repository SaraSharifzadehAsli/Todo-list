import { createSlice, configureStore, combineReducers } from "@reduxjs/toolkit";
// import persistReducer from "redux-persist/es/persistReducer";
// import { PersistState, PersistReducer } from "redux-persist";
// import persistStore from "redux-persist/es/persistStore";
// import persistReducer from "redux-persist/es/persistReducer";
// import { Storage } from "redux-persist/lib/types";

// import { configureStore } from "@reduxjs/toolkit";
// import { persistStore, persistReducer } from "redux-persist";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Defaults to localStorage for web
import { getDefaultMiddleware } from "@reduxjs/toolkit";
// import persistReducer from "redux-persist/es/persistReducer";
// import persistStore from "redux-persist/es/persistStore";
// import { Storage } from "redux-persist";

const todosSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      state.push(action.payload);
    },
    toggleTodo: (state, action) => {
      state.find((todo) => {
        if (todo.id === action.payload) {
          todo.completed = !todo.completed;
        }
      });
    },
    removeTodo: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload);
    },
    removeCompletedTodos: (state, action) => {
      return state.filter((todo) => todo.completed === false);
    },
    reorderTodos: (state, action) => {
      const newTodos = [...state];
      const dragItemIndex = action.payload.fromIndex.current;
      const dragOverItemIndex = action.payload.toIndex.current;
      const [dragItemContent] = newTodos.splice(dragItemIndex, 1);
      newTodos.splice(dragOverItemIndex, 0, dragItemContent);
      return newTodos;
    },
  },
});

const isDarkModePreferred = window.matchMedia(
  "(prefers-color-scheme: dark)"
).matches;

console.log(isDarkModePreferred);

const themeSlice = createSlice({
  name: "theme",
  initialState: isDarkModePreferred ? "dark" : "light",
  reducers: {
    toggleTheme: (state, action) => {
      return state === "light" ? "dark" : "light";
    },
  },
});

const rootReducer = combineReducers({
  todos: todosSlice.reducer,
  theme: themeSlice.reducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const {
  addTodo,
  toggleTodo,
  removeTodo,
  removeCompletedTodos,
  reorderTodos,
} = todosSlice.actions;

export const { toggleTheme } = themeSlice.actions;

export const persistor = persistStore(store);

export default store;
