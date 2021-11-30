/* eslint-disable react/prop-types */
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TranslateScreen from "../screen/TranslateScreen";
import ChooseLanguageScreen from "../screen/ChooseLanguageScreen";
import VocabularyScreen from "./VocabularyScreen";
import LoginScreen from "./LoginScreen";
import * as WebBrowser from "expo-web-browser";
import { useTranslation } from "react-i18next";
import { CustomDrawer } from "../components/CustomDrawer";
import { ACCESS_TOKEN } from "../constant/envVar";
import { BackHandler, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

WebBrowser.maybeCompleteAuthSession();

export default function MainScreen() {
  const { t } = useTranslation();
  const [isLogin, setIsLogin] = React.useState(false);

  const Drawer = createDrawerNavigator();

  const Stack = createNativeStackNavigator();

  React.useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to go back?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        {
          text: "YES",
          onPress: () => {
            BackHandler.exitApp();
          },
        },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  React.useEffect(() => {
    const getToken = async () => {
      const token = await AsyncStorage.getItem(ACCESS_TOKEN);
      if (token) {
        setIsLogin(true);
      }
    };
    getToken();
  }, []);

  const Root = () => {
    return (
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={(props) => <CustomDrawer {...props} />}
      >
        <Drawer.Screen
          name="Home"
          options={{
            title: t("dich"),
          }}
          component={TranslateScreen}
        />
        <Drawer.Screen
          name="Vocab"
          options={{
            title: t("lichSu"),
          }}
          component={VocabularyScreen}
        />
        <Drawer.Screen
          name="Login"
          options={{
            title: !isLogin ? t("login") : t("thongTinNguoiDung"),
          }}
          component={LoginScreen}
        />
      </Drawer.Navigator>
    );
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={Root}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FromLanguage"
        component={ChooseLanguageScreen}
        options={{ title: t("fromLanguageScreen_dichTu") }}
      />
    </Stack.Navigator>
  );
}
