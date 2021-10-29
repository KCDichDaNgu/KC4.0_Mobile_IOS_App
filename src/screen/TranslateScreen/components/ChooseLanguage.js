import React from "react";
import PropTypes from "prop-types";
import { TouchableOpacity, View, Animated, Easing } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { DefaultText } from "../../../components/DefaultText";
import { styles, chooseLanguage } from "../translateScreen.styles";

export default function ChooseLanguage(props) {
  const { navigation } = props;
  // Reenable this in the future when we can switch language
  const opacity = new Animated.Value(0);
  // eslint-disable-next-line no-unused-vars
  const animate = () => {
    opacity.setValue(0);
    Animated.timing(opacity, {
      toValue: 1,
      duration: 400,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(() => switchLanguage());
  };
  // eslint-disable-next-line no-unused-vars
  const size = opacity.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });
  const switchLanguage = () => {
    // const tmpCode = fromCodeLanguage;
    // setFromCodeLanguage(toCodeLanguage);
    // setToCodeLanguage(tmpCode);
  };

  const fromLanguageView = () => (
    <TouchableOpacity onPress={() => navigation.navigate("FromLanguage", {})}>
      <View style={chooseLanguage.buttonStyleFrom}>
        <DefaultText style={chooseLanguage.text}>Hello</DefaultText>
        <MaterialIcons name="arrow-drop-down" size={24} color="black" />
      </View>
    </TouchableOpacity>
  );

  const toLanguageView = () => (
    <TouchableOpacity onPress={() => navigation.navigate("FromLanguage", {})}>
      <View style={chooseLanguage.buttonStyleFrom}>
        <DefaultText style={chooseLanguage.text}>Hello</DefaultText>
        <MaterialIcons name="arrow-drop-down" size={24} color="black" />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.chooseLanguageCont}>
      <View style={chooseLanguage.fromLanguage}>{fromLanguageView()}</View>
      <View style={chooseLanguage.iconSwitch}>
        <TouchableOpacity
          onPress={() => {
            // animate();
          }}
          style={chooseLanguage.buttonSwitch}
        >
          <Animated.View style={{ transform: [{ rotate: size }] }}>
            {/* <Icon name="exchange" type="font-awesome" size={18} color="#000" /> */}
            <MaterialIcons name="swap-horiz" size={24} color="black" />
          </Animated.View>
        </TouchableOpacity>
      </View>
      <View style={chooseLanguage.toLanguage}>{toLanguageView()}</View>
    </View>
  );
}

ChooseLanguage.propTypes = {
  navigation: PropTypes.object,
};
