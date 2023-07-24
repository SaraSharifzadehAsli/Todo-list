import { createSlice, configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Defaults to localStorage for web
import { getDefaultMiddleware } from "@reduxjs/toolkit";

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
      const dragItemId = action.payload.fromId.current;
      const dragItem = state.find((todo) => todo.id === dragItemId);
      const dragOverItemId = action.payload.toId.current;
      const dragOverItem = state.find((todo) => todo.id === dragOverItemId);
      const [dragItemContent] = newTodos.splice(state.indexOf(dragItem), 1);
      newTodos.splice(state.indexOf(dragOverItem), 0, dragItemContent);
      return newTodos;
    },
    toggleAllTodos: (state, action) => {
      state.map((todo) => (todo.completed = !todo.completed));
    },
  },
});

const isDarkModePreferred = window.matchMedia(
  "(prefers-color-scheme: dark)"
).matches;

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
  toggleAllTodos,
} = todosSlice.actions;

export const { toggleTheme } = themeSlice.actions;

export const persistor = persistStore(store);

export default store;
