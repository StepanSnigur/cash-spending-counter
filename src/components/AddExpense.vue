<template>
  <div>
    <input type="text" v-model="name" placeholder="Название траты">
    <input type="text" v-model="price" placeholder="Цена">
    <button @click="addNewExpense">Добавить</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'AddExpense',
  data() {
    return {
      name: '',
      price: null,
    }
  },
  methods: {
    ...mapActions([
      'addExpense',
    ]),
    addNewExpense() {
      this.addExpense({
        name: this.name,
        price: this.price,
      })
    },
  },
}
</script>
