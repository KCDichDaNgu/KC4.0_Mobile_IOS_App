/* eslint-disable operator-linebreak */
import React from "react";
import PropTypes from "prop-types";
import { View, TouchableOpacity } from "react-native";
import { DefaultText } from "../../../components/DefaultText";
import { textInputTranslateStyles } from "../translateScreen.styles";

export default function InputTranslation(props) {
  return (
    <View style={textInputTranslateStyles.inputCont}>
      <View style={textInputTranslateStyles.inputTextCont}>
        <TouchableOpacity style={{ flexDirection: "row", flex: 1 }}>
          <DefaultText style={textInputTranslateStyles.inputTextStyle}>
            Hello
          </DefaultText>
        </TouchableOpacity>
      </View>
    </View>
  );
}

InputTranslation.propTypes = {
  setInputBox: PropTypes.func,
  setTextInputTranslate: PropTypes.func,
  fromLanguage: PropTypes.object,
};
