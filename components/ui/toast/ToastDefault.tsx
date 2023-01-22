import { ToastText } from './types'
import { toast, ToastOptions, ToastContent } from 'react-toastify'
import { TOASTS_DEFAULT_OPTIONS } from './toastsDefaultOptions'

export function ToastDefault(
  content: ToastContent,
  options?: ToastOptions
): ToastText {
  return toast(content, { ...TOASTS_DEFAULT_OPTIONS, ...(options || {}) })
}
