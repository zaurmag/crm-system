<template>
  <div class="app-loader">
    <div class="preloader-wrapper active" :class="colors">
      <div class="spinner-layer">
        <div class="circle-clipper left">
          <div class="circle"></div>
        </div><div class="gap-patch">
          <div class="circle"></div>
        </div><div class="circle-clipper right">
          <div class="circle"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ThePreloader',
  computed: {
    colors () {
      const colors = ['spinner-red-only', 'spinner-blue-only', 'spinner-green-only']
      return colors[Math.floor(Math.random() * 3)]
    }
  }
}
</script>
