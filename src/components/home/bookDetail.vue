<template>
  <div class="book-detail">
    <detail-title @back="back" :showShelf="true" ref="title"></detail-title>
    <!-- 书籍详情页，可以跳转阅读，加入书架
    <button @click="test">test</button> -->
    <!-- {{ title }} -->
    <div class="content-wrapper">
      <div class="cover-title-wrapper">
        <div class="cover-title-left-wrapper">
          <img class="cover-img" :src="img" />
        </div>
        <div class="cover-title-right-wrapper">
          <div class="detail-cover-title-wrapper">
            <div class="cover-title-text">{{ title }}</div>
          </div>
          <div class="cover-author-wrapper">
            <div class="cover-author-text">{{ author }}</div>
          </div>
          <div class="detail-cover-description-wrapper">
            <div class="detail-cover-description-text">分类 · {{ sort }}</div>
          </div>
        </div>
      </div>
      <div class="cover-center-description-wrapper">
        <div class="cover-center-description-text1">书籍详情:</div>
        <div class="cover-center-description-text">{{ desc }}</div>
      </div>
    </div>

    <div class="bottom-wrapper">
      <div class="bottom-btn" @click="read()">
        阅读
      </div>
      <!-- <div class="bottom-btn" @click.stop.prevent="trialListening()">
        听书
      </div> -->
      <div class="bottom-btn" @click.stop.prevent="addOrRemoveShelf()">
        <!-- <span class="icon-check" v-if="inBookShelf"></span> -->
        加入书架
      </div>
    </div>
  </div>
</template>

<script>
import DetailTitle from "./detaiTitle";
import Scroll from "@/components/commen/Scroll";
import { bookList } from "@/utils/bookData.js";
export default {
  name: "vueName",
  data() {
    return {
      fileName: String,
      bookList: bookList,
      author: "",
      img: "",
      title: "",
      desc: "",
      sort: "",
    };
  },
  components: {
    DetailTitle,
    Scroll,
  },
  created() {
    // 根据路由获取书籍id
    this.fileName = this.$route.query.fileName;

    console.log(this.fileName);
    // console.log(thisfileName);
  },
  mounted() {
    console.log(this.bookList);
    for (let item in this.bookList) {
      if (this.bookList[item].fileName == this.fileName) {
        this.author = this.bookList[item].author;
        this.title = this.bookList[item].title;
        this.img = this.bookList[item].img;
        this.desc = this.bookList[item].desc;
        this.sort = this.bookList[item].sort;
        // console.log(this.author);
      }
    }
    // for (let index = 0; index < array.length; index++) {
    //   const element = array[index];

    // }
    // if (this.fileName=) {

    // }
  },
  methods: {
    read() {
      this.$router.push({
        path: `/ebook/${this.fileName}`,
      });
      this.$store.commit("TITLE_MENU_SHOW");
      console.log(this.fileName);
    },
    back() {
      this.$router.go(-1);
    },
    test() {
      console.log(this.bookList);
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/styles/global.scss";
.book-detail {
  width: 100%;
  background: white;
  .content-wrapper {
    width: 100%;
    .cover-title-wrapper {
      padding: 0 px2rem(15);
      padding-top: px2rem(25);
      padding-bottom: px2rem(15);
      display: flex;
      box-sizing: border-box;
      border-bottom: px2rem(1) solid #eee;
      .cover-title-left-wrapper {
        .cover-img {
          width: px2rem(103);
          height: px2rem(146);
        }
      }
      .cover-title-right-wrapper {
        flex: 1;
        padding: px2rem(10) px2rem(15);
        box-sizing: border-box;
        .detail-cover-title-wrapper {
          .cover-title-text {
            font-size: px2rem(24);
            line-height: px2rem(26);
            font-weight: bold;
            color: #333;
          }
        }
        .cover-author-wrapper {
          margin-top: px2rem(10);
          .cover-author-text {
            font-size: px2rem(14);
            line-height: px2rem(16);
            color: #666;
          }
        }
        .detail-cover-description-wrapper {
          margin-top: px2rem(10);
          .detail-cover-description-text {
            font-size: px2rem(14);
            line-height: px2rem(16);
            color: #666;
            // word-break: keep-all;
            // white-space: normal;
            // overflow: hidden;
            // text-overflow: ellipsis;
            // overflow-wrap: break-word;
          }
        }
      }
    }
    .cover-center-description-wrapper {
      padding: px2rem(10) px2rem(15);
      box-sizing: border-box;
      .cover-center-description-text1 {
        padding: px2rem(10) 0;
        font-size: px2rem(18);
        font-weight: bold;
      }
      .cover-center-description-text {
        font-size: px2rem(14);
        line-height: px2rem(16);
        color: #666;
      }
    }
  }
  .bottom-wrapper {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 120;
    display: flex;
    width: 100%;
    height: px2rem(45);
    box-shadow: 0 px2rem(-2) px2rem(2) rgba(0, 0, 0, 0.1);
    .bottom-btn {
      flex: 1;
      color: rgb(74, 171, 255);
      font-weight: bold;
      font-size: px2rem(14);
      @include center;
      &:active {
        color: rgba(74, 171, 255, 0.5);
      }
      .icon-check {
        margin-right: px2rem(5);
      }
    }
    &.hide-shadow {
      box-shadow: none;
    }
  }
}
</style>
