import React from "react";
import PropTypes from "prop-types";
import { TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";
import { Title, IconButton } from "react-native-paper";
import { styles, chooseLanguage } from "../translateScreen.styles";
import { swapLang } from "../../../redux/features/translationSlice";
import { useTranslation } from "react-i18next";
function ChooseLanguage(props) {
  const { t } = useTranslation();
  const { navigation, translationState } = props;

  const showFromLang = (code) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("FromLanguage", { canDetect: true })}
    >
      <View style={chooseLanguage.buttonStyleFrom}>
        <Title style={chooseLanguage.text}>
          {code ? t(code) : t("phatHienNgonNgu")}
        </Title>
        <MaterialIcons name="arrow-drop-down" size={24} color="black" />
      </View>
    </TouchableOpacity>
  );

  const showToLang = (code) => (
    <TouchableOpacity
      onPress={() =>
        translationState.translateCode.targetLang !== "vi"
          ? navigation.navigate("FromLanguage", { canDetect: false })
          : null
      }
    >
      <View style={chooseLanguage.buttonStyleFrom}>
        <Title style={chooseLanguage.text}>{t(code)}</Title>
        {translationState.translateCode.targetLang !== "vi" ? (
          <MaterialIcons name="arrow-drop-down" size={24} color="black" />
        ) : null}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.chooseLanguageCont}>
      <View style={chooseLanguage.fromLanguage}>
        {showFromLang(translationState.translateCode.sourceLang)}
      </View>
      <View style={chooseLanguage.iconSwitch}>
        <TouchableOpacity style={chooseLanguage.buttonSwitch}>
          <IconButton
            disabled={translationState.translateCode.sourceLang === null}
            icon="swap-horizontal"
            size={24}
            onPress={() =>
              props.swapLang({
                sourceLang: translationState.translateCode.sourceLang,
                targetLang: translationState.translateCode.targetLang,
              })
            }
          />
        </TouchableOpacity>
      </View>
      <View style={chooseLanguage.toLanguage}>
        {showToLang(translationState.translateCode.targetLang)}
      </View>
    </View>
  );
}

ChooseLanguage.propTypes = {
  navigation: PropTypes.object,
  translationState: PropTypes.object,
  swapLang: PropTypes.func,
};

const mapStateToProps = (state) => ({
  translationState: state.translation,
});

const mapDispatchToProps = {
  swapLang,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChooseLanguage);
