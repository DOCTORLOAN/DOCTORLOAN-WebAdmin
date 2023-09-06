import {TError} from '@/types/Commons/error.model'

function formatErrorMessage(obj: TError) {
  if (!obj) return null
  return `[${obj.code}] - ${obj.message}.`
}

export {formatErrorMessage}
