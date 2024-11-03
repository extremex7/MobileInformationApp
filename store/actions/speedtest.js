export const addSpeedTest = (test) => ({
  type: "ADD_SPEED_TEST",
  payload: {
    test,
  },
});

export const removeSpeedTest = (timestamp) => ({
  type: "REMOVE_SPEED_TEST",
  payload: {
    timestamp,
  },
});
