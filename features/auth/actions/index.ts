"use server"
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db"
import { getServerSession } from "next-auth";

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
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return null;

    // Assuming getUserById can accept email, otherwise adjust accordingly
    const user = await db.user.findUnique({
        where: { email: session.user.email },
    });

    return user;
}