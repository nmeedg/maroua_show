"use client";
import { useState } from "react";

const clips = [
    
  { id: "2-bF7bQcBlY", title: "Bad Nova – Halla Madrid" },
  { id: "dcPHmKJaXK0", title: "Mink's – Le Gars Là Est Laid" },
  { id: "tVNee7kGZso", title: "Bad Nova – Bouge Avec Ça" },
  { id: "bgOoUzCwe_U", title: "Mink's –  feat MiraCosmetic - Le Dehors Est Sucré" },
  { id: "pleVRFEzuCg", title: "Bad Nova – On Fait Comment ?" },
  { id: "Czr-ILGbwug", title: "Mink's – Ne Me Fuis Pas" },
  { id: "_u71YxCqcrs", title: "Mink's – Sponsor feat Salatiel" },
  { id: "rINYMN689wY", title: "Bad Nova – Traumatisé" },
  { id: "H1lBkyLASX0", title: "Mink's – Minbayeur Ft Blanche Bailly" },
  { id: "-iUiuHrcDkY", title: "Bad Nova – Ferme aussi les yeux" },
  { id: "dZZsAlPQoCA", title: "Mink's – ça va te tuer ft Dj Kenny" },
  { id: "A5b6iibx9uw", title: "Bad Nova – Le BB est bio" },
  { id: "ifx_boQrSPQ", title: "Mink's – Couper l'Appetit ft Fanicko" },

];

export function FooterClips() {
  const [current, setCurrent] = useState(clips[0].id);

  return (
    <footer className="bg-gradient-to-r from-black to-blue-950 text-white px-4 py-6 mt-10">
      <div className="mx-auto">
        <div className="aspect-video mb-4 bg-gray-900">
          <iframe
            src={`https://www.youtube.com/embed/${current}`}
            title="YouTube video"
            className="w-full h-full"
            allowFullScreen
          />
        </div>

        <div className="flex overflow-x-auto space-x-4 pb-2">
          {clips.map((clip) => (
            <div
              key={clip.id}
              className="flex-none w-40 cursor-pointer"
              onClick={() => setCurrent(clip.id)}
            >
              <img
                src={`https://img.youtube.com/vi/${clip.id}/hqdefault.jpg`}
                alt={clip.title}
                className="rounded-lg border border-gray-700 hover:border-yellow-500 transition"
              />
              <p className="mt-1 text-sm">{clip.title}</p>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
