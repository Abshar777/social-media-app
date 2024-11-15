import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import alertStore from "@/store/alertUiStore/store";

export function ConformDailogue() {
  const { alert,  closeAlert,alertFn } = alertStore();

  return (
    <AlertDialog
      open={alert}
      onOpenChange={open=>!open&&closeAlert()}
    >
      <AlertDialogContent className="md:w-auto w-[80%] rounded-lg">
        <AlertDialogHeader>
          <AlertDialogTitle className="font-medium">Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={()=>alertFn()} className="bg-red-800 hover:bg-red-800/80">
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
