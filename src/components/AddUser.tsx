import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { IconUserSquareRounded } from "@tabler/icons-react"
import { AdduserForm } from "./login-form"

export function DialogButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="mx-0 px-0 flex justify-start items-center "> <IconUserSquareRounded></IconUserSquareRounded> <span>Ajouter un compte</span> </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Ajouter un compte</DialogTitle>
          <DialogDescription>
            Ajouter un nouveau compte de gestion
          </DialogDescription>
        </DialogHeader>
        <AdduserForm></AdduserForm>
      </DialogContent>
    </Dialog>
  )
}
