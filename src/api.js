import axios from "axios"

const instance = axios.create({
    baseURL: 'https://quotes.instaforex.com/api',
})

const getResource = (url) => instance.get(url)
    .then(res => res.data)
    .catch(() => console.error(`Could not fetch url ${url}`))

export const dataAPI = {
    getQuotesList: () => getResource('/quotesList'),
    getQuotesTick: () => getResource('/quotesTick'),
}
