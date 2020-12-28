<template>
  <div>
    <transition name="slideTitle-down">
      <div
        class="title-wrapper"
        :style="{ background: $store.state.background }"
        v-show="$store.state.ifTitleMenuShow"
      >
        <div class="left" @click="backLast">
          <span class="icon-back icon"></span>
        </div>
        <div class="right">
          <div class="icon-wrapper" @click="shelfTo">
            <span class="icon-shelf icon"></span>
          </div>
          <div class="icon-wrapper" @click="addBookmark">
            <span class="icon-bookmark icon"></span>
            <span
              class="add-mark"
              v-show="markShow"
              :style="{ color: $store.state.color }"
              >添加成功</span
            >
          </div>
          <!-- <div class="icon-wrapper">
            <span class="icon-more icon"></span>
          </div> -->
        </div>
      </div>
    </transition>
    <!-- <div class="menu-wrapper">
      <div class="icon-wrapper">
        <span class="icon-menu"></span>
      </div>
      <div class="icon-wrapper">
        <span class="icon-progress"></span>
      </div>
      <div class="icon-wrapper">
        <span class="icon-bright"></span>
      </div>
      <div class="icon-wrapper">
        <span class="icon-A"></span>
      </div>
    </div> -->
  </div>
</template>

<script>
import { getBookmark, saveBookmark } from "../../utils/localStorage";
export default {
  name: "EbookTitle",
  data() {
    return {
      markShow: false,
    };
  },

  methods: {
    backLast() {
      this.$router.go(-1);
    },
    shelfTo() {
      this.$router.push({
        path: "/store/shelf",
      });
    },
    addBookmark() {
      this.bookmark = getBookmark(this.$store.state.fileName);
      if (!this.bookmark) {
        this.bookmark = [];
      }
      const currentLocation = this.$store.state.currentBook.rendition.currentLocation();
      const cfibase = currentLocation.start.cfi.replace(/!.*/, "");
      const cfistart = currentLocation.start.cfi
        .replace(/.*!/, "")
        .replace(/\)$/, "");
      const cfiend = currentLocation.end.cfi
        .replace(/.*!/, "")
        .replace(/\)$/, "");
      const cfirange = `${cfibase}!,${cfistart},${cfiend})`;
      this.$store.state.currentBook.getRange(cfirange).then((range) => {
        const text = range.toString().replace(/\s\s/g, "");
        this.bookmark.push({
          cfi: currentLocation.start.cfi,
          text: text,
        });
        saveBookmark(this.$store.state.fileName, this.bookmark);
        this.markShow = true;
        setTimeout(() => {
          this.markShow = false;
        }, 1000);
      });
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/styles/global.scss";
.add-mark {
  position: fixed;
  top: 30px;
  right: 8px;
  font-size: px2rem(12);
  color: rgb(216, 153, 37);
}
.title-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 200;
  display: flex;
  width: 100%;
  background-color: #fff;
  height: px2rem(45);
  box-shadow: 0 px2rem(8) px2rem(8) rgba($color: #000000, $alpha: 0.15);
  .right {
    display: flex;
    justify-content: flex-end;
    flex: 1;
    margin-right: px2rem(10);
    .icon-wrapper {
      @include center;
      flex: 0 0 px2rem(30);
    }
  }
  .left {
    flex: 0 0 px2rem(50);

    @include center;
  }
}
// .slideTitle-down-enter,
// .slideTitle-down-leave-to {
//   transform: translate3d(0, -100%, 0);
// }
// .slideTitle-down-enter-to,
// .slideTitle-down-leave {
//   transform: translate3d(0, 0, 0);
// }
// .slideTitle-down-enter-active,
// .slideTitle-down-leave-active {
//   transition: all 0.3s linear;
// }
</style>
