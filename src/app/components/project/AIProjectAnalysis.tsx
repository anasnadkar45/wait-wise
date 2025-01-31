"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { analyzeProject } from "@/app/utils/projectAnalysis"
import { toast } from "sonner"
import ReactMarkdown from "react-markdown"
import { ProjectType } from "@/app/utils/types"

export function AIProjectAnalysis({ project }: { project: ProjectType }) {
  const [analysis, setAnalysis] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleAnalyze = async () => {
    setIsAnalyzing(true)
    try {
      const result = await analyzeProject(project)
      setAnalysis(result)
      toast.success("Project analysis completed successfully!")
    } catch (error) {
      console.error("Error analyzing project:", error)
      toast.error("Failed to analyze project. Please try again.")
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>AI Project Analysis</CardTitle>
        <CardDescription>Get AI-powered insights and recommendations for your project</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={handleAnalyze} disabled={isAnalyzing} className="w-full">
          {isAnalyzing ? "Analyzing..." : "Analyze Project"}
        </Button>
        {analysis && (
          <div className="mt-4 p-4 bg-secondary rounded-md">
            <ReactMarkdown>{analysis}</ReactMarkdown>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

