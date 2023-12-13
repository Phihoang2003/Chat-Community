import { currentUser,redirectToSignIn } from "@clerk/nextjs";

import { db } from "./db";
import { redirect } from "next/navigation";


const InitialProfile =async () => {
    const user=await currentUser();
    if(!user){
        redirectToSignIn();
    }
    const profile=await db.profile.findUnique
    ({
        where:{
            userId:user?.id
        }
    })
    if(profile){
        return profile;
    }
    const newProfile=await db.profile.create({
        data:{
            userId:user?.id as string,
            name:`${user?.firstName} ${user?.lastName}`,
            imageUrl:user?.imageUrl as string,
            email:user?.emailAddresses[0].emailAddress as string
        }
    })
  return newProfile;
}

export default InitialProfile