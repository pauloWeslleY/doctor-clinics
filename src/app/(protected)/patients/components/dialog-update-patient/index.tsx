"use client";

import { SquarePenIcon } from "lucide-react";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

import { type UpdatePatientProps } from "./update-patient.type";
import UpdatePatientForm from "./update-patient-form";

const UpdateDialogPatient = ({ patient }: UpdatePatientProps) => {
  const [openUpdateDialogPatient, setOpenUpdateDialogPatient] = useState(false);

  return (
    <>
      <DropdownMenuItem
        onClick={() => setOpenUpdateDialogPatient(true)}
        onSelect={(e) => {
          e.preventDefault();
          setOpenUpdateDialogPatient(true);
        }}
      >
        <SquarePenIcon />
        Editar
      </DropdownMenuItem>

      <Dialog
        open={openUpdateDialogPatient}
        onOpenChange={setOpenUpdateDialogPatient}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Atualizar paciente</DialogTitle>
            <DialogDescription>
              Editar informações do paciente {patient.name}.
            </DialogDescription>
          </DialogHeader>

          <UpdatePatientForm
            patient={patient}
            onSuccess={() => setOpenUpdateDialogPatient(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UpdateDialogPatient;
