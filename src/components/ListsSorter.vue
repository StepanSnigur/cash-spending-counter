<template>
  <v-select
    :items="sortMethods.map(method => method.title)"
    label="Сортировать по"
    v-model="sortMethod"
    @change="handleSortMethodChange"
    class="sorter-select ml-5"
  ></v-select>
</template>

<script>
export default {
  name: 'ListsSorter',
  data() {
    return {
      sortMethod: 'Дате',
      sortMethods: [
        {
          title: 'Дате',
          fieldName: 'date',
        },
        {
          title: 'Алфавиту',
          fieldName: 'name',
        },
        {
          title: 'Сумме',
          fieldName: 'price',
        },
      ],
    }
  },
  methods: {
    handleSortMethodChange(method) {
      const newSortMethod = this.sortMethods.find((el) => el.title === method)
      this.$emit('onChangeSortMethod', newSortMethod)
    },
  },
}
</script>

<style scoped>
.sorter-select {
  max-width: 100px;
}
</style>
