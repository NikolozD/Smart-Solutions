import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./@/components/ui/dialog";
import { Button } from "./@/components/ui/button";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { useContext } from "react";
import { useToast } from "./@/components/ui/use-toast";
import { UserContext } from "../UserContext";
import EditForm from "./EditForm";

export default function EditModal({ user, index, editSate }) {
  const { toast } = useToast();

  const { updateUserByIndex } = useContext(UserContext);
  //   function onChange(e) {
  //     const changedField = e.target.name.split(".");
  //     const newValue = e.target.value;
  //     console.log(curUser[changedField[0]]);
  //     console.log(newValue);
  //     if (changedField.length > 1) {
  //       setCurUser((currUser) => {
  //         return {
  //           ...currUser,
  //           [changedField[0]]: {
  //             ...currUser[changedField[0]],
  //             [changedField[1]]: newValue,
  //           },
  //         };
  //       });
  //     } else {
  //       setCurUser((currUser) => {
  //         return {
  //           ...currUser,
  //           [changedField[0]]: newValue,
  //         };
  //       });
  //     }
  //   }

  function handleSubmit(newuser) {
    console.log("here");
    editSate();
    fetch(`https://jsonplaceholder.typicode.com/users/${user.id}`, {
      method: "PUT",
      //   Send changed user here
      body: JSON.stringify(newuser),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((response) => {
      if (response.status !== 200) {
        toast({
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
          variant: "destructive",
        });
      } else {
        response.json().then((data) => {
          console.log(data);
          updateUserByIndex(newuser, index);
          editSate();
        });
        toast({
          description: "Your Request has been sent successfully",
        });

        // return response.json();
      }
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-black">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] h-vh  bg-gray-200">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <EditForm user={user} submitHandler={handleSubmit} />
        <DialogFooter className="sm:justify-center ">
          <DialogPrimitive.Close className=" rounded-sm align-centeer w-full  ring-offset-background transition-opacity hover:opacity-50 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            Close
          </DialogPrimitive.Close>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
