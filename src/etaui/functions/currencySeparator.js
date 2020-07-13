export default function currencySeparator(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
