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
//import { locationOf } from "epubjs/types/utils/core";

export default {
  name: "vueName",
  data() {
    return {
      BASE_URl: "http://127.0.0.1:5500/epub/",
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
      console.log("center");
    },
    initEpub() {
      const url = this.BASE_URl + this.$store.state.fileName + ".epub";
      //console.log(url);
      //渲染电子书
      this.book = new Epub(url);
      this.rendition = this.book.renderTo("read", {
        width: innerWidth,
        height: innerHeight,
        methods: "default",
      });
      this.rendition.display();
      //手势滑动翻页的实现
      this.rendition.on("touchstart", (event) => {
        this.touchStartX = event.changedTouches[0].clientX; //滑动位置
        this.touchStartTime = event.timeStamp; //点按事件
      });
      this.rendition.on("touchend", (event) => {
        const offsetX = event.changedTouches[0].clientX - this.touchStartX;
        const time = event.timeStamp - this.touchStartTime;
        // console.log(offsetX, time);
        if (time < 500 && offsetX > 40) {
          this.prevPage();
        }
        if (time < 500 && offsetX <= -40) {
          this.nextPage();
        } else {
          this.showTitleAndMenu();
        }
        // event.preventDefault();
        // event.stopPropagation();
      });
    },
  },
  mounted() {
    //const fileName = this.$route.params.fileName;
    //获取路由传入参数，并处理传入数据将|转换为/
    const fileName = this.$route.params.fileName.split("|").join("/");

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
  overflow: hidden;
  position: relative;
}
.mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
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