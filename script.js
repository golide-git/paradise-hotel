const bookingForm = document.querySelector('#booking-form')
const checkInInput = document.querySelector('#check-in')
const checkOutInput = document.querySelector('#check-out')
const guestsInput = document.querySelector('#guests')
const formMessage = document.querySelector('#form-message')
const roomButtons = document.querySelectorAll('.room-button')
const confirmation = document.querySelector('#confirmation')
const confirmationText = document.querySelector('#confirmation-text')
const closeConfirmation = document.querySelector('#close-confirmation')

let roomName = 'Ocean Suite'
let roomPrice = 260

const today = new Date()
const tomorrow = new Date(today)
tomorrow.setDate(today.getDate() + 1)
const nextWeek = new Date(today)
nextWeek.setDate(today.getDate() + 4)

function formatDate(date) { return date.toISOString().split('T')[0] }

function displayDate(value) {
  return new Date(`${value}T00:00:00`).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

checkInInput.min = formatDate(today)
checkOutInput.min = formatDate(tomorrow)
checkInInput.value = formatDate(tomorrow)
checkOutInput.value = formatDate(nextWeek)

checkInInput.addEventListener('change', () => {
  const checkInDate = new Date(`${checkInInput.value}T00:00:00`)
  const nextDay = new Date(checkInDate)
  nextDay.setDate(checkInDate.getDate() + 1)
  checkOutInput.min = formatDate(nextDay)

  if (checkOutInput.value <= checkInInput.value) {
    checkOutInput.value = formatDate(nextDay)
  }
})

roomButtons.forEach((button) => {
  button.addEventListener('click', () => {
    roomName = button.dataset.room
    roomPrice = Number(button.dataset.price)

    roomButtons.forEach((roomButton) => {
      roomButton.classList.remove('selected')
      roomButton.textContent = 'Choose room'
    })

    button.classList.add('selected')
    button.textContent = 'Room selected'
    document.querySelector('#booking').scrollIntoView({ behavior: 'smooth' })
  })
})

bookingForm.addEventListener('submit', (event) => {
  event.preventDefault()

  if (checkOutInput.value <= checkInInput.value) {
    formMessage.textContent = 'Please choose a check-out date after check-in.'
    return
  }

  const checkInDate = new Date(`${checkInInput.value}T00:00:00`)
  const checkOutDate = new Date(`${checkOutInput.value}T00:00:00`)
  const nights = Math.round((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24))
  const guests = guestsInput.value
  const total = nights * roomPrice
  const guestLabel = guests === '1' ? 'guest' : 'guests'

  formMessage.textContent = `${roomName} is available for your dates.`
  confirmationText.textContent = `${roomName} for ${guests} ${guestLabel}, from ${displayDate(checkInInput.value)} to ${displayDate(checkOutInput.value)}. Total: R${total}.`
  confirmation.classList.remove('hidden')
})

closeConfirmation.addEventListener('click', () => confirmation.classList.add('hidden'))
