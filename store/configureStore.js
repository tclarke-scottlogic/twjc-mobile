import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { loggingMiddleware } from "./middleware";
import { rootReducer } from "./reducers";
import { rootSaga } from "./sagas";

export const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    rootReducer,
    applyMiddleware(loggingMiddleware, sagaMiddleware)
  );

  sagaMiddleware.run(rootSaga);

  return { store };
};
