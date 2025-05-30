"use client";

import {
  CalendarDaysIcon,
  LayoutDashboardIcon,
  StethoscopeIcon,
  UsersRoundIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Routes } from "@/lib/routes";

const items = [
  {
    title: "Dashboard",
    url: Routes.Dashboard,
    icon: LayoutDashboardIcon,
  },
  {
    title: "Agendamentos",
    url: "/appointments",
    icon: CalendarDaysIcon,
  },
  {
    title: "Médicos",
    url: Routes.Doctors,
    icon: StethoscopeIcon,
  },
  {
    title: "Pacientes",
    url: Routes.Patients,
    icon: UsersRoundIcon,
  },
];

const AppSidebarMenu = () => {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {items.map((item) => {
        const isActiveMenu = pathname === item.url;
        return (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton asChild isActive={isActiveMenu}>
              <Link href={item.url}>
                <item.icon className={isActiveMenu ? "text-primary" : ""} />
                <span className={isActiveMenu ? "text-primary font-bold" : ""}>
                  {item.title}
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
};

export default AppSidebarMenu;
