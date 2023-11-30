"use client"


import { useModal } from '@/hooks/use-modal-store'

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader } from '../ui/dialog'
import { DialogTitle } from '@radix-ui/react-dialog'


const MembersModal = () => {
    const {isOpen,onOpen,onClose,data,type}=useModal()
    
    const isModalOpen=isOpen&&type==="members"
    
    const {server}=data
    
    
  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className='bg-white text-black overflow-hidden'>
        <DialogHeader className='pt-8 px-6'>
          <DialogTitle className='text-2xl text-center font-bold'>
            Invite Friend
          </DialogTitle>
        </DialogHeader>
        <div className='p-6'>
          hello members
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default MembersModal