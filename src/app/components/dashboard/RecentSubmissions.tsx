import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { ProjectType } from "@/app/utils/types"

export function RecentSubmissions({ project }: { project: ProjectType }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Submissions</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {project.waitListSubmission.map((submission) => (
            <li key={submission.id} className="flex justify-between items-center">
              <span>{submission.email}</span>
              <span className="text-sm text-muted-foreground">
                {new Date(submission.createdAt).toLocaleDateString()}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

