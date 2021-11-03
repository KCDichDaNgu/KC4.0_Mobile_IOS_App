import React from "react";
import { TextInput } from "react-native";
import { IconButton, Button, Divider } from "react-native-paper";
import { connect } from "react-redux";
import {
  changeSourceText,
  reset,
} from "../../../redux/features/translationSlice";
import PropTypes from "prop-types";
import { View } from "react-native";
import { useTranslation } from "react-i18next";
import { textInputTranslateStyles } from "../translateScreen.styles";
function InputTranslation(props) {
  const { t } = useTranslation();
  const { translationState } = props;

  return (
    <>
      <View style={textInputTranslateStyles.inputCont}>
        <View style={{ alignItems: "flex-end" }}>
          {translationState.translateText.sourceText !== "" ? (
            <IconButton
              icon="close"
              size={20}
              onPress={() => props.reset()}
              style={{ padding: 0, margin: 0 }}
            />
          ) : null}
        </View>
        <TextInput
          multiline
          style={textInputTranslateStyles.inputTextStyle}
          placeholder={t("translateScreen_nhapNoiDungVanBan")}
          value={translationState.translateText.sourceText}
          onChangeText={props.changeSourceText}
        />
      </View>
      {translationState.translateText.sourceText !== "" ? (
        <>
          <Divider />
          <View
            style={{
              alignItems: "flex-end",
              justifyContent: "flex-end",
              backgroundColor: "white",
            }}
          >
            <Button
              style={{ margin: 10 }}
              mode="contained"
              labelStyle={{ color: "white" }}
              onPress={() => console.log("Pressed")}
            >
              {t("dich")}
            </Button>
          </View>
        </>
      ) : null}
    </>
  );
}

InputTranslation.propTypes = {
  translationState: PropTypes.object,
  changeSourceText: PropTypes.func,
  reset: PropTypes.func,
};

const mapStateToProps = (state) => ({
  translationState: state.translation,
});

const mapDispatchToProps = {
  changeSourceText,
  reset,
};

export default connect(mapStateToProps, mapDispatchToProps)(InputTranslation);
