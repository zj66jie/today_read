<template>
  <!-- 首页 -->
  <div class="store-home">
    <!-- <button @click="test">2222</button> -->
    <searchBar></searchBar>
    <!-- <button @click="read">月的</button>
    <button @click="read2">月的</button> -->
    <div class="book-list" ref="bookListWrapper">
      <GuessYouLike></GuessYouLike>
      <LiteratureArt></LiteratureArt>
      <BestSelect></BestSelect>
      <TodayRecommend></TodayRecommend>
      <classic-works></classic-works>
      <category></category>
    </div>

    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
import searchBar from "@/components/home/searchBar.vue";
import GuessYouLike from "@/components/home/guessYouLike";
import BestSelect from "@/components/home/bestSelect.vue";
import TodayRecommend from "@/components/home/todayRecommend.vue";
import ClassicWorks from "@/components/home/classicWorks.vue";
import LiteratureArt from "@/components/home/literatureArt.vue";
import { setLocalStorage, getLocalStorage } from "@/utils/localStorage.js";
import Category from "../../components/home/category.vue";
export default {
  name: "vueName",
  data() {
    return {
      msg: "Welcome to your vueName",
      bookItem: 274990,
      rememberScroll: 0,
    };
  },
  components: {
    searchBar,
    GuessYouLike,
    BestSelect,
    TodayRecommend,
    ClassicWorks,
    LiteratureArt,
    Category,
  },
  methods: {
    read() {
      this.$router.push({
        path: `/ebook/${this.bookItem}`,
      });
    },
    test(e) {
      console.log(e);
    },
    read2() {
      this.$router.push({
        path: "/store/detail",
      });
    },
    handleScroll(e) {
      const target = e.target;
      // console.log(target.scrollTop);
      if (target) {
        this.rememberScroll = target.scrollTop;
        // console.log(this.rememberScroll);
      } else {
        this.rememberScroll = 0;
      }
    },
  },
  //实例销毁之前调用
  beforeDestroy() {
    if (this.rememberScroll) {
      setLocalStorage("offsetY", this.rememberScroll);
    } else {
      setLocalStorage("offsetY", 0);
    }
  },
  mounted() {
    // 获取到元素bookListWrapper，监听scroll，传入函数this.handleScroll
    this.$refs.bookListWrapper.addEventListener("scroll", this.handleScroll);
    // 根据本地缓存取出初始值并渲染页面
    this.rememberScroll = getLocalStorage("offsetY");
    this.$refs.bookListWrapper.scrollTo(0, this.rememberScroll);
  },
};
// window.onscroll = function() {
//   let jk = document.querySelector(".book-list").scrollTop;
//   console.log(jk);
// };
</script>

<style scoped lang="scss">
@import "@/assets/styles/global.scss";
.store-home {
  position: relative;
  width: 100%;
  height: 100%;
  .book-list {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
    // overflow: auto;
    -webkit-overflow-scrolling: touch;
    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
