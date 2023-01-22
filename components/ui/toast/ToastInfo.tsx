import { toast, ToastOptions, ToastContent } from 'react-toastify'
import { TOASTS_INFO_OPTIONS } from './toastsDefaultOptions'
import { ToastText } from './types'

export function ToastInfo(
  content: ToastContent,
  options?: ToastOptions
): ToastText {
  return toast.info(content, { ...TOASTS_INFO_OPTIONS, ...(options || {}) })
}
