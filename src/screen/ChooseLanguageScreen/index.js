/* eslint-disable react/prop-types */
import React from "react";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { fromLanguageSelect } from "../TranslateScreen/translateScreen.styles";
import { DefaultText } from "../../components/DefaultText";
import { useTranslation } from "react-i18next";

export default function ToLanguageScreen(props) {
  const { t } = useTranslation();
  const listLanguage = [
    {
      key: "vi",
      text: t("fromLanguage_viet"),
      code: "vi-VN",
    },
    // {
    //   key: 'TQ',
    //   text: 'Trung',
    //   code: 'zh-CN',
    // },
    // {
    //   key: 'KM',
    //   text: 'Khơme',
    //   code: 'km-KH',
    // },
    // {
    //   key: 'lao',
    //   text: 'Lào',
    //   code: 'lo-LA',
    // },
  ];

  return (
    <View style={fromLanguageSelect.container}>
      <View style={fromLanguageSelect.titleList}>
        <DefaultText style={fromLanguageSelect.textTitleList}>
          {t("toLanguageSelect_danhSachNgonNguDichSang")}
        </DefaultText>
      </View>
      <View style={fromLanguageSelect.selectLanguage}>
        <View>
          <FlatList
            // eslint-disable-next-line no-unused-vars
            keyExtractor={(listItem) => listItem.key}
            data={listLanguage}
            renderItem={({ item }) => <View></View>}
          />
        </View>
      </View>
    </View>
  );
}
