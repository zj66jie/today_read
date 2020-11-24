<template>
  <div class="guess-you-like">
    <TitleView :label="'猜你喜欢'"></TitleView>
    <div class="guess-you-like-list">
      <div
        class="guess-you-like-item"
        v-for="(item, index) in showData"
        :key="index"
        @click="showBookDetail(item)"
      >
        <div class="img-wrapper">
          <img class="img" :src="item.img" />
        </div>
        <div class="content-wrapper">
          <div class="title title-big">{{ item.title }}</div>
          <div class="author sub-title">{{ item.author }}</div>
          <div class="result third-title"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import TitleView from '@/components/home/title.vue'
import {guessLike} from '@/utils/bookData.js'
import { ebookHome } from '@/utils/mixin'
export default {
  name:'guessYouLike',
  mixins:[ebookHome],
  data() {
    return {
       showData:guessLike
    }
  },
  components: {
    TitleView
  },
  mounted() {
    console.log(this.showData);
  },
  methods: {

  },


}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../assets/styles/global";

.guess-you-like {
  .guess-you-like-list {
    width: 100%;
    padding: 0 px2rem(10);
    box-sizing: border-box;
    .guess-you-like-item {
      display: flex;
      margin-top: px2rem(15);
      &:first-child {
        margin-top: px2rem(5);
      }
      .img-wrapper {
        flex: 0 0 20%;
        padding: px2rem(10) px2rem(10) px2rem(10) 0;
        box-sizing: border-box;
        .img {
          width: 100%;
        }
      }
      .content-wrapper {
        flex: 1;
        padding: px2rem(10) 0;
        box-sizing: border-box;
        .author {
          margin-top: px2rem(15);
        }
        .result {
          margin-top: px2rem(5);
        }
      }
    }
  }
}
</style>
