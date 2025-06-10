"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import data from "./data.json";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { collection, DocumentData, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import PaymentChart from "@/components/Paiements";
import { DataTableDemo } from "@/components/ClientTable";

export default function Page() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const [vipCount, setVipCount] = useState(0);
  const [classicCount, setClassicCount] = useState(0);
  const [tickets, setTickets] = useState<DocumentData[]>([]);
  const [clients, setClients] = useState<DocumentData[]>([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      toast.warning("Vous n'etes pas connecte");
      router.push("/auth/login"); // si pas connecté
    } else {
      toast.success("Bienvenue");
      setUser(JSON.parse(storedUser));
    }
    const fetchData = async () => {
      const ticketSnapshot = await getDocs(collection(db, "tickets"));
      const ticketsData = ticketSnapshot.docs.map((doc) => doc.data());
      setTickets(ticketsData);
      setVipCount(ticketsData.filter((t) => t.ticketType === "vip").length);
      setClassicCount(
        ticketsData.filter((t) => t.ticketType === "classique").length
      );

      const clientSnapshot = await getDocs(collection(db, "clients"));
      setClients(
        clientSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    };
    fetchData();
  }, []);

  const total = vipCount + classicCount;
  const revenu = vipCount * 10000 + classicCount * 5000;

  if (!user) return <p>Chargement...</p>;

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" user={user} />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards total={total.toString()} revenu={revenu.toString()} classicCount={classicCount.toString()} vipCount={vipCount.toString()}  />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
              <DataTableDemo ></DataTableDemo>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
