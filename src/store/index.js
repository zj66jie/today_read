import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    fileName: "",
    fontSize: 22,
    ifTitleMenuShow: false, //上下栏
    ifSettingShow: false, //设置
    fontFamilyVisible: false, //显示字体设置
    defaultFontFamily: "HanYiKai", //默认字体
    defaultThems: "white", //默认字体
    currentBook: null, //接收EbookReader传递过来的book实例信息
  },
  mutations: {
    SET_FILENAME(state, fileName) {
      state.fileName = fileName;
    },
    TITLE_MENU_SHOW(state) {
      state.ifTitleMenuShow = !state.ifTitleMenuShow;
    },
    SEETING_FONT_SHOW(state, boolean) {
      state.ifSettingShow = boolean;
    },
    FONT_ADD(state) {
      state.fontSize += 3;
    },
    FONT_REDUCE(state) {
      state.fontSize -= 3;
    },
    FONT_FAMILY_SHOW(state, boolean) {
      state.fontFamilyVisible = boolean;
    },
    SET_DEFAULT_FAMILY(state, font) {
      state.defaultFontFamily = font;
    },
    SET_DEFAULT_FONTSIZE(state, fontSize) {
      state.fontSize = fontSize;
    },
    SET_DEFAULT_THEMS(state, style) {
      state.defaultThems = style;
    },
    EPUB_BOOK(state, book) {
      state.currentBook = book;
    },
  },
  actions: {
    setFileName(context, fileName) {
      return context.commit("SET_FILENAME", fileName);
    },
    fontFamileShow(context, boolean) {
      context.commit("FONT_FAMILY_SHOW", boolean);
    },
    // setTitleMenuShow(context) {
    //   context.commit("TITLE_MENU_SHOW");
    // },
  },
  modules: {},
});
