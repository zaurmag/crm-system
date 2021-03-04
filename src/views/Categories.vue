<template>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <div class="row">
        <div class="col s12 m6">
          <CategoryCreate @create="categoryCreate" />
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
      categories: []
    }
  },
  methods: {
    categoryCreate (category) {
      this.categories.push(category)
      console.log(this.categories)
    }
  },
  components: {
    CategoryCreate,
    CategoryEdit
  }
}
</script>
