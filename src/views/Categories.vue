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
          <CategoryEdit
            v-if="categories.length"
            :cats="categories"
            @updated="updatedCategory"
            :key="categories.length + updateCount"
          />
          <p v-else>Категорий пока нет</p>
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
      loading: true,
      categories: [],
      updateCount: 0
    }
  },
  methods: {
    create (category) {
      this.categories.push(category)
    },
    updatedCategory (cat) {
      const idx = this.categories.findIndex(c => c.id === cat.id)
      this.categories[idx].name = cat.name
      this.categories[idx].limit = cat.limit
      this.updateCount++
    }
  },
  async mounted () {
    try {
      this.categories = await this.$store.dispatch('fetchCategory')
      this.loading = false
    } catch (error) {
      console.error(error)
    }

  },
  components: {
    CategoryCreate,
    CategoryEdit
  }
}
</script>
