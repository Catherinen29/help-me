console.log('Help me!')
import { getAnswer } from "./api-requests.js"
import { randomQuote } from "./quote-api-requests.js"

let questionList = document.querySelector(".question-list")
let quoteBody = document.querySelector(".random-quote")
let author = document.querySelector(".author")
let quote = document.querySelector(".quote")
let userInput = document.querySelector(".userInput")
let submitBtn = document.querySelector(".submit-btn")


const submitForm = (e) => {
    e.preventDefault()
    console.log('userInput.value ', userInput.value)

    if (userInput.value.length > 0) {

        quoteBody.style.display = "none"
        
        getAnswer(userInput.value)
        .then(a => {
            const date = new Date().toUTCString()
            console.log(`date`, date)

            author.innerHTML = ""
            quote.innerHTML = ""

            let item = document.createElement('li')
            item.classList = "historic-item"
    
            let newQ = document.createElement('p')
            newQ.classList = "p-q"
            newQ.innerHTML = userInput.value
    
            let newA = document.createElement('p')
            newA.classList = "p-a"
            newA.innerHTML = a.choices[0].message.content
    
            let newDate = document.createElement('p')
            newDate.classList = "historic-date"
            newDate.innerHTML = new Date(date).toLocaleTimeString(
                'en-gb',
                {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })
    
            item.appendChild(newQ)
            item.appendChild(newA)
            item.appendChild(newDate)
            questionList.prepend(item)

            let current = JSON.stringify([
                userInput.value, 
                a.choices[0].message.content
            ])
            localStorage.setItem(date, current)

            userInput.value = ""

        })
    } else {
        randomQuote()
        .then(random => {
            quoteBody.style.display = "flex"

            author.innerHTML = `${random.author} once said...`
            quote.innerHTML = `"${random.content}"`

        })
    }
}

submitBtn.addEventListener("click", submitForm)


const history = () => {
    let storedList = Object.keys(localStorage)

    storedList.sort((a, b) => {
        return new Date(b) - new Date(a)
    })

    storedList.forEach(date => {

        let historicQuery = JSON.parse(localStorage.getItem(date))

        let item = document.createElement('li')
        item.classList = "historic-item"

        let historicQ = document.createElement('p')
        historicQ.classList = "p-q"
        historicQ.innerHTML = historicQuery[0]

        let historicA = document.createElement('p')
        historicA.classList = "p-a"
        historicA.innerHTML = historicQuery[1]

        let historicDate = document.createElement('p')
        historicDate.classList = "historic-date"
        historicDate.innerHTML = new Date(date).toLocaleTimeString(
            'en-gb',
            {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })

        item.appendChild(historicQ)
        item.appendChild(historicA)
        item.appendChild(historicDate)
        questionList.appendChild(item)
    })

}

history()