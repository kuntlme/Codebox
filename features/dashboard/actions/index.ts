"use server"
import { currentUser } from "@/features/auth/actions"
import { db } from "@/lib/db"
import { Templetes } from "@prisma/client"


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

