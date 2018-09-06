import { firebaseApp } from "./firebaseApp";

const initDatabase = () => {
  let list = [];
  let handle = null;

  const launch = callback => () => {
    callback(list);
    handle = null;
  };

  return {
    get: () => {
      return firebaseApp
        .database()
        .ref("notifications")
        .orderByKey()
        .once("value")
        .then(snapshot => snapshot.val());
    },
    listen: callback => {
      firebaseApp
        .database()
        .ref("notifications")
        .orderByKey()
        .limitToLast(2000)
        .on("child_added", snapshot => {
          const data = snapshot.val();
          list = [{ id: snapshot.key, ...data }, ...list];
          if (!handle) {
            handle = setTimeout(launch(callback), 500);
          }
        });
    },
    disconnect: () => {}
  };
};

export const database = initDatabase();
