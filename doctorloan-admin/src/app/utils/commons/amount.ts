export function formatAmount(value?: number) {
  if (!value) value = 0
  const config = {style: 'currency', currency: 'VND', maximumFractionDigits: 9}
  return new Intl.NumberFormat('vi-VN', config).format(value)
}
