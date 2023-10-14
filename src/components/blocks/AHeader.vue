<template>
  <nav>
    <!--    WARN: id == 1 because it's stub data-->
    <RouterLinkClean :to="{ name: 'home' }"><ALogotype /></RouterLinkClean>
    <RouterLinkUnderlining
      :to="{ name: 'user', params: { id: 1 } }"
      :doUnderline="true"
      ><ParagraphRegular>Пользователь</ParagraphRegular></RouterLinkUnderlining
    >
  </nav>
</template>

<script>
import ParagraphRegular from "../elements/ParagraphRegular";
import ALogotype from "@/components/elements/ALogotype";
import RouterLinkClean from "@/components/elements/RouterLinkClean";
import RouterLinkUnderlining from "@/components/elements/RouterLinkUnderlining";
export default {
  components: {
    RouterLinkUnderlining,
    RouterLinkClean,
    ALogotype,
    ParagraphRegular,
  },
};
</script>

<style scoped>
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 0;
}
</style>
