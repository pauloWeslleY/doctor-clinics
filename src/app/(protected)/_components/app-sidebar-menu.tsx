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
import { cn } from "@/lib/utils";

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
                <item.icon
                  className={cn(
                    "!h-5 !w-5",
                    isActiveMenu ? "text-primary" : "",
                  )}
                />
                <span
                  className={cn(
                    "!text-[0.9rem] font-medium",
                    isActiveMenu ? "text-primary" : "",
                  )}
                >
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
