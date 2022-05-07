export type ActionTypes =
  | {
      type: "CHANGE_TITLE";
      payload: string;
    }
  | { type: "CHANGE_TERM"; payload: { term: string; cardNumber: number } }
  | {
      type: "CHANGE_DEFINITION";
      payload: { definition: string; cardNumber: number };
    }
  | { type: "ADD_CARD" }
  | { type: "DELETE_CARD"; payload: number }
  | { type: "CREATE_DECK" };

export const newDeckInitState = {
  title: "",
  cards: [
    { term: "", definition: "", number: 1 },
    { term: "", definition: "", number: 2 },
    { term: "", definition: "", number: 3 },
  ],
};

export type Card = {
  term: string;
  definition: string;
  number: number;
};

type NewDeckState = {
  title: string;
  cards: Card[];
};

export const newDeckReducer = (state: NewDeckState, action: ActionTypes) => {
  switch (action.type) {
    case "CREATE_DECK":
      return { ...newDeckInitState };
    case "ADD_CARD":
      const cardNumbers = state.cards.map((card) => {
        return card.number;
      });

      const newNum = Math.max(...cardNumbers) + 1;

      return {
        ...state,
        cards: [...state.cards, { term: "", definition: "", number: newNum }],
      };
    case "DELETE_CARD":
      return {
        ...state,
        cards: state.cards.filter((card) => {
          return card.number !== action.payload;
        }),
      };
    case "CHANGE_TITLE":
      return { ...state, title: action.payload };
    case "CHANGE_TERM":
      return {
        ...state,
        cards: state.cards.map((card) => {
          if (card.number === action.payload.cardNumber) {
            return { ...card, term: action.payload.term };
          } else {
            return card;
          }
        }),
      };
    case "CHANGE_DEFINITION":
      return {
        ...state,
        cards: state.cards.map((card) => {
          if (card.number === action.payload.cardNumber) {
            return { ...card, definition: action.payload.definition };
          } else {
            return card;
          }
        }),
      };
    default:
      return state;
  }
};
