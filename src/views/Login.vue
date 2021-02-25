<template>
    <form class="card auth-card" @submit.prevent="onSubmit">
      <div class="card-content">
        <span class="card-title">Домашняя бухгалтерия</span>
        <div class="input-field">
          <input
              id="email"
              type="text"
              class="validate"
              v-model="email"
              @blur="eBlur"
          >
          <label for="email">Email</label>
          <small v-if="eError" class="helper-text invalid">{{ eError }}</small>
        </div>
        <div class="input-field">
          <input
              id="password"
              type="password"
              class="validate"
              v-model="password"
              @blur="pBlur"
          >
          <label for="password">Пароль</label>
          <small v-if="pError" class="helper-text invalid">{{ pError }}</small>
        </div>
      </div>
      <div class="card-action">
        <div>
          <button
              class="btn waves-effect waves-light auth-submit"
              type="submit"
          >
            Войти
            <i class="material-icons right">send</i>
          </button>
        </div>

        <p class="center">
          Нет аккаунта?
          <router-link to="/register">Зарегистрироваться</router-link>
        </p>
      </div>
    </form>
</template>

<script>
import { useLoginForm } from '@/use/login-form'

export default {
  setup () {
    return {
      ...useLoginForm()
    }
  }
}
</script>
