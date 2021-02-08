<template>
  <v-card
    elevation="2"
    max-width="80%"
    class="card mx-auto pa-4 py-7 mb-5"
  >
    <v-text-field
      v-if="isUpdatingExpense"
      class="name-input"
      :value="name"
      v-model="newExpenseName"
    ></v-text-field>
    <h5 v-else class="card-title">{{ name }}</h5>

    <h3 class="card-date">{{ date }}</h3>

    <v-text-field
      v-if="isUpdatingExpense"
      class="price-input"
      :value="price"
      v-model="newExpensePrice"
    ></v-text-field>
    <p v-else class="card-price">{{ separateBigNumbers(price) }} руб.</p>

    <div class="card-controls">
      <v-icon
        v-if="!isUpdatingExpense"
        @click.stop="openEditMenu"
        class="mr-1"
      >mdi-pencil</v-icon>
      <v-icon
        v-else
        @click.stop="handleUpdateExpense"
        class="done-icon mr-1"
      >mdi-checkbox-marked-circle</v-icon>

      <v-icon @click.stop="handleDeleteExpense">mdi-delete</v-icon>
    </div>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'
import separateBigNumbers from '../utils/separateBigNumbers'

export default {
  name: 'ExpenseCard',
  props: {
    id: String,
    name: String,
    price: Number,
    date: String,
    cardActions: Object,
  },
  data() {
    return {
      isUpdatingExpense: false,
      newExpenseName: this.name,
      newExpensePrice: this.price,
    }
  },
  methods: {
    openEditMenu() {
      this.isUpdatingExpense = true
    },
    handleDeleteExpense() {
      this.deleteCard({ id: this.id })
    },
    async handleUpdateExpense() {
      await this.updateCard({
        id: this.id,
        newName: this.newExpenseName,
        newPrice: this.newExpensePrice,
      })
      this.isUpdatingExpense = false
    },
    separateBigNumbers,
    ...mapActions({
      async updateCard(dispatch, payload) {
        await dispatch(this.cardActions.update, payload)
      },
      deleteCard(dispatch, payload) {
        dispatch(this.cardActions.delete, payload)
      },
    }),
  },
}
</script>

<style scoped>
.card {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  border-radius: 8px;
  cursor: default;
}
.card-title {
  font-size: 26px;
}
.card-price {
  margin-bottom: 0;
  font-size: 18px;
}
.card-date {
  font-weight: normal;
  justify-self: end;
  align-self: center;
  font-size: 20px;
}
.card-controls {
  justify-self: end;
}
.done-icon {
  cursor: pointer;
}
.name-input {
  font-size: 26px;
}
.price-input {
  font-size: 18px;
}
</style>
