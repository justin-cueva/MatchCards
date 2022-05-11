type Props = {
  setDeleteModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const DeckActions = ({ setDeleteModalIsOpen }: Props) => {
  return (
    <div className="deck__actions">
      <button
        onClick={() => {
          setDeleteModalIsOpen(true);
          // deleteDeck(key);
        }}
        type="button"
        className="delete"
      >
        Delete
      </button>
      <button
        onClick={() => {
          console.log("editing deck");
          // navigate to /myDecks/edit/:deckId
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
