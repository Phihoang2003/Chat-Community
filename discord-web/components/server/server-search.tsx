"use client"
import { Search } from 'lucide-react'
import React, { useState } from 'react'
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../ui/command'


interface ServerSeachProps{

    data:{
        label:string,
        type:"channel"|"member",
        data:{
            icon:React.ReactNode,
            name:string,
            id:string
        }[]|undefined
    }[]
}
const ServerSeach = ({data}:ServerSeachProps) => {
    const [open,settOpen]=useState(false);
    
  return (
   <>
    <button onClick={()=>settOpen(true)} className='group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition'>
        <Search className='h-4 w-4 text-zinc-500 dark:text-zinc-400'/>
        <p className='font-semibold text-sm text-zinc-500 dark:text-zinc-400'>
            Search
        </p>
        <kbd
          className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground ml-auto"
        >
          <span className="text-xs">⌘</span>K
        </kbd>
    </button>
    <CommandDialog open={open} onOpenChange={settOpen}>
        <CommandInput placeholder='Search all channels and members'/>

        <CommandList>
            <CommandEmpty>No result found</CommandEmpty>
            {data?.map(({label,type,data})=>{
                if(!data?.length){
                    return null;
                }
                return(
                    <CommandGroup key={label} heading={label}>
                        {data?.map(({id,name,icon})=>{
                            return(
                                <CommandItem key={id}>
                                    {icon}
                                    <span>{name}</span>
                                </CommandItem>
                            )
                        })}
                    </CommandGroup>
                )
            })}
        </CommandList>
    </CommandDialog>
   </>
  )
}

export default ServerSeach