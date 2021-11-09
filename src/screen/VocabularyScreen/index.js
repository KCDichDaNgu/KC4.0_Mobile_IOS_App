import React, { useEffect, useState } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { styles } from "./VocabularyScreen.styles";
import {
  List,
  IconButton,
  ProgressBar,
  ActivityIndicator,
} from "react-native-paper";
import { FlatList } from "react-native";
import {
  getTranslateHistory,
  getTranslateResult,
} from "../../helpers/axiosHelpers";
import {
  changeSourceText,
  changeTargetText,
  changeSourceLang,
  changeTargetLang,
  swapLang,
} from "../../redux/features/translationSlice";

let page = 1;
const PER_PAGE = 9;
const STATUS = "translated";
const TRANSLATIONTYPE = "public_plain_text_translation";

const STATE = {
  INIT: "init",
  LOADING: "loading",
  SUCCESS: "success",
};

function VocabularyScreen(props) {
  const { navigation, translationState } = props;
  const [currentState, setCurrentState] = useState(STATE.INIT);
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    getListPage(page);
    setCurrentState(STATE.LOADING);
  }, []);

  const trimText = (text) => {
    const trimText = text.trim();
    return trimText.length > 10 ? text.substring(0, 10) + "..." : text;
  };

  const getListPage = async (page) => {
    try {
      setCurrentState(STATE.LOADING);
      const result = await getTranslateHistory({
        status: STATUS,
        translationType: TRANSLATIONTYPE,
        perPage: PER_PAGE,
        page,
      });
      const data = await Promise.all(
        result.data.list.map(async (item) => {
          const result = await getTranslateResult(item.resultUrl);
          return {
            id: item.id,
            ...result,
          };
        })
      );
      if (page === 1) {
        setList(data);
      } else {
        setList([...list, ...data]);
      }
      setTotal(result.data.total_entries);
      setCurrentState(STATE.SUCCESS);
    } catch (e) {
      alert(e);
      setCurrentState(STATE.INIT);
    }
  };

  const getMoreList = () => {
    if (total !== list.length) {
      page += 1;
      getListPage(page);
    }
  };

  const handleButton = (item) => {
    // Swap true: en, zh, lo, km => vn , False: vn => en, zh, lo, km
    if (translationState.isSwap) {
      if (item.source_lang === "vi") {
        props.swapLang({
          // ? Tại sao lại đảo ngược
          // Vì là ở Slice trong hàm swap đã hoán đổi vị trí, nếu như
          // trong hàm này không hoán đổi thì 2 ngôn ngũ ko thay đổi.
          // => Fai đảo ngược vị trí như ở dưới.
          targetLang: item.source_lang,
          sourceLang: item.target_lang,
        });
      } else {
        props.changeSourceLang(item.source_lang);
        props.changeTargetLang(item.target_lang);
      }
    } else {
      if (item.source_lang !== "vi") {
        props.swapLang({
          targetLang: item.source_lang,
          sourceLang: item.target_lang,
        });
      } else {
        props.changeSourceLang(item.source_lang);
        props.changeTargetLang(item.target_lang);
      }
    }
    props.changeSourceText(item.source_text);
    props.changeTargetText(item.target_text);
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      {page === 1 ? (
        <ProgressBar indeterminate visible={currentState === STATE.LOADING} />
      ) : null}
      <FlatList
        data={list}
        renderItem={({ item }) => (
          <List.Item
            title={item ? trimText(item.source_text) : null}
            description={item ? trimText(item.target_text) : null}
            right={(props) => (
              <IconButton
                {...props}
                icon="send"
                onPress={() => handleButton(item)}
              />
            )}
          />
        )}
        keyExtractor={(item) => item.id}
        onEndReached={getMoreList}
        onEndReachedThreshold={0}
        ListFooterComponent={
          <ActivityIndicator animating={currentState === STATE.LOADING} />
        }
      />
    </View>
  );
}

VocabularyScreen.propTypes = {
  navigation: PropTypes.object,
  translationState: PropTypes.object,
  changeSourceText: PropTypes.func,
  changeTargetText: PropTypes.func,
  changeSourceLang: PropTypes.func,
  changeTargetLang: PropTypes.func,
  swapLang: PropTypes.func,
};

const mapStateToProps = (state) => ({
  translationState: state.translation,
});

const mapDispatchToProps = {
  changeSourceText,
  changeTargetText,
  changeSourceLang,
  changeTargetLang,
  swapLang,
};

export default connect(mapStateToProps, mapDispatchToProps)(VocabularyScreen);
