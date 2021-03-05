<template>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <ThePreloader v-if="loading" />

      <div class="row" v-else>
        <div class="col s12 m6">
          <CategoryCreate @created="create" />
        </div>
        <div class="col s12 m6">
          <CategoryEdit />
        </div>
      </div>
    </section>
</template>

<script>
import CategoryCreate from '@/components/CategoryCreate'
import CategoryEdit from '@/components/CategoryEdit'
export default {
  data () {
    return {
      categories: [],
      loading: true
    }
  },
  methods: {
    create (category) {
      this.categories.push(category)
      console.log(this.categories)
    }
  },
  async mounted () {
    this.categories = await this.$store.dispatch('fetchCategory')
    this.loading = false
  },
  components: {
    CategoryCreate,
    CategoryEdit
  }
}
</script>
