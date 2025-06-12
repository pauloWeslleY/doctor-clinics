import { createSafeActionClient } from "next-safe-action";

import { getUserAuthenticated } from "@/helpers/user-auth";

export const actionClient = createSafeActionClient();

export const protectedActionClient = createSafeActionClient().use(
  async ({ next }) => {
    const { user } = await getUserAuthenticated();

    if (!user) {
      throw new Error("Usuário não autenticado");
    }

    return next({ ctx: { user } });
  },
);

export const protectedWithClinicActionClient = protectedActionClient.use(
  async ({ next, ctx }) => {
    if (!ctx.user.clinic?.id) {
      throw new Error("Usuário não autenticado");
    }

    return next({
      ctx: {
        user: {
          ...ctx.user,
          clinic: ctx.user.clinic!,
        },
      },
    });
  },
);
