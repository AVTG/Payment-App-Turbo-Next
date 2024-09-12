"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "../auth" ;
import db from "@repo/database/client" ;

export async function p2pTransfer(to: string, amount: string){
    const session = await getServerSession(authOptions) ;
    const fromId = session?.user?.id ;
    if(!fromId){
        return {
            message: "Error while Sending"
        }
    }

    const toUser = await db.user.findFirst({
        where:{
            number: to
        }
    })

    if(!toUser){
        return {
            message: "User Doesn't exists"
        }
    }

    await db.$transaction(async(tx) => {
        await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(fromId)} FOR UPDATE`

        const fromBalance  = await tx.balance.findUnique({
            where:{
                userId:Number(fromId)
            }
        }) ;
        if(!fromBalance || !fromBalance.amount || fromBalance.amount < Number(amount)){
            throw new Error("Insufficient Funds") ;
        }

        await tx.balance.update({
            where:{
                userId: Number(fromId)
            },
            data:{
                amount:{decrement:Number(amount)}
            }
        }) ;
        await tx.balance.update({
            where:{
                userId: toUser.id
            },
            data:{
                amount:{increment:Number(amount)}
            }
        }) ;
    })

    await db.p2pTransfer.create({
        data:{
            fromUserId: Number(fromId),
            toUserId: toUser.id,
            amount: Number(amount),
            timestamp: new Date()
        }
    }) ;

    return {
        message: "Amount Transferred Successfully"
    }

}