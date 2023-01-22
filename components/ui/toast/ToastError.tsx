import { toast, ToastOptions, ToastContent } from 'react-toastify'
import { TOASTS_ERROR_OPTIONS } from './toastsDefaultOptions'
import { ToastText } from './types'

export function ToastError(
  content: ToastContent,
  options?: ToastOptions
): ToastText {
  return toast.error(content, { ...TOASTS_ERROR_OPTIONS, ...(options || {}) })
}
