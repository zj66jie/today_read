<template>
  <div>
    <transition name="slideMenu-up">
      <div class="menu-wrapper" v-show="$store.state.ifTitleMenuShow">
        <div class="icon-wrapper">
          <span class="icon-menu icon"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-progress icon"></span>
        </div>
        <!-- <div class="icon-wrapper">
        <span class="icon-bright icon"></span>
      </div> -->
        <div class="icon-wrapper" @click="showSettingFont">
          <span class="icon-A icon"></span>
        </div>
      </div>
    </transition>
    <EbookSettingFamily></EbookSettingFamily>
  </div>
</template>

<script>
import EbookSettingFamily from "./EbookSettingFamily";
export default {
  name: "EBookMenu",
  data() {
    return {
      msg: "Welcome to your vueName",
    };
  },
  components: {
    EbookSettingFamily,
  },
  methods: {
    showSettingFont() {
      this.$store.commit("SEETING_FONT_SHOW", true);
      // this.$store.commit("TITLE_MENU_SHOW");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/global.scss";

.menu-wrapper {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 201;
  display: flex;
  width: 100%;
  height: px2rem(45);
  background-color: #fff;
  box-shadow: 0 px2rem(-8) px2rem(8) rgba($color: #000000, $alpha: 0.15);
  /* justify-content: space-around; */
  .icon-wrapper {
    @include center;
    flex: 1;
  }
}
// .slideMenu-up-enter,
// .slideMenu-up-leave-to {
//   transform: translate3d(0, 100%, 0);
// }
// .slideMenu-up-enter-to,
// .slideMenu-up-leave {
//   transform: translate3d(0, 0, 0);
// }
// .slideMenu-up-enter-active,
// .slideMenu-up-leave-active {
//   transition: all 0.3s linear;
// }
</style>
