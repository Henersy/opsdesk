import axios from 'axios'

const API_URL = 'http://localhost:5168/api/tickets'

export async function getTickets() {
  const response = await axios.get(API_URL)
  return response.data
}

export async function createTicket(ticket) {
  const response = await axios.post(API_URL, ticket)
  return response.data
}