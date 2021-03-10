import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import { useStore } from 'vuex'
import { inject } from 'vue'

export function useProfileForm () {
  const { handleSubmit, setFieldValue } = useForm()
  const store = useStore()
  const message = inject('message')

  const { value: name, errorMessage: nError, handleBlur: nBlur } = useField(
    'name',
    yup
      .string()
      .trim()
      .required('Введите имя')
  )
  setFieldValue('name', store.getters.info.name)

  const { value: locale } = useField('locale')
  setFieldValue('locale', store.getters.info.locale === 'ru-RU')

  const onSubmit = handleSubmit(async values => {
    try {
      await store.dispatch('updateInfo', {
        ...values,
        locale: locale.value ? 'ru-RU' : 'en-US'
      })
      message('Информация успешно обновлена!')
    } catch (error) {}
  })

  return {
    name,
    nError,
    nBlur,
    locale,
    onSubmit
  }
}
