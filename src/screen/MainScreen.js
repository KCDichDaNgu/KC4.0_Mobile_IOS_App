/* eslint-disable react/prop-types */
import React from "react";
import { Button, View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TranslateScreen from "../screen/TranslateScreen";
import ChooseLanguageScreen from "../screen/ChooseLanguageScreen";
import { useTranslation } from "react-i18next";

export default function MainScreen() {
  const { t } = useTranslation();

  function NotificationsScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Button onPress={() => navigation.goBack()} title="Go back home" />
      </View>
    );
  }

  const Drawer = createDrawerNavigator();

  const Stack = createNativeStackNavigator();

  const Root = () => {
    return (
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={TranslateScreen} />
        <Drawer.Screen name="Notifications" component={NotificationsScreen} />
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
