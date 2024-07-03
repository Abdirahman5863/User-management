"use server";

import connectToDb from "@/database";
import User from "@/models/user";
import { revalidatePath } from "next/cache";

export async function Adduser(formdata, pathToRevalidate) {
  await connectToDb();
  try {
    const newlyaddeduser = await User.create(formdata);
    if (newlyaddeduser) {
      revalidatePath(pathToRevalidate);
      return {
        success: true,
        message: " User successfuly Created",
      };
    } else {
      return {
        success: false,
        message: "Something went wrong ,please try again later",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something went wrong ,please try again later",
    };
  }
}
export async function EditUser(formdata, currentUserId, pathToRevalidate) {
  await connectToDb();
  try {
    const { firstName, lastName, email, address } = formdata;
    const updateddata = await User.findOneAndUpdate(
      { _id : currentUserId },
      {
        firstName,
        lastName,
        email,
        address,
      },
      { new: true }
    );
    if (updateddata) {
      revalidatePath(pathToRevalidate);
      return {
        success: true,
        message: "User Successfully Upadated",
      };
    } else {
      return {
        success: false,
        message: "Something went wrong , try gain",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something went wrong , try gain",
    };
  }
}

export async function GetUsers() {
  await connectToDb();
  try {
    const extractalldata = await User.find({});
    if (extractalldata) {
      return {
        success: true,
        data: JSON.parse(JSON.stringify(extractalldata)),
      };
    } else {
      return {
        success: false,
        message: "Something went Wrong , try again",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something went Wrong , try again",
    };
  }
}
export async function DeleteUsers(currentUserId, pathToRevalidate) {
  await connectToDb();
  try {
    const deletedUser = await User.findByIdAndDelete(currentUserId);
    if (deletedUser) {
      revalidatePath(pathToRevalidate);
      return {
        success: true,
        message: "User Successfully deleted",
      };
    } else {
      return {
        success: false,
        message: "Something went wrong , try gain",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something went wrong , try gain",
    };
  }
}
