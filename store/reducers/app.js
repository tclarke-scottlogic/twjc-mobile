import { logger as loggerBase } from "../../services/logger";

const logger = loggerBase.forContext(loggerBase.middlewareContext);

const DEFAULT_STATE = {
  sectionList: []
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
      const { list } = action;
      logger.info("New List", list.length);

      const sectionList = [
        {
          title: "My List",
          items: list || []
        }
      ];

      return { ...state, sectionList };
  }
  return state;
};
