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

import { type PatientProps } from "../../types/patient.type";
import useDeletePatient from "./use-delete-patient";

interface PatientAlertDeleteProps {
  patient: PatientProps;
}

const PatientAlertDelete = ({ patient }: PatientAlertDeleteProps) => {
  const {
    isOpenDeleteDialogPatient,
    deletePatientAction,
    handleDeletePatient,
    handleDeleteDialogPatient,
  } = useDeletePatient();

  return (
    <>
      <DropdownMenuItem
        onClick={() => handleDeleteDialogPatient(true)}
        onSelect={(e) => {
          e.preventDefault();
          handleDeleteDialogPatient(true);
        }}
      >
        <TrashIcon />
        <span className="sr-only">Delete</span>
        Excluir
      </DropdownMenuItem>

      <AlertDialog
        open={isOpenDeleteDialogPatient}
        onOpenChange={handleDeleteDialogPatient}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Tem certeza que deseja excluir este paciente?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Essa ação não pode ser revertida. Isso irá remover o paciente e
              todas as consultas agendadas.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel asChild>
              <Button variant="outline">Cancelar</Button>
            </AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button
                className="bg-red-700 text-white transition-all duration-300 ease-in-out hover:bg-red-400"
                disabled={deletePatientAction.isPending}
                onClick={() => handleDeletePatient(patient.id)}
              >
                {deletePatientAction.isPending && (
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

export default PatientAlertDelete;
