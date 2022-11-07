import axios from "axios";
import notification from "../helpers/notification";
axios.defaults.baseURL = "http://127.0.0.1:8000/api";
export default {
    namespaced: true,
    state: {
        todos: [],
        todo: {
            name: '',
            category: null
        }
    },
    getters: {
        getAllTodos(state){
            return state.todos.sort((firstTodo, secondTodo)=>{
                let firstElement = firstTodo.name.toLowerCase();
                let secondElement = secondTodo.name.toLowerCase();

                if (firstElement < secondElement) {return -1;}
                if (firstElement > secondElement) {return 1;}
                return 0;
            })
        }
    },
    mutations: {
        SET_NAME(state, playLoad){
            state.todo.name = playLoad
        },

        SET_CATEGORY(state, playLoad){
            state.todo.category = playLoad
        },

        UPDATE_TODO_LIST_AFTER_ADD(state, newTodo){
            state.todos.push(newTodo)
        },

        SET_TODO_LIST(state, todos){
            state.todos = todos
        },

        SET_TODO_AFTER_STATUS_CHANGE(state, updatedTodo){
            state.todos.forEach((todo)=>{
                if(Number(todo.id) === Number(updatedTodo.id)){
                    todo.is_checked = updatedTodo.is_checked
                }
            })
        },

        UPDATE_TODO_LIST_AFTER_DELETE(state, deletedTodo){
            state.todos = state.todos.filter((todo)=>{
                return Number(todo.id) !== Number(deletedTodo.id)
            })
        },

        UPDATE_TODO_LIST_AFTER_CATEGORY_DELETE(state, deletedCategoryId){
            state.todos = state.todos.filter((todo)=>{
                return Number(todo.category_id) !== Number(deletedCategoryId)
            })
        }
    },
    actions:{
        addTodo({state, commit}){
            try {
                axios.post(`todos`, {
                    name: state.todo.name,
                    category_id: state.todo.category
                })
                    .then(({data}) => {
                        console.log(data)
                        if(data.success === true){
                            commit("UPDATE_TODO_LIST_AFTER_ADD", data.data)
                            commit("SET_NAME", null)
                            commit("SET_CATEGORY", null)
                            notification.successNotification(data.message)
                        }
                    }).catch((error) => {
                    console.log(error)
                })

            } catch (error) {
                console.log(error)
            }
        },

        getTodoList({state, commit}){
            try {
                axios.get('todos')
                    .then(({data}) => {
                        if(data.success === true){
                            commit("SET_TODO_LIST", data.data)
                        }
                    }).catch((error) => {
                    console.log(error)
                })

            } catch (error) {
                console.log(error)
            }
        },

        getTodoListByCategoryId({state, commit}, categoryId){
            try {
                axios.get(`categories/${categoryId}`)
                    .then(({data}) => {
                        if(data.success === true){
                            commit("SET_TODO_LIST", data.data.todos)
                        }
                    }).catch((error) => {
                    console.log(error)
                })

            } catch (error) {
                console.log(error)
            }
        },
        changeTodoStatusByTodoId({state, commit}, todoId){
            try {
                axios.put(`todos/${todoId}`)
                    .then(({data}) => {
                        if(data.success === true){
                            commit("SET_TODO_AFTER_STATUS_CHANGE", data.data)
                        }
                    }).catch((error) => {
                    console.log(error)
                })

            } catch (error) {
                console.log(error)
            }
        },

        removeTodo({state, commit}, todoId){
            try {
                axios.delete(`todos/${todoId}`)
                    .then(({data}) => {
                        if(data.success === true){
                            commit("UPDATE_TODO_LIST_AFTER_DELETE", data.data)
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