<template>
  <div class="ebook">
    <EbookReader></EbookReader>
  </div>
</template>
 
<script>
import EbookReader from "@/components/ebook/EbookReader.vue";
export default {
  name: "vueName",
  data() {
    return {
      msg: "Welcome to your vueName",
    };
  },
  components: {
    EbookReader,
  },
};
</script>
 
<style scoped lang = "scss">
</style>