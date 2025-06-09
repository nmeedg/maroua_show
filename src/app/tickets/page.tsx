"use client";

import { CircleCheck, GalleryVerticalEnd, Loader2Icon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Backimg } from "../components/backImg";
import Link from "next/link";
import { FormEvent, useRef, useState } from "react";
import RadioCardsDemo from "@/components/ticketSelector";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { IconTicket } from "@tabler/icons-react";
import { toast } from "sonner";
import QRCode from "qrcode";
import { v4 as uuidv4 } from "uuid";
import {
  createClient,
  createTicket,
  downloadBase64Image,
} from "@/lib/addTicketService";

export default function LoginPage({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [loading, setLoading] = useState(false);
  const [nom, setNom] = useState("");
  const [lien, setLien] = useState("");
  const [prenom, setprenom] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState<string>("");
  const [ticketType, setTycketType] = useState("vip");
  const formRef = useRef<HTMLFormElement>(null);
  const [open, setOpen] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);


  const handleClick = (e: FormEvent) => {
    e.preventDefault();
    if (nom == "" || prenom == "" || email == "" || telephone == null) {
      toast.warning("Il faut remplir tous les champs");
      return;
    }
    setOpen(true);
  };
  const router = useRouter();

  const handleTicket = async () => {
    setLoading(true);

    try {
      const clientID = await createClient(`${nom} ${prenom}`, telephone, email);
      const ticketInfo = await createTicket(clientID, ticketType);
      toast.success("Ticket enregistrer avec success");
      setLoading(false);
      const username = `${nom} ${prenom}`
      router.push(`/confirmation?nom=${encodeURIComponent(username)}&id=${ticketInfo.id}&type=${ticketType}`)
    } catch (error: any) {
      toast.error(error.message);
      setLoading(false);
    }
  };
  const liens = {
    cinqmil: "https://pay.mesomb.com/l/uwhnSJovDqbOjxXZWHgv",
    dixmil: "https://pay.mesomb.com/l/Tw4NDZWHtrCmFhmHnk5Y"
  }
  return (
    <div className="grid min-h-svh lg:bg-transparent lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <div className="text-primary-foreground flex size-10 items-center justify-center">
              <img src="/logo.png" className="w-9"></img>
            </div>
            Empire By K'role
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full sm:max-w-xs md:max-w-sm lg:max-w-md ">
            <form ref={formRef} className="flex flex-col gap-6">
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Achetez votre ticket</h1>
                <p className="text-muted-foreground text-sm text-balance">
                  Reservez votre place maintenant pour le concert de Mink's &
                  Bad Nova
                </p>
              </div>
              <div className="grid gap-6">
                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                  <span className="bg-background text-muted-foreground relative z-10 px-2">
                    Information Personnels
                  </span>
                </div>
                <div className="grid gap-4 lg:grid-cols-2 ">
                  <div className="grid gap-3">
                    <Label>Nom</Label>
                    <Input
                      id="nom"
                      type="name"
                      value={nom}
                      onChange={(e) => setNom(e.target.value)}
                      placeholder="Votre nom"
                      required
                    />
                  </div>
                  <div className="grid my-4 gap-3">
                    <Label>Prenom</Label>
                    <Input
                      id="prenom"
                      type="name"
                      value={prenom}
                      onChange={(e) => setprenom(e.target.value)}
                      placeholder="Votre prenom"
                      required
                    />
                  </div>
                </div>
                <div className="grid gap-3">
                  <Label>Numero de telephone</Label>
                  <Input
                    id="numero"
                    type="string"
                    value={telephone}
                    onChange={(e) => setTelephone(e.target.value)}
                    placeholder="Votre numero de telephone"
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <Label>Adresse email</Label>
                  <Input
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Votre adresse email"
                    required
                  />
                </div>

                <div className="after:border-border relative text-center my-2 text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                  <span className="bg-background text-muted-foreground relative z-10 px-2">
                    Informations du Billet
                  </span>
                </div>
                <div className="grid gap-3">
                  <Label className="pb-3">
                    Choisissez votre type de ticket
                  </Label>
                  <RadioCardsDemo onChangeVal={setTycketType} />
                </div>
                <div className="after:border-border relative text-center my-2 text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                  <span className="bg-background text-muted-foreground relative z-10 px-2">
                    Mode de paiement
                  </span>
                </div>

                <Dialog open={open} onOpenChange={(e) => setOpen(e)}>
                  <DialogTrigger asChild>
                    <Button onClick={(e) => {
                      e.preventDefault();
                      handleClick(e);
                      if (ticketType == "classique") {
                        toast.info("Vous avez choisi le ticket classique");
                      } else {
                        toast.info("Vous avez choisi le ticket VIP");
                      }
                      //window.location.href = ticketType == "classique" ? liens.cinqmil : liens.dixmil;
                      window.location.href = "https://pay.mesomb.com/l/eo0TGFAKFcXEAjDqhvGi";
                    }} className="w-full">
                      Je paie en ligne
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="grid gap-5">
                    <DialogHeader>
                      <DialogTitle>Paiement du billet en ligne</DialogTitle>
                    </DialogHeader>

                    <DialogDescription>
                      <img
                        src="/billet_vide.png"
                        className="my-3 shadow-2xl "
                        alt=""
                      />
                      <>
                        <Label className="py-4">Mode de Paiement</Label>
                        <RadioGroup.Root
                          asChild
                          defaultValue={"1"}
                          // onValueChange={(val)=>setSelected(val)}
                          className="max-w-md w-full grid md:grid-cols-2 gap-4"
                        >
                          <span>
                            <RadioGroup.Item
                              key={1}
                              value={"1"}
                              className={cn(
                                "relative group ring-[1px] ring-border mx-3 rounded py-2 px-3 text-start",
                                "data-[state=checked]:ring-2 data-[state=checked]:ring-primary"
                              )}
                            >
                              <CircleCheck className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 h-6 w-6 text-primary fill-primary stroke-primary-foreground group-data-[state=unchecked]:hidden" />
                              <div className="flex space-x-4 items-center ">
                                <img
                                  src="/orange_money.png"
                                  className="mb-3 text-muted-foreground w-1/4 object-contain "
                                />
                                <div>
                                  <span
                                    className={"font-semibold text-primary"}
                                  >
                                    Orange Money
                                  </span>
                                  <p className="text-xs text-muted-foreground mb-3">
                                    Payer en utilisant Orange Money (OM)
                                  </p>
                                </div>
                              </div>
                            </RadioGroup.Item>
                            <RadioGroup.Item
                              key={2}
                              value={"2"}
                              className={cn(
                                "relative group ring-[1px] mx-3 ring-border rounded py-2 px-3 text-start",
                                "data-[state=checked]:ring-2 data-[state=checked]:ring-primary"
                              )}
                            >
                              <CircleCheck className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 h-6 w-6 text-primary fill-primary stroke-primary-foreground group-data-[state=unchecked]:hidden" />
                              <div className="flex space-x-4 items-center ">
                                <img
                                  src="/mobile_money.png"
                                  className="mb-3 text-muted-foreground w-1/4 object-contain "
                                />
                                <div>
                                  <span
                                    className={"font-semibold text-yellow-300"}
                                  >
                                    Mobile Money
                                  </span>
                                  <p className="text-xs text-muted-foreground mb-3">
                                    Payer en utilisant Moile Money (MoMo)
                                  </p>
                                </div>
                              </div>
                            </RadioGroup.Item>
                          </span>
                        </RadioGroup.Root>
                      </>
                    </DialogDescription>
                    <DialogFooter>
                      <DialogTrigger asChild>
                        <Button variant="ghost" className=" text-destructive">
                          Annuler le Paiement
                        </Button>
                      </DialogTrigger>
                      {loading ? (
                        <Button disabled>
                          <Loader2Icon className="animate-spin" />
                          Ticket en Cours de generation
                        </Button>
                      ) : (
                        <Button variant="secondary" onClick={handleTicket}>
                          Confirmer le Paiement
                        </Button>
                      )}
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Button
                  variant="outline"
                  onClick={(e) => {
                    e.preventDefault();
                    router.push("/");
                  }}
                  className="w-full"
                >
                  Je paie en presentiel
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="overflow-hidden hidden lg:block">
        <img src="/billet_vide.png" alt="dwds" className="" />
        <img src="/billet_vide.png" alt="dwds" className="" />
        <img src="/billet_vide.png" alt="dwds" className="" />
        <img src="/billet_vide.png" alt="dwds" className="" />
      </div>
    </div>
  );
}
