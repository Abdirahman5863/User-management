import React from "react";
import AddNewUser from "../../components/add-new-user";
import { GetUsers } from "@/actions/server-action";
import SingleUserPage from "@/components/single-userpage";
export default async function Usermangement() {
  const getallusers = await GetUsers();
  return (
    <div className="w-screen p-10 overflow-x-hidden">
      <div className=" flex justify-between">
        <h1>User Management List</h1>
        <AddNewUser getallusers={getallusers} />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-8">
        {
            getallusers && getallusers.data && getallusers.data.length > 0 ?(getallusers.data.map((userItems)=>(
               <SingleUserPage user={userItems} key={userItems.id}/>)
            )) : <h3>No Users Found!Please Add User</h3>
        }
      </div>
    </div>
  );
}
