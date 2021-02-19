<template>
  <v-container max-width="900">
    <h2>Осталось: {{ expenses.balance }} руб.</h2>
    <h2>Потрачено: {{ expenses.spent }} руб.</h2>
    <h5>Новый расчетный период начнется: {{ expirationDate }}</h5>

    <div class="user-lists-wrapper">
      <div>
        <div class="list-headline-wrapper">
          <h1 class="text-center mr-5">Список трат:</h1>
          <AddExpense />
        </div>
        <div v-if="expenses.list.length" class="expenses-list mt-6">
          <div v-for="item in expenses.list" :key="item.id">
            <ExpenseCard
              :id="item.id"
              :name="item.name"
              :price="+item.price"
              :date="item.date || '13:48 07.06.2021'"
              :item="item"
              :cardActions="{
                delete: 'deleteExpense',
                update: 'updateExpense'
              }"
            />
          </div>
        </div>
        <h3 v-else class="text-center mt-4">У вас еще нет трат</h3>
      </div>
      <div>
        <div class="list-headline-wrapper">
          <h1 class="text-center mr-5">Список пополнений:</h1>
          <AddReplenishment />
        </div>
        <div v-if="expenses.replenishmentList.length" class="expenses-list mt-6">
          <div v-for="item in expenses.replenishmentList" :key="item.id">
            <ExpenseCard
              :id="item.id"
              :name="item.name"
              :price="+item.price"
              :date="item.date || '13:48 07.06.2021'"
              :item="item"
              :cardActions="{
                delete: 'deleteReplenishment',
                update: 'updateReplenishment'
              }"
            />
          </div>
        </div>
        <h3 v-else class="text-center mt-4">У вас еще нет пополнений</h3>
      </div>
    </div>
    <ErrorAlert :errorMessage="expenses.error" />
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import AddExpense from '../components/AddExpense.vue'
import AddReplenishment from '../components/AddReplenishment.vue'
import ExpenseCard from '../components/ExpenseCard.vue'
import ErrorAlert from '../components/ErrorAlert.vue'

export default {
  name: 'UserPage',
  components: {
    AddExpense,
    AddReplenishment,
    ExpenseCard,
    ErrorAlert,
  },
  mounted() {
    if (!this.user.email) this.$router.push('/login')
  },
  computed: {
    ...mapGetters([
      'expenses',
      'user',
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
.list-headline-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}
.user-lists-wrapper > div:first-child {
  border-right: 1px solid #000;
}
</style>
