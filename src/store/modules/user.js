import { setToken, getToken, removeToken } from "@/utils/auth";
import { loginAPI } from "@/api/user";

export default {
  namespaced: true,
  state: {
    token: getToken() ? getToken() : "",
  },
  mutations: {
    //mutations中的方法只有一种调用方式commit('fangfaming'),并没有fangfaming（）的调用方式
    setToken(state, newToken) {
      state.token = newToken;
      setToken(newToken);
    },
    removeToken(state) {
      state.token = "";
      removeToken();
    },
  },
  actions: {
    async loginAction(store, data) {
      const res = await loginAPI(data);
      store.commit("setToken", res.data.token);
    },
  },
};
