<template>
  <LayoutSearchingSideBar>
    <ProfileSection />
  </LayoutSearchingSideBar>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ProfileSection from "@/components/blocks/ProfileSection.vue";
import LayoutSearchingSideBar from "@/components/layouts/LayoutSearchingSideBar.vue";

export default defineComponent({
  name: "HomeView",
  components: { ProfileSection, LayoutSearchingSideBar },
});
</script>

<style scoped></style>
