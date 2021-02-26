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
              :class="{invalid: eError}"
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
              :class="{invalid: pError}"
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
import { inject, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import messages from '@/utils/messages'

export default {
  setup () {
    onMounted (() => {
        const message = inject('message')
        const error = inject('error')
        const route = useRoute()

        if (messages[route.query.message]) {
          message(messages[route.query.message])
        }
    })

    return {
      ...useLoginForm()
    }
  }
}
</script>
