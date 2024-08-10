// components/MedalsPage.js

"use client"; // Asegúrate de agregar esto al principio del archivo

import React, { useState } from "react";
import { GlareCard } from "./ui/glare-card";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
  IconMedal,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Sidebar, SidebarBody, SidebarLink } from "./ui/sidebar";

const medals = [
  { id: 1, title: "Medalla al Mayor Volumen de Ventas", description: "Otorgada al establecimiento que ha generado el mayor volumen de ventas en un período determinado.", color: "bg-red-900" },
  { id: 2, title: "Medalla al Crecimiento en Ventas", description: "Para el negocio que ha mostrado el mayor incremento en sus ventas respecto al período anterior.", color: "bg-orange-900" },
  { id: 3, title: "Medalla a la Mayor Frecuencia de Transacciones", description: "Reconocimiento al establecimiento con la mayor cantidad de transacciones realizadas en un período específico.", color: "bg-yellow-900" },
  { id: 4, title: "Medalla a la Venta Promedio Más Alta", description: "Otorgada al negocio que ha logrado la venta promedio más alta por transacción.", color: "bg-amber-900" },
  { id: 5, title: "Medalla a la Retención de Clientes", description: "Para el establecimiento que ha demostrado la mayor tasa de clientes recurrentes basándose en sus transacciones.", color: "bg-gray-800" },
  { id: 6, title: "Medalla al Ticket Promedio Creciente", description: "Reconocimiento al establecimiento que ha mostrado un crecimiento en el valor promedio de sus transacciones.", color: "bg-purple-900" },
  { id: 7, title: "Medalla a la Diversificación de Productos/Servicios", description: "Otorgada al negocio que ha incrementado su variedad de productos o servicios, reflejado en la diversidad de sus transacciones.", color: "bg-green-900" },
  { id: 8, title: "Medalla a la Rentabilidad por Transacción", description: "Para el establecimiento que ha demostrado una alta rentabilidad por cada transacción, considerando el margen de ganancia.", color: "bg-blue-900" },
];

const MedalsPage = () => {
  const links = [
    {
      label: "Transacciones",
      href: "dashboard",
      icon: (
        <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Insights",
      href: "insights",
      icon: (
        <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Medallas",
      href: "medals",
      icon: (
        <IconMedal className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Settings",
      href: "#",
      icon: (
        <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Logout",
      href: "#",
      icon: (
        <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];

  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row bg-gray-900 dark:bg-black w-full flex-1 h-screen border border-neutral-200 dark:border-neutral-700 overflow-hidden">
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10 bg-gray-100 dark:bg-neutral-800">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <Logo />
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "Sebastián Chávarry",
                href: "#",
                icon: (
                  <img
                    src="https://assets.aceternity.com/manu.png"
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>

      <div className="flex-1 flex flex-col items-center justify-center p-4 bg-gray-900 dark:bg-black">
        <div className="bg-gray-200 dark:bg-gray-700 text-center py-2 px-4 rounded-full w-full max-w-md mb-8">
          <h2 className="text-black dark:text-white text-lg">Colección de Medallas</h2>
        </div>
        <div className="medals-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {medals.map((medal) => (
            <GlareCard key={medal.id} className={`${medal.color} flex flex-col items-start justify-center p-4 rounded-lg`}>
              <h3 className="font-bold text-lg text-white">{medal.title}</h3>
              <p className="text-sm text-neutral-200 mt-2">{medal.description}</p>
            </GlareCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export const Logo = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        Mad Burger
      </motion.span>
    </Link>
  );
};

export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};

export default MedalsPage;
