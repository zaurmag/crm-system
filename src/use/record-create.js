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
      // const record = await store.dispatch('addRecord', values)
      const bill = store.getters.info.bill

      function canCreateRecord () {
        if (values.type === 'income') {
          return true
        }

        return bill >= values.amount
      }

      if (canCreateRecord()) {
        console.log('OK')
      } else {
        message(`Недостаточно средств на счете - ${values.amount - bill}`)
      }

      // name.value = ''
      // resetForm()
      // limit.value = LIMIT_MINLENGTH
      // emit('created', category)
      // message('Запись успешно создана')
      // return record
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
