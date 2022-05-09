import "../../styles/myDecksContainer.css";

const DecksContainer = () => {
  return (
    <div className="container--my-decks">
      <div className="container--decks-of-a-date">
        <label>
          <span>March 20 2022</span>
        </label>
        <div className="my-decks__deck">
          <span>3 terms</span>
          <h4>Presidents</h4>
        </div>
      </div>
      <div className="container--decks-of-a-date">
        <label>
          <span>March 20 2022ch 20 2022ch 20 2022</span>
        </label>
        <div className="my-decks__deck">
          <span>3 terms</span>
          <h4>Presidents</h4>
        </div>
      </div>
    </div>
  );
};

export default DecksContainer;
