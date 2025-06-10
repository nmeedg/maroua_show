"use client";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createClient, createTicket } from "@/lib/addTicketService";

function page() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const saveData = async () => {
      const params = new URLSearchParams(window.location.search);
      const encoded = params.get("payload");
      const status = params.get("status");
      if (encoded && status == "complete") {
        try {
          const decoded = decodeURIComponent(encoded);
          const json = JSON.parse(decoded);
          console.log(json);
          const clientID = await createClient(
            json.userName,
            json.telephone,
            json.email
          );

          const ticketInfo = await createTicket(
            clientID,
            json.ticketType,
            json.id
          );
          toast.success("Ticket enregistrer avec success");
          router.push(
            `/confirmation?nom=${encodeURIComponent(json.userName)}&id=${
              ticketInfo.id
            }&type=${json.ticketType}`
          );
        } catch (err: any) {
          toast.error("Erreur lors du décodage du payload :", err.message);
        }
      } else {
        toast.error("Il faut valider le payement");
        router.replace("/tickets");
      }
    };

    saveData()
  }, []);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <h1 className="text-2xl font-bold text-center block my-20 ">
        Page de confirmation du payement
      </h1>

      <h5 className=" text-muted text-lg py-10 " >Veuillez ne pas quittter la page </h5>
      <div className="flex">
        <Button className="disbled" variant="outline">
          {" "}
          <Loader2Icon className="animate-spin mr-2"></Loader2Icon> Confirmation
          en cours{" "}
        </Button>
      </div>
    </div>
  );
}

export default page;
