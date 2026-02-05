const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI("AIzaSyCEhsN48t-zoirAZT_Vil52kEhe_wBZGXA");

app.post("/generate", async (req, res) => {
  const { prompt } = req.body;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

    const result = await model.generateContent(prompt);
    const response = await result.response;

    res.json({ text: response.text() });
  } catch (e) {
    console.log(e);
    res.status(500).send("Error");
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
