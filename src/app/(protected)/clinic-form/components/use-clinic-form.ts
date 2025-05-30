import { zodResolver } from "@hookform/resolvers/zod";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { createClinic } from "@/actions/create-clinic";

import { ClinicFormSchema } from "./clinic-form.schema";
import { type ClinicFormSchemaProps } from "./clinic-form.type";

const useClinicForm = () => {
  const form = useForm<ClinicFormSchemaProps>({
    resolver: zodResolver(ClinicFormSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: ClinicFormSchemaProps) => {
    try {
      await createClinic({ name: values.name });
      toast.success("Clínica criada com sucesso.");
      form.reset();
    } catch (error) {
      if (isRedirectError(error)) return;
      toast.error("Error ao criar clinica.");
    }
  };

  return {
    form,
    onSubmit,
  };
};

export default useClinicForm;
