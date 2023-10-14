<template>
  <RouterLinkClean :to="{ name: 'user', params: { id: id } }" class="wrapper">
    <APicture class="profile_picture" />
    <div class="texts">
      <ParagraphWeighty class="name_label">{{ name }}</ParagraphWeighty>
      <ParagraphLight class="email_label">{{ email }}</ParagraphLight>
    </div>
  </RouterLinkClean>
</template>

<script>
import APicture from "../elements/APicture";
import ParagraphWeighty from "../elements/ParagraphWeighty";
import ParagraphLight from "../elements/ParagraphLight";
import RouterLinkClean from "@/components/elements/RouterLinkClean";
export default {
  components: { ParagraphLight, ParagraphWeighty, APicture, RouterLinkClean },
  props: {
    picture: {
      type: String,
      required: false,
    },
    id: {
      type: [String, Number],
      required: false,
    },
    name: {
      type: String,
      required: false,
      default: "Нет данных",
    },
    email: {
      type: String,
      required: false,
      default: "Нет данных",
    },
  },
};
</script>

<style scoped lang="scss">
.wrapper {
  width: 240px;
  min-height: 70px;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  cursor: pointer;
  &:hover {
    background: #e0e0e0;
    transition: 0.3s ease;
  }
}
.profile_picture {
  width: 70px;
  height: auto;
  min-width: 70px;
  min-height: 70px;
  border-right: 1px solid #e0e0e0;
  border-radius: 10px 0 0 10px;
}
.texts {
  display: flex;
  flex-direction: column;
  padding: 15px;
  gap: 5px;
  flex: 0 1 auto;
  word-break: break-all;
}
.name_label,
.email_label {
  margin: 0;
}
</style>
