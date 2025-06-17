//const apiKey= "AIzaSyB8B7NcP_lYRRZeIiLah5xCsyhfrHD4-H4"
import { GoogleGenAI } from "@google/genai";

//import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: "AIzaSyB8B7NcP_lYRRZeIiLah5xCsyhfrHD4-H4" });

async function main(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
  });
  console.log(response.text);
  return response.text;
}

   export default main;