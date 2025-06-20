"use client";

import * as React from "react"
import { useCallback } from "react";
import Image from 'next/image';
import Autoplay from "embla-carousel-autoplay"
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { Card, CardContent } from "@/components/ui/card"
import type { Engine } from "tsparticles-engine";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export function Backimg() {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  )
  const features = [
  {
    src: "/images/bad.jpg",
  },
  {
    src: "/images/mink.jpg",
  },
  {
    src: "/images/im5.jpg",
  },
  {
    src: "/images/im2.jpg",
  },
  {
    src: "/images/im1.jpg",
  },
];
const w = 1800;
const h = 800;

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full h-full"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {features.map((_, index) => (
          <CarouselItem key={index}>
            <div>
              <Card>
                <CardContent className="flex">
                  <span>
                          <Image src={features[index].src} alt="Mink's et Bad Nova sur scène" width={w} height={h} className='items-center justify-center z-0' />
                  </span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}


export function ParticlesBackground() {
  const particlesInit = useCallback(async (engine: Engine) => {
    // engine est fourni automatiquement par <Particles />, pas besoin de le déclarer ailleurs
    await loadFull(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: { enable: true, zIndex: -1 },
        background: { color: "transparent" },
        fpsLimit: 60,
        particles: {
          number: {
            value: 60,
            density: { enable: true, area: 800 },
          },
          color: {
            value: ["#facc15", "#4ade80", "#60a5fa", "#f472b6"],
          },
          shape: {
            type: ["circle", "square", "triangle", "star"],
          },
          opacity: {
            value: 0.5,
            random: true,
          },
          size: {
            value: { min: 2, max: 5 },
          },
          move: {
            enable: true,
            speed: 1,
            direction: "none",
            outModes: {
              default: "out",
            },
          },
        },
        detectRetina: true,
      }}
    />
  );
}
