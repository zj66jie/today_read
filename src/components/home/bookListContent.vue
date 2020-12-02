<template>
  <div>
    <!-- <title-view :label="titleText" :btn="btnText"></title-view> -->
    <div class="book-list">
      <div class="book-item-wrapper">
        <div
          class="book-item"
          v-for="(item, index) in showData"
          :key="index"
          @click="showBookDetail(item)"
        >
          <div class="img-wrapper">
            <img class="img" :src="item.img" />
          </div>
          <div class="content-wrapper">
            <div class="title title-big">{{ item.title }}</div>
            <div class="author sub-title-tiny">
              {{ item.author }}
            </div>
            <div class="result">
              {{ item.desc }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ebookHome } from "@/utils/mixin";
import { guessLike } from "@/utils/bookData.js";
export default {
  name: "bookListContent",
  mixins: [ebookHome],
  data() {
    return {
      // showData: guessLike,
    };
  },
  props: {
    showData: Array,
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/styles/global.scss";
.book-list {
  width: 100%;
  padding: 0 px2rem(10);
  box-sizing: border-box;
  .book-item-wrapper {
    .book-item {
      display: flex;
      .img-wrapper {
        flex: 0 0 20%;
        padding: px2rem(10) px2rem(10) px2rem(10) 0;
        box-sizing: border-box;
        .img {
          width: 100%;
        }
      }
      .content-wrapper {
        flex: 1;
        padding: px2rem(10) 0;
        box-sizing: border-box;
        .author {
          margin-top: px2rem(10);
        }
        .result {
          line-height: px2rem(15);
          font-size: px2rem(12);
          // max-height: $text-small-max-height;
          color: #999;
          margin-top: px2rem(5);
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          white-space: normal;
          overflow: hidden;
          text-overflow: ellipsis;
          word-break: keep-all;
        }
      }
    }
  }
}
</style>
