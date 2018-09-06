import { combineReducers } from "redux";

import { app, appActions, AppActionTypes } from "./app";

export const rootReducer = combineReducers({
  app
});

export const ActionTypes = {
  App: AppActionTypes
};

export const Actions = {
  App: appActions
};
