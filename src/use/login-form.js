import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import { computed, watch } from 'vue'
// import { useStore } from 'vuex'
// import { useRouter } from 'vue-router'

export function useLoginForm () {
  const { handleSubmit, isSubmitting, submitCount } = useForm()
  // const store = useStore()
  // const router = useRouter()

  const { value: email, errorMessage: eError, handleBlur: eBlur } = useField(
    'email',
    yup
      .string()
      .trim()
      .required('Введите e-mail')
      .email('Введите валидный e-mail')
  )
  const PASS_MINLENGTH = 6
  const { value: password, errorMessage: pError, handleBlur: pBlur } = useField(
    'password',
    yup
      .string()
      .trim()
      .required('Введите пароль')
      .min(PASS_MINLENGTH, `Пароль не может быть меньше ${PASS_MINLENGTH} символов`)
  )

  const isTooManyAttempts = computed(() => submitCount.value >= 3)

  watch(isTooManyAttempts, val => {
    if (val) {
      setTimeout(() => submitCount.value = 0, 1500)
    }
  })

  const onSubmit = handleSubmit(async values => {
    console.log('OnSubmit')
    // try {
    //   await store.dispatch('auth/login', values)
    //   router.push('/')
    // } catch (e) {
    //
    // }
  })

  return {
    email,
    eError,
    eBlur,
    password,
    pError,
    pBlur,
    onSubmit,
    isSubmitting,
    isTooManyAttempts
  }
}
