import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { upsertPatient } from "@/actions/upsert-patient";

import { CreatePatientSchema } from "./create-patient.schema";
import { type CreatePatientFormValuesProps } from "./create-patient.type";

const useCreatePatientForm = (onSuccess: () => void) => {
  const form = useForm<CreatePatientFormValuesProps>({
    resolver: zodResolver(CreatePatientSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      sex: undefined,
    },
  });

  const createPatientAction = useAction(upsertPatient, {
    onSuccess: () => {
      toast.success("Paciente adicionado com sucesso.");
      onSuccess();
    },
    onError: () => {
      toast.error("Erro ao adicionar paciente.");
    },
  });

  const onSubmit = (values: CreatePatientFormValuesProps) => {
    createPatientAction.execute({
      ...values,
      phoneNumber: values.phone,
    });
  };

  return {
    form,
    onSubmit,
    isPendingCreatePatientAction: createPatientAction.isPending,
  };
};

export default useCreatePatientForm;
