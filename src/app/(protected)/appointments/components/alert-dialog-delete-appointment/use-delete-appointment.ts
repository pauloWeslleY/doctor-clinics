import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { toast } from "sonner";

import { deleteAppointment } from "@/actions/delete-appointment";

const useDeleteAppointment = () => {
  const [isOpenDeleteDialogAppointment, setIsOpenDeleteDialogAppointment] =
    useState(false);

  const deleteAppointmentAction = useAction(deleteAppointment, {
    onSuccess: () => {
      toast.success("Agendamento excluído com sucesso.");
      setIsOpenDeleteDialogAppointment(false);
    },
    onError: () => {
      toast.error("Error ao excluir agendamento.");
    },
  });

  const handleDeleteDialogAppointment = (open: boolean) => {
    setIsOpenDeleteDialogAppointment(open);
  };

  const handleDeleteAppointment = (id: string) => {
    if (!id) return;
    deleteAppointmentAction.execute({ id });
  };

  return {
    isOpenDeleteDialogAppointment,
    isPendingDeleteAppointmentAction: deleteAppointmentAction.isPending,
    handleDeleteAppointment,
    handleDeleteDialogAppointment,
  };
};

export default useDeleteAppointment;
