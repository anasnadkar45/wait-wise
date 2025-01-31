"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { generateProjectDescription } from "@/app/utils/generateProjectDescription"
import { toast } from "sonner"

export function ProjectDescriptionGenerator({
  onDescriptionGenerated,
}: { onDescriptionGenerated: (description: string) => void }) {
  const [projectName, setProjectName] = useState("")
  const [keywords, setKeywords] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = async () => {
    if (!projectName.trim() || !keywords.trim()) {
      toast.error("Please enter both project name and keywords")
      return
    }

    setIsGenerating(true)
    try {
      const description = await generateProjectDescription(
        projectName,
        keywords.split(",").map((k) => k.trim()),
      )
      onDescriptionGenerated(description)
      toast.success("Project description generated successfully!")
    } catch (error) {
      console.error("Error generating description:", error)
      toast.error("Failed to generate project description. Please try again.")
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto mb-8">
      <CardHeader>
        <CardTitle>AI Project Description Generator</CardTitle>
        <CardDescription>Generate a compelling project description using AI</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="projectName">Project Name</Label>
          <Input
            id="projectName"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="Enter your project name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="keywords">Keywords (comma-separated)</Label>
          <Input
            id="keywords"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="e.g. innovative, user-friendly, scalable"
          />
        </div>
        <Button onClick={handleGenerate} disabled={isGenerating} className="w-full">
          {isGenerating ? "Generating..." : "Generate Description"}
        </Button>
      </CardContent>
    </Card>
  )
}

