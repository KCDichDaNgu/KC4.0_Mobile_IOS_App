import React from "react";
import { Text, Platform } from "react-native";
import PropTypes from "prop-types";

export function DefaultText(props) {
  const { style, children, ...rest } = props;
  let platformFontFamily = "";
  if (Platform.OS === "android") {
    platformFontFamily = "Open Sans";
  } else if (Platform.OS === "ios") {
    platformFontFamily = "AL Nile";
  }

  if (platformFontFamily !== "") {
    return (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <Text style={{ ...style, fontFamily: platformFontFamily }} {...rest}>
        {children}
      </Text>
    );
  }

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Text style={{ ...style }} {...rest}>
      {children}
    </Text>
  );
}

DefaultText.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  children: PropTypes.node,
};
