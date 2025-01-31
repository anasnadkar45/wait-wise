import { AddProject } from "@/app/components/project/AddProject"

const page = async () => {
  
  return (
    <div className='p-4'>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">All Cars</h1>
        <AddProject />
      </div>
    </div>
  )
}

export default page