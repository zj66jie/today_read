<template>
  <div class="popup-wrapper">
    <div class="mask" v-show="maskDelect"></div>
    <transition name="slideMenu-up">
      <div class="popup-wrapper-content" v-show="maskDelect">
        <div class="popup-test">确定移出书架</div>
        <div class="popup-remove" @click="remove">确定</div>
        <div class="popup-cancel" @click="cancel">取消</div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "vueName",
  props: {
    maskDelect: Boolean,
  },
  data() {
    return {
      msg: "Welcome to your vueName",
    };
  },
  methods: {
    remove() {
      this.$emit("remove");
    },
    cancel() {
      this.$emit("cancel");
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/styles/global.scss";
.popup-wrapper {
  .mask {
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(83, 81, 81, 0.548);
    top: 0;
    z-index: 300;
  }

  // // height: px2rem(200);
  // box-shadow: 0 -5px 5px rgba(66, 65, 65, 0.363);
  .popup-wrapper-content {
    position: fixed;
    z-index: 301;
    bottom: 0;
    background-color: rgb(255, 255, 255);
    width: 100%;
    .popup-test {
      @include center;
      font-size: px2rem(15);
      height: px2rem(43);
      color: #999;
      border-bottom: 1px solid #eee;
    }
    .popup-remove {
      font-size: px2rem(18);
      height: px2rem(50);
      border-bottom: 1px solid #eee;
      color: rgb(245, 104, 104);
      @include center;
    }
    .popup-cancel {
      border-bottom: 1px solid #eee;
      height: px2rem(50);
      font-size: px2rem(18);
      color: #666;
      @include center;
    }
  }
}
</style>
