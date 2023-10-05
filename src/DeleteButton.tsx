import { useEffect } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./@/components/ui/alert-dialog";
import { Button } from "./@/components/ui/button";

export function DeleteButton({ handleDelete }) {
  const dialogClose = () => {
    document.getElementById("closeAlertDialog")?.click();
  };
  useEffect(() => {
    const onClickOutside = (e) => {
      console.log(e.target);
      if (e.target.matches(".fixed.backdrop-blur-sm")) {
        // Clicked the backdrop
        dialogClose();
      }
    };
    document.body.addEventListener("click", onClickOutside);

    return () => {
      document.body.removeEventListener("click", onClickOutside);
    };
  }, []);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className=" bg-red-700">
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
