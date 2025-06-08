// lib/firebase.ts
import { initializeApp, getApps } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyB9ORHTGLuAacyuM28KTbrYcXFX4-wexBw",
  authDomain: "ticketbooking-a64f8.firebaseapp.com",
  projectId: "ticketbooking-a64f8",
  storageBucket: "ticketbooking-a64f8.firebasestorage.app",
  messagingSenderId: "196864981389",
  appId: "1:196864981389:web:63e43f3ff938d198ab65c4"
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig)
export const auth = getAuth(app)
