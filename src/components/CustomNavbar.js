/* eslint-disable react/react-in-jsx-scope */
import React from "react";
import PropTypes from "prop-types";
import { Appbar } from "react-native-paper";

export default function CustomNavbar(props) {
  const { navigation, back, options, route } = props;

  return (
    <Appbar.Header>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      {/* <Appbar.Content title={!back ? route.name : options.title} /> */}
      <Appbar.Content title={!back ? route.name : options.title} />
    </Appbar.Header>
  );
}

CustomNavbar.propTypes = {
  navigation: PropTypes.object,
  back: PropTypes.any,
  options: PropTypes.object,
  route: PropTypes.object,
};
