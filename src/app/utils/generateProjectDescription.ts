import { GoogleGenerativeAI } from "@google/generative-ai"

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY
const genAI = new GoogleGenerativeAI(apiKey as string)
console.log("API Key:", apiKey);

export async function generateProjectDescription(projectName: string, keywords: string[]): Promise<string> {
  const prompt = `
    Create an engaging and informative description for a project with the following details:
    - Project Name: ${projectName}
    - Keywords: ${keywords.join(", ")}

    The description should be approximately 100-150 words long and highlight the key features and benefits of the project.
    Make it compelling for potential users or investors.
  `

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" })
    const result = await model.generateContent(prompt)
    return result.response.text().trim()
  } catch (error) {
    console.error("Error generating project description:", error)
    throw new Error("Failed to generate project description. Please try again later.")
  }
}

