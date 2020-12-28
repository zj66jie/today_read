<template>
  <div class="search-page">
    <div class="search-bar-input">
      <span class="icon-search icon-text"></span>
      <input
        type="text"
        @keyup.enter="search"
        class="search"
        placeholder="输入搜索书籍"
      />
      <span class="text" @click="back">取消</span>
    </div>
    <div class="search-content">
      <div v-if="content">
        <bookListContent :showData="showData"></bookListContent>
      </div>
      <div class="search-content-none" v-else>
        无匹配内容
      </div>
    </div>
  </div>
</template>

<script>
import bookListContent from "./bookListContent";
import { bookList } from "@/utils/bookData.js";
export default {
  name: "vueName",
  data() {
    return {
      msg: "Welcome to your vueName",
      showData: [],
      content: true,
    };
  },
  components: {
    bookListContent,
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    search(e) {
      let val = e.currentTarget.value;
      console.log(val);
      let newShowData = bookList.filter((s) => {
        return s.title.indexOf(val) > -1;
      });
      if (newShowData.length > 0) {
        this.content = true;
        this.showData = newShowData;
      } else {
        this.content = false;
      }
      // this.showData = newShowData;
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/styles/global.scss";
.search-page {
  width: 100%;
  // margin-top: px2rem(30);
  .search-bar-input {
    @include center;
    margin: px2rem(10) px2rem(15);
    background: #f4f4f4;
    border-radius: px2rem(20);
    border: px2rem(1) solid #eee;
    box-sizing: border-box;
    padding: px2rem(5) px2rem(15);
    .text {
      width: px2rem(40);
      height: px2rem(20);
      font-size: px2rem(10);
      color: #666;
      @include center;
    }
    .icon-text {
      color: #666;
      font-size: px2rem(18);
    }
    .search {
      color: #666;
      width: 100%;
      height: px2rem(22);
      background: transparent;
      font-size: px2rem(15);
      margin-left: px2rem(10);
      border: none;
      &:focus {
        outline: none;
      }
      &::-webkit-input-placeholder {
        color: #ccc;
      }
    }
  }
  .search-content-none {
    margin-top: px2rem(50);
    font-size: px2rem(10);
    color: #666;
    @include center;
  }
}
</style>
