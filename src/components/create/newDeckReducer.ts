type ActionTypes = { type: "CHANGE_TITLE"; payload: string };

export const newDeckInitState = {
  title: "",
  cards: [
    { term: "", definition: "", number: 1 },
    { term: "", definition: "", number: 2 },
    { term: "", definition: "", number: 3 },
  ],
};

type Card = {
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
    case "CHANGE_TITLE":
      return { ...state, title: action.payload };
    default:
      return state;
  }
};
