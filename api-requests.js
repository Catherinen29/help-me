const API_URL = "https://api.openai.com/v1/chat/completions"
import { OPEN_AI_KEY } from "./config.js"


// AI question-answer
export const getAnswer = (userInput) => {
    console.log('getAnswer function running...')

    const API_body = {
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "user",
                content: userInput
            }],
        stream: false
    }

    return fetch(API_URL, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${OPEN_AI_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(API_body)
    })
    .then((r) => {
        if (!r.ok) throw new Error(`Oh no error! Error: ${r.status}`);
        return r.json();
    })
    .then(reply => {
        console.log('AI reply ', reply)
        return reply
    })
    .catch(err => console.log('catch error ', err))
}
