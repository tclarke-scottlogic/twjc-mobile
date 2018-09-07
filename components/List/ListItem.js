import React from "react";
import { View, Text } from "react-native";

export const ListItem = props => {
  const { item } = props;
  return (
    <View style={styles.listItem}>
      <View style={styles.subHeading}>
        <Text style={styles.text}>{item.id}</Text>
        <Text style={styles.text}>{item.author}</Text>
      </View>
      <Text style={styles.text}>{item.summary}</Text>
    </View>
  );
};

const styles = {
  listItem: {
    backgroundColor: "#faa",
    flex: 1,
    flexDirection: "column",
    marginBottom: 10
  },
  subHeading: {
    flex: 1,
    flexDirection: "row"
  },
  text: {
    marginHorizontal: 5
  }
};
