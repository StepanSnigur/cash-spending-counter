import { mapGetters, mapActions } from 'vuex'
import ExpenseCard from '../ExpenseCard.vue'
import ListsSorter from '../ListsSorter.vue'

const ListMixin = {
  components: {
    ExpenseCard,
    ListsSorter,
  },
  computed: {
    ...mapGetters([
      'expenses',
      'user',
      'getSortedList',
    ]),
  },
  methods: {
    ...mapActions(['sortList']),
  },
}

export default ListMixin
