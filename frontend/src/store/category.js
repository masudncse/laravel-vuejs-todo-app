import axios from "axios";
import notification from "../helpers/notification";
axios.defaults.baseURL = "http://127.0.0.1:8000/api";
export default {
    namespaced: true,
    state: {
        name: '',
        totalTodo: 0,
        category: {},
        categories: [],
    },
    getters: {
        getCategoryDetails(state){
          return state.category
        },

        getTotalTodo(state){
          return state.totalTodo
        },
        getAllCategories(state){
            return state.categories.sort((firstCategory, secondCategory)=>{
                let firstElement = firstCategory.name.toLowerCase();
                let secondElement = secondCategory.name.toLowerCase();

                if (firstElement < secondElement) {return -1;}
                if (firstElement > secondElement) {return 1;}
                return 0;
            })
        }
    },
    mutations: {
        SET_NAME(state, playLoad){
            state.name = playLoad
        },

        SET_CATEGORY_LIST(state, categories){
            state.categories = categories
        },

        UPDATE_CATEGORY_LIST_AFTER_ADD(state, newCategory){
            state.categories.push(newCategory)
        },

        UPDATE_CATEGORY_LIST_AFTER_DELETE(state, deletedCategory){
            state.categories = state.categories.filter((category)=>{
                return Number(category.id) !== Number(deletedCategory.id)
            })
        },

        SET_SPECIFIC_CATEGORY_DETAILS(state, category){
            state.category = category
        },

        SET_TOTAL_TODO(state, total){
            state.totalTodo = total
        },

    },
    actions: {
        addCategory({state, commit}){
            try {
                axios.post(`categories`, {
                    name: state.name
                })
                    .then(({data}) => {
                        if(data.success === true){
                            commit("UPDATE_CATEGORY_LIST_AFTER_ADD", data.data)
                            commit("SET_NAME", '')
                            notification.successNotification(data.message)
                        }
                    }).catch((error) => {
                    console.log(error)
                })

            } catch (error) {
                console.log(error)
            }
        },

        getCategoryList({state, commit}){
            try {
                axios.get('categories')
                    .then(({data}) => {
                        if(data.success === true){
                            commit("SET_CATEGORY_LIST", data.data)
                        }
                    }).catch((error) => {
                    console.log(error)
                })

            } catch (error) {
                console.log(error)
            }
        },

        getSpecificCategoryDetails({state, commit}, categoryId){
            try {
                axios.get(`categories/${categoryId}`)
                    .then(({data}) => {
                        if(data.success === true){
                            const todos = data.data.todos
                            console.log(todos)
                            commit("SET_SPECIFIC_CATEGORY_DETAILS", data.data)
                            commit("SET_TOTAL_TODO", todos.length)
                        }
                    }).catch((error) => {
                    console.log(error)
                })

            } catch (error) {
                console.log(error)
            }
        },

        removeCategory({state, commit}, categoryId){
            try {
                axios.delete(`categories/${categoryId}`)
                    .then(({data}) => {
                        if(data.success === true){
                            commit("UPDATE_CATEGORY_LIST_AFTER_DELETE", data.data)
                            commit("todo/UPDATE_TODO_LIST_AFTER_CATEGORY_DELETE", data.data.id, {root: true})
                            notification.successNotification(data.message)
                        }
                    }).catch((error) => {
                    console.log(error)
                })

            } catch (error) {
                console.log(error)
            }
        }
    }
}