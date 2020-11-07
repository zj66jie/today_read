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
            class="box1 "
            :class="{ isStyle: isSetStyle(item.box) }"
            :style="{ background: item.background }"
            @click="setThems(item.box)"
          >
          </el-button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import EbookReader from "./EbookReader";
import { saveFontSize, saveThemes, getThemes } from "../../utils/localStorage";
export default {
  name: "vueName",
  data() {
    return {
      boxStyle: [
        { box: "white", background: "#F6F6F6" },
        { box: "eye", background: "#D4EED1" },
        { box: "yellew", background: "#F6DAAB" },
        { box: "pink", background: "#FDE6E7" },
      ],
      // 定在rednder定义四个主题注册（在ebookReader中定义起作用）
      themeList: [
        {
          name: "white",
          style: {
            body: {
              color: "#303030",
              background: "#F6F6F6",
            },
          },
        },
        {
          name: "eye",
          style: {
            body: {
              color: "#3E6344",
              background: "#D4EED1",
            },
          },
        },
        {
          name: "yellew",
          style: {
            body: {
              color: "#664C35",
              background: "#F6DAAB",
            },
          },
        },
        {
          name: "blue",
          style: {
            body: {
              color: "#94A5B7",
              background: "#27384B",
            },
          },
        },
      ],
    };
  },
  methods: {
    //主题设置
    setThems(style) {
      // console.log(index);
      this.$store.commit("SET_DEFAULT_THEMS", style);

      // this.themeList.forEach((theme) => {
      //   this.$store.state.currentBook.rendition.themes.register(
      //     theme.name,
      //     theme.style
      //   );
      // });

      this.$store.state.currentBook.rendition.themes.select(style);

      saveThemes("thisThemes", style);
      console.log(getThemes("thisThemes"));
    },
    //主题设置UI边框显示
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
  .box :nth-of-type(2) {
    background-color: #033062;
  }
}
.el-button.is-round {
  //border-color: rgb(72, 196, 254);
  padding: 8px px2rem(30);
  font-size: px2rem(20);
}
</style>
