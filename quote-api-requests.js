const QUOTE_URL = "https://api.quotable.io/random"

export const randomQuote = (() => {
    return fetch(QUOTE_URL)
    .then(res => res.json())
    .then(quote => {
        console.log('quote', quote)
        return quote
    })
})