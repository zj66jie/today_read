<template>
  <div class="ebook-slide-contents">
    <!-- 搜索框 -->
    <!-- <div class="slide-contents-search-wrapper">
      <div class="slide-contents-search-input-wrapper">
        <div class="slide-contents-search-icon">
          <span class="icon-search"></span>
        </div>
        <input
          class="slide-contents-search-input"
          type="text"
          v-model="searchText"
          placeholder="输入搜索"
          @keyup.enter.exact="search()"
          @click="showSearchPage"
        />
      </div>
      <div class="slide-contents-search-cancel" @click="hideSearchPage()">
        取消
      </div>
    </div> -->
    <!-- //书籍封面等 -->
    <div class="slide-contents-book-wrapper">
      <div class="slide-contents-book-title">
        书名：
        {{ $store.state.metadata.title }}
      </div>
      <div class="slide-contents-book-creator">
        作者：
        {{ $store.state.metadata.creator }}
      </div>
    </div>
    <!-- 滚动目录 -->
    <Scroll class="slide-contents-list" :top="120" :bottom="1">
      <div
        class="slide-contents-item"
        v-for="(item, index) in $store.state.navigation"
        :key="index"
      >
        <span
          class="slide-contents-item-label"
          :class="{ selected: $store.state.section === index + 2 }"
          @click="displayContent(item.href, index)"
          >{{ item.label }}</span
        >
        <span class="slide-contents-item-page">{{ item.page }}</span>

        <!-- <span
          class="slide-contents-item-label"
          :class="{ selected: section === index }"
          :style="contentItemStyle(item)"
          @click="displayContent(item.href)"
          >{{ item.label }}</span
        >
        <span class="slide-contents-item-page">{{ item.page }}</span> -->
      </div>
    </Scroll>
  </div>
</template>

<script>
import Scroll from "../commen/Scroll";
import { px2rem } from "../../utils/utils";
export default {
  name: "vueName",
  data() {
    return {
      msg: "Welcome to your vueName",
    };
  },
  components: {
    Scroll,
  },
  methods: {
    displayContent(pageHref, index) {
      this.$store.state.currentBook.rendition.display(pageHref);
      this.$store.dispatch("contentsShow", false);
      this.$store.commit("TITLE_MENU_SHOW");
      console.log(index);
      this.$store.commit("SET_SECTION", index + 2);
      // SET_SECTION
      // this.$store.state.section === index;
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/styles/global.scss";
.ebook-slide-contents {
  width: 100%;
  .slide-contents-search-wrapper {
    display: flex;
    width: 100%;
    height: px2rem(30);
    margin: px2rem(20) 0 px2rem(10) 0;
    padding: 0 px2rem(15);

    box-sizing: border-box;
    .slide-contents-search-input-wrapper {
      @include center;
      border: 1px solid darkgoldenrod;
      .slide-contents-search-icon {
        font-size: px2rem(15);
        flex: 0 0 px2rem(28);
        @include center;
      }
      .slide-contents-search-input {
        flex: 1;
        width: 100%;
        height: px2rem(28);
        font-size: px2rem(14);
        background: transparent;
        border: none;
        &:focus {
          outline: none;
        }
      }
    }
    .slide-contents-search-cancel {
      flex: 0 0 px2rem(60);
      font-size: px2rem(15);
      display: flex;
      justify-content: flex-end;
      align-items: center;
      color: darkgoldenrod;
    }
  }
  .slide-contents-book-wrapper {
    box-sizing: border-box;
    padding: px2rem(10) px2rem(15);
    border-bottom: 1px solid rgb(139, 139, 139);
    width: 100%;
    .slide-contents-book-title {
      font-size: px2rem(25);
      line-height: px2rem(30);
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    .slide-contents-book-creator {
      font-size: px2rem(25);
      line-height: px2rem(30);
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }
  .slide-contents-list {
    padding: 0 px2rem(15);
    margin-top: px2rem(15);
    box-sizing: border-box;
    .slide-contents-item {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      font-size: px2rem(20);
      height: px2rem(50);
    }
  }
}
.selected {
  color: rgb(160, 160, 81);
}
</style>
