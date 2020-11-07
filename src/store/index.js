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
    progressVisible: false, ////显示进度条
    progress: 0, //进度条value
    section: 0, //
    bookAvisible: false, //进度条是否可用
    defaultFontFamily: "HanYiKai", //默认字体
    defaultThems: "white", //默认主题
    background: "#fff", //上下弹出框背景色
    currentBook: null, //接收EbookReader传递过来的book实例信息
    numText: 123,
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
    PROGRESS_SHOW(state, boolean) {
      state.progressVisible = boolean;
    },
    SET_DEFAULT_FAMILY(state, font) {
      state.defaultFontFamily = font;
    },
    SET_DEFAULT_FONTSIZE(state, fontSize) {
      state.fontSize = fontSize;
    },
    SET_PROGRESS_USE(state, bool) {
      state.bookAvisible = bool;
    },
    SET_PROGRESS(state, progress) {
      state.progress = progress;
    },
    SET_SECTION(state, section) {
      state.section = section;
    },

    SET_DEFAULT_THEMS(state, style) {
      state.defaultThems = style;
      switch (style) {
        case "white":
          state.background = "#F6F6F6";
          break;
        case "eye":
          state.background = "#D4EED1";
          break;
        case "yellew":
          state.background = "#F6DAAB";
          break;
        case "pink":
          state.background = "#FDE6E7";
          break;
        default:
          break;
      }
    },
    EPUB_BOOK(state, book) {
      state.currentBook = book;
    },
    // TEXT(state) {
    //   state.numText += 1;
    // },
  },
  actions: {
    setFileName(context, fileName) {
      return context.commit("SET_FILENAME", fileName);
    },
    fontFamileShow(context, boolean) {
      context.commit("FONT_FAMILY_SHOW", boolean);
    },
    setProgreess(context, progress) {
      return context.commit("SET_PROGRESS", progress);
    },
    setSection: ({ commit }, section) => {
      return commit("SET_SECTION", section);
    },
    // setTest(context) {
    //   context.commit("TEXT");
    // },

    // setTitleMenuShow(context) {
    //   context.commit("TITLE_MENU_SHOW");
    // },
  },
  modules: {},
});
