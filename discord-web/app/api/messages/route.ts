import currentProfile from "@/lib/current-profile";
import { db } from "@/lib/db";
import { Message } from "@prisma/client";
import { NextResponse } from "next/server";

const MESSAGES_BATCH=10
export async function GET(req:Request){
    try {
        const profile=await currentProfile();
        const {searchParams}=new URL(req.url)
        const cursor=searchParams.get('cursor');
        const channelId=searchParams.get('channelId');
        if(!profile){
            return new NextResponse("Unthorizontal",{status:400})
        }
        if(!channelId){
            return new NextResponse("ChannelId is missing",{status:400});
        }
        let messages:Message[]=[];
        if(cursor){
            messages=await db.message.findMany({
                take:MESSAGES_BATCH,
                skip:1,
                cursor:{
                    id:cursor
                },
                where:{
                    channelId:channelId
                },
                include:{
                    member:{
                        include:{
                            profile:true
                        }
                    }
                },
                orderBy:{
                    createdAt:"desc"
                }
            })
        }
        else{
            messages=await db.message.findMany({
                take:MESSAGES_BATCH,
                where:{
                    channelId:channelId
                },
                include:{
                    member:{
                        include:{
                            profile:true
                        }
                    }
                },
                orderBy:{
                    createdAt:"desc"
                }
            })
        }
        // Do là lặp vô tận đến khi hết tin nhắn trong db,nên là khi lặp đến lần tiếp theo mảng messages lúc đó sẽ là rỗng và nó sẽ cập nhật lại nextCursor là id của phần tử cuối cùng trong mảng để dùng làm cursor cho lần fetch tin nhắn tiếp theo(dua vao nextcursor de fetch messages)
        
        let nextCursor=null;
        if(messages.length===MESSAGES_BATCH){
            nextCursor=messages[MESSAGES_BATCH-1].id;
        }
        return NextResponse.json({
            items:messages,
            nextCursor
        })
    } catch (error) {
        console.log("[MESSAGES_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}