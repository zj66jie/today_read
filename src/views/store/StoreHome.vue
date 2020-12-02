<template>
  <!-- 首页 -->
  <div class="store-home">
    <searchBar></searchBar>
    <!-- <button @click="read">月的</button>
    <button @click="read2">月的</button> -->
    <div class="book-list">
      <GuessYouLike></GuessYouLike>
      <BestSelect></BestSelect>
    </div>
    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
import searchBar from "@/components/home/searchBar.vue";
import GuessYouLike from "@/components/home/guessYouLike";
import BestSelect from "@/components/home/bestSelect.vue";
export default {
  name: "vueName",
  data() {
    return {
      msg: "Welcome to your vueName",
      bookItem: 274990,
    };
  },
  components: {
    searchBar,
    GuessYouLike,
    BestSelect,
  },
  methods: {
    read() {
      this.$router.push({
        path: `/ebook/${this.bookItem}`,
      });
    },
    read2() {
      this.$router.push({
        path: "/store/detail",
      });
    },
  },
};
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
    -webkit-overflow-scrolling: touch;
    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
