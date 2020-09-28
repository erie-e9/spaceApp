export function creditnumberSeparator(number) {
  return number.toString().replace(/\B(?=(\d{4})+(?!\d))/g, ' ')
}

export function expirationDateSeparator(number) {
  return number.toString().replace(/\B(?=(\d{2})+(?!\d))/g, '/')
}
