import styles from "./App.module.scss";
import Header from "./components/Header";
import SearchBox from "./components/SearchBox";
import TodoList from "./components/TodoList";
import Footer from "./components/Footer";
import { useSelector } from "react-redux";
import classNames from "classnames";

function App() {
  const theme = useSelector((state) => state.theme);

  return (
    <div
      className={classNames(styles.container, {
        [styles.darkTheme]: theme === "dark",
      })}
    >
      <div className={styles.background}></div>
      <div className={styles.content}>
        <Header />
        <SearchBox />
        <TodoList />
        <Footer />
      </div>
    </div>
  );
}

export default App;
