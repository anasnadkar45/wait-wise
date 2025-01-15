import { z } from 'zod'
export const ProjectSchema = z.object({
    title: z
        .string()
        .min(3, { message: "Name must be at least 3 characters long" })
        .max(50, { message: "Name must be no longer than 50 characters" }),
})
