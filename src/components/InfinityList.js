import React, { Component } from "react";
import { FlatList } from "react-native";
import { List, IconButton } from "react-native-paper";
import PropTypes from "prop-types";

export class InfinityList extends Component {
  constructor(props) {
    super(props);
    this.isLoading = props.isLoading;
    this.list = props.list;
  }

  _trimText(text) {
    const trimText = text.trim();
    return trimText.length > 10 ? text.substring(0, 30) + "..." : text;
  }

  render() {
    return (
      <FlatList
        data={this.list}
        renderItem={({ item }) => (
          <List.Item
            title={this._trimText(item.source_text)}
            description={this._trimText(item.target_text)}
            onPress={() => {}}
            right={(props) => (
              <IconButton {...props} icon="send" onPress={() => {}} />
            )}
          />
        )}
        keyExtractor={(item) => item.id}
        onEndReached={() => console.log("render")}
        // onEndReachedThreshold={0.5}
      />
    );
  }
}

InfinityList.propTypes = {
  isLoading: PropTypes.bool,
  list: PropTypes.array,
};
