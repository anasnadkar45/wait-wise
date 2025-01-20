import { CategoryType } from "@prisma/client";

export interface ProjectType {
    totalSubmissions: number;
    id: string;
    name: string;
    handle: string;
    description: string;
    logo: string;
    waitListCode: CategoryType;
    waitListSubmission: SubmissionType[] ;
    userId?: string;
    user?: UserType;
}

export interface SubmissionType {
    id: string;
    createdAt: Date;
    email: string;
    projectId?: string;
}

export interface UserType {
    id: string;
    name?: string;
    email: string;
    emailVerified?: Date;
    image?: string;
}
