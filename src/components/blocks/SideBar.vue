<template>
  <aside class="sidebar">
    <section class="query_form">
      <WeightyTitle4>Поиск сотрудников</WeightyTitle4>
      <FieldText
        class="field_text"
        :model-value="searchQuery"
        @update:model-value="handleUpdate"
        placeholder="Введите Id или имя"
      />
    </section>
    <section class="results">
      <WeightyTitle4 class="results_title">Результаты</WeightyTitle4>
      <div class="results_data">
        <LightParagraph v-if="isLoading === false && searchQuery === ''">
          начните поиск
        </LightParagraph>
        <LightParagraph v-else-if="isLoading === true"
          >Данные загружаются...</LightParagraph
        >
        <LightParagraph v-else-if="users.length === 0"
          >Ничего не найдено
        </LightParagraph>
        <div class="user_cards" v-else-if="users.length > 0">
          <UserCard
            v-for="user of users"
            :key="user.id"
            :id="user.id"
            :name="user.name"
            :email="user.email"
          />
          <div v-intersection="loadMoreUsers"></div>
        </div>
      </div>
    </section>
  </aside>
</template>

<script>
import FieldText from "../controls/FieldText";
import WeightyTitle4 from "@/components/elements/Title4Weighty";
import LightParagraph from "@/components/elements/ParagraphLight";
import { mapState, mapMutations, mapActions } from "vuex";
import UserCard from "@/components/blocks/UserCard";
import { debounce } from "lodash";
import { searchingThrottleTime } from "../../../AppConfig";

export default {
  components: { UserCard, LightParagraph, WeightyTitle4, FieldText },
  methods: {
    handleUpdate(value) {
      this.setSearchQuery(value);
      this.fetchUsers();
    },
    ...mapMutations({
      setPage: "users/setPage",
      setSearchQuery: "users/setSearchQuery",
    }),
    ...mapActions({
      loadMoreUsers: "users/loadMoreUsers",
      fetchUsers: "users/fetchUsers",
    }),
  },
  computed: {
    ...mapState({
      users: (state) => state.users.users,
      isLoading: (state) => state.users.isLoading,
      searchQuery: (state) => state.users.searchQuery,
      page: (state) => state.users.page,
      limit: (state) => state.users.limit,
      totalPages: (state) => state.users.totalPages,
    }),
  },
  mounted() {
    this.handleUpdate = debounce(this.handleUpdate, searchingThrottleTime);
  },
};
</script>

<style scoped lang="scss">
.sidebar {
  min-width: 290px;
  width: auto;
  max-width: 290px;
  display: flex;
  flex-direction: column;
}
.query_form {
  padding: 20px 30px 0 30px;
  flex: 0 0 auto;
}
.field_text {
  width: 192px;
}
.user_cards {
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.results {
  overflow-y: auto;
  display: flex;
  flex-direction: column;

  &_title {
    padding: 30px 30px 10px 30px;
    margin: 0;
  }
  &_data {
    overflow-x: hidden;
    padding: 10px 30px 30px 30px;

    & * {
      margin: 0;
    }
  }
}
</style>
