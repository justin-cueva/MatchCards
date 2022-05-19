import { useContext, useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";

import DeckActions from "./DeckActions";
import Message from "../reusables/Message";
import useSortAndFilter from "./useSortAndFilter";
import { AuthContext as Context } from "../App";
import { Deck } from "../../reducers/authReducer";
import "../../styles/myDeckPage/myDecksContainer.css";

type Props = {
  decks: Deck[];
  decksAreLoading: boolean;
  currentSort: string;
  searchStr: string;
};

const DecksContainer = (props: Props) => {
  const navigate = useNavigate();
  const { deckOrder } = useSortAndFilter(props);
  const { authState, authDispatch } = useContext(Context);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState<boolean>(false);

  const lComponent = (
    <ReactLoading
      className="self-center"
      color={"#ffba08"}
      type={"spin"}
      width={"10rem"}
      height={"10rem"}
    />
  );

  return (
    <Fragment>
      <div className="container--my-decks">
        {props.decks.length === 0 && !props.decksAreLoading && (
          <Message text="You have no decks created" />
        )}
        {props.decksAreLoading && lComponent}
        {!props.decksAreLoading &&
          deckOrder.map(({ cards, title, key, date }, index) => {
            return (
              <div key={index} className="container--decks-of-a-date">
                <label>
                  <span>{date ? date : "March 20 2022"}</span>
                </label>
                <div className="my-decks__deck">
                  <div>
                    <span>{cards.length} terms</span>
                    <h4
                      onClick={() => {
                        navigate(`/myDecks/match/${key}`);
                        // console.log("navigating to /myDecks/match/:deckId");
                      }}
                    >
                      {title}
                    </h4>
                  </div>
                  <DeckActions
                    setDeleteModalIsOpen={setDeleteModalIsOpen}
                    deckId={key}
                  />
                </div>
              </div>
            );
          })}
      </div>
    </Fragment>
  );
};

export default DecksContainer;
