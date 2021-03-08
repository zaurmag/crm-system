<template>
  <div class="card-panel center-align">
    <h1>Страница не найдена!</h1>
    <p>Возожно вы допстили ошибку в адресе.</p>
    <p><router-link class="btn btn-large text-primary" to="/login">Перейти на страницу авторизации</router-link></p>
  </div>
</template>

<script>
export default {
  name: "ErrorPage"
}
</script>

<style scoped>

</style>
