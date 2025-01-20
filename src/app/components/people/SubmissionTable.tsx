"use client"
import React, { useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Download } from "lucide-react"
import type { ProjectType } from "@/app/utils/types"
import { convertToCSV } from "@/app/utils/csvExport"
import { getProjectData } from "@/app/actions"

export const SubmissionTable = ({ project }: { project: ProjectType & { totalSubmissions: number } }) => {
  const [currentProject, setCurrentProject] = useState<ProjectType>(project)
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const skip = (page - 1) * 12
      const newData = await getProjectData(project.id, skip)
      setCurrentProject(newData as ProjectType)
      setIsLoading(false)
    }

    fetchData()
  }, [page, project.id])

  const handleExportCSV = () => {
    const data = currentProject.waitListSubmission.map((submission, index) => ({
      "Sr.No": index + 1,
      Email: submission.email,
      "Created At": new Date(submission.createdAt).toLocaleDateString(),
      Verified: "Yes",
    }))

    const csv = convertToCSV(data)
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.setAttribute("download", `${currentProject.name}_waitlist_submissions.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const totalPages = Math.ceil(currentProject.totalSubmissions / 12)

  return (
    <div className="p-2">
      <div className="flex justify-end mb-4">
        <Button onClick={handleExportCSV} variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
      </div>
      <Table className="rounded-xl border-2 border-secondary">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">Sr.No</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Verified</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                Loading...
              </TableCell>
            </TableRow>
          ) : (
            currentProject.waitListSubmission.map((person, index) => (
              <TableRow key={person.id}>
                <TableCell>{(page - 1) * 12 + index + 1}</TableCell>
                <TableCell>{person.email}</TableCell>
                <TableCell>{new Date(person.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>
              <div className="flex justify-between items-center">
                <Button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1 || isLoading}>
                  Previous
                </Button>
                <span>
                  Page {page} of {totalPages}
                </span>
                <Button
                  onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={page === totalPages || isLoading}
                >
                  Next
                </Button>
              </div>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  )
}

