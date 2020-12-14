// import { mapGetters, mapActions, mapMutations, mapState } from "vuex";
import { showBookDetail } from "./book";
// export const myMixin = {
//   //mapGetters和mapState在计算属性中定义
//   //使用对象展开运算符解析
//   computed: {
//     ...mapGetters([]),
//     ...mapState([]),
//   },

//   //mapActions和mapMutations在methods函数属性中用对象展开运算符
//   methods: {
//     ...mapActions(["setTest"]),
//     ...mapMutations([]),
//     text() {
//       this.setTest();
//     },
//   },
// };
export const ebookHome = {
  methods: {
    showBookDetail(item) {
      showBookDetail(this, item);
    },
  },
};
