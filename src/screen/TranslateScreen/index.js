import React from "react";
import PropTypes from "prop-types";
import { View, ScrollView } from "react-native";
import { Divider } from "react-native-paper";
import { styles } from "./translateScreen.styles";
import ChooseLanguage from "./components/ChooseLanguage";
import InputTranslation from "./components/InputTranslation";

const TranslateScreen = (props) => {
  const { navigation } = props;

  return (
    <View style={styles.container}>
      <ScrollView>
        <ChooseLanguage navigation={navigation} />
        <Divider />
        <InputTranslation />
      </ScrollView>
    </View>
  );
};

TranslateScreen.propTypes = {
  navigation: PropTypes.object,
};

export default TranslateScreen;
