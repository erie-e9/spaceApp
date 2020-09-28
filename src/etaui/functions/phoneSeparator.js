export default function phoneSeparator(phoneNumber) {
  return phoneNumber.toString().replace(/\B(?=(\d{4})+(?!\d))/g, ' ')
}
