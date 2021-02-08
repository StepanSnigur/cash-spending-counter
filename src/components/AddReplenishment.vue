<template>
  <div>
    <v-icon
      @click="isModalOpen = true"
    >mdi-plus-circle</v-icon>

    <v-dialog max-width="250" v-model="isModalOpen">
      <v-card class="d-flex flex-column pa-10">
        <h3></h3>
        <v-text-field v-model="name" label="Название прибавки"></v-text-field>
        <v-text-field v-model="price" label="Сумма" type="number"></v-text-field>
        <v-btn
          @click="addNewReplenishment"
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
    >Доходы обновлены</v-alert>
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
      'addReplenishment',
    ]),
    async addNewReplenishment() {
      this.isLoading = true
      await this.addReplenishment({
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
