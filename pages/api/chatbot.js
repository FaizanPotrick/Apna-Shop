import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const { value } = req.body;
  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a e-commerce chatbot",
        },
        {
          role: "user",
          content: value,
        },
      ],
    });
    if (!completion.data.choices[0].message.content)
      return res.send("Sorry, I don't understand that. Please try again.");
    res.send(completion.data.choices[0].message.content);
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
      res.status(error.response.status).send(error.response.data);
    } else {
      console.log(error);
      res.status(500).send(error.message);
    }
  }
}
