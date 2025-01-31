import { GoogleGenerativeAI } from "@google/generative-ai"
import prisma from "@/app/utils/db"
import { ProjectType } from "./types"

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY

if (!apiKey) {
  throw new Error("NEXT_PUBLIC_GEMINI_API_KEY is not set in the environment variables.")
}

const genAI = new GoogleGenerativeAI(apiKey)

export async function analyzeProject(project: ProjectType): Promise<string> {

  if (!project) {
    throw new Error("Project not found")
  }

  const prompt = `
    Analyze the following project and provide insights and recommendations:
    
    Project Name: ${project.name}
    Description: ${project.description}
    Waitlist Category: ${project.waitListCode}
    Number of Waitlist Submissions: ${project.waitListSubmission.length}

    Please provide the following:
    1. A brief summary of the project's current state
    2. Three key strengths of the project
    3. Three areas for improvement
    4. Two specific recommendations to increase waitlist submissions
    5. One innovative feature suggestion based on the project description

    Format the response in Markdown.
  `

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" })
    const result = await model.generateContent(prompt)
    return result.response.text().trim()
  } catch (error) {
    console.error("Error analyzing project:", error)
    throw new Error("Failed to analyze project. Please try again later.")
  }
}

