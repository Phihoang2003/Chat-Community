import { auth } from '@clerk/nextjs'
import React from 'react'
import { db } from './db';

const currentProfile = async() => {
    const {userId}=auth();
    if(!userId){

        return null;
    }
    const currentProfile=await db.profile.findUnique({
        where:{
            userId
        }
    })
  return currentProfile
}

export default currentProfile