import React, { Component } from "react";
import { StyleSheet, Text, View, SectionList } from "react-native";
import { database } from "../api/database";
import { ListItem } from "./ListItem";

const SectionPrefix = "__section__";

const makeSection = sectionList => {
  return sectionList.map((d, index) => {
    const items = Object.keys(d.items).map(key => {
      return {
        id: key,
        ...d.items[key]
      };
    });
    return {
      _index: index,
      key: `${SectionPrefix}${d.title}`,
      data: items,
      title: d.title
    };
  });
};

export class ItemList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sectionList: []
    };
    database.get().then(list =>
      this.setState({
        sectionList: [
          {
            title: "My List",
            items: list || []
          }
        ]
      })
    );
  }

  render() {
    const { sectionList } = this.state;

    return (
      <SectionList
        style={styles.list}
        ref={c => (this.sectionList = c)}
        sections={makeSection(sectionList)}
        keyExtractor={(item, key) => {
          return key;
        }}
        renderItem={({ item }) => {
          return <ListItem item={item} />;
        }}
        renderSectionHeader={({ section }) => <Text>{section.title}</Text>}
        onRefresh={() => {}}
        refreshing={false}
        onScrollToIndexFailed={(...error) => this.onScrollToIndexFailed(error)}
        stickySectionHeadersEnabled={false}
        waitForInteractions={true}
      />
    );
  }
}

const styles = {
  list: {
    backgroundColor: "#aaf",
    width: "100%"
  }
};
