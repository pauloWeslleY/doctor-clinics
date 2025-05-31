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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import useDeleteDoctor from "./use-delete-doctor";

interface DoctorAlertDeleteProps {
  id: string;
}

const DoctorAlertDelete = ({ id }: DoctorAlertDeleteProps) => {
  const {
    deleteDoctorAction,
    isOpenDeleteDialogDoctor,
    handleDeleteDialogDoctor,
    handleDeleteDoctor,
  } = useDeleteDoctor();

  return (
    <AlertDialog
      open={isOpenDeleteDialogDoctor}
      onOpenChange={handleDeleteDialogDoctor}
    >
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className="w-full">
          <TrashIcon className="size-4" />
          <span className="sr-only">Delete</span>
          Excluir
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Tem certeza que deseja excluir este médico?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação não pode ser revertida. Isso irá remover o médico e todas
            as consultas agendadas.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant="outline">Cancelar</Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              className="bg-red-700 text-white transition-all duration-300 ease-in-out hover:bg-red-400"
              disabled={deleteDoctorAction.isPending}
              onClick={() => handleDeleteDoctor(id)}
            >
              {deleteDoctorAction.isPending && (
                <Loader2Icon className="mr-2 animate-spin" />
              )}
              Excluir
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DoctorAlertDelete;
