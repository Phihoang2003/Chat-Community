import ChatHeader from '@/components/chat/chat-header';
import ChatInPut from '@/components/chat/chat-input';
import ChatMessages from '@/components/chat/chat-messages';
import { getOrCreateConversation } from '@/lib/conservation';
import currentProfile from '@/lib/current-profile';
import { db } from '@/lib/db';
import { redirectToSignIn } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import React from 'react'
interface MemberIdPageProps{
  params:{
    memberId: string;
    serverId:string
  }
}
const MemberIdPage =async ({params}:MemberIdPageProps) => {

  const profile=await currentProfile();
  if(!profile){
    return redirectToSignIn();
  }
  const currentMember=await db.member.findFirst({
    where:{
      serverId:params.serverId,
      profileId:profile.id
    },
    include:{
      profile:true
    }
  })
  if(!currentMember){

    return redirect("/")
  }
  //Phai tim conversation de biet duoc member one va member two sau do moi tim duoc othermember va truyen du lieu de xu li tiep
  const conversation=await getOrCreateConversation(currentMember.id,params.memberId);
  if (!conversation) {
    return redirect(`/servers/${params.serverId}`);
  }
  const {memberOne,memberTwo}=conversation
  const otherMember=memberOne.profile.id===profile.id?memberTwo:memberOne;
  return (
    <div className='bg-white className="bg-white dark:bg-[#313338] flex flex-col h-full'>
        <ChatHeader
          imageUrl={otherMember.profile.imageUrl}
          name={otherMember.profile.name}
          serverId={params.serverId}
          type='conversation'
        />
        <ChatMessages/>
        <ChatInPut/>
    </div>
  )
}

export default MemberIdPage