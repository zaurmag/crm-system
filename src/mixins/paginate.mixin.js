import _ from 'lodash'

export default {
  data () {
    return {
      page: this.$route.query.page || 1,
      perPage: 4,
      pageCount: 0,
      allItems: [],
      items: []
    }
  },
  methods: {
    setupPaginations (allItems) {
      this.allItems = _.chunk(allItems, this.perPage)
      this.pageCount = _.size(this.allItems)
      this.items = this.allItems[this.page - 1] || this.allItems[0]
    },
    pageChangeHandler (page) {
      this.$router.push(`${this.$route.path}?page=${page}`)
      this.items = this.allItems[page - 1] || this.allItems[0]
    }
  }
}
