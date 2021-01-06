<template>
  <div>
    <h2>Осталось: {{ expenses.balance }}</h2>
    <h2>Потрачено: {{ expenses.spent }}</h2>

    <AddExpense />

    <h1>Список Трат:</h1>
    <div>
      <div v-for="(item, i) in expenses.list" :key="i">
        <h4>{{ item.name }}</h4>
        <p>{{ item.price }} руб.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AddExpense from '../components/AddExpense.vue'

export default {
  name: 'UserPage',
  components: {
    AddExpense,
  },
  mounted() {
    if (!this.user.email) this.$router.push('/login')
  },
  computed: {
    ...mapGetters([
      'expenses',
      'user',
    ]),
  },
}
</script>
