<template>
  <div class="book-store">
    <keep-alive>
      <transition :name="transitionName">
        <router-view class="child-view" />
      </transition>
    </keep-alive>
  </div>
</template>

<script>
export default {
  data() {
    return {
      transitionName: "",
      rememberScroll: 0,
    };
  },
  beforeRouteUpdate(to, from, next) {
    if (to.meta.key > from.meta.key) {
      this.transitionName = "slide-left";
    } else {
      this.transitionName = "slide-right";
    }
    // this.transitionName = "slide-right";
    next();
  },
  components: {},
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "@/assets/styles/global.scss";

.book-store {
  position: relative;
  z-index: 100;
  width: 100%;
  height: 100%;
  background: white;
  overflow: hidden;
  .child-view {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    min-width: 200px;
    max-width: 640px;
    transform: translate3d(0, 0, 0);
    opacity: 1;
    &.slide-left-enter,
    &.slide-right-leave-to {
      transform: translate3d(100%, 0, 0);
      opacity: 0;
    }
    &.slide-left-leave-to,
    &.slide-right-enter {
      transform: translate3d(-100%, 0, 0);
      opacity: 0;
    }
    &.slide-left-enter-active,
    &.slide-left-leave-active {
      transition: all 0.2s linear;
    }
  }
}
</style>
