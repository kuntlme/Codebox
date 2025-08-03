"use server"
import { currentUser } from "@/features/auth/actions"
import { db } from "@/lib/db"
import { Templetes } from "@prisma/client"
import { revalidatePath } from "next/cache"


export const createPlayground = async (data: {
    title: string,
    template: Templetes,
    description: string,
    userId: string
}) => {
    const { template, title, description } = data;
    const user = await currentUser();
    try {
        const playground: any = await db.playground.create({
            data: {
                title,
                description,
                template,
                userId: user?.id as string
            }
        })
        return playground;
    } catch (error) {
        console.log(error)
        return null;
    }

}


export const getAllPlaygroundForUser = async() => {
    const user = await currentUser();

    try{
        const playground = await db.playground.findMany({
            where: {
                userId: user?.id!
            },
            include: {
                user: true,
                starmark: {
                    where: {
                        userId: user?.id!
                    },
                    select: {
                        isMarked: true
                    }
                }
            }
        })
    }catch(error){
        console.log(error)
        return null;
    }
}

export const deleteProjectById = async (id: string) => {
    try{
        await db.playground.delete({
            where: {id}
        })

        revalidatePath("/dashboard")
    }catch(error){
        console.log(error)
    }
}

export const editProjectById = async (id: string, data: {title: string, description: string}) => {
    try {
        await db.playground.update({
            where: {id},
            data: data
        })
    } catch (error) {
        console.log(error)
    }
}

export const duclicateProjectById = async (id: string) => {
    try {
        const originalPlaygroud = await db.playground.findUnique({
            where: {id}
        })

        if(!originalPlaygroud) {
            throw new Error("Playground not found");
        }

        const duclicatedPlayground = await db.playground.create({
            data: {
                title: `${originalPlaygroud.title} copy`,
                description: originalPlaygroud.description,
                template: originalPlaygroud.template,
                userId: originalPlaygroud.userId
            }
        })

        revalidatePath("/dashboard")

        return duclicatedPlayground;
    } catch (error) {
        console.log(error)
        return null
    }
}