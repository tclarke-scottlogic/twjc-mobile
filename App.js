import React from "react";
import { StyleSheet, Text, View, SectionList } from "react-native";
import { ItemList } from "./components/ItemList";

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={{ paddingVertical: 20 }} />
        <ItemList />
      </View>
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
