"use client";

import { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  DownloadIcon,
  QrCodeIcon,
} from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";

import { useSearchParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { toast } from "sonner";
import { downloadBase64Image } from "@/lib/addTicketService";

function Page() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const params = useSearchParams();
  const nom = params.get("nom");
  const id = params.get("id");
  const [imgUrl, setImgUrl] = useState<string>("");

  const [ticket, setTicket] = useState<null | {
    clientId: string;
    ticketType: string;
    ticketId: string;
    qrCode: string;
  }>(null);

  const [loading, setLoading] = useState(true);
  
  const generateTicket = async () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!canvas || !ctx) return;

    // Charger l'image de base
    const baseImage = new Image();
    baseImage.crossOrigin = "anonymous"; // Si image hébergée en ligne
    baseImage.src = "/billet.png";

    baseImage.onload = async () => {
      canvas.width = baseImage.width;
      canvas.height = baseImage.height;

      ctx.drawImage(baseImage, 0, 0);

      // Ajouter le nom du client
      ctx.font = "38px Arial";
      ctx.fillStyle = "black";
      ctx.fillText(nom?.toUpperCase() ?? "", 176, 473); // Adapter la position (x, y)
      const montant = ticket.ticketType == "vip" ? "10 000" : "5000";
      ctx.fillText(`${montant} FCFA`, 1110, 473); // Adapter la position (x, y)

      // Générer le QR Code
      //   const qrData = await QRCode.toDataURL(ticketId);
      const qrImage = new Image();
      qrImage.src = ticket.qrCode;

      qrImage.onload = () => {
        ctx.drawImage(qrImage, 1400, 240, 150, 150);
        const finalImg = canvas.toDataURL();
        setImgUrl(finalImg);
      };
    };
  };

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        if (!id) return;
        const docRef = doc(db, "tickets", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setTicket({
            ticketId: data.ticketId,
            clientId: data.clientId,
            ticketType: data.ticketType,
            qrCode: data.qrCode,
          });
        } else {
          toast.error("Ticket introuvable");
        }
      } catch (err: any) {
        console.log(err);
        toast.error("Erreur lors de la récupération du ticket :", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTicket();
    generateTicket();
  }, [id, imgUrl, ticket]);

  if (loading) return <p className="text-center">Chargement en cours...</p>;
  if (!ticket)
    return <p className="text-center text-red-600">Aucun ticket trouvé.</p>;

  const downloadTicket = () => {
    downloadBase64Image(ticket.qrCode, `Ticket Concert Maroua ${nom}`);
  };

  return (
    <div>
      <div className="min-h-screen w-full flex flex-col gap-10 items-center justify-center px-6 py-16">
        <div className="text-center max-w-2xl">
          <Badge className="bg-gradient-to-br from-primary to-primary rounded-full py-1 border-none">
            Billet réservé avec succès !
          </Badge>
          <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-bold !leading-[1.2] tracking-tight">
            Votre ticket pour le concert de Bad Nova & Minks à Maroua a bien été
            généré.
          </h1>
          <p className="mt-6 text-[17px] md:text-lg">
            Vous êtes maintenant prêt pour le concert. Téléchargez votre billet
            avec votre nom et votre QR code.
          </p>
          <div className="mt-6 flex flex-col md:flex-row items-center justify-center gap-4">
            <Button
              onClick={async () => {
                const canvas = canvasRef.current;
                const ctx = canvas?.getContext("2d");
                if (!canvas || !ctx) return;

                await generateTicket();

                const link = document.createElement("a");
                link.download = `${nom}_${ticket.ticketId}.png`;
                link.href = canvas.toDataURL("image/png");
                link.click();
                toast.success("ticket telecharge avvec success");
              }}
              size="lg"
              className="rounded-full text-base"
            >
              Téléchargez mon ticket <DownloadIcon className="!h-5 !w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={downloadTicket}
              className="rounded-full text-base shadow-none"
            >
              <QrCodeIcon className="!h-5 !w-5" />
              Téléchargez mon code QR
            </Button>
          </div>
        </div>
        <div className="w-full max-w-screen-xl mx-auto aspect-video bg-accent rounded-xl">
          <canvas ref={canvasRef} className="hidden" />
          {imgUrl !== "" && (
            <img src={imgUrl} alt="Ticket personnalisé" className="" />
          )}
        </div>
      </div>
    </div>
  );
}

export default Page;
