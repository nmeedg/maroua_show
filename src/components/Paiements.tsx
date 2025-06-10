"use client";

import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase"; // adapte ce chemin selon ton projet
import { collection, getDocs, query, orderBy } from "firebase/firestore";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const ticket = payload[0].payload;
    return (
      <div className="rounded-xl bg-white p-4 shadow-lg dark:bg-zinc-900">
        <p className="text-sm text-zinc-400">
          {dayjs(label).format("DD MMM YYYY à HH:mm")}
        </p>
        <p className="font-medium">
          {ticket.type} – {ticket.price.toLocaleString()} FCFA
        </p>
      </div>
    );
  }
  return null;
};

export default function PaymentChart() {
  const [chartData, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
          const q = query(collection(db, "tickets"), orderBy("createdAt", "asc"));
        const ticketSnapshot = await getDocs(q);
        // const ticketsData = ticketSnapshot.docs.map((doc) => doc.data());
        const data = ticketSnapshot.docs.map((doc) => {
          const ticket = doc.data();
          return {
            ...ticket,
            price: ticket.ticketType == "vip" ? 10000 : 5000,
            type: ticket.ticketType,
            x: dayjs(ticket.createdAt.toDate()).format("YYYY-MM-DD HH:mm"),
            date: ticket.createdAt.toDate(), // pour l'affichage dans tooltip
          };
        });

        console.log(data);

        setChartData(data);
      } catch (error) {
        console.error(
          "Erreur lors du chargement des données Firestore :",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    fetchData();
    // setChartData(data);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-[300px] w-full rounded-xl bg-background p-4 shadow-sm">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="fillClassic" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="fillVIP" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#facc15" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#facc15" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="x"
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => dayjs(value).format("DD MMM")}
            tickMargin={10}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="price"
            stroke="#facc15"
            fill="url(#fillVIP)"
            isAnimationActive
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
