"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { DeleteUsers } from "@/actions/server-action";
import { useContext } from "react";
import { userContext } from "@/context";

export default function SingleUserPage({ user }) {
  const { currentEditId, setCurrentEditId, setOpenPopUp, setAddNewFormdata } =
    useContext(userContext);
  async function HandleDelete(currentUserId) {
    const deleteusers = await DeleteUsers(currentUserId, "/user-manager");
    console.log(deleteusers);
  }
  async function HandleEdit(currentUser) {
    setOpenPopUp(true);
    setAddNewFormdata({
      firstName: currentUser?.firstName,
      lastName: currentUser?.lastName,
      email: currentUser?.email,
      address: currentUser?.email,
    });
    setCurrentEditId(currentUser?._id);
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {user.firstName}
          {user.lastName}
        </CardTitle>
        <CardDescription>{user.email}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{user.address}</p>
      </CardContent>
      <CardFooter className="flex items-center gap-4">
        <Button onClick={() => HandleEdit(user)}> Edit</Button>
        <Button onClick={() => HandleDelete(user?._id)}>Delete</Button>
      </CardFooter>
    </Card>
  );
}
