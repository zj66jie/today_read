<template>
  <transition name="slideMenu-up">
    <div
      class="Aprogress"
      v-show="$store.state.progressVisible"
      :style="{ background: $store.state.background }"
    >
      <!-- <div class="block">
        <el-slider v-model="value2"></el-slider>
      </div> -->

      <div class="progress-wrapper">
        <div class="progress-icon-wrapper">
          <span class="icon-back icon" @click="prevSection()"></span>
        </div>
        <div>
          <input
            class="progress"
            type="range"
            max="100"
            min="0"
            step="1"
            @input="onProgressInput($event.target.value)"
            @change="onProgressChange($event.target.value)"
            :value="$store.state.progress"
            :disabled="!$store.state.bookAvisible"
          />
        </div>

        <div class="progress-icon-wrapper" @click="nextSection()">
          <span class="icon-forward icon"></span>
        </div>
      </div>
      <div class="read-progress">进度{{ $store.state.progress }}%</div>
    </div>
  </transition>
</template>

<script>
import { saveLocation } from "../../utils/localStorage";
export default {
  name: "EbookSettingProgress",
  data() {
    return {
      percentage: 0,
    };
  },
  methods: {
    prevSection() {
      if (this.$store.state.section > 0 && this.$store.state.bookAvisible) {
        // this.isProgressLoading = true;
        this.$store
          .dispatch("setSection", this.$store.state.section - 1)
          .then(() => {
            this.displaySection();
          });
      }
    },
    nextSection() {
      if (
        this.$store.state.currentBook.spine.length - 1 >
          this.$store.state.section &&
        this.$store.state.bookAvisible
      ) {
        this.$store
          .dispatch("setSection", this.$store.state.section + 1)
          .then(() => {
            this.displaySection();
          });
      }
    },
    onProgressInput(progress) {
      this.$store.dispatch("setProgreess", progress);
    },
    onProgressChange(progress) {
      this.$store.dispatch("setProgreess", progress).then(() => {
        this.disPlayProgress();
      });
    },
    disPlayProgress() {
      //得出进度信息
      const cfi = this.$store.state.currentBook.locations.cfiFromPercentage(
        this.$store.state.progress / 100
      );
      console.log(cfi);
      //跳转对应进度页面
      this.$store.state.currentBook.rendition.display(cfi).then(() => {
        this.refreshLocation();
      });

      // const sectionLocation = this.$store.state.currentBook.locations();
      // console.log(sectionLocation.start.index + "333");
      // this.$store.dispatch("setSection", sectionLocation.start.index);

      // this.percentage = this.$store.state.progress;
    },
    displaySection() {
      const sectionInfo = this.$store.state.currentBook.section(
        this.$store.state.section
      );
      if (sectionInfo && sectionInfo.href) {
        this.$store.state.currentBook.rendition
          .display(sectionInfo.href) //跳转
          .then(() => {
            this.refreshLocation();
          });
      }
    },
    //刷新和存储进度
    refreshLocation() {
      const currentLocation = this.$store.state.currentBook.rendition.currentLocation();
      const progress = this.$store.state.currentBook.locations.percentageFromCfi(
        currentLocation.start.cfi
      );
      const startCfi = currentLocation.start.cfi;
      // console.log(currentLocation);
      // console.log(progress);
      // console.log(sectionLocation.start.index + "333");
      //更新station vuex
      saveLocation(this.$store.state.fileName, startCfi);
      // saveFontFamily(this.$store.state.fileName, font);
      this.$store.dispatch("setSection", currentLocation.start.index);

      //更新进度条 vuex
      this.$store.dispatch(
        "setProgreess",
        Math.floor(currentLocation.start.percentage * 100)
      );
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/styles/global.scss";
.Aprogress {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 300;

  width: 100%;
  height: px2rem(60);
  background-color: #fff;
  box-shadow: 0 px2rem(-8) px2rem(8) rgba($color: #000000, $alpha: 0.15);
  // @include center;

  .progress-wrapper {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: px2rem(30);
    margin-top: px2rem(5);
    // padding: 0 px2rem(10);
    box-sizing: border-box;
    @include center;
    .progress-icon-wrapper {
      @include center;
    }
    .progress {
      @include center;
      width: px2rem(300);
      height: px2rem(2);
      // -webkit-appearance: none;
      // background: -webkit-linear-gradient(#3c679c, #2870c8) no-repeat, #b4b5b7;
      // background-size: 0 100%;
      margin: 0 px2rem(10);
      &:focus {
        outline: none;
      }
      &::-webkit-slider-thumb {
        -webkit-appearance: none;
        height: px2rem(20);
        width: px2rem(20);
        border-radius: 50%;
        background: #ceced0;
        box-shadow: 0 px2rem(4) px2rem(6) 0 rgba(0, 0, 0, 0.15);
        border: none;
      }
    }
  }
  .read-progress {
    font-size: px2rem(15);
    color: rgb(179, 179, 179);
    width: 100%;
    text-align: center;
  }
  .block {
    height: 30px;
    width: 70%;
  }
}
</style>
