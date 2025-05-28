import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { SignUpFormSchema } from "./sign-up-form.schema";
import { type SignUpFormSchemaProps } from "./sign-up-form.type";

const useSignUpForm = () => {
  const form = useForm<SignUpFormSchemaProps>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: SignUpFormSchemaProps) => {
    console.log({ data });
  };

  return {
    form,
    onSubmit,
  };
};

export default useSignUpForm;
