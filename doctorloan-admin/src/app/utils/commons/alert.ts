import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
import {AlertType} from '../enums/base'

/**
 * Convert format date to server
 * @param {string} title
 * @param {AlertType} type
 */
function alertMessage(
  title: string,
  type: AlertType = AlertType.Success,
  onHidden?: () => void,
  timeOut = 2000,
  extendedTimeOut = 2000
) {
  toastr.options = {
    closeButton: true,
    debug: false,
    newestOnTop: true,
    progressBar: true,
    positionClass: 'toast-top-right',
    preventDuplicates: false,
    showDuration: 300,
    hideDuration: 1000,
    timeOut: timeOut,
    extendedTimeOut: extendedTimeOut,
    showEasing: 'swing',
    hideEasing: 'linear',
    showMethod: 'fadeIn',
    hideMethod: 'fadeOut',
    onHidden: () => {
      onHidden && onHidden()
    },
  }

  switch (type) {
    case AlertType.Info:
      return toastr.info(title)
    case AlertType.Warning:
      return toastr.warning(title)
    case AlertType.Error:
      return toastr.error(title)
    default:
      return toastr.success(title)
  }
}

export {alertMessage}
