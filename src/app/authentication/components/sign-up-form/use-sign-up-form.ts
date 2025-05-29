import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { authClient } from "@/lib/auth-client";

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
          router.push("/dashboard");
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
