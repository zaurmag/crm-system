<template>
  <div class="page-title">
    <h3>{{ $localize('profileTitle') }}</h3>
  </div>

  <form class="form" @submit.prevent="onSubmit">
    <div class="input-field">
      <input
          id="name"
          type="text"
          v-model="name"
          :class="{invalid: nError}"
          @blur="nBlur"
      >
      <label for="name">{{ $localize('form_name') }}</label>
      <span class="helper-text invalid" v-if="nError">{{ nError }}</span>
    </div>

    <div class="switch">
      <label>
        English
        <input type="checkbox" v-model="locale">
        <span class="lever"></span>
        Русский
      </label>
    </div>

    <button class="btn waves-effect waves-light" type="submit">
      {{ $localize('btn_refresh') }}
      <i class="material-icons right">send</i>
    </button>
  </form>
</template>

<script>
import { useProfileForm } from '../use/profile-form'

export default {
  name: 'Profile',
  data () {
    return {
      ...useProfileForm()
    }
  },
  mounted () {
    setTimeout(() => M.updateTextFields(), 0)
  }
}
</script>

<style scoped>
  .switch {
    margin-bottom: 30px
  }
</style>
