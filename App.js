import React from "react";
import { Provider } from "react-redux";
import { StyleSheet, View } from "react-native";
import { ItemList } from "./components/ItemList";
import { configureStore } from "./store/configureStore";

const { store } = configureStore();

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <View style={{ paddingVertical: 20 }} />
          <ItemList />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#faf",
    alignItems: "center",
    justifyContent: "center"
  }
});
