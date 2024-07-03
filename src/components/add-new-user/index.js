"use client";
import { Adduser, EditUser } from "@/actions/server-action";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addNewUserFormController, intialFormdata } from "@/utils";
import { useContext } from "react";
import { userContext } from "@/context";
export default function AddNewUser(getallusers) {
  const {
    openPopUp,
    setOpenPopUp,
    setAddNewFormdata,
    addnewformdata,
    currentEditId,
    setCurrentEditId,
  } = useContext(userContext);
  async function HandleForm(pathToRevalidata) {
    const result =currentEditId !== null
        ? await EditUser(addnewformdata, currentEditId, "/user-manager")
        : await Adduser(addnewformdata, "/user-manager");
    setOpenPopUp(false);
    setAddNewFormdata(intialFormdata);
    setCurrentEditId(null)
  }
  function Handledisable() {
    return Object.keys(addnewformdata).every(
      (key) => addnewformdata[key] !== ""
    );
  }
  return (
    <div>
      <Button onClick={() => setOpenPopUp(true)}>Add User</Button>
      <Dialog
        open={openPopUp}
        onOpenChange={() => {
          setOpenPopUp(false),
            setAddNewFormdata(intialFormdata),
            setCurrentEditId(null);
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {currentEditId !== null ? "Edit User" : "Add new User"}
            </DialogTitle>
          </DialogHeader>
          <form action={HandleForm} className="grid gap-4 py-4">
            {addNewUserFormController.map((controller) => (
              <div key={controller.name} className="mb-5">
                <Label htmlFor={controller.name} className="text-right">
                  {controller.label}
                </Label>
                <Input
                  id="username"
                  placeHolder={controller.placeHolder}
                  type={controller.type}
                  name={controller.name}
                  className="col-span-3"
                  value={addnewformdata[controller.name]}
                  onChange={(event) =>
                    setAddNewFormdata({
                      ...addnewformdata,
                      [controller.name]: event.target.value,
                    })
                  }
                />
              </div>
            ))}
            <DialogFooter>
              <Button
                type="submit"
                className="disabled:opacity-55"
                disabled={!Handledisable()}
              >
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
