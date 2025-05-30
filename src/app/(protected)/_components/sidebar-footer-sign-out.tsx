"use client";

import { EllipsisVerticalIcon, LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";

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
import { authClient } from "@/lib/auth-client";
import { Routes } from "@/lib/routes";

const SidebarFooterSignOut = () => {
  const router = useRouter();

  const handleSignOutSidebarFooter = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push(Routes.Authentication);
        },
      },
    });
  };

  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <div className="flex w-full flex-row justify-between">
            <div className="flex flex-row items-center gap-2">
              <Avatar className="size-8">
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

              <div>
                <h3 className="text-sm leading-none font-bold">Clínica Care</h3>
                <p className="text-muted-foreground text-xs leading-none">
                  mail@example.com
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
