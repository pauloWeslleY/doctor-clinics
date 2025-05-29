import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";

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

  const onSubmit = async (values: LoginFormSchemaProps) => {
    await authClient.signIn.email(
      {
        email: values.email,
        password: values.password,
      },
      {
        onSuccess: () => {
          router.push("/dashboard");
        },
        onError: () => {
          toast.error("Email ou senha incorretos");
        },
      },
    );
  };

  return {
    form,
    onSubmit,
  };
};

export default useLoginForm;
