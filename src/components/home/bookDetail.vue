<template>
  <div class="">
    书籍详情页，可以跳转阅读，加入书架
    <button @click="read">阅读</button>
  </div>
</template>

<script>
export default {
  name: "vueName",
  data() {
    return {
      fileName: String,
    };
  },
  created() {
    this.fileName = this.$route.query.fileName;
    console.log(this.fileName);
    // console.log(thisfileName);
  },
  methods: {
    read() {
      this.$router.push({
        path: `/ebook/${this.fileName}`,
      });
      console.log(this.fileName);
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/styles/global.scss";
</style>
