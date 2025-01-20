"use client"
import React from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Download } from "lucide-react"
import type { ProjectType } from "@/app/utils/types"
import { convertToCSV } from "@/app/utils/csvExport"

export const SubmissionTable = ({ project }: { project: ProjectType }) => {
  const handleExportCSV = () => {
    const data = project.waitListSubmission.map((submission, index) => ({
      "Sr.No": index + 1,
      Email: submission.email,
      "Created At": new Date(submission.createdAt).toLocaleDateString(),
      Verified: "Yes", // Assuming all entries are verified
    }))

    const csv = convertToCSV(data)
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.setAttribute("download", `${project.name}_waitlist_submissions.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

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
          {project.waitListSubmission.length > 0 &&
            project.waitListSubmission
              .slice()
              .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
              .map((person, index) => (
                <TableRow key={person.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{person.email}</TableCell>
                  <TableCell>{new Date(person.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </div>
  )
}

