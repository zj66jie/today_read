<template>
  <div class="book-list-wrapper">
    <detail-title
      :title="titleText"
      :showShelf="true"
      @back="back"
      ref="title"
    ></detail-title>
    <scroll class="book-list-scroll-wrapper" :top="42">
      <bookListContent :showData="showData"></bookListContent>
      <!-- 显示内容，可以传递过去具体的数据 -->
    </scroll>
  </div>
</template>

<script>
import DetailTitle from "./detaiTitle";
import bookListContent from "./bookListContent";
import Scroll from "@/components/commen/Scroll.vue";
import * as bookDataList from "@/utils/bookData.js";
// import * as bookData from "@/utils/bookData.js";
export default {
  name: "vueName",
  data() {
    return {
      title: "书本",
      titleText: "",
      showData: [],
    };
  },
  components: {
    DetailTitle,
    bookListContent,
    Scroll,
  },
  created() {
    // this.getList();
    this.titleText = this.$route.query.categoryText; //接收路由信息，筛选图书数据
    console.log(this.titleText);
    switch (this.titleText) {
      case "经典之作":
        this.showData = bookDataList.classicWorks;
        break;
      case "文学艺术":
        this.showData = bookDataList.LiteratureArt;
        break;
      case "计算机科学":
        this.showData = bookDataList.bookList.filter((s) => {
          return s.sort == "计算机科学";
        });
        break;

      default:
        break;
    }
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/styles/global.scss";
</style>
