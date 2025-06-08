'use client';

import { MapIcon, MapPinIcon } from '@heroicons/react/16/solid';
import { Button } from "@/components/ui/button"
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowPathIcon,
  CloudArrowUpIcon,
  FingerPrintIcon,
  LockClosedIcon,
} from '@heroicons/react/24/outline';
import { LocateFixedIcon, LocationEditIcon, Music, Music2Icon, Music3Icon, ShowerHeadIcon, TicketCheck, TicketCheckIcon, TicketIcon } from 'lucide-react';
import { ThemeProvider } from "next-theme";
import { Backimg } from './components/backImg';
import { DocumentCurrencyDollarIcon } from '@heroicons/react/20/solid';

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
      <div className="relative">
        <div className='flex items-start justify-start top-0 left-0 w-full h-full absolute z-3'>
          <div className='relative'>
            <div className='top-0 left-0'>
              <Backimg />
            </div>
            <div className='z-2 bg-gradient-to-r from-black to-blue-950 w-full h-full absolute top-0 left-0 opacity-95' ></div>
          </div>
        </div>
        <div className="relative z-10">
          <div className='flex items-center justify-center'>
            <Image src="/images/logo.png" alt="Mink's et Bad Nova sur scène" width={100} height={100} />
          </div>
          <div className="mx-auto mt-7 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              <div className="py-4 sm:py-12">

                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                  <div className='flex-col items-center justify-center text-center'>

                    <h2 className="text-base font-semibold text-yellow-600">
                      Empire by Krole présente
                    </h2>
                    <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty dark:text-white sm:text-5xl lg:text-balance">
                      Concert exceptionnel  Mink's & Bad Nova
                    </p>
                    <p className="mt-6 text-lg text-gray-400">
                      Réservez vos billets dès maintenant pour une soirée explosive de musique live à Maroua à 400 places.
                      Rendez-vous le 12 juin à 18h. Nombre de places limité !
                    </p>
                  </div>
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
                        <dd className="mt-2 text-base text-gray-400">
                          {feature.description}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <div className="flex items-center justify-center mt-10">
                  <Button variant="outline" className='w-80 h-15'><Link href="/ticket" className='font-stretch-200% font-extrabold sm:text-3xl lg:text-balance'>Achète ton ticket</Link></Button>
                </div>
              </div>
              <div className="py-4 sm:py-12 gap-6">
                    <div className='flex items-center justify-between'>
                      Mon pétit halla Madrid
                <Image src="/images/mic.png" alt="Mink's et Bad Nova sur scène" width={200} height={300} />
                
              </div>
              <div className='flex items-center justify-between'>

                <Image src="/images/mink.jpg" alt="Mink's et Bad Nova sur scène" width={200} height={300} />
                Le gard là est laid
              </div>
              <div className='flex items-center justify-between'>
                Halla Madrid
                <Image src="/images/madrid.png" alt="Mink's et Bad Nova sur scène" width={200} height={300} />
              </div>
              </div>
              
            </dl>
          </div>
        </div>
      </div>
    </ThemeProvider>

  );
}
