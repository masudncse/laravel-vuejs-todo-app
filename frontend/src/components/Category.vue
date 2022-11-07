<template>
  <div id="category">
    <v-container>
        <v-layout row wrap>
          <v-col col="12">
            <v-card class="pt-5 px-4">
              <h3>Category</h3>
              <v-form ref="form" v-model="valid">
                <v-layout row>
                  <v-col cols="6">
                    <v-text-field
                        :value="name"
                        @input="SET_NAME"
                        :rules="textRequiredRules"
                        label="Name"
                        required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-btn
                        color="blue-grey"
                        block
                        class="mr-4 white--text"
                        @click="createCategory"
                    >
                      Submit
                    </v-btn>
                  </v-col>
                </v-layout>
              </v-form>
            </v-card>
          </v-col>

        </v-layout>

        <v-layout row wrap>
          <v-col col="12">
            <template>
              <v-card class="mx-auto">
                <v-list>
                  <v-list-item-group>
                    <v-list-item
                        v-for="(category, i) in getAllCategories"
                        :key="i"
                    >
                      <v-list-item-icon>
                        <v-icon @click="removeCategory(category.id)">mdi-close</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title v-text="category.name"></v-list-item-title>
                      </v-list-item-content>
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
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
import notification from "@/helpers/notification";
export default {
  name: "Category",
  data(){
    return {
      valid: false
    }
  },
  computed: {
    ...mapState('rules', ["textRequiredRules"]),
    ...mapState('category', ["name"]),
    ...mapGetters('category', ["getAllCategories"])
  },
  mounted() {
    this.getCategoryList()
  },
  methods: {
    ...mapMutations('category', [
      "SET_NAME"
    ]),
    ...mapActions('category', [
      "addCategory", "getCategoryList", "removeCategory"
    ]),
    createCategory(){
      this.$refs.form.validate();
      if(!this.valid) {
        notification.errorNotification("Please fill out this form first")
      }else{
        this.addCategory()
      }
    }
  }
}
</script>

<style scoped>

</style>