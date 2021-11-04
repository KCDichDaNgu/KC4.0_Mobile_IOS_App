import React from "react";
import { TextInput } from "react-native";
import { IconButton, Button, Divider } from "react-native-paper";
import { connect } from "react-redux";
import {
  changeSourceText,
  changeTargetText,
  reset,
  translateAsync,
  translateAndDetectAsync,
  STATE,
} from "../../../redux/features/translationSlice";
import PropTypes from "prop-types";
import { View } from "react-native";
import { useTranslation } from "react-i18next";
import { textInputTranslateStyles } from "../translateScreen.styles";
function InputTranslation(props) {
  const { t } = useTranslation();
  const { translationState } = props;

  const handleTranslate = () => {
    props.changeTargetText("");
    if (translationState.translateCode.sourceLang) {
      props.translateAsync({
        sourceText: translationState.translateText.sourceText,
        sourceLang: translationState.translateCode.sourceLang,
        targetLang: translationState.translateCode.targetLang,
      });
    } else {
      props.translateAndDetectAsync({
        sourceText: translationState.translateText.sourceText,
        targetLang: translationState.translateCode.targetLang,
      });
    }
  };

  const isDisable = () => translationState.currentState === STATE.LOADING;

  const isDisableButtonTranslate = () =>
    translationState.translateText.sourceText.trim() === "" ||
    translationState.currentState === STATE.LOADING;

  return (
    <>
      <View style={textInputTranslateStyles.inputCont}>
        <View style={{ alignItems: "flex-end" }}>
          {translationState.translateText.sourceText !== "" ? (
            <IconButton
              disabled={isDisable()}
              icon="close"
              size={24}
              onPress={() => props.reset()}
              style={{ padding: 0, margin: 0 }}
            />
          ) : null}
        </View>
        <TextInput
          multiline
          editable={!isDisable()}
          style={{ fontSize: 20, flex: 1 }}
          placeholder={t("translateScreen_nhapNoiDungVanBan")}
          value={translationState.translateText.sourceText}
          onChangeText={props.changeSourceText}
        />
      </View>
      <Divider />
      <View
        style={{
          alignItems: "flex-end",
          justifyContent: "flex-end",
          backgroundColor: "white",
        }}
      >
        <Button
          disabled={isDisableButtonTranslate()}
          style={{ margin: 10 }}
          mode="contained"
          loading={translationState.currentState === STATE.LOADING}
          labelStyle={{ color: "white" }}
          onPress={handleTranslate}
        >
          {t("dich")}
        </Button>
      </View>
    </>
  );
}

InputTranslation.propTypes = {
  translationState: PropTypes.object,
  changeSourceText: PropTypes.func,
  changeTargetText: PropTypes.func,
  reset: PropTypes.func,
  translateAsync: PropTypes.func,
  translateAndDetectAsync: PropTypes.func,
};

const mapStateToProps = (state) => ({
  translationState: state.translation,
});

const mapDispatchToProps = {
  changeSourceText,
  changeTargetText,
  reset,
  translateAsync,
  translateAndDetectAsync,
};

export default connect(mapStateToProps, mapDispatchToProps)(InputTranslation);
