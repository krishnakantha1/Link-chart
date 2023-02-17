 const local = "http://localhost:5000"
 const remote = "https://planit-backend.onrender.com"
 const isRemote = false
 export const host = isRemote ? remote : local

//charts
export const getUserCharts = "/api/linkchart/get-chart"

export const createChart = "/api/linkchart/"

export const deleteChart = "/api/linkchart/"

//cards
export const getCards = "/api/cards/get-cards"

export const createCard = "/api/cards/"

export const deleteCard = "/api/cards/"

export const updateCards = "/api/cards/"

//links
export const createLink = "/api/links/"

export const deleteLink = "/api/links/"

//login
export const loginPath = '/api/login'

//register
export const registerPath = '/api/register'