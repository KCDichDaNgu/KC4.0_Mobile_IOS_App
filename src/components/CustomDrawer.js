/* eslint-disable react/prop-types */
import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { useTheme } from "react-native-paper";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { useTranslation } from "react-i18next";
import { Avatar, Card } from "react-native-paper";

export const CustomDrawer = (props) => {
  const { colors } = useTheme();
  const { t } = useTranslation();

  const LeftContent = (props) => (
    <Avatar.Image {...props} source={{ uri: props.userInfo?.data.avatar }} />
  );

  const filteredProps = {
    ...props,
    state: {
      ...props.state,
      routeNames: props.state.routeNames.filter(
        (routeName) => routeName !== "Main"
      ),
      routes: props.state.routes.filter((route) => route.name !== "Main"),
    },
  };

  return (
    <DrawerContentScrollView {...filteredProps}>
      {props.userInfo ? (
        <Card>
          <Card.Title
            title={props.userInfo?.data.firstName}
            subtitle={props.userInfo?.data.email}
            left={LeftContent}
          />
        </Card>
      ) : (
        <View style={{ ...styles.container, backgroundColor: colors.primary }}>
          <View style={styles.box1}>
            <View style={styles.inner}>
              <Image
                style={styles.imageLogo}
                // eslint-disable-next-line no-undef
                source={require("../asset/images/jsApp_assets_images_lg.png")}
              />
            </View>
          </View>
          <View style={styles.box2}>
            <View style={styles.inner}>
              <Text style={styles.textTitle}>Language Translation</Text>
              <Text style={styles.textDis}>
                {t("drawer_title_DichNgonNgu")}
              </Text>
            </View>
          </View>
        </View>
      )}
      <DrawerItemList {...filteredProps} />
      <DrawerItem
        label={props.userInfo ? "Logout" : "LogIn"}
        onPress={props.userInfo ? props.handleLogout : props.handleLogin}
      />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    height: 110,
    marginTop: -5,
  },
  box1: {
    width: "35%",
  },
  box2: {
    width: "65%",
  },
  inner: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imageLogo: {
    width: 90,
    height: 90,
  },
  textTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  textDis: {
    color: "#fff",
    fontSize: 16,
  },
});
