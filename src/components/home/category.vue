<template>
  <div class="category">
    <TitleView :label="'分类'"></TitleView>
    <div class="category-list">
      <div
        class="category-item-wrapper"
        v-for="(item, index) in showData"
        :key="index"
        @click="showBookCategory(item.sort)"
      >
        <div class="category-item">
          <div class="content-wrapper">
            <div class="title title-medium">
              {{ item.sort }}
            </div>
            <div class="num sub-title-tiny">
              {{ item.num }}
            </div>
          </div>
          <div class="img-wrapper">
            <div class="img-group">
              <img class="img" :src="item.img" />
              <img class="img2" :src="item.img" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import TitleView from '@/components/home/title.vue'
import {categoryData} from '@/utils/bookData.js'
import { ebookHome } from '@/utils/mixin'
export default {
  name:'category',
  mixins:[ebookHome],
  data() {
    return {
       showData:categoryData
    }
  },
  components: {
    TitleView
  },

  methods: {
    showBookCategory(sort) {
      console.log("222");
        this.$router.push({
          path: '/store/list',
          query: {
            // category: getCategoryName(this.data.category),
            categoryText: sort
          }
        })
      },
  },


}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../assets/styles/global";
.category {
  margin: px2rem(15) 0 px2rem(50);
  .category-list {
    display: flex;
    flex-flow: row wrap;
    width: 100%;
    margin-top: px2rem(15);
    .category-item-wrapper {
      flex: 0 0 50%;
      width: 50%;
      padding: 0 px2rem(5) px2rem(10) px2rem(5);
      box-sizing: border-box;
      &:nth-child(odd) {
        padding-left: px2rem(10);
      }
      &:nth-child(even) {
        padding-right: px2rem(10);
      }
      .category-item {
        display: flex;
        width: 100%;
        background: #eee;
        .img-wrapper {
          flex: 0 0 50%;
          width: 50%;
          padding: px2rem(20) px2rem(10);
          box-sizing: border-box;
          .img-group {
            position: relative;
            width: 100%;
            height: px2rem(60);
            @include left;
            .img {
              position: absolute;
              left: 0;
              top: 0;
              z-index: 100;
              width: px2rem(45);
              height: px2rem(60);
            }
            .img2 {
              position: absolute;
              left: px2rem(30);
              top: px2rem(7.5);
              z-index: 99;
              width: px2rem(30);
              height: px2rem(45);
            }
          }
        }
        .content-wrapper {
          flex: 0 0 50%;
          width: 50%;
          @include columnCenter;
          .title {
            text-align: center;
          }
          .num {
            text-align: center;
            margin-top: px2rem(5);
          }
        }
      }
    }
  }
}
</style>
