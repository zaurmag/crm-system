<template>
  <div>
      <ul v-show="props.showPagination" class="pagination">

        <li v-if="props.hasEdgeNav" :class='props.theme.firstPage' @click="props.setFirstPage">
          <button type="button" v-bind="props.firstPageProps">{{props.texts.first}}</button>
        </li>

<!--        <li v-if="props.hasChunksNav" :class='props.theme.prevChunk' @click="props.setPrevChunk">-->
<!--          <a href="#!" v-bind="props.prevChunkProps"><i class="material-icons">chevron_left</i></a>-->
<!--        </li>-->

        <li class="waves-effect" @click="props.setPrevPage">
          <a href="#!" v-bind="props.prevProps"><i class="material-icons">chevron_left</i></a>
        </li>

        <li v-for="page in props.pages" :key="page" :class="props.pageClasses(page)" class="waves-effect"
            v-on="props.pageEvents(page)">
          <a href="#" v-bind="props.aProps">{{page}}</a>
        </li>

        <li class="waves-effect" @click="props.setNextPage">
          <a href="#!" v-bind="props.nextProps"><i class="material-icons">chevron_right</i></a>
        </li>

<!--        <li v-if="props.hasChunksNav" :class='props.theme.nextChunk' @click="props.setNextChunk">-->
<!--          <a href="#!" v-bind="props.nextChunkProps"><i class="material-icons">chevron_right</i></a>-->
<!--        </li>-->

        <li v-if="props.hasEdgeNav" :class="props.theme.lastPage" @click="props.setLastPage">
          <button type="button" v-bind="props.lastPageProps">{{props.texts.last}}</button>
        </li>

      </ul>

      <p v-show="props.hasRecords" :class='props.theme.count'>{{props.count}}</p>
  </div>
</template>

<script>
export default {
  name: 'PaginationCustom',
  props: ['props']
}
</script>
