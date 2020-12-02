<template>
  <div class="guess-you-like">
    <TitleView
      :label="'畅销精选'"
      :btn="'更多'"
      @onClick="showBookCategory"
    ></TitleView>
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
          <div class="result ">{{ item.desc }}</div>
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

  methods: {
    showBookCategory() {
        this.$router.push({
          path: '/store/list',
          query: {
            // category: getCategoryName(this.data.category),
            categoryText: '畅想精选'
          }
        })
      },
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
      // margin-top: px2rem(100);
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
          margin-top: px2rem(10);
        }
        .result {
          line-height: px2rem(15);
          font-size: px2rem(12);
          // max-height: $text-small-max-height;
          color: #999;
          margin-top: px2rem(5);
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          white-space: normal;
          overflow: hidden;
          text-overflow: ellipsis;
          word-break: keep-all;
        }
      }
    }
  }
}
</style>
