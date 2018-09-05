import { firebaseApp } from "./firebaseApp";

const initDatabase = () => {
  let list = [];
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
        .limitToFirst(100)
        .on("child_added", snapshot => {
          const data = snapshot.val();
          console.info(snapshot.key, data);
          list = [{ id: snapshot.key, ...data }, ...list];
          callback(list);
        });
    }
  };
};

export const database = initDatabase();
