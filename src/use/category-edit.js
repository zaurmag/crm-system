import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import { useStore } from 'vuex'
import { inject } from 'vue'

export function useCategoryEdit (emit) {
  const { handleSubmit, resetForm } = useForm()
  const store = useStore()
  const message = inject('message')

  const { value: current } = useField('id')
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
  )

  const onSubmit = handleSubmit(async values => {
    try {
      await store.dispatch('editCategory', values)
      emit('updated', values)
      message('Категория успешно обновлена')
    } catch (error) {}
  })

  return {
    current,
    name,
    nError,
    nBlur,
    limit,
    lError,
    lBlur,
    onSubmit
  }
}
