import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { toast } from "sonner";

import { deletePatient } from "@/actions/delete-patient";

const useDeletePatient = () => {
  const [isOpenDeleteDialogPatient, setIsOpenDeleteDialogPatient] =
    useState(false);

  const deletePatientAction = useAction(deletePatient, {
    onSuccess: () => {
      toast.success("Paciente excluído com sucesso.");
      setIsOpenDeleteDialogPatient(false);
    },
    onError: () => {
      toast.error("Error ao excluir paciente.");
    },
  });

  const handleDeleteDialogPatient = (open: boolean) => {
    setIsOpenDeleteDialogPatient(open);
  };

  const handleDeletePatient = (id: string) => {
    if (!id) return;
    deletePatientAction.execute({ id });
  };

  return {
    isOpenDeleteDialogPatient,
    deletePatientAction,
    handleDeletePatient,
    handleDeleteDialogPatient,
  };
};

export default useDeletePatient;
