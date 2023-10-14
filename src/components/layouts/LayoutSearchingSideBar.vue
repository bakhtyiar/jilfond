<template>
  <div class="wrapper">
    <SideBar class="sidebar" />
    <slot class="content_section"></slot>
    <div class="better_shadow"></div>
  </div>
</template>

<script>
import SideBar from "@/components/blocks/SideBar.vue";

export default {
  name: "LayoutSearchingSideBar",
  components: { SideBar },
};
</script>

<style scoped>
.wrapper {
  border-radius: 10px;
  background: #fdfdfd;
  display: flex;
  flex-direction: row;
  height: 575px;
  position: relative;
}
.sidebar {
  border-radius: 10px 0 0 10px;
  border-right: 1px solid #e0e0e0;
}
.content_section {
  border-radius: 0 10px 10px 0;
}
.better_shadow {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  z-index: -1;
}
</style>
