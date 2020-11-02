<template>
  <transition name="slideMenu-up">
    <div class="setting-wrapper" v-show="$store.state.ifSettingShow">
      <div class="setting-font">
        <div class="setting-font-icon" @click="fontReduce">
          <el-button size="small" round>A -</el-button>
        </div>
        <div class="setting-font-num">{{ $store.state.fontSize }}</div>
        <div class="setting-font-icon" @click="fontAdd">
          <el-button size="small" round>A +</el-button>
        </div>
        <div class="setting-font-fonts">
          <div class="setting-font-click" @click="showSettingFamily">
            <span>字体</span>
            <span class="icon-forward"></span>
          </div>
          <!-- <span>字体</span> -->
        </div>
      </div>
      <!-- 主题设置 -->
      <div class="setting-font-theme">
        <div class="box" v-for="(item, index) in boxStyle" :key="index">
          <el-button
            round
            class="box1"
            :class="{ isStyle: isSetStyle(item.box) }"
            @click="setThems(item.box)"
          >
          </el-button>
        </div>
        <!-- <div class="box">
          <el-button round class="box1"></el-button>
        </div>
        <div class="box">
          <el-button round class="box1"></el-button>
        </div>
        <div class="box">
          <el-button round class="box1"></el-button>
        </div> -->
      </div>
    </div>
  </transition>
</template>

<script>
import EbookReader from "./EbookReader";
import { saveFontSize } from "../../utils/localStorage";
export default {
  name: "vueName",
  data() {
    return {
      boxStyle: [
        { box: "white" },
        { box: "eyeGreen" },
        { box: "gold" },
        { box: "black" },
      ],
      // 定在rednder定义四个主题注册
      // themeList: [
      //   {
      //     name: "Default",
      //     style: {
      //       body: {
      //         color: "#4CD1E0",
      //         background: "#cecece",
      //       },
      //     },
      //   },
      // ],
    };
  },
  methods: {
    //主题设置
    setThems(style) {
      console.log(style);
      this.$store.commit("SET_DEFAULT_THEMS", style);
    },
    //主题设置
    isSetStyle(isStyle) {
      return this.$store.state.defaultThems === isStyle;
    },

    fontAdd() {
      this.$store.commit("FONT_ADD");
      //console.log(this.$store.state.currentBook);
      this.$store.state.currentBook.rendition.themes.fontSize(
        this.$store.state.fontSize + "px"
      );
      saveFontSize(this.$store.state.fileName, this.$store.state.fontSize);
      // this.$store.state.currentBook;
      // EbookReader.methods.settingFontAdd();
    },
    fontReduce() {
      this.$store.commit("FONT_REDUCE");
      //console.log(this.$store.state.currentBook);
      this.$store.state.currentBook.rendition.themes.fontSize(
        this.$store.state.fontSize + "px"
      );
      saveFontSize(this.$store.state.fileName, this.$store.state.fontSize);
    },
    showSettingFamily() {
      this.$store.dispatch("fontFamileShow", true);
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/styles/global.scss";
.setting-wrapper {
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 202;
  height: px2rem(120);
  background-color: #fff;
  left: 0;
  box-shadow: 0 px2rem(-8) px2rem(8) rgba($color: #000000, $alpha: 0.15);
  .setting-font {
    display: flex;
    margin: px2rem(10) px2rem(10);
    .setting-font-icon {
      @include center;
      height: px2rem(30);
      flex: 0 0 px2rem(30);
      color: aqua;
    }
    .setting-font-fonts {
      display: flex;
      align-items: center;
      color: rgb(59, 58, 58);
      font-size: px2rem(18);
      flex: 1;
      justify-content: flex-end;
      .setting-font-click {
        height: 100%;
        width: px2rem(80);
        font-size: px2rem(17);
        @include center;
      }
    }
    .setting-font-num {
      @include center;
      color: darkgrey;
      font-size: px2rem(20);
      flex: 0 0 px2rem(60);
    }
  }
}
.setting-font-theme {
  display: flex;
  height: px2rem(70);
  justify-content: space-around;
  align-items: center;
  .box {
    width: px2rem(80);
    @include center;
    .box1 {
      padding: px2rem(15) px2rem(40);
      background-color: #fddda4;
      // border: 1px solid red;
    }
    .isStyle {
      border: 1px solid rgb(151, 150, 150);
    }
  }
}
.el-button.is-round {
  //border-color: rgb(72, 196, 254);
  padding: 8px px2rem(30);
  font-size: px2rem(20);
}
</style>
