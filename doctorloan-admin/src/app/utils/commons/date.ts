import moment from 'moment'

/**
 * Convert format date to server
 * @param {string} current Date
 * @return {string} new date
 */
function formatDateSever(current?: string, hasTime: boolean = false): string {
  if (!current) return ''
  let formatDefault = 'DD-MM-yyyy'
  if (hasTime) {
    formatDefault += ', h:mm:ss a'
  }
  return moment(current).format(formatDefault)
}

export {formatDateSever}
