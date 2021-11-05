import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { TextInput, TouchableOpacity, Linking } from "react-native";
import * as Clipboard from "expo-clipboard";
import { useTranslation } from "react-i18next";
import { Card, useTheme, IconButton, Text } from "react-native-paper";
function ResultTranslateBox(props) {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { translationState } = props;

  const copyToClipboard = () => {
    Clipboard.setString(translationState.translateText.targetText);
  };

  const handleDownload = async () => {
    const url = `http://nmtuet.ddns.net:8000/${translationState.outputFile.target_file_full_path}`;
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      alert(`Don't know how to open this URL: ${url}`);
    }
  };

  const fileOutput = () => {
    switch (translationState.outputFile.target_lang) {
      case "vi":
        return t("anVaoDayDeTaiTaiLieuTiengViet");
      case "en":
        return t("anVaoDayDeTaiTaiLieuTiengAnh");
      case "zh":
        return t("anVaoDayDeTaiTaiLieuTiengTrung");
      case "lo":
        return t("anVaoDayDeTaiTaiLieuTiengLao");
      case "km":
        return t("anVaoDayDeTaiTaiLieuTiengKhome");
      default:
        return t("anVaoDayDeTaiTaiLieu");
    }
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
      {translationState.outputFile ? (
        <Card style={{ margin: 8, backgroundColor: colors.primary }}>
          <Card.Content>
            <TouchableOpacity onPress={handleDownload}>
              <Text style={{ textDecorationLine: "underline" }}>
                {fileOutput()}
              </Text>
            </TouchableOpacity>
          </Card.Content>
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
