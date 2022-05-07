type AuthActionTypes =
  | { type: "LOGIN"; payload: { userId: string; decks: [] } }
  | { type: "LOGOUT" };

type Deck = {
  card: string;
  id: number;
};

type DefaultStateType = {
  isLoggedIn: boolean;
  userId: string;
  myDecks: Deck[];
};

const defaultState = {
  isLoggedIn: false,
  userId: "",
  myDecks: [],
};

export default (
  state: DefaultStateType = defaultState,
  action: AuthActionTypes
) => {
  switch (action.type) {
    case "LOGIN":
      return {
        myDecks: action.payload.decks,
        isLoggedIn: true,
        userId: action.payload.userId,
      };
    case "LOGOUT":
      return { ...defaultState };
    default:
      return state;
  }
};
