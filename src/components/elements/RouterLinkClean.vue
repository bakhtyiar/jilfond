<template>
  <router-link class="router-link" :to="to"><slot></slot></router-link>
</template>

<script>
export default {
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
  text-decoration: none;
  color: inherit;
}
</style>
