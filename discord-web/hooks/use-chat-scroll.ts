import React, { useEffect, useState } from "react"

type ChatScrollProps={
    chatRef:React.RefObject<HTMLDivElement>;
    bottomRef:React.RefObject<HTMLDivElement>;
    loadMore:()=>void;
    shouldLoadMore:boolean;
    count:number
}
export const useChatScroll=({chatRef,bottomRef,loadMore,shouldLoadMore,count}:ChatScrollProps)=>{
    const [hasInitialized,setHasInitialized]=useState(false);
    //Khi cuon len tren se fetch them tin nhan cua page ket tiep.Mac dinh tin nhan cuoi cung la page 0
    useEffect(()=>{
        const topDiv=chatRef?.current;
        const handleScroll=()=>{
            const scrollTop=topDiv?.scrollTop;
            if(scrollTop===0&&shouldLoadMore){
                loadMore();
            }
        }
        topDiv?.addEventListener("scroll",handleScroll);
        return ()=>topDiv?.removeEventListener("scroll",handleScroll)
    },[chatRef,shouldLoadMore,loadMore])

    useEffect(()=>{

        const bottomDiv=bottomRef?.current;
        const topDiv=chatRef.current;
        const shouldAutoScroll=()=>{
            if(!hasInitialized&&bottomDiv){
                setHasInitialized(true);
                return true;
            }
            if(!topDiv){
                return false;
            }
            //scroll heighl la toan bo tin nhan-tu dinh tin nhan den scroll hien tai - scroll tu view cua nguoi nhin se ra duoc khoang cach tu bottom den het doan tin nhan neu nho hon 100 thi scrool den cuoi 
            const distanceFromBottom=topDiv.scrollHeight-topDiv.scrollTop-topDiv.clientHeight;
            return distanceFromBottom<=100;
        }
        if(shouldAutoScroll()){
            setTimeout(()=>{
                bottomRef?.current?.scrollIntoView({
                    behavior:"smooth"
                })
            },100)
        }
    },[bottomRef,chatRef,count,hasInitialized])
}




