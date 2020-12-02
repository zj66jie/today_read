<template>
  <div class="search-bar">
    <div class="search-bar-title">
      <div class="title-icon-back">
        <span class="icon-back icon1"></span>
      </div>
      <div class="title-text">
        <span class="title-text-span icon1">书城</span>
      </div>
      <div class="title-icon-shake">
        <span class="icon-shake icon1"></span>
      </div>
    </div>
    <!-- <div class="search-bar-input">
      <span class="icon-search icon"></span>
      <input type="text" class="search" placeholder="输入搜索书籍" />
    </div> -->
  </div>
</template>

<script>
export default {
  name: "vueName",
  data() {
    return {
      msg: "Welcome to your vueName",
    };
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/styles/global.scss";
.search-bar {
  width: 100%;
  height: px2rem(50);
  .search-bar-title {
    width: 100%;
    display: flex;
    height: px2rem(50);
    justify-content: space-between;
    .title-icon-back {
      flex: 0 0 px2rem(40);
      @include center;
    }
    .title-text {
      flex: 0 0 px2rem(40);
      @include center;
    }
    .title-icon-shake {
      flex: 0 0 px2rem(40);
      @include center;
    }
  }
  .search-bar-input {
    @include center;
    margin: 0 px2rem(15);
    background: #f4f4f4;
    border-radius: px2rem(20);
    border: px2rem(1) solid #eee;
    box-sizing: border-box;
    padding: px2rem(5) px2rem(15);
    .search {
      color: #666;
      width: 100%;
      height: px2rem(22);
      background: transparent;
      font-size: px2rem(15);
      margin-left: px2rem(10);
      border: none;
      &:focus {
        outline: none;
      }
      &::-webkit-input-placeholder {
        color: #ccc;
      }
    }
  }
}
</style>
