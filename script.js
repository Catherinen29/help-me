console.log('Help me!')
import { getAnswer } from "./api-requests.js"

let question = document.querySelector(".question")
let answer = document.querySelector(".answer")
let userInput = document.querySelector(".userInput")
let submitBtn = document.querySelector(".submit-btn")

const submitForm = (e) => {
    e.preventDefault()
    console.log('userInput.value ', userInput.value)

    getAnswer(userInput.value)
    .then(a => {
        question.innerHTML = userInput.value
        answer.innerHTML = a.choices[0].message.content
    })

}

submitBtn.addEventListener("click", submitForm)

