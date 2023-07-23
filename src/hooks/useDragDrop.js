import { useDispatch } from "react-redux";
import { reorderTodos } from "src/redux/store";

export default function useDragDrop(fromIndex, toIndex) {
  const dispatch = useDispatch();

  function handleDragStart(position) {
    fromIndex.current = position;
  }

  function handleDragEnter(position) {
    toIndex.current = position;
  }

  function handleDrop() {
    dispatch(reorderTodos({ fromIndex, toIndex }));
  }

  return { handleDragStart, handleDragEnter, handleDrop };
}
