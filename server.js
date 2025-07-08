import express from 'express'; //ESM (type: module)
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
//not using commonJs
dotenv.config(); //load env var

const PORT = 5000;
const app = express();

app.use(cors());
app.use(express.json());

//initialize Gemini AI
const genAI = new GoogleGenAI({
    apiKey: process.env.API_KEY,
});

app.post('/gemini', async (req, res) => {
    console.log(req.body.history);
    console.log(req.body.message);

    const chat = genAI.chats.create({
        model: "gemini-2.5-flash",
        history: [
            {
                role: "user",
                parts: [{ text: "Hello" }],
            },
            {
                role: "model",
                parts: [{ text: "Great to meet you. What would you like to know?" }],
            },
        ],
    });
    const msg = req.body.message
    const response1 = await chat.sendMessage({
        message: msg,
        config: {
            thinkingConfig: {
                thinkingBudget: 0, // Disables thinking
            },
        }
    });
    //console.log("Chat response 1:", response1.text);
    const text = response1.text;
    res.send(text);

    /*const msg = req.body.message

    const response = await chat.sendMessage({
        role: "user",
        parts: [{ text: msg }]
    });

    const text = response.text;
    res.send(text);
    */
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
