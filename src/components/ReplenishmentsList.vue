<template>
  <div class="list-wrapper">
    <div class="list-headline-wrapper">
      <h1 class="text-center mr-5">Список пополнений:</h1>
      <AddReplenishment />
      <SearchInLIst searchListName="replenishmentList" />
      <ListsSorter @onChangeSortMethod="handleChangeReplenishmentsSortMethod" />
    </div>
    <div v-if="expenses.replenishmentList.length" class="expenses-list mt-6">
      <div
        v-for="item in getSortedList('replenishmentList')"
        :key="item.id"
      >
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
</template>

<script>
import ListMixin from './mixins/ListMixin'
import AddReplenishment from './AddReplenishment.vue'
import SearchInLIst from './SearchInList.vue'

export default {
  name: 'ReplenishmentsList',
  mixins: [ListMixin],
  components: {
    AddReplenishment,
    SearchInLIst,
  },
  methods: {
    handleChangeReplenishmentsSortMethod({ fieldName }) {
      this.sortList({
        listName: 'replenishmentList',
        sortField: fieldName,
      })
    },
  },
}
</script>

<style scoped>
.list-wrapper {
  padding-top: 30px;
}
.list-headline-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
