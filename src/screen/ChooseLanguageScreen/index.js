import React from "react";
import { View, ScrollView } from "react-native";
import { List, Subheading, Divider } from "react-native-paper";
import { connect } from "react-redux";
import { fromLanguageSelect } from "../TranslateScreen/translateScreen.styles";
import {
  changeSourceLang,
  changeTargetLang,
} from "../../redux/features/translationSlice";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

function ToLanguageScreen(props) {
  const { t } = useTranslation();
  const { translationState, route, navigation } = props;
  const listLanguage = [
    {
      key: "zh",
    },
    {
      key: "en",
    },
    {
      key: "km",
    },
    {
      key: "lo",
    },
  ];

  const isFromLang = () => {
    if (route.params.canDetect && translationState.isSwap) {
      return true;
    }
    if (!route.params.canDetect && !translationState.isSwap) {
      return true;
    }
    return false;
  };

  const onChangeText = (code) => {
    if (route.params.canDetect) {
      props.changeSourceLang(code);
    } else {
      props.changeTargetLang(code);
    }
    navigation.goBack();
  };

  return (
    <View style={fromLanguageSelect.container}>
      <ScrollView>
        {route.params.canDetect ? (
          <>
            <List.Item
              title={t("fromLanguageSelect_tuDongPhatHienNgonNgu")}
              left={(props) =>
                translationState.translateCode.sourceLang === null ? (
                  <List.Icon {...props} icon="check" />
                ) : (
                  <List.Icon {...props} icon="google-translate" />
                )
              }
              onPress={() => {
                props.changeSourceLang(null);
                navigation.goBack();
              }}
            />
            <Divider />
          </>
        ) : null}
        <List.Item
          title={
            <Subheading style={{ color: "#676464" }}>
              {t("toLanguageSelect_danhSachNgonNguDichSang")}
            </Subheading>
          }
        />
        {isFromLang() ? (
          <>
            {listLanguage.map((item) => (
              <List.Item
                key={item.key}
                title={t(item.key)}
                left={(props) =>
                  translationState.translateCode.targetLang === item.key ||
                  translationState.translateCode.sourceLang === item.key ? (
                    <List.Icon {...props} icon="check" />
                  ) : (
                    <List.Icon {...props} />
                  )
                }
                onPress={() => onChangeText(item.key)}
              />
            ))}
          </>
        ) : (
          <>
            <List.Item
              title={t("vi")}
              left={(props) =>
                translationState.translateCode.targetLang === "vi" ||
                translationState.translateCode.sourceLang === "vi" ? (
                  <List.Icon {...props} icon="check" />
                ) : (
                  <List.Icon {...props} />
                )
              }
              onPress={() => onChangeText("vi")}
            />
          </>
        )}
      </ScrollView>
    </View>
  );
}

ToLanguageScreen.propTypes = {
  route: PropTypes.object,
  navigation: PropTypes.object,
  translationState: PropTypes.object,
  changeSourceLang: PropTypes.func,
  changeTargetLang: PropTypes.func,
};

const mapStateToProps = (state) => ({
  translationState: state.translation,
});

const mapDispatchToProps = {
  changeSourceLang,
  changeTargetLang,
};

export default connect(mapStateToProps, mapDispatchToProps)(ToLanguageScreen);
