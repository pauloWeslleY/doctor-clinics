"use client";

import { Loader2Icon, TrashIcon } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

import { type AppointmentProps } from "../table-appointment/data-table-appointment.type";
import useDeleteAppointment from "./use-delete-appointment";

interface AppointmentAlertDeleteProps {
  appointment: AppointmentProps;
}

const AppointmentAlertDelete = ({
  appointment,
}: AppointmentAlertDeleteProps) => {
  const {
    isPendingDeleteAppointmentAction,
    isOpenDeleteDialogAppointment,
    handleDeleteAppointment,
    handleDeleteDialogAppointment,
  } = useDeleteAppointment();

  return (
    <>
      <DropdownMenuItem
        onClick={() => handleDeleteDialogAppointment(true)}
        onSelect={(e) => {
          e.preventDefault();
          handleDeleteDialogAppointment(true);
        }}
      >
        <TrashIcon />
        <span className="sr-only">Delete</span>
        Excluir
      </DropdownMenuItem>

      <AlertDialog
        open={isOpenDeleteDialogAppointment}
        onOpenChange={handleDeleteDialogAppointment}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Tem certeza que deseja excluir este agendamento?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Essa ação não pode ser revertida.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel asChild>
              <Button variant="outline">Cancelar</Button>
            </AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button
                className="bg-red-700 text-white transition-all duration-300 ease-in-out hover:bg-red-400"
                disabled={isPendingDeleteAppointmentAction}
                onClick={() => handleDeleteAppointment(appointment.id)}
              >
                {isPendingDeleteAppointmentAction && (
                  <Loader2Icon className="mr-2 animate-spin" />
                )}
                Excluir
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default AppointmentAlertDelete;
