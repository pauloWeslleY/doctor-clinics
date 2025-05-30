"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { Routes } from "@/lib/routes";

const SignOutButton = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push(Routes.Authentication);
        },
      },
    });
  };

  return <Button onClick={handleSignOut}>Sair</Button>;
};

export default SignOutButton;
