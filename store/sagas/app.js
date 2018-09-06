import { ActionTypes } from "../reducers";
import { eventChannel } from "redux-saga";
import { put, take, takeEvery, all } from "redux-saga/effects";
import { database } from "../../api/database";

const databaseListener = () =>
  eventChannel(emitter => {
    database.listen(list => emitter(list));
    return () => {
      console.info("Disconnected");
      database.disconnect();
    };
  });

const signIn = function*(action) {
  console.info("signIn");
  const channel = databaseListener();

  while (true) {
    const payload = yield take(channel);

    yield put({
      type: ActionTypes.App.NEW_LIST,
      list: payload
    });
  }

  console.info("Exited loop");
};

const signOut = function*(action) {};

export function* app() {
  yield all([
    takeEvery(ActionTypes.App.START, signIn),
    takeEvery(ActionTypes.App.END, signOut)
  ]);
}
