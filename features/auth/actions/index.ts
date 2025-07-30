"use server"
import { db } from "@/lib/db"
import { auth } from "@/lib/auth";

export const getUserById = async (id: string) => {
    try {
        const user = await db.user.findUnique({
            where: { id },
            include: { accounts: true }
        });

        return user;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getAccountbyUserId = async (userId: string) => {
    try {
        const account = await db.account.findFirst({
            where: {
                userId
            }
        })
        return account;
    } catch (error) {
        console.log(error);
        return null;
    }
}


export const currentUser = async () => {
    const user = await auth;
    return user.user;
}