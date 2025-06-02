import { useRouter } from "next/router";
import { useMemo } from "react";

import { authClient } from "@/lib/auth-client";
import { Routes } from "@/lib/routes";

const useSidebarFooterSignOut = () => {
  const { data } = authClient.useSession();
  const router = useRouter();

  const loadUserAuthClinic = useMemo(() => {
    const withoutDataClinic = {
      clinicName: "Sem clínica",
      userEmail: "Sem e-mail",
      username: "Sem nome",
    };

    if (!data) return withoutDataClinic;
    if (!data.user || !data.user.clinic) return withoutDataClinic;

    return {
      clinicName: data.user.clinic.name,
      userEmail: data.user.email,
      username: data.user.name[0].toUpperCase(),
    };
  }, [data]);

  const handleSignOutSidebarFooter = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push(Routes.Authentication);
        },
      },
    });
  };

  return {
    loadUserAuthClinic,
    handleSignOutSidebarFooter,
  };
};

export default useSidebarFooterSignOut;
