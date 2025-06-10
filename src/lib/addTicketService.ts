import { db } from "@/lib/firebase";
import { collection, addDoc, Timestamp, serverTimestamp } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import QRCode from "qrcode";
import { RefObject } from "react";

export async function createClient(name: string,telephone:string, email: string) {
  const clientRef = await addDoc(collection(db, "clients"), {
    name,
    email,
    telephone,
    createdAt: serverTimestamp(),
  });

  return clientRef.id;
}

export async function createTicket(clientId: string, ticketType: string,id:string) {
  const ticketId = id;
  const qrCode = await QRCode.toDataURL(ticketId);
  const ticketRef = await addDoc(collection(db, "tickets"), {
    clientId,
    ticketType,
    ticketId,
    qrCode,
    createdAt: serverTimestamp(),
  });

  return { id: ticketRef.id, ticketId, qrCode };
}

export function downloadBase64Image(base64Data: string, fileName: string) {
  const link = document.createElement('a');
  link.href = base64Data;
  link.download = fileName;
  link.click();
}
