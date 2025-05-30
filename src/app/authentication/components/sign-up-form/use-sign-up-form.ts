import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";
import { Routes } from "@/lib/routes";

import { SignUpFormSchema } from "./sign-up-form.schema";
import { type SignUpFormSchemaProps } from "./sign-up-form.type";

const useSignUpForm = () => {
  const router = useRouter();
  const form = useForm<SignUpFormSchemaProps>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: SignUpFormSchemaProps) => {
    await authClient.signUp.email(
      {
        email: values.email,
        password: values.password,
        name: values.name,
      },
      {
        onSuccess: () => {
          router.push(Routes.Dashboard);
        },
        onError: (ctx) => {
          if (ctx.error.code === "USER_ALREADY_EXISTS") {
            toast.error("E-mail ja cadastrado.");
            return;
          }

          toast.error("Error ao criar conta.");
        },
      },
    );
  };

  return {
    form,
    onSubmit,
  };
};

export default useSignUpForm;
