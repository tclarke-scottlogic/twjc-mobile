import { firebaseApp } from "./firebaseApp";

const initDatabase = () => {
  return {
    get: () => {
      return firebaseApp
        .database()
        .ref("notifications")
        .orderByKey()
        .once("value")
        .then(snapshot => snapshot.val());
    }
  };
};

export const database = initDatabase();
