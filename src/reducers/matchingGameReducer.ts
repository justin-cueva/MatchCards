// data about
// the best time for that deck
// the current time about that deck
// the deck itself
// gamestatus

export type Actions = { type: "CHANGE_GAME_STATUS"; payload: string };

export const defaultState = { gameStatus: "PREGAME" };

export type DefaultStateType = {
  gameStatus: string;
};

export const matchingGameReducer = (
  state: DefaultStateType = defaultState,
  action: Actions
) => {
  switch (action.type) {
    case "CHANGE_GAME_STATUS":
      return { ...state, gameStatus: action.payload };
    default:
      return state;
  }
};
