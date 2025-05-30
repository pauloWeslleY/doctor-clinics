import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";
import { Routes } from "@/lib/routes";

import { LoginFormSchema } from "./login-form.schema";
import { type LoginFormSchemaProps } from "./login-form.type";

const useLoginForm = () => {
  const router = useRouter();
  const form = useForm<LoginFormSchemaProps>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async ({ email, password }: LoginFormSchemaProps) => {
    await authClient.signIn.email(
      { email, password },
      {
        onSuccess: () => {
          router.push(Routes.Dashboard);
        },
        onError: () => {
          toast.error("Email ou senha incorretos");
        },
      },
    );
  };

  const handleSignInWithGoogle = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: Routes.Dashboard,
    });
  };

  return {
    form,
    onSubmit,
    handleSignInWithGoogle,
  };
};

export default useLoginForm;
