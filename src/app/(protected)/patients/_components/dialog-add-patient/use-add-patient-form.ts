import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { upsertPatient } from "@/actions/upsert-patient";

import { AddPatientSchema } from "./add-patient.schema";
import { type AddPatientFormValuesProps } from "./add-patient.type";

export function useAddPatientForm(onSuccess: () => void) {
  const form = useForm<AddPatientFormValuesProps>({
    resolver: zodResolver(AddPatientSchema),
    defaultValues: { name: "", email: "", phone: "" },
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

  const onSubmit = (values: AddPatientFormValuesProps) => {
    createPatientAction.execute({
      ...values,
      phoneNumber: values.phone,
    });
  };

  return {
    form,
    onSubmit,
    createPatientAction,
  };
}
