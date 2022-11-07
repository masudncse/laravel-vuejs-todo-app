<template>
  <div>
    <v-container>
      <v-layout row wrap>
        <v-col cols="12">
          <v-card>
            <v-btn-toggle
                tile
                color="deep-purple accent-3"
                group
            >
              <v-btn @click="getTodoList">
                All
              </v-btn>

              <v-btn v-for="category in getAllCategories" :key="category.id" @click="getTodoListByCategoryId(category.id)">
                {{ category.name }}
              </v-btn>
            </v-btn-toggle>
          </v-card>
        </v-col>
      </v-layout>
    </v-container>
    <v-container>
      <v-layout row wrap>
        <v-col col="12">
          <template>
            <v-card class="mx-auto">
              <v-list>
                <v-list-item-group>
                  <v-list-item
                      v-for="(todo, i) in getAllTodos"
                      :key="i"
                  >
                    <v-list-item-action @click="changeTodoStatusByTodoId(todo.id)">
                      <v-checkbox
                          :input-value="todo.is_checked === 'checked'"
                      ></v-checkbox>
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title v-text="todo.name"></v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-icon>
                      <v-icon @click="removeTodo(todo.id)">mdi-close</v-icon>
                    </v-list-item-icon>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-card>
          </template>
        </v-col>

      </v-layout>
    </v-container>

  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
export default {
name: "CategoryDetails",

  data(){
    return {
      checkbox: true,
    }
  },
  computed:{
    ...mapGetters('category', ["getCategoryDetails", "getAllCategories", "getTotalTodo"]),
    ...mapGetters('todo', ["getAllTodos"])
  },

  mounted() {
    this.getCategoryList()
    this.getTodoList()
  },
  methods: {
    ...mapActions('category', [
      "getSpecificCategoryDetails", "getCategoryList"
    ]),

    ...mapActions('todo', [
      "getTodoList", "getTodoListByCategoryId", "changeTodoStatusByTodoId", "removeTodo"
    ])
  }
}
</script>

<style scoped>

</style>