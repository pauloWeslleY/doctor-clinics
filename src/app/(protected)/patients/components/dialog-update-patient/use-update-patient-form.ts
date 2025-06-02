import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { upsertPatient } from "@/actions/upsert-patient";

import { UpdatePatientSchema } from "./update-patient.schema";
import {
  type UpdatePatientFormProps,
  type UpdatePatientFormValuesProps,
} from "./update-patient.type";

export function useUpdatePatientForm({
  onSuccess,
  patient,
}: UpdatePatientFormProps) {
  const form = useForm<UpdatePatientFormValuesProps>({
    resolver: zodResolver(UpdatePatientSchema),
    defaultValues: {
      name: patient.name ?? "",
      email: patient.email ?? "",
      phone: patient.phoneNumber ?? "",
      sex: patient.sex,
    },
  });

  const updatePatientAction = useAction(upsertPatient, {
    onSuccess: () => {
      toast.success("Paciente atualizado com sucesso.");
      onSuccess();
    },
    onError: () => {
      toast.error("Erro ao atualizar paciente.");
    },
  });

  const onSubmit = (values: UpdatePatientFormValuesProps) => {
    updatePatientAction.execute({
      ...values,
      id: patient.id,
      phoneNumber: values.phone,
    });
  };

  return {
    form,
    onSubmit,
    updatePatientAction,
  };
}
