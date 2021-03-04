<template>
  <div>
    <div class="list-headline-wrapper">
      <h1 class="text-center mr-5">Список трат:</h1>
      <AddExpense />
      <SearchInList searchListName="expenseList" />
      <ListsSorter @onChangeSortMethod="handleChangeExpensesSortMethod" />
    </div>
    <div v-if="expenses.expenseList.length" class="expenses-list mt-6">
      <div v-for="item in getSortedList('expenseList')" :key="item.id">
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
import SearchInList from './SearchInList.vue'

export default {
  name: 'ExpensesList',
  mixins: [ListMixin],
  components: {
    AddExpense,
    SearchInList,
  },
  methods: {
    handleChangeExpensesSortMethod({ fieldName }) {
      this.sortList({
        listName: 'expenseList',
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
