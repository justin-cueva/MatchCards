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
        onClick={() => {
          navigate(`/myDecks/delete/${deckId}`);
        }}
        type="button"
        className="delete"
      >
        Delete
      </button>
      <button
        onClick={() => navigate(`/myDecks/edit/${deckId}`)}
        type="button"
        className="edit"
      >
        Edit
      </button>
    </div>
  );
};
export default DeckActions;
