/* eslint-disable react/prop-types */
import React from "react";
import { DevSettings } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TranslateScreen from "../screen/TranslateScreen";
import ChooseLanguageScreen from "../screen/ChooseLanguageScreen";
import VocabularyScreen from "./VocabularyScreen";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { useTranslation } from "react-i18next";
import { CustomDrawer } from "../components/CustomDrawer";
import { signIn, getMe, signOut } from "../helpers/axiosHelpers";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constant/envVar";
import AsyncStorage from "@react-native-async-storage/async-storage";

WebBrowser.maybeCompleteAuthSession();

export default function MainScreen() {
  const { t } = useTranslation();
  const [userInfo, setUserInfo] = React.useState(null);

  const Drawer = createDrawerNavigator();

  const Stack = createNativeStackNavigator();

  // eslint-disable-next-line no-unused-vars
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId:
      "678502825589-458tr32q7p4q93b8a4633q47g9ehdl7r.apps.googleusercontent.com",
  });

  React.useEffect(() => {
    const getInfo = async () => {
      try {
        const accToken = await AsyncStorage.getItem(ACCESS_TOKEN);
        if (accToken) {
          const user = await getMe();
          setUserInfo(user);
        }
      } catch (e) {
        alert(e);
      }
    };
    getInfo();
  }, []);

  const logIn = async (authentication) => {
    try {
      const siginInResult = await signIn({
        access_token: authentication.accessToken,
        platform: "web",
      });
      AsyncStorage.setItem(ACCESS_TOKEN, siginInResult.data.accessToken);
      AsyncStorage.setItem(REFRESH_TOKEN, siginInResult.data.refreshToken);
      DevSettings.reload();
    } catch (e) {
      alert(e);
    }
  };

  React.useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      logIn(authentication);
    }
  }, [response]);

  const handleLogin = () => {
    promptAsync();
  };

  const handleLogout = async () => {
    try {
      await signOut();
      AsyncStorage.clear();
      DevSettings.reload();
    } catch (e) {
      alert(e);
    }
  };

  const Root = () => {
    return (
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={(props) => (
          <CustomDrawer
            {...props}
            handleLogin={handleLogin}
            handleLogout={handleLogout}
            userInfo={userInfo}
          />
        )}
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
