import { toast, ToastOptions, ToastContent } from 'react-toastify'
import { TOASTS_SUCCESS_OPTIONS } from './toastsDefaultOptions'
import { ToastText } from './types'

export function ToastSuccess(
  content: ToastContent,
  options?: ToastOptions
): ToastText {
  return toast.success(content, {
    ...TOASTS_SUCCESS_OPTIONS,
    ...(options || {}),
  })
}
