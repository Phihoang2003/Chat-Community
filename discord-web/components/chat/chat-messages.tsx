import { Member } from '@prisma/client'
import React from 'react'
import ChatWelcome from './chat-welcome';

interface ChatMessagesProps{
  name:string,
  member:Member;
  chatId:string,
  apiUrl:string;
  socketUrl:string;
  socketQuery:Record<string,string>
  paramKey:"channelId"|"conversationId"
  paramValue:string,
  type:"channel"|"conversation"
  

}
const ChatMessages = ({
  name,
  member,
  chatId,
  apiUrl,
  socketUrl,
  socketQuery,
  paramKey,
  paramValue,
  type
}:ChatMessagesProps) => {
  return (
    // flex-1 se tu dong tang kich thuoc va co dan lai cho phu hop theo chieu cao cua phan tu cha
    <div className='flex-1 flex flex-col overflow-y-auto py-4 '>
        <div className='flex-1'/>
        <ChatWelcome
          type={type}
          name={name}
        />
    </div>
  )
}


export default ChatMessages