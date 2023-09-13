/**
 * Convert format date to server
 * @param {number} current value
 * @return {string} new currency
 */

function currentcyFormatter(value: number) {
  return new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'}).format(value)
}

function convertNumberToString(number: number) {
  return String(number).replace(/(.)(?=(\d{3})+$)/g, '$1,')
}

function formatCurrencyToNumber(value: string) {
  if (!value) return 0
  return Number(value.replace(/[^0-9.-]+/g, ''))
}

export {currentcyFormatter, convertNumberToString, formatCurrencyToNumber}
