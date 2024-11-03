const initialState = {
  history: [],
};

const speedtest = (state = initialState, action = {}) => {
  const { payload } = action;
  switch (action.type) {
    case "ADD_SPEED_TEST":
      return { ...state, history: [...state.history, payload.test] };
    case "REMOVE_SPEED_TEST":
      return {
        ...state,
        history: state.history.filter(
          (test) => test.timestamp !== payload.timestamp
        ),
      };
    default:
      return state;
  }
};

export default speedtest;
