"use client";

import { GemIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

import AppSidebarMenu from "./app-sidebar-menu";
import SidebarFooterSignOut from "./sidebar-footer-sign-out";

export function AppSidebar() {
  const pathname = usePathname();
  const isActiveMenu = pathname === Routes.Subscription;

  return (
    <Sidebar>
      <SidebarHeader className="border-b p-4">
        <Image src="/logo.svg" alt="Doutor Agenda" width={136} height={28} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <AppSidebarMenu />
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Outros</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActiveMenu}>
                  <Link href={Routes.Subscription}>
                    <GemIcon
                      className={cn("!size-5", isActiveMenu && "text-primary")}
                    />
                    <span
                      className={cn(
                        "!text-[0.9rem] font-medium",
                        isActiveMenu && "text-primary",
                      )}
                    >
                      Planos
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooterSignOut />
    </Sidebar>
  );
}
