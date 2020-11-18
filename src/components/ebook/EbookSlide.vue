<template>
  <transition name="fade">
    <div class="slide-content-wrapper" v-show="$store.state.contentsVisable">
      <transition name="slide-right">
        <div
          class="content"
          :style="{ background: $store.state.background }"
          v-show="$store.state.contentsVisable"
        >
          <div class="content-page-wrapper">
            <div class="content-page">
              <component
                :is="currentTab === 1 ? content : bookmark"
              ></component>
            </div>
            <div class="content-page-tab">
              <div
                class="content-page-tab-item"
                :class="{ selected: currentTab === 1 }"
                @click="selectTab(1)"
              >
                目录
                <!-- {{ $t("book.navigation") }} -->
              </div>
              <div
                class="content-page-tab-item"
                :class="{ selected: currentTab === 2 }"
                @click="selectTab(2)"
              >
                书签
                <!-- {{ $t("book.bookmark") }} -->
              </div>
            </div>
          </div>
        </div>
      </transition>
      <div class="content-bg" @click="hideTitleAndMenu"></div>
    </div>
  </transition>
</template>

<script>
import EbookSliderContents from "./EbookSliderContents";
import EbookSlideBookmark from "./EbookSlideBookmark";
export default {
  name: "EbookSlider",
  data() {
    return {
      currentTab: 1,
      content: EbookSliderContents,
      bookmark: EbookSlideBookmark,
    };
  },
  methods: {
    hideTitleAndMenu() {
      this.$store.dispatch("contentsShow", false);
      this.$store.commit("TITLE_MENU_SHOW");
    },
    selectTab(tab) {
      this.currentTab = tab;
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/styles/global.scss";
.slide-content-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 300;
  display: flex;
  width: 100%;
  height: 100%;

  .content {
    flex: 0 0 85%;
    width: 85%;
    height: 100%;

    .content-page-wrapper {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;

      .content-page {
        flex: 1;
        width: 100%;
        overflow: hidden;
      }
      .content-page-tab {
        display: flex;
        flex: 0 0 px2rem(40);
        width: 100%;
        height: px2rem(40);
        border-top: 1px solid rgb(139, 139, 139);

        .content-page-tab-item {
          flex: 1;
          font-size: px2rem(15);
          @include center;
        }
      }
    }
    .content-empty {
      width: 100%;
      height: 100%;
      @include center;
    }
  }
  .content-bg {
    flex: 0 0 15%;
    width: 15%;
    height: 100%;
    background: rgba(80, 79, 79, 0.37);
  }
}
.selected {
  color: rgb(251, 132, 34);
}
</style>
