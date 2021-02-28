<template>
  <div>
    <div class="list-headline-wrapper">
      <h1 class="text-center mr-5">Список трат:</h1>
      <AddExpense />
      <ListsSorter @onChangeSortMethod="handleChangeExpensesSortMethod" />
    </div>
    <div v-if="expenses.list.length" class="expenses-list mt-6">
      <div v-for="item in getSortedList('list', 'expensesListSortField')" :key="item.id">
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
</template>

<script>
import ListMixin from './mixins/ListMixin'
import AddExpense from './AddExpense.vue'

export default {
  name: 'ExpensesList',
  mixins: [ListMixin],
  components: {
    AddExpense,
  },
  methods: {
    handleChangeExpensesSortMethod({ fieldName }) {
      this.sortList({
        sortFieldName: 'expensesListSortField',
        sortField: fieldName,
      })
    },
  },
}
</script>

<style scoped>
.list-headline-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
