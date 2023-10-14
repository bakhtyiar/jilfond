<template>
  <RouterLinkClean class="router-link" :to="to"><slot></slot></RouterLinkClean>
</template>

<script>
import RouterLinkClean from "./RouterLinkClean";
export default {
  components: { RouterLinkClean },
  props: {
    to: {
      type: [String, Object],
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
.router-link {
  border-bottom: 1px solid transparent;
  &:hover {
    border-bottom: 1px solid;
    transition: 0.5s ease;
  }
}
</style>
