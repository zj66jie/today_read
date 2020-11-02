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
          name: "eye",
          style: {
            body: {
              color: "#4CD1E0",
              background: "#282C34",
            },
          },
        },
      ],
    };
  },
  methods: {
    nextPage() {
      if (this.rendition) {
        this.rendition.next();
      }
    },
    prevPage() {
      if (this.rendition) {
        this.rendition.prev();
      }
    },
    showTitleAndMenu() {
      // this.$store.state.ifTitleMenuShow = !this.$store.state.ifTitleMenuShow;
      this.$store.dispatch("fontFamileShow", false);
      this.$store.commit("SEETING_FONT_SHOW", false);
      this.$store.commit("TITLE_MENU_SHOW");
    },
    //主题注册
    registerTheme() {
      this.themeList.forEach((theme) => {
        this.rendition.themes.register(theme.name, theme.style);
      });
    },
    initEpub() {
      const url = this.BASE_URl + this.$store.state.fileName + ".epub";
      //console.log(url);
      //渲染电子书
      this.book = new Epub(url);
      console.log(this.book);
      this.$store.commit("EPUB_BOOK", this.book);
      this.rendition = this.book.renderTo("read", {
        width: innerWidth,
        height: innerHeight,
        methods: "default",
      });
      this.rendition.display().then(() => {
        //电子书渲染完毕字体
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
        //字号初始化设置
        let fontSize = getFontSize(this.$store.state.fileName);
        if (!fontSize) {
          //如果为空
          saveFontSize(this.$store.state.fileName, this.$store.state.fontSize);
        } else {
          this.rendition.themes.fontSize(fontSize + "px");
          this.$store.commit("SET_DEFAULT_FONTSIZE", fontSize);
        }
      });

      // 字体大小
      this.rendition.themes.fontSize(this.$store.state.fontSize + "px");
      //主题注册引入
      this.registerTheme();
      //主题使用
      this.rendition.themes.select("eye");
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
