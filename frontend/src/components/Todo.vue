<template>
  <div id="category">
    <v-container>
      <v-layout row wrap>
        <v-col col="12">
          <v-card class="px-4 pt-4">
            <h3>Add Todo</h3>
            <v-form ref="form" v-model="valid">
              <v-layout row>
                <v-col cols="12">
                  <v-text-field
                      :value="todo.name" @input="SET_NAME"
                      :rules="textRequiredRules"
                      label="Name"
                      required
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-select
                      :items="getAllCategories"
                      :rules="textRequiredRules"
                      item-text="name"
                      item-value="id"
                      @input="SET_CATEGORY"
                      label="Categories"
                      dense
                      outlined
                  ></v-select>
                </v-col>

                <v-col cols="6">
                  <v-btn color="blue-grey"
                         block
                         class="mr-4 white--text"
                         @click="createTodo"
                  >
                    Add todo
                  </v-btn>
                </v-col>
              </v-layout>

            </v-form>
          </v-card>
        </v-col>

      </v-layout>

    </v-container>
  </div>
</template>

<script>
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
import notification from "@/helpers/notification";
export default {
  name: "Todo",
  data(){
    return {
      valid: false
    }
  },
  computed: {
    ...mapState('rules', ["textRequiredRules"]),
    ...mapState('todo', ["todo"]),
    ...mapGetters('category', ["getAllCategories"])
  },
  mounted() {
    this.getCategoryList()
  },
  methods: {
    ...mapMutations('todo', [
      "SET_NAME",
        "SET_CATEGORY"
    ]),
    ...mapActions('todo', [
      "addTodo", "removeCategory"
    ]),
    ...mapActions('category', ["getCategoryList"]),

    createTodo() {
      this.$refs.form.validate();
      if(!this.valid) {
        notification.errorNotification("Please fill out this form first")
      }else{
        this.addTodo()
      }
    }
  }
}
</script>

<style scoped>

</style>