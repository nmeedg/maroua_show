"use client"

import * as React from "react"
import Image from 'next/image';
import Autoplay from "embla-carousel-autoplay"

import { Card, CardContent } from "@/components/ui/card"
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
    src: "/images/im3.jpg",
  },
  {
    src: "/images/im4.jpg",
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
