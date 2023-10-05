import "./App.css";

import { TableCell, TableRow } from "./@/components/ui/table";
import { Button } from "./@/components/ui/button";
import { useState, useContext } from "react";
import { UserContext } from "../UserContext";
import EditModal from "./EditModal";
import { useToast } from "./@/components/ui/use-toast";
import { DeleteButton } from "./DeleteButton";
import { Loader2 } from "lucide-react";

function UserTableRow({ user, index, onClick }) {
  const { toast } = useToast();
  const { deleteUserByIndex } = useContext(UserContext);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  function ChangEditState() {
    setIsEditing((curState) => {
      return !curState;
    });
  }
  function handleDelete() {
    console.log("asd");
    setIsDeleting(true);
    fetch(`https://jsonplaceholder.typicode.com/users/${user.id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.status !== 200) {
          toast({
            title: "Uh oh! Something went wrong.",
            description: "There was a problem with your request.",
            variant: "destructive",
          });
        } else {
          deleteUserByIndex(index);
          console.log("waiShalaa");
          setIsDeleting(false);
          toast({
            description: "Your Request has been sent successfully",
          });
        }
      })
      .catch((error) => console.log(error));
  }

  return (
    <>
      <>
        <TableRow className="text-left" key={user.id}>
          <TableCell
            className="hover:cursor-pointer"
            onClick={() => onClick(user.id)}
          >
            {user.name}
          </TableCell>
          <TableCell
            className="hover:cursor-pointer"
            onClick={() => onClick(user.id)}
          >
            {user.email}
          </TableCell>
          <TableCell
            className="hover:cursor-pointer"
            onClick={() => onClick(user.id)}
          >
            {user.address.city}
          </TableCell>
          <TableCell className="p-2 text-end">
            {isEditing ? (
              <Button disabled className="ml-3">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <EditModal user={user} index={index} editSate={ChangEditState} />
            )}
          </TableCell>

          <TableCell className="p-2 text-left">
            {isDeleting ? (
              <Button disabled className="ml-3">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <DeleteButton handleDelete={handleDelete} />
            )}
          </TableCell>
        </TableRow>
      </>
    </>
  );
}

export default UserTableRow;
