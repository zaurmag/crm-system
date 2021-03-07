import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import { useStore } from 'vuex'
import { inject } from 'vue'

export function useRecordCreate (current) {
  const { handleSubmit, resetForm, setFieldValue } = useForm()
  const store = useStore()
  const message = inject('message')

  // Category
  const { value: category } = useField('category')
  setFieldValue('category', current)

  // Type
  const { value: type } = useField('type')
  setFieldValue('type', 'income')

  // Amount
  const AMOUNT_MINLENGTH = 10
  const { value: amount, errorMessage: aError, handleBlur: aBlur } = useField(
    'amount',
    yup
      .number()
      .required('Введите сумму')
      .min(AMOUNT_MINLENGTH, `Значение не может быть меньше ${AMOUNT_MINLENGTH}`)
  )

  // Description
  const { value: descr, errorMessage: dError, handleBlur: dBlur } = useField(
    'descr',
    yup
      .string()
      .required('Введите описание')
  )

  const onSubmit = handleSubmit(async values => {
    try {
      function canCreateRecord () {
        if (values.type === 'income') {
          return true
        }

        return store.getters.info.bill >= values.amount
      }

      if (canCreateRecord()) {
        await store.dispatch('addRecord', {
          ...values,
          date: new Date().toJSON()
        })

        const bill = values.type === 'income'
          ? store.getters.info.bill + values.amount
          : store.getters.info.bill - values.amount

        await store.dispatch('updateInfo', { bill })

        resetForm()
        message('Запись успешно создана')
      } else {
        message(`Недостаточно средств на счете - ${values.amount - store.getters.info.bill}`)
      }
    } catch (error) {}
  })

  return {
    category,
    type,
    amount,
    aError,
    aBlur,
    descr,
    dError,
    dBlur,
    onSubmit
  }
}
