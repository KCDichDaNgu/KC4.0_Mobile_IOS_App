import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { View, ScrollView } from "react-native";
import { STATE } from "../../redux/features/translationSlice";
import { Divider, Snackbar } from "react-native-paper";
import { styles } from "./translateScreen.styles";
import { useTranslation } from "react-i18next";
import ChooseLanguage from "./components/ChooseLanguage";
import InputTranslation from "./components/InputTranslation";
import OutputTranslation from "./components/OutputTranslation";

const TranslateScreen = (props) => {
  const { t } = useTranslation();
  const { navigation, translationState } = props;
  const [visible, setVisible] = React.useState(false);

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);

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
        <OutputTranslation onToggleSnackBar={onToggleSnackBar} />
      </ScrollView>
      <Snackbar visible={visible} onDismiss={onDismissSnackBar} duration={1000}>
        {t("vanBanNayDaDuocCopy")}
      </Snackbar>
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
