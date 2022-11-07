import Vue from 'vue'
import Vuex from 'vuex'
import category from "@/store/category";
import todo from "@/store/todo";
import rules from "@/helpers/rules";
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    category,
    todo,
    rules
  }
})
