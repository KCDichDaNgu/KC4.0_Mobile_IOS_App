import React from "react";
import { TextInput, TouchableOpacity, Keyboard } from "react-native";
import { IconButton, Button, Divider, Text, Title } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { connect } from "react-redux";
import {
  changeSourceText,
  changeTargetText,
  reset,
  translateAsync,
  translateAndDetectAsync,
  changeInputFile,
  changeOutputFile,
  translateFileAsync,
  STATE,
} from "../../../redux/features/translationSlice";
import PropTypes from "prop-types";
import { View } from "react-native";
import { useTranslation } from "react-i18next";
import { textInputTranslateStyles } from "../translateScreen.styles";
import { cancelRequest } from "../../../helpers/axiosHelpers";
import * as DocumentPicker from "expo-document-picker";
function InputTranslation(props) {
  const { t } = useTranslation();
  const { translationState } = props;
  const [isKeyboardVisible, setKeyboardVisible] = React.useState(false);

  React.useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    // Return có nghĩa là remove listener khi component này được unmount.
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const handleTranslate = () => {
    props.changeTargetText("");
    if (translationState.inputFile) {
      const formData = new FormData();
      formData.append("file", {
        uri: translationState.inputFile.uri,
        type: translationState.inputFile.mimeType,
        name: translationState.inputFile.name,
      });
      formData.append("sourceLang", translationState.translateCode.sourceLang);
      formData.append("targetLang", translationState.translateCode.targetLang);
      props.translateFileAsync(formData);
    } else {
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
    }
  };

  const handleGetFiles = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: [
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "text/*",
      ],
    });
    if (result.type === "success") {
      props.changeInputFile(result);
    }
  };

  const isDisable = () => translationState.currentState === STATE.LOADING;

  const isDisableButtonTranslate = () => {
    if (
      translationState.translateText.sourceText.trim() === "" &&
      translationState.inputFile === null
    ) {
      return true;
    }
    if (translationState.currentState === STATE.LOADING) {
      return true;
    }
    if (isKeyboardVisible) {
      return true;
    }
    return false;
  };

  return (
    <>
      <View style={textInputTranslateStyles.inputCont}>
        <View style={{ alignItems: "flex-end" }}>
          {translationState.translateText.sourceText !== "" ||
          translationState.inputFile !== null ? (
            <IconButton
              disabled={isDisable()}
              icon="close"
              size={24}
              onPress={() => props.reset()}
              style={{ padding: 0, margin: 0 }}
            />
          ) : null}
        </View>
        {translationState.inputFile ? (
          <Title>{translationState.inputFile.name}</Title>
        ) : (
          <TextInput
            multiline
            editable={!isDisable()}
            style={{
              fontSize: 20,
              flex: 1,
              textAlignVertical: "top",
            }}
            placeholder={t("translateScreen_nhapNoiDungVanBan")}
            // Không dùng value vì nó gây bug lặp từ khi gõ bàn phím tiếng việt.
            // Link issue: https://github.com/facebook/react-native/issues/30503
            // value={translationState.translateText.sourceText}
            defaultValue={translationState.translateText.sourceText}
            onChangeText={props.changeSourceText}
          />
        )}
      </View>
      <Divider />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
          backgroundColor: "white",
        }}
      >
        <TouchableOpacity
          disabled={isDisable()}
          style={{ opacity: isDisable() ? 0.5 : 1 }}
          onPress={handleGetFiles}
        >
          <View
            style={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MaterialIcons name="source" size={24} color="black" />
            <Text>{t("chonTaiLieu")}</Text>
          </View>
        </TouchableOpacity>
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
        {translationState.currentState === STATE.LOADING ? (
          <Button
            style={{ marginVertical: 10, marginHorizontal: 5 }}
            mode="contained"
            color="red"
            labelStyle={{ color: "white" }}
            onPress={cancelRequest}
          >
            {t("huy")}
          </Button>
        ) : null}
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
  changeInputFile: PropTypes.func,
  changeOutputFile: PropTypes.func,
  translateFileAsync: PropTypes.func,
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
  changeInputFile,
  changeOutputFile,
  translateFileAsync,
};

export default connect(mapStateToProps, mapDispatchToProps)(InputTranslation);
