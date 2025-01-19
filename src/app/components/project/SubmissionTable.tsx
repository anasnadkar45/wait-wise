
import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { CheckCircle2, Import, Plus } from 'lucide-react'
import { ProjectType } from '@/app/utils/types'

export const SubmissionTable = ({ project }: { project: ProjectType }) => {
  return (
    <div className='p-2'>
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
          {project.waitListSubmission.length > 0 && project.waitListSubmission.map((person,index) => (
            <TableRow key={person.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{person.email}</TableCell>
              <TableCell>{person.createdAt.toLocaleDateString()}</TableCell>
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
