import React from 'react'
import { toast, ToastOptions } from 'react-toastify'
import {
  ToastPendingLoaderStyle,
  ToastPendingStyle,
  ToastPendingTextStyle,
} from './ToastPendingStyles'
import { TOASTS_PENDING_OPTIONS } from './toastsDefaultOptions'
import { ToastText } from './types'

export function ToastPending(
  content: JSX.Element,
  options?: ToastOptions
): ToastText {
  return toast(
    <ToastPendingStyle>
      <ToastPendingLoaderStyle />
      {/* eslint-disable-next-line */}
      <ToastPendingTextStyle>{content as any}</ToastPendingTextStyle>
    </ToastPendingStyle>,
    { ...TOASTS_PENDING_OPTIONS, ...(options || {}) }
  )
}
