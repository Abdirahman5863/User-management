"use client"
import { createContext, useState } from "react";
import { addNewUserFormController, intialFormdata } from "@/utils";
 export const  userContext=createContext(null)

 export default function UserState({children}){
    const [currentEditId,setCurrentEditId]=useState(null)
    const [openPopUp, setOpenPopUp] = useState(false);
    const [addnewformdata, setAddNewFormdata] = useState(addNewUserFormController);
    return <userContext.Provider value={{currentEditId,setCurrentEditId,addnewformdata, setAddNewFormdata,openPopUp, setOpenPopUp,}}>{children}</userContext.Provider>


 }