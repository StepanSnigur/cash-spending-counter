<template>
  <div>
    <div class="search-button-wrapper pl-2">
      <v-icon
        @click="openModal"
      >mdi-magnify</v-icon>
      <div v-show="isFilterActive" class="filter-indicator"></div>
    </div>

    <v-dialog max-width="350" v-model="isModalOpen">
      <v-card class="d-flex flex-column pa-10">
        <v-text-field
          label="Название карточки"
          @input="handleInputChange"
          :value="getSearchTerm(searchListName)"
          outlined
        ></v-text-field>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'SearchInLIst',
  props: {
    searchListName: String,
  },
  methods: {
    ...mapActions(['changeSortTerm']),
    openModal() {
      this.isModalOpen = true
    },
    handleInputChange(value) {
      this.changeSortTerm({
        listName: this.searchListName,
        newSortTerm: value,
      })
    },
  },
  computed: {
    ...mapGetters(['getSearchTerm']),
    isFilterActive() {
      return this.getSearchTerm(this.searchListName).length
    },
  },
  data() {
    return {
      isModalOpen: false,
    }
  },
}
</script>

<style scoped>
.search-button-wrapper {
  position: relative;
}
.filter-indicator {
  position: absolute;
  top: 0;
  right: 0;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: red;
}
</style>
