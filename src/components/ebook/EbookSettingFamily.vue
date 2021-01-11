<template>
  <transition name="popup-list">
    <div class="popup-list" v-show="$store.state.fontFamilyVisible">
      <div class="popup-title">
        <div class="popup-title-icon" @click="setFamilyDown">
          <span class="icon-down2 icon"></span>
        </div>
        <div class="popup-title-text">
          选择字体
        </div>
        <div></div>
      </div>
      <div class="popup-list-wrapper">
        <div
          class="popup-list-item"
          v-for="(item, index) in fontFamily"
          :key="index"
          @click="setFontFamily(item.font)"
        >
          <div
            class="popup-list-item-text"
            :class="{ selected: isSelected(item) }"
          >
            {{ item.font }}
          </div>
          <div class="popup-list-item-icon">
            <span
              class="icon-check icon"
              :class="{ selected: isSelected(item) }"
            ></span>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import {
  setLocalStorage,
  getLocalStorage,
  removeLocalStorage,
  clearLocalStorage,
} from "../../utils/localStorage";
import { saveFontFamily, getFontFamily } from "../../utils/localStorage";
export default {
  name: "vueName",
  data() {
    return {
      fontFamily: [
        { font: "HanYiKai" },
        { font: "Cabin" },
        { font: "Days One" },
        { font: "LanTing" },
        { font: "Tangerine" },
      ],
    };
  },
  // mounted() {
  //   // setLocalStorage("a", "2223");
  //   // setLocalStorage("b", "2bbbb");
  //   console.log(`${this.$store.state.fileName}-info`);
  //   // this.setFontFamily(this.$store.state.defaultFontFamily);
  //   // console.log(getLocalStorage(this.$store.state.fileName));
  //   // clearLocalStorage("b");
  // },
  methods: {
    setFontFamily(font) {
      // console.log(item);
      // this.setfontFamily = item;
      // this.isSelected(this.setfontFamily);
      this.$store.commit("SET_DEFAULT_FAMILY", font);
      saveFontFamily(this.$store.state.fileName, font);

      if (font === "HanYiKai") {
        console.log("HanYiKai");
        this.$store.state.currentBook.rendition.themes.font("HanYiKai");
      } else {
        this.$store.state.currentBook.rendition.themes.font(font);
      }

      // this.$store.state.currentBook.rendition.themes.font(font);
    },
    isSelected(item) {
      return this.$store.state.defaultFontFamily === item.font;
    },
    setFamilyDown() {
      this.$store.dispatch("fontFamileShow", false);
      // clearLocalStorage(); //清楚所有缓存
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/styles/global.scss";
.popup-list {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 300;
  background-color: #fff;
  height: px2rem(250);
  width: 100%;
  .popup-title {
    box-sizing: border-box;
    display: flex;
    padding: px2rem(20);
    height: px2rem(35);
    border-bottom: 1px solid #b8b9bb;
    // width: 100%;
    justify-content: space-between;
    // background-color: red;
    text-align: center;
    box-shadow: 0 px2rem(-4) px2rem(6) rgba($color: #000000, $alpha: 0.15);
    .popup-title-icon {
      @include center;
      font-weight: bold;
      .icon-down2 {
        font-size: px2rem(15);
      }
    }
    .popup-title-text {
      font-size: px2rem(15);
      @include center;
    }
  }
  .popup-list-wrapper {
    .popup-list-item {
      display: flex;
      justify-content: space-between;
      padding: 0 px2rem(20);
      .popup-list-item-text {
        height: px2rem(35);
        font-size: px2rem(15);
        @include center;
        &.selected {
          color: #346cb9;
        }
      }
      .popup-list-item-icon {
        height: px2rem(35);
        @include center;
        .icon-check {
          font-size: px2rem(15);
          &.selected {
            color: #346cb9;
          }
        }
      }
    }
  }
}
</style>
