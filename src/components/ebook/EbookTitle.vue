<template>
  <div>
    <transition name="slideTitle-down">
      <div class="title-wrapper" v-show="$store.state.ifTitleMenuShow">
        <div class="left">
          <span class="icon-back icon"></span>
        </div>
        <div class="right">
          <div class="icon-wrapper">
            <span class="icon-shelf icon"></span>
          </div>
          <div class="icon-wrapper">
            <span class="icon-cart icon"></span>
          </div>
          <div class="icon-wrapper">
            <span class="icon-more icon"></span>
          </div>
        </div>
      </div>
    </transition>
    <!-- <div class="menu-wrapper">
      <div class="icon-wrapper">
        <span class="icon-menu"></span>
      </div>
      <div class="icon-wrapper">
        <span class="icon-progress"></span>
      </div>
      <div class="icon-wrapper">
        <span class="icon-bright"></span>
      </div>
      <div class="icon-wrapper">
        <span class="icon-A"></span>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  name: "EbookTitle",
  data() {
    return {
      msg: "Welcome to your vueName",
    };
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/styles/global.scss";
.title-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 200;
  display: flex;
  width: 100%;
  background-color: #fff;
  height: px2rem(45);
  box-shadow: 0 px2rem(8) px2rem(8) rgba($color: #000000, $alpha: 0.15);
  .right {
    display: flex;
    justify-content: flex-end;
    flex: 1;
    .icon-wrapper {
      @include center;
      flex: 0 0 px2rem(30);
    }
  }
  .left {
    flex: 0 0 px2rem(50);

    @include center;
  }
}
// .slideTitle-down-enter,
// .slideTitle-down-leave-to {
//   transform: translate3d(0, -100%, 0);
// }
// .slideTitle-down-enter-to,
// .slideTitle-down-leave {
//   transform: translate3d(0, 0, 0);
// }
// .slideTitle-down-enter-active,
// .slideTitle-down-leave-active {
//   transition: all 0.3s linear;
// }
</style>
