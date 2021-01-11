<template>
  <div class="guess-you-like">
    <TitleView
      :label="'经典之作'"
      :btn="'更多'"
      @onClick="showBookCategory"
    ></TitleView>
    <div class="guess-you-like-list">
      <div
        class="guess-you-like-item"
        v-for="(item, index) in showData.slice(0, 4)"
        :key="index"
        @click="showBookDetail(item)"
      >
        <div class="img-wrapper">
          <div class="img1"><img class="img2" :src="item.img" /></div>
          <div class="title title-small">{{ item.title }}</div>
          <div class="author sub-title">{{ item.author }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import TitleView from '@/components/home/title.vue'
import {classicWorks} from '@/utils/bookData.js'
import { ebookHome } from '@/utils/mixin'
export default {
  name:'classicWorks',
  mixins:[ebookHome],
  data() {
    return {
       showData:classicWorks
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
            categoryText: '经典之作'
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
    display: flex;
    margin-top: px2rem(10);
    .guess-you-like-item {
      flex: 0 0 25%;
      // margin: 0 auto;
      padding: 0 px2rem(5);
      box-sizing: border-box;
      .img-wrapper {
        // padding-bottom: px2rem(50);
        .img1 {
          height: 100%;
          width: 100%;
          .img2 {
            width: 100%;
          }
        }
      }
    }
  }
}
</style>
