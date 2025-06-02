import { headers } from "next/headers";

import { auth } from "@/lib/auth";

export const getUserAuthenticated = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return {
    session,
    user: session?.user,
  };
};
