<template>
  <div class="ebook">
    <EbookReader></EbookReader>
    <EbookTitle></EbookTitle>
    <EbookMenu></EbookMenu>
    <EbookSettingFont></EbookSettingFont>
  </div>
</template>

<script>
import EbookReader from "@/components/ebook/EbookReader.vue";
import EbookTitle from "@/components/ebook/EbookTitle";
import EbookMenu from "@/components/ebook/EbookMenu";
import EbookSettingFont from "@/components/ebook/EbookSettingFont.vue";
export default {
  name: "vueName",
  data() {
    return {
      msg: "Welcome to your vueName",
    };
  },
  components: {
    EbookReader,
    EbookMenu,
    EbookTitle,
    EbookSettingFont,
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/styles/global.scss";
</style>
