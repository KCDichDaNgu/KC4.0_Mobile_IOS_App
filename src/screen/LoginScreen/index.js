import React from "react";
import PropTypes from "prop-types";
import {
  View,
  ScrollView,
  Image,
  DevSettings,
  RefreshControl,
} from "react-native";
import * as Google from "expo-auth-session/providers/google";
import { TextInput, Button, Divider, Subheading } from "react-native-paper";
import { useTranslation } from "react-i18next";
import * as Updates from "expo-updates";
import * as WebBrowser from "expo-web-browser";
import { signIn, getMe, signOut } from "../../helpers/axiosHelpers";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constant/envVar";
import AsyncStorage from "@react-native-async-storage/async-storage";

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = (props) => {
  const { t } = useTranslation();
  const [userInfo, setUserInfo] = React.useState(null);
  const [isRefresh, setIsRefresh] = React.useState(false);

  // eslint-disable-next-line no-unused-vars
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId:
      "678502825589-458tr32q7p4q93b8a4633q47g9ehdl7r.apps.googleusercontent.com",
    androidClientId:
      "678502825589-d5aat910cj9a63tqven7id6a3ooqd55v.apps.googleusercontent.com",
  });

  // Trả về response => login vào hệ thống.
  React.useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      logIn(authentication);
    }
  }, [response]);

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
      // eslint-disable-next-line no-undef
      if (__DEV__) {
        DevSettings.reload();
      } else {
        await Updates.reloadAsync();
      }
    } catch (e) {
      alert(e);
    }
  };

  const handleLogin = () => {
    promptAsync();
  };

  const handleLogout = async () => {
    try {
      await signOut();
      AsyncStorage.clear();
      // eslint-disable-next-line no-undef
      if (__DEV__) {
        DevSettings.reload();
      } else {
        await Updates.reloadAsync();
      }
    } catch (e) {
      alert(e);
    }
  };

  const refresh = async () => {
    try {
      if (userInfo) {
        setIsRefresh(true);
        const user = await getMe();
        setUserInfo(user);
        setIsRefresh(false);
      }
    } catch (e) {
      alert(e);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        flexDirection: "column",
        backgroundColor: "white",
        padding: 20,
      }}
    >
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isRefresh} onRefresh={refresh} />
        }
      >
        <Image
          style={{
            width: 100,
            height: 100,
            alignSelf: "center",
            marginBottom: 20,
          }}
          source={
            // eslint-disable-next-line no-undef
            require("../../asset/images/jsApp_assets_images_lg.png")
          }
        />
        <TextInput
          style={{ marginBottom: 20 }}
          label={userInfo ? t("ten") : t("tenDangNhap")}
          value={userInfo?.data.firstName}
          disabled={userInfo !== null}
        />
        <TextInput
          style={{ marginBottom: 20 }}
          label={userInfo ? "Email" : t("matKhau")}
          value={userInfo?.data.email}
          disabled={userInfo !== null}
        />
        {userInfo !== null ? (
          <View style={{ paddingBottom: 20 }}>
            <Subheading>
              vi-zh: {userInfo?.data.totalTranslatedText["vi-zh"]}/
              {userInfo?.data.textTranslationQuota["vi-zh"]}
            </Subheading>
            <Subheading>
              vi-en: {userInfo?.data.totalTranslatedText["vi-en"]}/
              {userInfo?.data.textTranslationQuota["vi-en"]}
            </Subheading>
            <Subheading>
              vi-km: {userInfo?.data.totalTranslatedText["vi-km"]}/
              {userInfo?.data.textTranslationQuota["vi-km"]}
            </Subheading>
            <Subheading>
              vi-lo: {userInfo?.data.totalTranslatedText["vi-lo"]}/
              {userInfo?.data.textTranslationQuota["vi-lo"]}
            </Subheading>
          </View>
        ) : null}
        {userInfo !== null ? (
          <Button
            style={{ marginBottom: 20 }}
            mode="outlined"
            onPress={handleLogout}
          >
            {t("logout")}
          </Button>
        ) : (
          <>
            <Button
              style={{ marginBottom: 20 }}
              mode="outlined"
              onPress={() => console.log("Pressed")}
            >
              {t("login")}
            </Button>
            <Divider style={{ marginBottom: 20 }} />
            <Button
              icon="google"
              mode="outlined"
              color="red"
              onPress={handleLogin}
            >
              {t("loginWithGoogle")}
            </Button>
          </>
        )}
      </ScrollView>
    </View>
  );
};

LoginScreen.propTypes = {
  navigation: PropTypes.object,
};

export default LoginScreen;
