<template>
  <div class="ebook-slide-bookmark">
    <div class="slide-bookmark-title">
      书签· {{ bookmark ? bookmark.length : 0 }}
    </div>
    <scroll class="slide-bookmark-list" :top="48" :bottom="48">
      <div
        class="slide-bookmark-item"
        v-for="(item, index) in bookmark"
        :key="index"
        @touchstart="touchStart(item.cfi)"
        @touchend="touchEnd(item.cfi)"
        @touchmove="touchMove"
      >
        <div class="slide-bookmark-item-icon">
          <div class="icon-bookmark"></div>
        </div>
        <div class="slide-bookmark-item-text">{{ item.text }}</div>
      </div>
      <!-- <div class="slide-bookmark-item">
        <div class="slide-bookmark-item-icon">
          <div class="icon-bookmark icon"></div>
        </div>
        <div class="slide-bookmark-item-text">ggg</div>
      </div> -->
    </scroll>
    <div class="mask" v-show="maskShow" @click="maskShowOff">
      <div class="button">
        <el-button
          class="button-deleat"
          :style="{
            color: $store.state.color,
            background: $store.state.background,
          }"
          @click="removeBookmark"
          >删除该书签</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { getBookmark, saveBookmark } from "../../utils/localStorage";
import Scroll from "../commen/Scroll";
import { px2rem } from "../../utils/utils";
export default {
  name: "vueName",
  data() {
    return {
      bookmark: null,
      time: 0,
      timeOutEvent: null,
      jump: 0,
      maskShow: false,
      markTarget: null,
    };
  },
  components: {
    Scroll,
  },
  mounted() {
    this.bookmark = getBookmark(this.$store.state.fileName);
  },
  methods: {
    maskShowOff() {
      this.maskShow = false;
    },

    removeBookmark() {
      console.log(this.markTarget);
      this.bookmark = getBookmark(this.$store.state.fileName);
      if (this.bookmark) {
        saveBookmark(
          this.$store.state.fileName,
          this.bookmark.filter((item) => item.cfi !== this.markTarget)
        );
        //更新数据刷新页面
        this.bookmark = getBookmark(this.$store.state.fileName);
        // setTimeout(() => {
        //   this.bookmark = getBookmark(this.$store.state.fileName);
        // }, 1000);
        // this.setIsBookmark(false);
      }
    },
    touchStart(target) {
      this.jump = 0;
      this.timeOutEvent = setTimeout(() => {
        this.maskShow = true;
        this.markTarget = target;
        this.jump = 1;
      }, 1000);
    },
    touchMove() {
      clearTimeout(this.timeOutEvent);
      this.timeOutEvent = 0;
    },
    touchEnd(target) {
      clearTimeout(this.timeOutEvent);
      if (this.timeOutEvent != 0 && this.jump == 0) {
        this.$store.state.currentBook.rendition.display(target);
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/styles/global.scss";
.ebook-slide-bookmark {
  width: 100%;
  .slide-bookmark-title {
    font-size: px2rem(15);
    height: px2rem(45);
    line-height: px2rem(45);
    padding-left: px2rem(10);
    border-bottom: 1px solid rgb(139, 139, 139);
  }
  .slide-bookmark-list {
    width: 100%;
    height: px2rem(300);

    .slide-bookmark-item {
      display: flex;
      border-bottom: 1px solid rgb(139, 139, 139);
      margin: 0 px2rem(15);
      padding: px2rem(15) 0;
      .slide-bookmark-item-icon {
        line-height: px2rem(40);
        .icon-bookmark {
          font-size: px2rem(17);
        }
      }
      .slide-bookmark-item-text {
        margin-left: px2rem(5);

        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        white-space: normal;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: keep-all;

        // text-overflow: ellipsis;
        // overflow: hidden;
        // white-space: nowrap;

        font-size: px2rem(10);
        line-height: px2rem(15);
        max-height: px2rem(45);
      }
    }
  }
  .mask {
    position: fixed;
    z-index: 500;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(80, 80, 80, 0.5);
    .button {
      height: 100%;
      @include center;
      // margin-top: px2rem(250);
      .button-deleat {
        padding-left: px2rem(40);
        padding-right: px2rem(40);
        @include center;
        background: rgb(255, 255, 255);
        color: #000;
      }
    }
  }
}
</style>
