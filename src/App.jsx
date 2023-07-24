import styles from "./App.module.scss";
import { useSelector } from "react-redux";
import classNames from "classnames";
import Header from "src/components/Header";
import SearchBox from "src/components/SearchBox";
import TodoList from "src/components/TodoList";
import Footer from "src/components/Footer";

function App() {
  const theme = useSelector((state) => state.theme);

  return (
    <div
      className={classNames(styles.container, {
        [styles.darkTheme]: theme === "dark",
      })}
    >
      <div className={styles.background} />
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
