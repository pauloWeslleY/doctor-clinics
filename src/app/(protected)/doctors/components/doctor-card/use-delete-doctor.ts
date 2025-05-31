import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { toast } from "sonner";

import { deleteDoctor } from "@/actions/delete-doctor";

const useDeleteDoctor = () => {
  const [isOpenDeleteDialogDoctor, setIsOpenDeleteDialogDoctor] =
    useState(false);

  const deleteDoctorAction = useAction(deleteDoctor, {
    onSuccess: () => {
      toast.success("Medico excluído com sucesso.");
      setIsOpenDeleteDialogDoctor(false);
    },
    onError: () => {
      toast.error("Error ao excluir medico.");
    },
  });

  const handleDeleteDialogDoctor = (open: boolean) => {
    setIsOpenDeleteDialogDoctor(open);
  };

  const handleDeleteDoctor = (id: string) => {
    if (!id) return;
    deleteDoctorAction.execute({ id });
  };

  return {
    isOpenDeleteDialogDoctor,
    deleteDoctorAction,
    handleDeleteDoctor,
    handleDeleteDialogDoctor,
  };
};

export default useDeleteDoctor;
