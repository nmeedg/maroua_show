'use client';

import { MapPinIcon } from '@heroicons/react/16/solid';
import { Button } from "@/components/ui/button"
import Link from 'next/link';
import { motion } from "framer-motion";
import Image from 'next/image';
import {
  ArrowPathIcon,
  LockClosedIcon,
} from '@heroicons/react/24/outline';
import { ListStartIcon,  Music } from 'lucide-react';
import { ThemeProvider } from "next-theme";
import { Backimg, ParticlesBackground } from './components/backImg';
import { FooterClips } from './components/footer';
import { useRouter } from 'next/navigation';


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
      "Le concert se déroulera à Maroua, 400 places Pitoiré, le 14 juin à partir de 18h. Préparez-vous à vibrer avec Empire by Krole.",
    icon: MapPinIcon,
  },
];

export default function Home() {
  const router = useRouter();
  return (
    <div>
      <div className="relative  bg-gradient-to-r from-black to-blue-950">
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
          <div className="mx-auto w-full px-4 sm:mt-10 lg:mt-4 max-w-7xl">
            <dl className="w-full grid grid-cols-1 gap-x-2 gap-y-2 lg:flex lg:justify-between">
              <ParticlesBackground />

              <div className="hidden lg:block lg:h-200 lg:ml-5">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: -5 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className='flex items-center gap-6 mb-1'>
                  <Image src="/images/minks.png" alt="Mink's et Bad Nova sur scène" width={150} height={190} />
                  <Image src="/images/laid.png" alt="Mink's et Bad Nova sur scène" width={100} height={100} />
                </motion.div>
              </div>
              <div className="sm:py-12 h-200">

                <motion.div
                  initial={{ opacity: 0, scale: 0.4, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }} className="mx-auto max-w-7xl px-6 lg:px-8">
                  <div className='flex-col items-center justify-center text-center'>

                    <h2 className="text-base font-semibold text-yellow-600">
                      Empire by Krole présente
                    </h2>
                    <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty dark:text-white sm:text-5xl lg:text-balance">
                      Concert exceptionnel  Mink's & Bad Nova
                    </p>
                    <p className="mt-6 text-lg text-gray-400">
                      Réservez vos billets dès maintenant pour une soirée explosive de musique live à Maroua à 400 places.
                      Rendez-vous le 14 juin à 18h. Nombre de places limité !
                    </p>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, scale: 0.5, y: 40 }}
                  animate={{ opacity: 1, scale: 1, y: -5 }}
                  transition={{ duration: 0.7, ease: "easeOut" }} className="flex items-center justify-center mt-10">
                  <Button onClick={()=>{
                    router.push('/tickets');
                  }} className='w-80 h-15 bg-white/20 border-2 border-primary animate-bounce hover:cursor-pointer '><span className='font-stretch-200% text-xl  lg:text-2xl text-secondary-foreground font-extrabold  lg:text-balance'>Achète ton ticket</span></Button>
                </motion.div>

                <div className="mx-auto mt-10 max-w-2xl sm:mt-10 lg:mt-14 lg:max-w-4xl">
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
              </div>

              <div className="sm:py-12 lg:h-260 ">
                <motion.div
                  initial={{ opacity: 0, y: -30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: "easeOut" }} className='flex items-center gap-6 mb-1'>

                  <Image src="/images/bouges.png" alt="Mink's et Bad Nova sur scène" width={100} height={100} />
                  <Image src="/images/mic.png" alt="Mink's et Bad Nova sur scène" width={130} height={190} />

                  <Image src="/images/minks.png" alt="Mink's et Bad Nova sur scène" className='lg:hidden' width={105} height={190} />
                  <Image src="/images/laid.png" alt="Mink's et Bad Nova sur scène" className='lg:hidden' width={100} height={100} />
                </motion.div>

              </div>

            </dl>
          </div>
          <div>
            <FooterClips />
          </div>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.5, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: -5 }}
        transition={{ duration: 0.7, ease: "easeOut" }} className="flex items-end justify-end mt-1">
        <Button variant="outline"><Link href="/dashboard" className='flex font-stretch-200% font-extrabold sm:text-3xl lg:text-balance'><ListStartIcon className='mr-1'/>Dashboard  </Link></Button>
      </motion.div>
      <footer className="w-full py-4 bg-white dark:bg-black border-t border-gray-200 dark:border-gray-700">
        <p className="text-center text-sm text-gray-500 dark:text-gray-300">
          © Horizon 2025 — Tous droits réservés.
        </p>
      </footer>


    </div>

  );
}
