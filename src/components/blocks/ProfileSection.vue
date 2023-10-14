<template>
  <section class="wrapper wrapper_stub" v-if="isLoading">
    <ParagraphLight>Данные загружаются...</ParagraphLight>
  </section>
  <section class="wrapper wrapper_content" v-else-if="this.$route.params.id">
    <div class="picture_section">
      <APicture class="picture_section__picture" />
    </div>
    <div class="article_section">
      <WeightyTitle4 class="profile_name">{{ user.name }}</WeightyTitle4>
      <ul class="contacts">
        <li class="contacts__li">
          <ParagraphWeighty class="contact__key">email:</ParagraphWeighty
          ><ParagraphLight class="contact__value">{{
            user.email
          }}</ParagraphLight>
        </li>
        <li class="contacts__li">
          <ParagraphWeighty class="contact__key">phone:</ParagraphWeighty
          ><ParagraphLight class="contact__value">{{
            user.phone
          }}</ParagraphLight>
        </li>
      </ul>
      <WeightyTitle4 class="about__title">О себе:</WeightyTitle4>
      <ParagraphLight class="about__paragraph">{{
        user.aboutMe
      }}</ParagraphLight>
    </div>
  </section>
  <section class="wrapper wrapper_stub" v-else-if="errorMessage">
    <ParagraphLight class="error_message">{{ errorMessage }}</ParagraphLight>
  </section>
  <section class="wrapper wrapper_stub" v-else>
    <ParagraphLight
      >Выберите сотрудника, чтобы посмотреть его профиль</ParagraphLight
    >
  </section>
</template>

<script>
import APicture from "../elements/APicture";
import WeightyTitle4 from "@/components/elements/Title4Weighty";
import ParagraphWeighty from "@/components/elements/ParagraphWeighty";
import ParagraphLight from "@/components/elements/ParagraphLight";
import { USERS_URL } from "../../../AppConfig";
import axios from "axios";
import { mapState } from "vuex";
import { handleError } from "@/utils/handleError";

export default {
  components: {
    ParagraphLight,
    ParagraphWeighty,
    WeightyTitle4,
    APicture,
  },
  data() {
    return {
      errorMessage: "",
      isLoading: false,
      user: {
        id: -1,
        name: "Нет данных",
        username: "Нет данных",
        email: "Нет данных",
        phone: "Нет данных",
        aboutMe:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      },
    };
  },
  methods: {
    async fetchUserData(userId = this.$route.params.id) {
      this.isLoading = true;
      try {
        const { data } = await axios.get(USERS_URL + "/" + userId);
        Object.assign(this.user, data);
      } catch (error) {
        handleError(error, this);
      } finally {
        this.isLoading = false;
      }
    },
  },
  watch: {
    "$route.params.id": {
      handler: function (userId) {
        if (userId) this.fetchUserData(userId);
      },
      deep: true,
      immediate: true,
    },
    searchQuery(query) {
      if (query === "") this.$router.push({ name: "home" });
    },
  },
  computed: {
    ...mapState({
      searchQuery: (state) => state.users.searchQuery,
    }),
  },
  mounted() {
    if (this.$route.params.id) {
      this.fetchUserData();
    }
  },
};
</script>

<style scoped lang="scss">
.wrapper {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  padding: 30px 30px 30px 20px;
  overflow-y: auto;

  &_content {
    gap: 60px;
  }
  &_stub {
    justify-content: center;
    align-items: center;
    text-align: center;
  }
}
.picture_section {
  width: 424px;
  height: 286px;
  flex: 1 0 auto;
}
.article_section {
  flex: 0 1 auto;
}
.profile_name {
  margin: 0;
}
.contact {
  &__key {
    font-weight: bold;
    margin: 0 0 10px 0;
  }
  &__value {
    margin: 0 0 10px 0;
  }
}
.contacts {
  padding: 0;
  list-style: none;
  &__li {
    margin: 0;
    display: flex;
    gap: 5px;
  }
}
.about {
  &__title {
    margin: 0;
  }
  &__paragraph {
    margin-top: 10px;
  }
}
.error_message {
  color: red;
}
</style>
