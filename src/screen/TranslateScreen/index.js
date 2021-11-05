import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { View, ScrollView } from "react-native";
import { STATE } from "../../redux/features/translationSlice";
import { Divider } from "react-native-paper";
import { styles } from "./translateScreen.styles";
import ChooseLanguage from "./components/ChooseLanguage";
import InputTranslation from "./components/InputTranslation";
import OutputTranslation from "./components/OutputTranslation";

const TranslateScreen = (props) => {
  const { navigation, translationState } = props;

  /**
   * @description useEffect cho việc check kết quả và báo noti cho
   * người dùng
   */
  useEffect(() => {
    switch (translationState.currentState) {
      case STATE.SUCCEEDED:
        break;
      case STATE.FAILED:
        if (!translationState.err.message.includes("cancel")) {
          alert(translationState.err.message);
        }
        break;
      default:
        break;
    }
  }, [translationState.currentState]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <ChooseLanguage navigation={navigation} />
        <Divider />
        <InputTranslation />
        <OutputTranslation />
      </ScrollView>
    </View>
  );
};

TranslateScreen.propTypes = {
  navigation: PropTypes.object,
  translationState: PropTypes.object,
};

const mapStateToProps = (state) => ({
  translationState: state.translation,
});

export default connect(mapStateToProps)(TranslateScreen);
