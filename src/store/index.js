import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    fileName: "",
  },
  mutations: {
    SET_FILENAME(state, fileName) {
      state.fileName = fileName;
    },
  },
  actions: {
    setFileName(context, fileName) {
      return context.commit("SET_FILENAME", fileName);
    },
  },
  modules: {},
});
