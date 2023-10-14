<template>
  <div :aria-label="alt" class="img" :style="bgImg" />
</template>

<script>
export default {
  props: {
    source: {
      type: [String, URL],
      required: false,
      default: new URL("@/assets/profile_img_stub.jpg", import.meta.url),
    },
    alt: {
      type: String,
      required: false,
      default: "Изображение",
    },
  },
  computed: {
    bgImg() {
      return {
        backgroundImage: `url(${this.source})`,
      };
    },
  },
};
</script>

<style scoped>
.img {
  max-width: 100%;
  max-height: 100%;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
