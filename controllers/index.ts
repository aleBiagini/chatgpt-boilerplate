import { Request, Response } from "express";
import { OpenAIApi, Configuration } from "openai";
import dotenv from "dotenv";

dotenv.config();

// OpenAIApi required config
const configuration = new Configuration({
  apiKey: process.env.API_KEY,
});

// OpenAIApi initialization
const openai = new OpenAIApi(configuration);

//These arrays are to maintain the history of the conversation
const conversationContext = [];
const currentMessages = [];


// Controller function to handle chat conversation
export const generateResponse = async (req: Request, res: Response) => {
  try {

    const completion = await openai.createChatCompletion({
      messages: [{ role: "system", content: req.body.message }],
      model: "gpt-3.5-turbo",
    }).then((result => {
      // console.log(result)
      res.send({ response: result.data.choices[0].message.content.toString() });

    }))



  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err });
  }
};
