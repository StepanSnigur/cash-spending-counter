<template>
  <v-container max-width="900">
    <h2>Осталось: {{ expenses.balance }} руб.</h2>
    <h2>Потрачено: {{ expenses.spent }} руб.</h2>
    <h5>Новый расчетный период начнется: {{ expirationDate }}</h5>

    <div class="user-lists-wrapper">
      <ExpensesList />
      <ReplenishmentsList />
    </div>
    <ErrorAlert :errorMessage="expenses.error" />
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import ExpensesList from '../components/ExpensesList.vue'
import ReplenishmentsList from '../components/ReplenishmentsList.vue'
import ErrorAlert from '../components/ErrorAlert.vue'

export default {
  name: 'UserPage',
  components: {
    ExpensesList,
    ReplenishmentsList,
    ErrorAlert,
  },
  mounted() {
    if (!this.user.email) this.$router.push('/login')
  },
  computed: {
    ...mapGetters([
      'expenses',
      'user',
      'getSortedList',
    ]),
    expirationDate() {
      const date = new Date(this.expenses.expiresIn)
      const monthName = date.toLocaleString('default', { month: 'long' })
      return `${monthName}, ${date.getDate()}`
    },
  },
}
</script>

<style scoped>
.user-lists-wrapper {
  display: flex;
  justify-content: space-between;
}
.user-lists-wrapper > div {
  width: 50%;
}
.user-lists-wrapper > div:first-child {
  border-right: 1px solid #000;
}
</style>
