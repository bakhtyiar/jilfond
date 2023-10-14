import axios from "axios";
import { Commit } from "vuex";
import { searchByNameNotUsername, USERS_URL } from "../../AppConfig";
import { handleError } from "@/utils/handleError";

export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
}

export interface IReqParameters {
  id?: string[];
  name?: string[];
  username?: string[];
  _page: number;
  _limit: number;
}

export interface IUsersState {
  users: Partial<IUser>[];
  isLoading: boolean;
  searchQuery: string;
  limit: number;
  page: number;
  totalPages: number;
  errorMessage: string;
}

export interface IFetchUsers {
  state: IUsersState;
  commit: Commit;
}

export const usersModule = {
  state: (): IUsersState => ({
    users: [],
    isLoading: false,
    searchQuery: "",
    limit: 10,
    page: 1,
    totalPages: 0,
    errorMessage: "",
  }),
  getters: {
    queries(state: IUsersState) {
      const queries = state.searchQuery.split(",");
      queries.forEach((query, index, arr) => {
        arr[index] = query.trim();
      });
      return queries;
    },
  },
  mutations: {
    setUsers(state: IUsersState, users: IUser[]) {
      state.users = users;
    },
    setLoading(state: IUsersState, bool: boolean) {
      state.isLoading = bool;
    },
    setSearchQuery(state: IUsersState, searchQuery: string) {
      state.searchQuery = searchQuery;
    },
    setPage(state: IUsersState, page: number) {
      state.page = page;
    },
    setTotalPages(state: IUsersState, totalPages: number) {
      state.totalPages = totalPages;
    },
  },
  actions: {
    async fetchUsers({ state, commit }: IFetchUsers) {
      try {
        commit("setPage", 1);
        commit("setLoading", true);
        const queries = state.searchQuery.split(",");
        queries.forEach((query, index, arr) => {
          arr[index] = query.trim();
        });
        const ids = queries.filter((param) =>
          Number.isInteger(parseInt(param))
        );
        const namesAndUsernames = queries.filter(
          (param) => !Number.isInteger(parseInt(param))
        );
        const parameters: IReqParameters = {
          _page: state.page,
          _limit: state.limit,
        };
        if (ids.length) {
          parameters.id = ids;
        } else if (searchByNameNotUsername) {
          parameters.name = namesAndUsernames;
        } else if (!searchByNameNotUsername) {
          parameters.username = namesAndUsernames;
        }
        const response = await axios.get(USERS_URL, {
          params: parameters,
        });
        commit(
          "setTotalPages",
          Math.ceil(response.headers["x-total-count"] / state.limit)
        );
        commit("setUsers", response.data);
      } catch (error) {
        handleError(error, state);
      } finally {
        commit("setLoading", false);
      }
    },
    async loadMoreUsers({ state, commit }: IFetchUsers) {
      try {
        commit("setPage", state.page + 1);
        const params = state.searchQuery.split(",");
        params.forEach((param) => param.trim());
        const ids = params.filter((param) => Number.isInteger(parseInt(param)));
        const namesAndUsernames = params.filter(
          (param) => !Number.isInteger(parseInt(param))
        );
        const parameters: IReqParameters = {
          _page: state.page,
          _limit: state.limit,
        };
        if (ids.length) {
          parameters.id = ids;
        } else if (searchByNameNotUsername) {
          parameters.name = namesAndUsernames;
        } else if (!searchByNameNotUsername) {
          parameters.username = namesAndUsernames;
        }
        const response = await axios.get(USERS_URL, {
          params: parameters,
        });
        commit(
          "setTotalPages",
          Math.ceil(response.headers["x-total-count"] / state.limit)
        );
        commit("setUsers", [...state.users, ...response.data]);
      } catch (error: unknown) {
        handleError(error, state);
      }
    },
  },
  namespaced: true,
};
