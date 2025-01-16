"use server"
import { requireUser } from "./utils/hooks";
import { parseWithZod } from '@conform-to/zod'
import { ProjectSchema } from "./utils/zodSchemas";
import prisma from "./utils/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

export type State = {
    status: "error" | "success" | undefined;
    errors?: {
        [key: string]: string[];
    };
    message?: string | null;
};

// ----------------------------------------------------------------

const projectSchema = z.object({
    name: z
        .string()
        .min(3, { message: "The name has to be a minimum character length of 3" }),
    description: z
        .string()
        .min(3, { message: "The description has to be a minimum character length of 3" }),
    handle: z
        .string()
        .min(3, { message: "The description has to be a minimum character length of 3" }),
    logo: z.string(),
});

export async function addNewProject(prevState: any, formData: FormData) {
    const session = await requireUser()
    const user = session.user

    if (!user?.id) {
        return {
            status: "error",
            message: 'User not found. Please login to add new car'
        }
    }

    const validateFields = projectSchema.safeParse({
        name: formData.get('name'),
        description: formData.get('description'),
        handle: formData.get('handle'),
        logo: formData.get('logo'),
    })

    if (!validateFields.success) {
        return {
            status: "error",
            message: "Validation failed.",
            errors: validateFields.error.flatten().fieldErrors,
        };
    }

    try {

        const existingHandle = await prisma.project.findUnique({
            where: {
                handle: validateFields.data?.handle,
            },
        });

        if (existingHandle) {
            return {
                status: "error",
                message: "The handle is already in use. Please choose a unique handle.",
            };
        }
        const data = await prisma.project.create({
            data: {
                name: validateFields.data?.name,
                description: validateFields.data?.description,
                handle: validateFields.data?.handle,
                logo: validateFields.data?.logo,
                userId: user.id
            }
        })

        revalidatePath(`/admin/lists`);
        if (data) {
            return {
                status: "success",
                message: "Your Project has been created successfully",
            };
        }

        const state: State = {
            status: "success",
            message: "Your Project has been created successfully",
        };
        return state;

    } catch (err) {
        return {
            status: "error",
            message: "An error occurred while creating the project. Please try again later.",
        };
    }
}