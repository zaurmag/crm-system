import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import { useStore } from 'vuex'
import { inject } from 'vue'

export function useCategoryCreate (emit) {
  const { handleSubmit, resetForm, setFieldValue } = useForm()
  const store = useStore()
  const message = inject('message')

  const { value: name, errorMessage: nError, handleBlur: nBlur } = useField(
    'name',
    yup
      .string()
      .trim()
      .required('Введите название')
  )
  const LIMIT_MINLENGTH = 100
  const { value: limit, errorMessage: lError, handleBlur: lBlur } = useField(
    'limit',
    yup
      .number()
      .required('Введите минимальное значение лимита')
      .min(LIMIT_MINLENGTH, `Значение не может быть меньше ${LIMIT_MINLENGTH}`)
      .default(LIMIT_MINLENGTH)
  )

  setFieldValue('limit', LIMIT_MINLENGTH)

  const onSubmit = handleSubmit(async values => {
    try {
      const category = await store.dispatch('addCategory', values)
      name.value = ''
      resetForm()
      limit.value = LIMIT_MINLENGTH
      emit('created', category)
      message('Категория успешно создана')
    } catch (error) {}
  })

  return {
    name,
    nError,
    nBlur,
    limit,
    lError,
    lBlur,
    onSubmit
  }
}
