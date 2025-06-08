import { db } from "@/lib/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

export const createTicket = async ({
  nom_complet,
  telephone,
  type_ticket
}: {
  nom_complet: string;
  telephone: string;
  type_ticket: "vip" | "classique";
}) => {
  const clientRef = await addDoc(collection(db, "clients"), {
    nom_complet,
    telephone,
    date_creation: Timestamp.now()
  });

  const ticketRef = await addDoc(collection(db, "tickets"), {
    id_client: clientRef.id,
    type_ticket,
    statut_paiement: "en_attente",
    code_unique: crypto.randomUUID(),
    source_creation: "systeme",
    date_reservation: Timestamp.now()
  });

  return ticketRef.id;
};
