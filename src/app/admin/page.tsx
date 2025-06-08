"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "Sonner";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      toast.warning("Vous n'etes pas connecte");
      router.push("/auth/login"); // si pas connecté
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) return <p>Chargement...</p>;

  return (
    <div className="text-white p-4">
      <h1>Bienvenue, {user.email}</h1>
      <button
        onClick={() => {
          localStorage.removeItem("user");
          router.push("/auth/login");
        }}
        className="mt-4 bg-red-600 px-4 py-2 rounded"
      >
        Déconnexion
      </button>
    </div>
  );
}
