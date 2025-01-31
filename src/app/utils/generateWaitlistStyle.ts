import { GoogleGenerativeAI } from "@google/generative-ai"

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY

if (!apiKey) {
  throw new Error("NEXT_PUBLIC_GEMINI_API_KEY is not set in the environment variables.")
}

const genAI = new GoogleGenerativeAI(apiKey)

export async function generateWaitlistStyle(projectName: string, description: string, color: string): Promise<string> {
  const prompt = `
    Generate a Tailwind CSS style for a waitlist page with the following details:
    - Project Name: ${projectName}
    - Description: ${description}
    - Primary Color: ${color}

    The style should include classes for:
    1. Page background
    2. Header
    3. Main content area
    4. Call-to-action button
    5. Footer

    Provide the Tailwind CSS classes as a JSON object with keys for each element.
    Ensure the style is modern, attractive, and fits the project's theme.
    Return ONLY the JSON object, without any additional text or formatting.
  `

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" })
    const result = await model.generateContent(prompt)
    const responseText = result.response.text().trim()

    // Extract JSON from the response
    const jsonMatch = responseText.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error("No valid JSON found in the response")
    }

    const styleJSON = JSON.parse(jsonMatch[0])
    return JSON.stringify(styleJSON, null, 2)
  } catch (error) {
    console.error("Error generating waitlist style:", error)
    throw new Error("Failed to generate waitlist style. Please try again later.")
  }
}

