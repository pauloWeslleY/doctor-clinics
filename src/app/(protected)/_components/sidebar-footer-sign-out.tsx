"use client";

import { EllipsisVerticalIcon, LogOutIcon } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import useSidebarFooterSignOut from "./use-sidebar-footer-sign-out";

const SidebarFooterSignOut = () => {
  const { loadUserAuthClinic, handleSignOutSidebarFooter } =
    useSidebarFooterSignOut();

  return (
    <SidebarFooter className="mb-2">
      <SidebarMenu>
        <SidebarMenuItem>
          <div className="flex w-full flex-row justify-between">
            <div className="flex flex-row items-center gap-2">
              <Avatar>
                <AvatarFallback>{loadUserAuthClinic.username}</AvatarFallback>
              </Avatar>

              <div>
                <h3 className="text-sm leading-none font-bold">
                  {loadUserAuthClinic.clinicName}
                </h3>
                <p className="text-muted-foreground w-[148px] truncate text-xs leading-none">
                  {loadUserAuthClinic.userEmail}
                </p>
              </div>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                  <EllipsisVerticalIcon />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={handleSignOutSidebarFooter}
                  className="cursor-pointer"
                >
                  <LogOutIcon /> Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
};

export default SidebarFooterSignOut;
