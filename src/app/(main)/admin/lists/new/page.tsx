// "use client"
// import { createProjectAction } from '@/app/actions'
// import { ProjectSchema } from '@/app/utils/zodSchemas'
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'
// import React, { useActionState, useState } from 'react'
// import { useForm } from '@conform-to/react'
// import { SubmitButton } from '@/app/components/SubmitButton'
// import { parseWithZod } from '@conform-to/zod'
// import { redirect } from 'next/navigation'

import { AddProject } from "@/app/components/AddProject"


// const page = () => {
//   const [lastResult, action] = useActionState(createProjectAction, undefined)
//   const [form, fields] = useForm({
//     lastResult,
//     onValidate({ formData }) {
//       return parseWithZod(formData, { schema: ProjectSchema })
//     },
//     shouldValidate: "onBlur",
//     shouldRevalidate: "onInput",
//   })
//   const [title, setTitle] = useState<string>('')
//   // const [handle, sethandle] = useState<string>('')

//   if(form.status === 'success'){
//     redirect('admin/lists')
//   }

//   console.log(form.errors)
//   return (
//     <div className="container mx-auto px-4 py-8 max-w-2xl">
//       <Card className="w-full">
//         <CardHeader>
//           <CardTitle className="text-2xl font-bold text-center">Create Project</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate className="space-y-6">

//             <div className="space-y-2">
//               <Label htmlFor="title">Name</Label>
//               <Input
//                 id="title"
//                 placeholder="Enter a project name"
//                 name={fields.title.name}
//                 defaultValue={fields.title.initialValue}
//                 key={fields.title.key}
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 className="w-full"
//               />
//               {fields.title.errors && (
//                 <p className="text-red-500 text-sm">{fields.title.errors}</p>
//               )}
//             </div>
//             {/* <div className="space-y-2">
//               <Label htmlFor="handle">Handle</Label>
//               <Input
//                 id="handle"
//                 placeholder="Enter a project name"
//                 name={fields.handle.name}
//                 defaultValue={fields.handle.initialValue}
//                 key={fields.handle.key}
//                 value={handle}
//                 onChange={(e) => sethandle(e.target.value)}
//                 className="w-full"
//               />
//               {fields.handle.errors && (
//                 <p className="text-red-500 text-sm">{fields.handle.errors}</p>
//               )}
//             </div> */}
//             <SubmitButton text='Create' />
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }

// export default page

const page = async () => {
  // const cars = await getCarData();

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