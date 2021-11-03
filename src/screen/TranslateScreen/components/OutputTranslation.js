import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { TextInput } from "react-native";
import * as Clipboard from "expo-clipboard";
import { Card, useTheme, IconButton } from "react-native-paper";

function ResultTranslateBox(props) {
  const { colors } = useTheme();
  const { translationState } = props;

  const copyToClipboard = () => {
    Clipboard.setString(translationState.translateText.targetText);
  };

  return (
    <>
      {translationState.translateText.targetText !== "" ? (
        <Card style={{ margin: 8, backgroundColor: colors.primary }}>
          <Card.Content>
            <TextInput
              multiline
              editable={false}
              style={{ fontSize: 20, color: "white", flex: 1 }}
              value={translationState.translateText.targetText}
            />
          </Card.Content>
          <Card.Actions style={{ justifyContent: "flex-end" }}>
            <IconButton
              icon="content-copy"
              color="white"
              size={24}
              onPress={copyToClipboard}
            />
          </Card.Actions>
        </Card>
      ) : null}
    </>
  );
}

ResultTranslateBox.propTypes = {
  translationState: PropTypes.object,
};

const mapStateToProps = (state) => ({
  translationState: state.translation,
});

export default connect(mapStateToProps)(ResultTranslateBox);
