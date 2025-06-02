import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { createClinic } from "@/actions/create-clinic";
import { Routes } from "@/lib/routes";

import { ClinicFormSchema } from "./clinic-form.schema";
import { type ClinicFormSchemaProps } from "./clinic-form.type";

const useClinicForm = () => {
  const router = useRouter();

  const form = useForm<ClinicFormSchemaProps>({
    resolver: zodResolver(ClinicFormSchema),
    defaultValues: {
      name: "",
    },
  });

  const createClinicAction = useAction(createClinic, {
    onSuccess: () => {
      toast.success("Clínica cadastrar com sucesso.");
      form.reset();
      router.push(Routes.Dashboard);
    },
    onError: (error) => {
      console.log("create clinic ", { error });
      toast.error("Error ao cadastrar clínica.");
    },
  });

  const onSubmit = ({ name }: ClinicFormSchemaProps) => {
    createClinicAction.execute({ name });
  };

  return {
    form,
    onSubmit,
    isPendingCreateClinicAction: createClinicAction.isPending,
  };
};

export default useClinicForm;
