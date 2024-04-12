console.log('Help me!')
import { getAnswer } from "./api-requests.js"
import { randomQuote } from "./quote-api-requests.js"

let question = document.querySelector(".question")
let answer = document.querySelector(".answer")
let author = document.querySelector(".author")
let quote = document.querySelector(".quote")
let userInput = document.querySelector(".userInput")
let submitBtn = document.querySelector(".submit-btn")

const submitForm = (e) => {
    e.preventDefault()
    console.log('userInput.value ', userInput.value)

    if (userInput.length > 0) {

        getAnswer(userInput.value)
        .then(a => {
            console.log(date)
            question.innerHTML = userInput.value
            answer.innerHTML = a.choices[0].message.content
            userInput.value = ""
        })
    } else  {
        randomQuote()
        .then(random => {
            author.innerHTML = `${random.author} once said...`
            quote.innerHTML = `"${random.content}"`
        })
    }


}

submitBtn.addEventListener("click", submitForm)

