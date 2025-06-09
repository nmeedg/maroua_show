// lib/auth.ts
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "./firebase";

/**
 * Crée un adm  inistrateur (Firebase Auth + Firestore)
 */
export async function createAdminAccount(email: string, password: string, nom: string) {
  // Crée le compte via Firebase Auth
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // Optionnel : mettre à jour le nom dans le profil Firebase
  await updateProfile(user, { displayName: nom });

  // Ajoute les infos dans Firestore (collection "admins")
  await setDoc(doc(db, "admins", user.uid), {
    email,
    nom,
    date_creation: serverTimestamp()
  });

  return user;
}
