/* eslint-disable react/prop-types */
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TranslateScreen from "../screen/TranslateScreen";
import ChooseLanguageScreen from "../screen/ChooseLanguageScreen";
import VocabularyScreen from "./VocabularyScreen";
import { useTranslation } from "react-i18next";
import { CustomDrawer } from "../components/CustomDrawer";

export default function MainScreen() {
  const { t } = useTranslation();

  const Drawer = createDrawerNavigator();

  const Stack = createNativeStackNavigator();

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
