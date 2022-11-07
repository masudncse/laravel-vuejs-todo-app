<template>
<div>

</div>
</template>

<script>
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
export default {
  name: "Navbar",
  computed: {
    ...mapState('category', ["name"]),
    ...mapGetters('category', ["getAllCategories"])
  },

}
</script>

<style scoped>

</style>