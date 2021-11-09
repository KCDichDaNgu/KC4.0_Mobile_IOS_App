import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
  },
  title: {
    paddingTop: 10,
    paddingLeft: 10,
    color: "#000",
    fontSize: 15,
  },
  translation: {
    paddingTop: 5,
    paddingLeft: 5,
    color: "#000",
    fontSize: 14,
  },
  result: {
    paddingTop: 5,
    paddingLeft: 5,
    color: "#616161",
    fontSize: 14,
    fontStyle: "italic",
  },
  stylesBox: {
    flexDirection: "row",
    paddingLeft: 15,
    paddingTop: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    backgroundColor: "#fff",
  },
  textVocabulary: {
    flex: 8,
  },
  iconVocabulary: {
    flex: 1,
  },
});
