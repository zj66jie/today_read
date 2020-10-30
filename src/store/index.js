import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    fileName: "",
    fontSize: 10,
    ifTitleMenuShow: false,
    ifSettingShow: false,
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
  },
  actions: {
    setFileName(context, fileName) {
      return context.commit("SET_FILENAME", fileName);
    },
  },
  modules: {},
});
