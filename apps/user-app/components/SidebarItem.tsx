"use client";

import { useRouter, usePathname } from "next/navigation";
import React from "react";

export const SidebarItem = ({
  href,
  icon,
  title,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
}) => {
    const router = useRouter() ;
    const pathname = usePathname() ;
    const selected = pathname === href


  return <div onClick={() => {
    router.push(href) ;
  }} className={`flex ${selected?"text-[#6a51a6]" : "text-slate-500"} cursor-pointer  p-2 pl-8`}>
    <div>{icon}</div>
    <div>{title}</div>
  </div>;
};
