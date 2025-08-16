"use server"

import { db } from "@/lib/db"
import { TemplateFolder } from "../libs/path-to-json";
import { currentUser } from "@/features/auth/actions";

export const getPlaygroundById = async (id: string) => {
    try {
        const playground = await db.playground.findUnique({
            where: { id },
            select: {
                title: true,
                description: true,
                templateFiles: {
                    select: {
                        content: true
                    }
                }
            }
        })
        return playground;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const saveUpdatedCode = async (playgroundId: string, data: TemplateFolder) => {
const user = currentUser();
if(!user) return null;
try {
    await db.templateFile.upsert({
        where: {
            playgroundId
        },
        update: {
            content: JSON.stringify(data)
        },
        create: {
            playgroundId,
            content: JSON.stringify(data),
        }
    })
} catch (error) {
    
}
}