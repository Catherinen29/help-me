console.log('Help me!')
import { getAnswer } from "./api-requests.js"
import { randomQuote } from "./quote-api-requests.js"

let qAndA = document.querySelector(".qAndA")
let question = document.querySelector(".question")
let answer = document.querySelector(".answer")
let questionList = document.querySelector(".question-list")
let author = document.querySelector(".author")
let quote = document.querySelector(".quote")
let userInput = document.querySelector(".userInput")
let submitBtn = document.querySelector(".submit-btn")


const submitForm = (e) => {
    e.preventDefault()
    console.log('userInput.value ', userInput.value)

    if (userInput.value.length > 0) {

        let current = {question: "", answer: ""}

        getAnswer(userInput.value)
        .then(a => {
            const date = new Date().toUTCString()
            console.log(`date`, date)

            author.innerHTML = ""
            quote.innerHTML = ""

            qAndA.style.display = "flex"
            question.innerHTML = userInput.value
            answer.innerHTML = a.choices[0].message.content

            current = JSON.stringify([
                userInput.value, 
                a.choices[0].message.content
            ])
            localStorage.setItem(date, current)

            userInput.value = ""

        })
    } else {
        randomQuote()
        .then(random => {
            qAndA.style.display = "none"
            author.innerHTML = `${random.author} once said...`
            quote.innerHTML = `"${random.content}"`

            question.innerHTML = ""
            answer.innerHTML = ""
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

        item.appendChild(historicQ)
        item.appendChild(historicA)
        questionList.appendChild(item)
    })

}

history()