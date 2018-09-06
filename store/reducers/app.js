const DEFAULT_STATE = {
  list: []
};

export const AppActionTypes = {
  START: "START",
  END: "END",
  NEW_LIST: "NEW_LIST"
};

export const appActions = {
  start: () => ({
    type: AppActionTypes.START
  }),
  end: () => ({
    type: AppActionTypes.END
  }),
  newList: list => ({
    type: AppActionTypes.NEW_LIST,
    list
  })
};

export const app = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case AppActionTypes.NEW_LIST:
      return { ...state, list: action.list };
  }
  return state;
};
