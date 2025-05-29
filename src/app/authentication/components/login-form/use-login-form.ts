import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { LoginFormSchema } from "./login-form.schema";
import { type LoginFormSchemaProps } from "./login-form.type";

const useLoginForm = () => {
  const form = useForm<LoginFormSchemaProps>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormSchemaProps) => {
    console.log({ data });
  };

  return {
    form,
    onSubmit,
  };
};

export default useLoginForm;
