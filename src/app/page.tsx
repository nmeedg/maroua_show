'use client';

import { MapIcon, MapPinIcon } from '@heroicons/react/16/solid';
import Image from 'next/image';
import {
  ArrowPathIcon,
  CloudArrowUpIcon,
  FingerPrintIcon,
  LockClosedIcon,
} from '@heroicons/react/24/outline';
import { LocateFixedIcon, LocationEditIcon, Music, Music2Icon, Music3Icon, ShowerHeadIcon } from 'lucide-react';
import { ThemeProvider } from "next-theme";

const features = [
  {
    name: "Deux artistes, un show",
    description:
      "Mink's et Bad Nova réunis sur une même scène pour un concert exceptionnel. Un événement musical à ne surtout pas manquer.",
    icon: Music,
  },
  {
    name: "Sécurisation des billets",
    description:
      "Chaque billet est unique et vérifiable. Grâce à notre système sécurisé, vous assistez au concert en toute confiance.",
    icon: LockClosedIcon,
  },
  {
    name: "Accès simple et rapide",
    description:
      "Réservez vos places en ligne en quelques clics et téléchargez immédiatement votre billet.",
    icon: ArrowPathIcon,
  },
  {
    name: "Vivez l'expérience à Maroua",
    description:
      "Le concert se déroulera à Maroua, 400 places Pitoiré, le 12 juin à partir de 18h. Préparez-vous à vibrer avec Empire by Krole.",
    icon: MapPinIcon,
  },
];

export default function Home() {
  return (
        <ThemeProvider defaultTheme="dark" attribute="class">

    <div>
      <div className='flex items-center justify-center'>
        <Image src="/images/logo.png" alt="Mink's et Bad Nova sur scène" width={100} height={100} className='items-center justify-center' />
      </div>
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold text-yellow-600">
              Empire by Krole présente
            </h2>
            <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty dark:text-white sm:text-5xl lg:text-balance">
              Concert exceptionnel  Mink's & Bad Nova
            </p>
            <p className="mt-6 text-lg text-gray-600">
              Réservez vos billets dès maintenant pour une soirée explosive de musique live à Maroua à 400 places.
              Rendez-vous le 12 juin à 18h. Nombre de places limité !
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              {features.map((feature) => (
                <div key={feature.name} className="relative pl-16">
                  <dt className="text-base font-semibold">
                    <div className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-yellow-600">
                      <feature.icon aria-hidden="true" className="size-6  text-black" />
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-2 text-base text-gray-600">
                    {feature.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
        </ThemeProvider>

  );
}
