"use server"

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/database/client"


export async function OnRampTransactionAction(amount:number , provider:string) {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id ;
    const token = Math.random().toString() ;
    
    
    if(!userId){
        return {
            message: "You're not logged in"
        }
    } ;
    await prisma.onRampTransaction.create({
        data: {
            startTime: new Date(),
            status: "Processing",
            amount: amount,
            provider,
            userId: Number(userId),
            token
        }
    })

    return {
        message: "Onramp Transaction added"
    }
}