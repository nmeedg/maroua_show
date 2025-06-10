import React, { useState } from "react";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { CircleCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { IconTicket } from "@tabler/icons-react";
const options = [
 {
    id: "vip",
    name: "VIP",
    price: "10 000 FCFA",
    description: "Accès préférentiel, place réservée, goodies",
  },
  {
    id: "classique",
    name: "Classique",
    price: "5 000 FCFA",
    description: "Accès standard",
  },
];
const RadioCardsDemo = ({onChangeVal}:{onChangeVal: (val:string)=>void }) => {
    const [selected, setSelected]=useState(options[0].id)
  return (
    <RadioGroup.Root
      defaultValue={options[0].id}
      onValueChange={(val)=>{
        onChangeVal(val)
        setSelected(val)
      }}
      className="max-w-md w-full grid md:grid-cols-2 gap-4"
    >
      {options.map((option) => (
        <RadioGroup.Item
          key={option.id}
          value={option.id}
          className={cn(
            "relative group ring-[1px] ring-border rounded py-2 px-3 text-start",
            "data-[state=checked]:ring-2 data-[state=checked]:ring-primary"
          )}
        >
          <CircleCheck className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 h-6 w-6 text-primary fill-primary stroke-primary-foreground group-data-[state=unchecked]:hidden" />
          <IconTicket className="mb-3 text-muted-foreground" />
          <span className={ selected == option.id ? "font-semibold tracking-tight text-primary" : "font-semibold"}>{option.name}</span>
          <p className="text-xs text-muted-foreground mb-3">{option.description}</p>
          <span className={ selected == option.id ? "font-semibold text-primary" : "font-semibold"}>{option.price}</span>
        </RadioGroup.Item>
      ))}
    </RadioGroup.Root>
  );
};
export default RadioCardsDemo;