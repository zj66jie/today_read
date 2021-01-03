<template>
  <div class="shelf">
    <div class="shelf-title">
      <div class="left" v-if="select" @click="back">
        <span class="icon icon-back"></span>
      </div>
      <div class="center" v-if="select"><span>书架</span></div>
      <div class="center" v-else>选择</div>
      <div class="right" @click="selectDelect">
        <span v-if="select">编辑</span><span v-else>取消</span>
      </div>
    </div>
    <div class="main">
      <div class="shelf-content">
        <!-- <span class="icon-private"></span> -->
      </div>
      <!-- 书架内容循环 -->
      <div class="book-shelf-item-wrapper">
        <div
          class="book-shelf-item"
          v-for="(subItem, subIndex) in bookList"
          :key="subIndex"
          @click="onBookClick(subItem, subIndex)"
        >
          <div class="book-img-wrapper">
            <img :src="subItem.img" />
            <span
              v-show="!select"
              class="icon-selected"
              :class="{ 'is-selected': isSelected.includes(subIndex) }"
            ></span>
          </div>
          <div class="book-title-wrapper">
            <span class="book-title title-small">{{ subItem.title }}</span>
          </div>
        </div>
      </div>
      <ShelfItemAdd @add="add"></ShelfItemAdd>
    </div>
    <transition name="slideMenu-up">
      <div class="shelf-bootom" v-show="delectWrapper">
        <div class="shelf-delect" @click="delect">
          <span>删除</span>
        </div>
      </div>
    </transition>

    <ShelfHomeMask
      @cancel="cancel"
      @remove="remove"
      :maskDelect="maskDelect"
    ></ShelfHomeMask>
  </div>
</template>

<script>
import ShelfItemAdd from "./shelfItemAdd";
import ShelfHomeMask from "./shelfHomeMask";
import { shelfBooklist, bookList } from "@/utils/bookData.js";
import { setLocalStorage, getLocalStorage } from "@/utils/localStorage";
import { ebookHome } from "@/utils/mixin";
export default {
  name: "vueName",
  mixins: [ebookHome],
  data() {
    return {
      bookList: [],
      select: true,
      delectWrapper: false,
      maskDelect: false,
      isSelected: [],
      selectedFileName: [],
    };
  },
  components: {
    ShelfItemAdd,
    ShelfHomeMask,
  },
  created() {
    this.bookList = getLocalStorage("bookShelf");
  },
  methods: {
    // 编辑
    back() {
      this.$router.go(-1);
    },
    selectDelect() {
      this.delectWrapper = !this.delectWrapper;
      this.select = !this.select;
      this.isSelected = [];
    },
    // 删除书架
    onBookClick(subItem, subIndex) {
      // console.log(subItem instanceof Array);
      // console.log(typeof subItem);
      if (this.select) {
        this.$router.push({
          path: "/store/detail",
          query: {
            fileName: subItem.fileName,
          },
        });
      } else {
        if (this.isSelected.includes(subIndex)) {
          this.isSelected = this.isSelected.filter((s) => {
            return s != subIndex;
          });
        } else {
          this.isSelected.push(subIndex);
        }

        if (this.selectedFileName.includes(subItem.fileName)) {
          this.selectedFileName = this.selectedFileName.filter((s) => {
            return s != subItem.fileName;
          });
        } else {
          this.selectedFileName.push(subItem.fileName);
        }
      }
    },
    delect() {
      this.maskDelect = true;
    },
    remove() {
      this.maskDelect = false;
      this.select = true;
      this.delectWrapper = false;
      this.delectBookShelf();
    },
    cancel() {
      this.maskDelect = false;
    },
    add() {
      this.$router.push({
        path: "/store/home",
      });
    },
    // 删除图书
    delectBookShelf() {
      //筛选出删除的图示
      for (const key of this.selectedFileName) {
        this.bookList = this.bookList.filter((s) => {
          return s.fileName != key;
        });
      }

      this.isSelected = [];
      //重新存储
      setLocalStorage("bookShelf", this.bookList);
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/styles/global.scss";
.shelf {
  width: 100vw;
  // margin-bottom: px2rem(100);
  .shelf-title {
    width: 100vw;
    font-size: px2rem(17);
    font-weight: bold;
    height: px2rem(42);
    box-shadow: 0 5px 5px rgba(66, 65, 65, 0.363);
    display: flex;
    .left {
      position: absolute;
      top: 0;
      left: 0;
      height: px2rem(42);
      font-size: px2rem(14);
      color: #666;
      width: px2rem(30);
      font-weight: 400;
      @include right;
    }
    .center {
      width: 100%;
      color: #666;
      @include center;
    }
    .right {
      position: absolute;
      top: 0;
      right: 0;
      height: px2rem(42);
      font-size: px2rem(14);
      color: #666;
      width: px2rem(45);
      font-weight: 400;
      @include left;
    }
  }
  .main {
    overflow: auto;
    margin-top: px2rem(15);
    height: 100%;
    .book-shelf-item-wrapper {
      display: flex;
      flex-flow: row wrap;
      padding: 0 px2rem(15);
      // justify-content: space-around;

      .book-shelf-item {
        flex: 0 0 33.3%;
        // width: 33.3%;
        // height: 100px;
        // margin: 0 auto;
        box-sizing: border-box;
        padding: px2rem(10) px2rem(15);
        // padding-bottom: px2rem(10);
        .book-img-wrapper {
          // width: 33.3%;
          position: relative;
          width: 100%;

          img {
            width: 100%;
            height: 32vw;
          }
        }

        .icon-selected {
          position: absolute;
          bottom: px2rem(8);
          right: px2rem(2);
          font-size: px2rem(18);
          color: rgba(0, 0, 0, 0.4);
          &.is-selected {
            color: rgb(74, 171, 255);
          }
        }
      }
    }
  }
  .shelf-bootom {
    height: px2rem(42);
    box-shadow: 0 -2px 5px rgba(66, 65, 65, 0.363);
    display: flex;
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    .shelf-delect {
      width: 100%;
      @include center;
      font-size: px2rem(17);
      color: rgb(245, 107, 107);
      span {
        // width: 100px;
        flex: 0 0 100px;
        height: 100%;
        @include center;
      }
    }
  }
}
</style>
