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
        <span class="icon-check" v-if="inBookShelf"> 已加入书架</span>
        <span v-else>加入书架</span>
      </div>
    </div>
  </div>
</template>

<script>
import DetailTitle from "./detaiTitle";
import Scroll from "@/components/commen/Scroll";
import { bookList } from "@/utils/bookData.js";
import { setLocalStorage, getLocalStorage } from "@/utils/localStorage";
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
      id: 1,
      shelfBooklist: [],
      inBookShelf: false,
    };
  },
  components: {
    DetailTitle,
    Scroll,
  },
  created() {
    // 根据路由获取书籍id
    this.fileName = this.$route.query.fileName;
    //判断是否存在缓存书架信息
    if (getLocalStorage("bookShelf")) {
      this.shelfBooklist = getLocalStorage("bookShelf");
    }
    //判断是否当前图书已经加入书架
    if (this.shelfBooklist) {
      let addRemove = this.shelfBooklist.some((s) => {
        return s.fileName == this.fileName;
      });

      if (addRemove) {
        this.inBookShelf = true;
      }
    }
  },
  mounted() {
    // console.log(this.bookList);
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
    addOrRemoveShelf() {
      this.inBookShelf = !this.inBookShelf;

      if (this.shelfBooklist) {
        let addRemove = this.shelfBooklist.some((s) => {
          return s.fileName == this.fileName;
        });
        console.log(addRemove);
        if (addRemove) {
          //移除书架
          let newShelfBooklist = this.shelfBooklist.filter((s) => {
            return s.fileName != this.fileName;
          });
          //重新存储
          setLocalStorage("bookShelf", newShelfBooklist);
          // this.inBookShelf = true;
          // for (let item in this.shelfBooklist) {
          //   if (this.shelfBooklist[item].fileName == this.fileName) {
          //     // this.shelfBooklist[item].type = 2;
          //     setLocalStorage("bookShelf", this.shelfBooklist);
          //   }
          // }
        } else {
          this.shelfBooklist.push({
            id: this.shelfBooklist.length + 1,
            fileName: this.fileName,
            img: this.img,
            title: this.title,
            author: this.author,
            type: 1,
          });
          setLocalStorage("bookShelf", this.shelfBooklist);
        }
      } else {
        this.shelfBooklist.push({
          id: this.shelfBooklist.length + 1,
          fileName: this.fileName,
          img: this.img,
          title: this.title,
          author: this.author,
          type: 1,
        });
        setLocalStorage("bookShelf", this.shelfBooklist);
      }

      // shelfBooklist.push({
      //   id: shelfBooklist.length + 1,
      //   fileName: this.fileName,
      //   img: this.img,
      //   title: this.title,
      //   author: this.author,
      //   type: 1,
      // });
      // setLocalStorage("bookShelf", shelfBooklist);
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
