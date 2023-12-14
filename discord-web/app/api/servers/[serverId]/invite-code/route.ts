import { currentProfile } from '@/lib/current-profile';;
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import {v4 as uuidv4} from "uuid"
export async function PATCH(req:Request,{params}:{params:{serverId:string}}){
    try {
        const profile=await currentProfile();
        if(!profile){
            return new NextResponse("UnAuthorized",{status:400})
        }
        if(!params.serverId){
            return new NextResponse("ServerId is missing",{status:400})

        }
        const server=await db.server.update({
            where:{
                profileId:profile.id,
                id:params.serverId
            },data:{
                inviteCode:uuidv4()
            }
        })
        return NextResponse.json(server)
    } catch (error) {
        console.log(
            "SERVERID ERROR",error
        );
        return new NextResponse("Internal Error",{status:400})
        
    }
}