<template>
  <div class="ebook-reader">
    <div id="read">22</div>
  </div>
</template>
 
<script>
import Epub from "epubjs";
export default {
  name: "vueName",
  data() {
    return {
      BASE_URl: "http://127.0.0.1:5500/epub/",
    };
  },
  methods: {
    initEpub() {
      const url = this.BASE_URl + this.$store.state.fileName + ".epub";
      //console.log(url);
      //渲染电子书
      this.book = new Epub(url);
      this.rendition = this.book.renderTo("read", {
        width: innerWidth,
        height: innerHeight,
        methods: "default",
      });
      this.rendition.display();
    },
  },
  mounted() {
    //const fileName = this.$route.params.fileName;
    //获取路由传入参数，并处理传入数据将|转换为/
    const fileName = this.$route.params.fileName.split("|").join("/");

    this.$store.dispatch("setFileName", fileName).then(() => {
      this.initEpub();
    });
    console.log(fileName);
    //console.log(`${BASE_URl}.epub`);
  },
};
</script>
 
<style scoped lang = "scss">
</style>