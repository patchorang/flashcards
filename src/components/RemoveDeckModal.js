import { useRemoveDeckMutation } from "../store/apis/decksApi";
import { useSelector } from "react-redux";
import Modal from "./Modal";
import Button from "./Button";

function RemoveDeckModal({ onClose }) {
  const [removeDeck, result] = useRemoveDeckMutation();
  const { id } = useSelector((state) => state.flashcardManager.deckToRemove);

  const onSubmit = (event) => {
    event.preventDefault();
    removeDeck(id);
    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <form
        className="w-96 drop-shadow-lg bg-slate-50 p-8 m-8 rounded-xl"
        onSubmit={onSubmit}
      >
        <label className="text-xl font-bold">
          Are you sure you want to delete this deck?
        </label>
        <div className="flex space-x-2 pt-4 ">
          <Button danger type="submit">
            Delete
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </div>
      </form>
    </Modal>
  );
}

export default RemoveDeckModal;
