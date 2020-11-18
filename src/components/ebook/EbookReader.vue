<template>
  <div class="ebook-reader">
    <div id="read"></div>
    <!-- 可以用 v-show="false"  切换翻页效果-->
    <div class="mask">
      <div class="left" @click="prevPage"></div>
      <div class="center" @click="showTitleAndMenu"></div>
      <div class="right" @click="nextPage"></div>
    </div>
  </div>
</template>

<script>
import Epub from "epubjs";

import {
  saveFontFamily,
  getFontFamily,
  getFontSize,
  saveFontSize,
  saveThemes,
  getThemes,
  saveLocation,
  getLocation,
} from "../../utils/localStorage";
export default {
  name: "vueName",
  components: {},
  data() {
    return {
      BASE_URl: "http://127.0.0.1:5500/epub/",
      fontSize: 10,
      // 主题资源
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
          name: "pink",
          style: {
            body: {
              color: "#87203B",
              background: "#FDE6E7",
            },
          },
        },
      ],
    };
  },
  methods: {
    nextPage() {
      if (this.rendition) {
        this.rendition.next().then(() => {
          this.refreshLocation();
        });
      }
    },
    prevPage() {
      if (this.rendition) {
        this.rendition.prev().then(() => {
          this.refreshLocation();
        });
      }
    },
    showTitleAndMenu() {
      // this.$store.state.ifTitleMenuShow = !this.$store.state.ifTitleMenuShow;
      this.$store.dispatch("fontFamileShow", false);
      this.$store.commit("SEETING_FONT_SHOW", false);
      this.$store.commit("PROGRESS_SHOW", false);
      this.$store.commit("TITLE_MENU_SHOW");
    },
    //主题注册
    registerTheme() {
      this.themeList.forEach((theme) => {
        this.rendition.themes.register(theme.name, theme.style);
      });
    },
    //初始化字体
    initFamily() {
      this.rendition.themes.font("HanYiKai"); //默认字体
      let font = getFontFamily(this.$store.state.fileName);
      if (!font) {
        //如果为空
        saveFontFamily(
          this.$store.state.fileName,
          this.$store.state.defaultFontFamily
        );
      } else {
        this.rendition.themes.font(font);
        this.$store.commit("SET_DEFAULT_FAMILY", font);
      }
    },
    //初始化字号
    initFontSize() {
      let fontSize = getFontSize(this.$store.state.fileName);
      if (!fontSize) {
        //如果为空
        saveFontSize(this.$store.state.fileName, this.$store.state.fontSize);
      } else {
        this.rendition.themes.fontSize(fontSize + "px");
        this.$store.commit("SET_DEFAULT_FONTSIZE", fontSize);
      }
    },
    //初始化主题
    initThemes() {
      let theme = getThemes("thisThemes");
      console.log(theme);
      if (!theme) {
        //如果为空
        saveThemes("thisThemes", this.$store.state.defaultThems);
      } else {
        this.rendition.themes.select(theme);
        this.$store.commit("SET_DEFAULT_THEMS", theme);
      }
    },
    //初始化进度
    initProgress() {
      let progress = getLocation(this.$store.state.fileName);
      if (!progress) {
        this.rendition.display();
      } else {
        this.rendition.display(progress).then(() => {
          this.refreshLocation();
        });
      }
    },
    //目录 模块
    parseBook() {
      this.book.loaded.navigation.then((nav) => {
        console.log(nav);
        this.$store.state.navigation = nav.toc;
        // const navItem = flatten(nav.toc)

        // function find(item, level = 0) {
        //   return !item.parent ? level : find(navItem.filter(parentItem => parentItem.id === item.parent)[0], ++level)
        // }

        // navItem.forEach(item => {
        //   item.level = find(item)
        // })
        // this.setNavigation(navItem)
      });
      this.book.loaded.metadata.then((metadata) => {
        // this.setMetadata(metadata)
        this.$store.dispatch("saveMetaData", metadata);
        console.log(metadata);
      });
    },
    initEpub() {
      const url = this.BASE_URl + this.$store.state.fileName + ".epub";
      //console.log(url);
      //渲染电子书
      this.book = new Epub(url);

      this.$store.commit("EPUB_BOOK", this.book);
      console.log(this.book);
      this.rendition = this.book.renderTo("read", {
        width: innerWidth,
        height: innerHeight,
        methods: "default",
      });
      //渲染完毕后
      this.rendition.display().then(() => {
        this.initFamily();
        this.initFontSize();
        this.registerTheme();
        this.initThemes();
        this.parseBook();
        this.initProgress();
        // this.rendition.themes.select(this.$store.state.defaultThems);
      });
      //滑动进度条
      this.book.ready
        .then(() => {
          return this.book.locations.generate(
            750 *
              (window.innerWidth / 375) *
              (getFontSize(this.$store.state.fileName) / 16)
          );
        })
        .then((res) => {
          this.$store.commit("SET_PROGRESS_USE", true);
          console.log(res);
          this.initProgress();
          // this.locations = this.book.locations;
          // this.rendition.display(this.locations.cfiFromPercentage(0.5));
        });

      // 字体大小
      this.rendition.themes.fontSize(this.$store.state.fontSize + "px");
      //主题注册引入
      // this.registerTheme();
      //主题使用
      // this.rendition.themes.select(this.$store.state.defaultThems);

      //字体文件引入
      this.rendition.hooks.content.register((contents) => {
        Promise.all([
          contents.addStylesheet("http://127.0.0.1:5500/fonts/daysOne.css"),
          contents.addStylesheet("http://127.0.0.1:5500/fonts/cabin.css"),
          contents.addStylesheet("http://127.0.0.1:5500/fonts/HanYiKai.css"),
        ]).then(() => {});
      });

      //手势滑动翻页的实现
      // this.rendition.on("touchstart", (event) => {
      //   this.touchStartX = event.changedTouches[0].clientX; //滑动位置
      //   this.touchStartTime = event.timeStamp; //点按事件
      // });
      // this.rendition.on("touchend", (event) => {
      //   const offsetX = event.changedTouches[0].clientX - this.touchStartX;
      //   const time = event.timeStamp - this.touchStartTime;
      //   // console.log(offsetX, time);
      //   if (time < 500 && offsetX > 40) {
      //     this.prevPage();
      //   }
      //   if (time < 500 && offsetX <= -40) {
      //     this.nextPage();
      //   } else {
      //     this.showTitleAndMenu();
      //   }
      //   // event.preventDefault();
      //   // event.stopPropagation();
      // });
    },
    //刷新和存储进度
    refreshLocation() {
      const currentLocation = this.$store.state.currentBook.rendition.currentLocation();
      // const progress = this.$store.state.currentBook.locations.percentageFromCfi(
      //   currentLocation.start.cfi
      // );
      const startCfi = currentLocation.start.cfi;
      // console.log(currentLocation.start.index + "ddd");
      // console.log(progress);
      saveLocation(this.$store.state.fileName, startCfi);
      this.$store.dispatch("setSection", currentLocation.start.index);
      //更新进度条 vuex
      this.$store.dispatch(
        "setProgreess",
        Math.floor(currentLocation.start.percentage * 100)
      );
    },
  },
  mounted() {
    //获取路由传入参数，并处理传入数据将|转换为/
    const fileName = this.$route.params.fileName.split("|").join("/");
    this.fontSize = this.$store.state.fontSize;
    this.$store.dispatch("setFileName", fileName).then(() => {
      this.initEpub();
    });
    console.log(fileName);
    //console.log(`${BASE_URl}.epub`);
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/styles/global.scss";
.ebook-reader {
  width: 100%;
  height: 100%;
  position: relative;
}

.mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 101;
  display: flex;

  .left {
    flex: 0 0 px2rem(100);
    //background: red;
  }
  .right {
    flex: 0 0 px2rem(100);
  }
  .center {
    flex: 1;
  }
}
</style>
