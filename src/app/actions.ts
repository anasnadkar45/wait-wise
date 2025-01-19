"use server"
import { requireUser } from "./utils/hooks";
import prisma from "./utils/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { CategoryType } from "@prisma/client";

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
        .min(3, { message: "The handle has to be a minimum character length of 3" })
        .regex(/^[a-zA-Z0-9]+$/, { message: "The handle can only contain letters and numbers without spaces" }),
    waitListCode: z
        .string()
        .min(1, { message: "Category is required" }),
    logo: z.string(),
});

export async function addNewProject(prevState: any, formData: FormData) {
    const session = await requireUser();
    const user = session.user;

    if (!user?.id) {
        return {
            status: "error",
            message: "User not found. Please log in to add a new project."
        };
    }

    const validateFields = projectSchema.safeParse({
        name: formData.get('name'),
        description: formData.get('description'),
        handle: formData.get('handle'),
        waitListCode: formData.get('waitListCode'),
        logo: formData.get('logo'),
    });

    if (!validateFields.success) {
        return {
            status: "error",
            message: "Validation failed.",
            errors: validateFields.error.flatten().fieldErrors,
        };
    }

    try {
        const existingHandle = await prisma.project.findUnique({
            where: { handle: validateFields.data.handle },
        });

        if (existingHandle) {
            return {
                status: "error",
                message: "The handle is already in use. Please choose a unique handle."
            };
        }

        const project = await prisma.project.create({
            data: {
                name: validateFields.data.name,
                description: validateFields.data.description,
                handle: validateFields.data.handle,
                waitListCode: validateFields.data.waitListCode as CategoryType,
                logo: validateFields.data.logo,
                userId: user.id
            }
        });

        revalidatePath(`/admin/lists`);

        if (project) {
            return {
                status: "success",
                message: "Your project has been created successfully."
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
            message: "An error occurred while creating the project. Please try again later."
        };
    }
}

const submissionSchema = z.object({
    email: z
        .string()
});

export async function submitWaitList(prevState: any, formData: FormData) {
    const session = await requireUser();
    const user = session.user;

    if (!user?.id) {
        return {
            status: "error",
            message: "User not found. Please log in to submit the waitlist."
        };
    }

    const validateFields = submissionSchema.safeParse({
        email: formData.get("email")
    });

    if (!validateFields.success) {
        return {
            status: "error",
            message: "Validation failed.",
            errors: validateFields.error.flatten().fieldErrors,
        };
    }

    const projectId = formData.get('projectId') as string;
    try {
        const emailExists = await prisma.submissions.findUnique({
            where: {
                email: validateFields.data.email,
            },
        });

        if (emailExists) {
            return {
                status: "error",
                message: "This email is already on the waitlist."
            };
        }


        const data = await prisma.submissions.create({
            data: {
                email: validateFields.data.email,
                projectId: projectId
            }
        });

        revalidatePath(`/waitlist`);
        revalidatePath(`/admin/${projectId}/people`);

        if (data) {
            return {
                status: "success",
                message: "You have been successfully added to the waitlist."
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
            message: "An error occurred while submitting the waitlist. Please try again later."
        };
    }
}

// ----------------------------------------------------------------
