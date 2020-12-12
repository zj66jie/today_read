<template>
  <div class="shelf">
    <div class="shelf-title">
      <div>书架</div>
      <div v-show="false">已选</div>
    </div>
    <div class="main">
      <div class="shelf-content">
        <!-- <span class="icon-private"></span> -->
      </div>
      <div class="book-shelf-item-wrapper">
        <div
          class="book-shelf-item"
          v-for="(subItem, subIndex) in bookList"
          :key="subItem.id"
          @click="onBookClick(subItem, subIndex)"
        >
          <div class="book-img-wrapper">
            <img :src="subItem.img" />
          </div>
          <div class="book-title-wrapper">
            <span class="book-title title-small">{{ subItem.title }}</span>
          </div>
        </div>
      </div>
      <ShelfItemAdd></ShelfItemAdd>
    </div>
  </div>
</template>

<script>
import ShelfItemAdd from "./shelfItemAdd";
import { shelfBooklist, bookList } from "@/utils/bookData.js";
import { setLocalStorage, getLocalStorage } from "@/utils/localStorage";
export default {
  name: "vueName",
  data() {
    return {
      bookList: [],
    };
  },
  components: {
    ShelfItemAdd,
  },
  created() {
    this.bookList = getLocalStorage("bookShelf");
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/styles/global.scss";
.shelf {
  width: 100%;
  // margin-bottom: px2rem(100);
  .shelf-title {
    font-size: px2rem(17);
    font-weight: bold;
    height: px2rem(42);
    box-shadow: 0 5px 5px rgba(66, 65, 65, 0.363);
    @include center;
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
          img {
            width: 100%;
          }
        }
      }
    }
  }
}
</style>
