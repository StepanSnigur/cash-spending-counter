<template>
  <div>
    <v-btn @click="isModalOpen = true">Добавить расходы</v-btn>

    <v-dialog max-width="250" v-model="isModalOpen">
      <v-card class="d-flex flex-column pa-10">
        <h3></h3>
        <v-text-field v-model="name" label="Название траты"></v-text-field>
        <v-text-field v-model="price" label="Цена" type="number"></v-text-field>
        <v-btn
          @click="addNewExpense"
          class="mt-6"
          color="primary"
          :loading="isLoading"
        >Добавить</v-btn>
      </v-card>
    </v-dialog>

    <v-alert
      type="success"
      max-width="250"
      :value="isAlertVisible"
      transition="scroll-y-transition"
      elevation="12"
      class="success-alert"
    >Расходы обновлены</v-alert>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import dateParser from '../utils/dateParser'
import sleep from '../utils/sleep'

export default {
  name: 'AddExpense',
  data() {
    return {
      name: '',
      price: null,
      isModalOpen: false,
      isAlertVisible: false,
      isLoading: false,
    }
  },
  methods: {
    ...mapActions([
      'addExpense',
    ]),
    async addNewExpense() {
      this.isLoading = true
      await this.addExpense({
        name: this.name,
        price: this.price,
        date: dateParser(new Date()),
      })
      this.name = ''
      this.price = null
      this.isModalOpen = false
      this.isLoading = false
      this.showSuccessAlert()
    },
    async showSuccessAlert() {
      this.isAlertVisible = true
      await sleep(1500)
      this.isAlertVisible = false
    },
  },
}
</script>

<style scoped>
.success-alert {
  position: fixed;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
