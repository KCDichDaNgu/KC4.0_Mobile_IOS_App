// import Constants from 'expo-constants';
import { StyleSheet } from "react-native";
import { appTheme } from "../../constant/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#eeeeee",
    // marginTop: Constants.statusBarHeight,
  },
  headerBarCont: {
    // borderColor: 'red',
    // borderWidth: 2,
    // height: '8.8%',
    // backgroundColor: appTheme.color.primary,
    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'center',
    flex: 13,
  },
  headerBarIcon: {
    marginLeft: 0,
    // alignSelf: 'center',
  },
  headerBarText: {
    color: "white",
    fontSize: 24,
    // display: 'flex',
    // alignSelf: '',
    // marginLeft: 'auto',
    // marginRight: 'auto',
  },
  chooseLanguageCont: {
    flex: 6,
    backgroundColor: "white",
    flexDirection: "row",
  },
  divider: {
    backgroundColor: "#B7B2B2",
    height: 2,
  },
  historyCont: {
    // borderColor: 'orange',
    // borderWidth: 2,
    flexGrow: 65,
  },
  detailsContainer: {
    backgroundColor: "#eeeeee",
    marginHorizontal: 10,
    marginVertical: 10,
  },
});
export const chooseLanguage = StyleSheet.create({
  fromLanguage: {
    flex: 4,
    justifyContent: "center",
    paddingLeft: 10,
  },
  iconSwitch: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  toLanguage: {
    flex: 4,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 10,
  },
  buttonStyleFrom: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  buttonSwitch: {
    borderWidth: 1,
    borderColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    backgroundColor: "#fff",
    borderRadius: 50,
  },
  text: {
    paddingRight: 5,
    color: "#000",
    fontSize: 15,
  },
});
export const fromLanguageSelect = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  detectLanguage: {
    height: 50,
    backgroundColor: "#fff",
    borderColor: "#eee",
    borderBottomWidth: 1,
    justifyContent: "center",
  },
  textDetectLanguage: {
    paddingLeft: 20,
    color: "#054D03",
    fontSize: 16,
  },
  titleList: {
    height: 30,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  textTitleList: {
    paddingLeft: 20,
    color: "#676464",
    fontSize: 15,
  },
  buttonStyle: {
    color: "#000",
    fontSize: 16,
    paddingTop: 5,
    paddingHorizontal: 40,
    textAlign: "left",
    justifyContent: "flex-start",
  },
});
export const textInputTranslateStyles = StyleSheet.create({
  inputCont: {
    // borderColor: 'blue',
    // borderWidth: 2,
    backgroundColor: "white",
    flexGrow: 1,
    justifyContent: "center",
    flexDirection: "column",
    minHeight: 200,
  },
  iconContainer: {
    // borderWidth: 2,
    // borderColor: 'blue',
    // position: 'absolute',
    // top: 5,
    // right: 18,
    flexDirection: "row",
    justifyContent: "flex-end",
    marginRight: 5,
    marginTop: 5,
  },
  microphoneAnimationContainerStyle: {
    // borderWidth: 2,
    // borderColor: 'blue',
    borderRadius: 50,
  },
  microphoneAnimationStyle: {
    width: 80,
    height: 80,
    backgroundColor: appTheme.color.secondary,
  },
  inputTextCont: {
    // borderWidth: 2,
    // borderColor: 'red',
    // height: '70%',
    minHeight: 150,
    flexDirection: "row",
    justifyContent: "flex-start",
    marginRight: 18,
    marginLeft: 18,
  },
  inputTextStyle: {
    // borderWidth: 2,
    // borderColor: 'red',
    fontSize: 20,
    height: 100,
    opacity: 0.5,
  },
});
export const textInputTranslatePopupStyles = StyleSheet.create({
  inputTextContScreen: {
    flexDirection: "row",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  inputBox: {
    flex: 9,
  },
  iconBack: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "flex-start",
    paddingTop: 10,
    backgroundColor: "#fff",
  },
  inputTextStyle: {
    // borderWidth: 2,
    // borderColor: 'red',
    fontSize: 17,
    height: 60,
    backgroundColor: "#fff",
  },
  historyTranslate: {
    backgroundColor: "#fff",
    minHeight: 60,
  },
  historyItemContainer: {
    flexDirection: "row",
    height: 50,
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
  },
  textItemContainer: {
    flex: 9,
    justifyContent: "center",
  },
  textItemHistory: {
    fontSize: 18,
    color: "#000",
  },
  historyItemIconContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export const afterTranslateFromStyle = StyleSheet.create({
  inputContAfter: {
    // borderColor: 'blue',
    // borderWidth: 2,
    backgroundColor: "white",
    flexGrow: 1,
    justifyContent: "center",
    flexDirection: "column",
  },
  topStuffContainer: {
    // borderWidth: 2,
    // borderColor: 'red',
    flexDirection: "row",
    justifyContent: "space-between",
  },
  volumeIconContainer: {
    flexDirection: "row",
    marginLeft: 5,
    marginTop: 5,
  },
  speakingLanguageStyle: {
    fontSize: 20,
    color: "#000",
  },
  closeIconContainer: {
    // borderWidth: 2,
    // borderColor: 'blue',
    marginRight: 5,
    marginTop: 5,
  },
  textTranslateFromCont: {
    // borderWidth: 2,
    // borderColor: 'red',
    // flexDirection: 'column',
    // height: '70%',
    justifyContent: "center",
    marginRight: 18,
    marginLeft: 18,
    marginTop: 10,
    // alignItems: 'center',
  },
  textTranslateFrom: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    minHeight: 150,
    // borderWidth: 2
    // borderColor: 'red'
    // flex: 1,
    flexGrow: 1,
    fontSize: 17,
    color: "#212121",
    textAlignVertical: "top",
    // alignSelf: 'center'
    // flexWrap: 'wrap'
    // height: '80%',
  },
});

export const resultTranslateStyle = StyleSheet.create({
  result: {
    backgroundColor: "#3b791a",
    minHeight: 140,
    marginBottom: 10,
    padding: 8,
    borderRadius: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 6,
  },
  speechText: {
    // height: 20,
    flexDirection: "row",
    // borderWidth: 2,
    // borderColor: 'red',
  },
  resultText: {
    minHeight: 80,
    marginTop: 10,
    // paddingTop: 5,
    // borderWidth: 2,
    // borderColor: 'red',
  },
  resultTextTranslate: {
    color: "#fff",
    paddingLeft: 10,
    paddingTop: 5,
    fontSize: 17,
  },
  resultTextSpelling: {
    color: "#fff",
    paddingLeft: 10,
  },
  speechTextBox2: {
    color: "#fff",
    paddingLeft: 10,
  },
  optionText: {
    height: 30,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  copyText: {
    width: 40,
    marginRight: 10,
  },
  moreOptionText: {
    width: 40,
    alignItems: "center",
  },
});

export const dictionaryBoxStyles = StyleSheet.create({
  dictionary: {
    backgroundColor: "#fff",
    minHeight: 150,
    borderRadius: 4,
  },
  title: {
    paddingLeft: 10,
    color: "#000",
    fontSize: 15,
  },
  typeWord: {
    paddingLeft: 12,
    color: "#616161",
    fontSize: 14,
    fontStyle: "italic",
  },
  textTranslate: {
    paddingTop: 5,
    paddingLeft: 25,
    color: "#000",
    fontSize: 14,
  },
  textDiscription: {
    paddingTop: 5,
    paddingLeft: 25,
    color: "#000",
    fontSize: 14,
  },
});

export const modalStyles = StyleSheet.create({
  box: {
    width: 150,
    height: 100,
    position: "absolute",
    right: 10,
    top: 150,
    backgroundColor: "#fff",
    borderRadius: 4,
    borderColor: "#ccc",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.62,
    elevation: 2,
    flexDirection: "column",
  },
  buttonClick1: {
    position: "absolute",
    zIndex: 10,
    borderWidth: 2,
    borderColor: "red",
    top: 10,
  },
  buttonClick2: {
    position: "absolute",
    zIndex: 10,
    borderWidth: 2,
    borderColor: "red",
    top: 50,
  },
});
