<template>
  <div class="add">
    <div class="shelf-item-add">
      <span class="icon-add icon" @click="add"></span>
      <p @click="add">添加图书</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "shelfItemAdd",
  data() {
    return {
      msg: "Welcome to your vueName",
    };
  },
  methods: {
    add() {
      this.$emit("add");
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/styles/global.scss";
.add {
  width: 100%;
  // position: fixed;
  // bottom: 0;
  margin-top: px2rem(20);
  @include center;
  .shelf-item-add {
    width: px2rem(87);
    height: px2rem(120);
    // background: rgb(255, 255, 255);
    // border: px2rem(1) solid #eee;
    // box-sizing: border-box;
    // @include center;
    // margin-top: px2rem(10);
    .icon-add {
      font-size: px2rem(40);
      color: #ccc;
      display: flex;
      justify-content: center;
      // @include center;
    }
    p {
      font-size: px2rem(15);
      display: flex;
      justify-content: center;
      color: #666;
    }
  }
}
</style>
