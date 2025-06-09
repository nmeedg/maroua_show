"use client";

import { useState } from "react";
import Image from "next/image";
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    DialogTitle,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Backimg } from "../components/backImg";
import { ThemeProvider } from "next-theme";
import isEmail from "validator/lib/isEmail";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";

export default function TicketPage() {
    const [open, setOpen] = useState(false);
    const [ticket5k, setTicket5k] = useState(0);
    const [ticket10k, setTicket10k] = useState(0);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [emailValid, setEmailValid] = useState(false);
    const [phoneValid, setPhoneValid] = useState(false);

    const total = ticket5k * 5000 + ticket10k * 10000;

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        setEmailValid(isEmail(value));
    };

    const handlePhoneChange = (value) => {
        setPhone(value);
        setPhoneValid(isValidPhoneNumber(value || ""));
    };

    return (
        <div>
            <div className="w-full  min-h-screen pb-16">
                <div className='flex items-start justify-center top-0 left-0 w-full h-full absolute z-0'>
                    <div className='relative'>
                        <div className='top-0 left-0'>
                            <Backimg />
                        </div>
                        <div className='z-2 bg-gradient-to-r from-black to-blue-950 w-full h-full absolute top-0 left-0 opacity-95'></div>
                    </div>
                </div>
                <div className="relative z-10">
                    <div className=" bg-white/20 backdrop-blur-lg my-4 mx-8 rounded-md">
                        <h1 className=" transition-all animate-pulse text-xl bg-clip-text bg-gradient-to-br from-white to-yellow-300  md:text-2xl font-bold text-transparent text-center py-4">
                            Achetez vos tickets pour le concert de Mink's & Bad Nova
                        </h1> 
                    </div>
                    <div className="mx-auto mt-7 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                        <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                            <div className="w-full border-2 bg-blue-800/30 rounded-[15px]">
                                <Image
                                    src="/images/bi.png"
                                    alt="Tickets Concert"
                                    width={800}
                                    height={500}
                                    className="rounded shadow-md w-full h-auto object-cover"
                                    priority
                                />
                            </div>
                            <div className="space-y-6 w-full rounded-[15px] bg-blue-800/30 border-2 p-6">
                                <div className='flex items-center justify-center mb-30'>
                                    <Image src="/images/logo.png" alt="Mink's et Bad Nova sur scène" width={100} height={100} className='items-center justify-center' />
                                </div>
                                <div className="flex w-full items-end justify-end"><span>Nombres de tickets</span></div>
                                <div className="flex justify-between items-center">
                                    <span>Ticket Standard <span className="text-yellow-600 font-bold">(5000 FCFA)</span>
                                        <p>petit jus pour réception et place standart.</p></span>
                                    <input
                                        type="number"
                                        min={0}
                                        value={ticket5k}
                                        onChange={(e) => setTicket5k(Number(e.target.value))}
                                        className="w-20 border px-2 py-1 rounded text-center dark:text-gray-400"
                                    />
                                </div>
                                <div className="flex justify-between items-center">
                                    <span>Ticket VIP <span className="text-yellow-600 font-bold">(10000 FCFA)</span>
                                        <p>première place avec ...</p></span>
                                    <input
                                        type="number"
                                        min={0}
                                        value={ticket10k}
                                        onChange={(e) => setTicket10k(Number(e.target.value))}
                                        className="w-20 border px-2 py-1 rounded text-center dark:text-gray-400"
                                    />
                                </div>
                                <button
                                    onClick={() =>{
                                                if (total === 0) {
                                                    alert("Veuillez sélectionner au moins un ticket.");
                                                    return;
                                            }
                                            else {
                                                setOpen(true)}}}
                                    className="w-full bg-yellow-600 hover:bg-yellow-700 mt-10 text-white font-semibold py-2 px-4 rounded"
                                >
                                    Continuer
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='flex items-center justify-center'>
                        <div className="absolute z-10 px-4 py-10 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
                            <Dialog open={open} onClose={setOpen} className="relative bg-black/90 text-cyan-200 z-20 rounded">
                                <DialogBackdrop className="fixed inset-0 bg-blue-900/20" />
                                <div className="fixed inset-0 flex items-center justify-center p-4">
                                    <DialogPanel className="w-full max-w-lg bg-black/90 dark:bg-black/90 p-6 rounded shadow-xl">
                                        <div className="flex justify-between items-center mb-4">
                                            <DialogTitle className="text-lg font-bold dark:text-white">
                                                Total – {total.toLocaleString()} FCFA
                                            </DialogTitle>
                                            <button onClick={() => setOpen(false)}>
                                                <XMarkIcon className="w-6 h-6 text-gray-300" />
                                            </button>
                                        </div>
                                        <form className="space-y-4">
                                            <input
                                                type="text"
                                                placeholder="Nom complet"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="w-full border px-3 py-2 rounded dark:text-gray-300"
                                            />
                                            <PhoneInput
                                                placeholder="Numéro de téléphone"
                                                value={phone}
                                                onChange={handlePhoneChange}
                                                defaultCountry="CM"
                                                className="phone-input w-full rounded text-gray-500"
                                            />
                                            {phone && !phoneValid && <p className="text-yellow-500 text-sm">Numéro invalide</p>}
                                            <input
                                                type="email"
                                                placeholder="Adresse email"
                                                value={email}
                                                onChange={handleEmailChange}
                                                className="w-full border px-3 py-2 rounded dark:text-gray-300"
                                            />
                                            {email && !emailValid && <p className="text-yellow-500 text-sm">Email invalide</p>}
                                            {(name && emailValid && phoneValid) && (
                                                <div className="flex flex-col space-y-3 pt-6 gap-3">
                                                    <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded">
                                                        Payer avec Orange Money
                                                    </button>
                                                    <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                                                        Payer avec Mobile Money
                                                    </button>
                                                    <button className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
                                                        Voir les lieux d'achat en prensentiel
                                                    </button>
                                                </div>
                                            )}
                                        </form>
                                    </DialogPanel>
                                </div>
                            </Dialog>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
