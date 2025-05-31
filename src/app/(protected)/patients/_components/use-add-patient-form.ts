import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { createPatient } from "@/actions/create-patient";

import { AddPatientSchema } from "./add-patient.schema";
import { type AddPatientFormValuesProps } from "./add-patient.type";

export function useAddPatientForm() {
  const [open, setOpen] = useState(false);

  const form = useForm<AddPatientFormValuesProps>({
    resolver: zodResolver(AddPatientSchema),
    defaultValues: { name: "", email: "", phone: "" },
  });

  const createPatientAction = useAction(createPatient, {
    onSuccess: () => {
      toast.success("Paciente adicionado com sucesso.");
      setOpen(false);
    },
    onError: () => {
      toast.error("Erro ao adicionar paciente.");
    },
  });

  const onSubmit = (values: AddPatientFormValuesProps) => {
    // TODO: Chamar server action para adicionar paciente
    // Exibir toast de sucesso/erro
    // Fechar dialog
    console.log(values);
  };

  return {
    form,
    open,
    setOpen,
    onSubmit,
    createPatientAction,
  };
}
