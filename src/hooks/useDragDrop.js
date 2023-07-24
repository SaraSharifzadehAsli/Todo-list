import { useDispatch } from "react-redux";
import { reorderTodos } from "src/redux/store";

export default function useDragDrop(fromId, toId) {
  const dispatch = useDispatch();

  function handleDragStart(position) {
    fromId.current = position;
  }

  function handleDragEnter(position) {
    toId.current = position;
  }

  function handleDrop() {
    dispatch(reorderTodos({ fromId, toId }));
  }

  return { handleDragStart, handleDragEnter, handleDrop };
}
