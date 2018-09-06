import React, { Component } from "react";
import { connect } from "react-redux";

import { Text, SectionList, ActivityIndicator } from "react-native";
import { ListItem } from "./ListItem";

import { Actions } from "../store/reducers";
import { logger as loggerBase } from "../services/logger";

const logger = loggerBase.forContext("ItemList");

const mapStateToProps = state => ({
  app: state.app
});

const mapDispatchToProps = dispatch => ({
  start: () => dispatch(Actions.App.start()),
  end: () => dispatch(Actions.App.end())
});

const SectionPrefix = "__section__";

const makeSection = sectionList => {
  return sectionList.map((d, index) => {
    const items = Object.keys(d.items).map(key => {
      return {
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

class ItemListBase extends Component {
  componentWillMount() {
    this.props.start();
  }

  componentWillUnmount() {
    this.props.end();
  }

  render() {
    const { app } = this.props;

    logger.dev(this.props);

    if (!app.list) return <Text>???</Text>;

    logger.dev("Rendering", app.list.length);

    const sectionList = [
      {
        title: "My List",
        items: app.list || []
      }
    ];

    return sectionList && sectionList.length > 0 ? (
      <SectionList
        style={styles.list}
        ref={c => (this.sectionList = c)}
        sections={makeSection(sectionList)}
        keyExtractor={(item, key) => {
          return item.id;
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
    ) : (
      <ActivityIndicator />
    );
  }
}

export const ItemList = connect(mapStateToProps, mapDispatchToProps)(
  ItemListBase
);

const styles = {
  list: {
    backgroundColor: "#aaf",
    width: "100%"
  }
};
