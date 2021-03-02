<template>
  <form class="card auth-card" @submit.prevent="onSubmit">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          @blur="eBlur"
          v-model="email"
          :class="{invalid: eError}"
        >
        <label for="email">Email</label>
        <small class="helper-text invalid" v-if="eError">{{ eError }}</small>
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          @blur="pBlur"
          v-model="password"
          class="validate"
          :class="{invalid: pError}"
        >
        <label for="password">Пароль</label>
        <small class="helper-text invalid" v-if="pError">{{ pError }}</small>
      </div>
      <div class="input-field">
        <input
          id="name"
          type="text"
          @blur="nBlur"
          v-model="name"
          class="validate"
          :class="{invalid: nError}"
        >
        <label for="name">Имя</label>
        <small class="helper-text invalid" v-if="nError">{{ nError }}</small>
      </div>
      <p>
        <label>
          <input
            id="privacy"
            type="checkbox"
            @blur="prBlur"
            v-model="privacy"
            />
          <span>С правилами согласен</span>
        </label>
        <div><small class="helper-text invalid" v-if="prError">{{ prError }}</small></div>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
        >
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <router-link to="/login">Войти!</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { useRegisterForm } from '@/use/register-form'

export default {
  name: 'Register',
  setup () {
    return {
      ...useRegisterForm()
    }
  }
}
</script>

<style scoped>

</style>
