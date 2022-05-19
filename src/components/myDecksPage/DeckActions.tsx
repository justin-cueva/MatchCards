import { useNavigate } from "react-router-dom";

type Props = {
  setDeleteModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  deckId: string;
};

const DeckActions = ({ setDeleteModalIsOpen, deckId }: Props) => {
  const navigate = useNavigate();

  return (
    <div className="deck__actions">
      <button
        onClick={(e) => {
          navigate(`/myDecks/delete/${deckId}`);
          e.stopPropagation();
        }}
        type="button"
        className="delete"
      >
        Delete
      </button>
      <button
        onClick={(e) => {
          navigate(`/myDecks/edit/${deckId}`);
          e.stopPropagation();
        }}
        type="button"
        className="edit"
      >
        Edit
      </button>
    </div>
  );
};
export default DeckActions;
