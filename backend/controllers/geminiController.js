const genai = require("@google/genai");
require('dotenv').config();

let ai = new genai.GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
})


const getCategory = async (req, res) => {
    const  des  = req.query.des;
    console.log(des);
    try {
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: `Give one word category based on the description given by the user if anything is not there give any suitable category: ${des}`,
        });
        console.log(response);
        res.json({response});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = { getCategory };