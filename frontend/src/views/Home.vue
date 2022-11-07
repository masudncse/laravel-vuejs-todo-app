<template>
  <div class="home">
    <categoryDetails />
    <todo />
    <category />
  </div>
</template>

<script>
import CategoryDetails from "@/components/CategoryDetails";
import Category from "@/components/Category";
import Todo from "@/components/Todo";
export default {
  name: 'Home',
  components: {
    categoryDetails: CategoryDetails,
    category: Category,
    todo: Todo
  }
}
</script>
