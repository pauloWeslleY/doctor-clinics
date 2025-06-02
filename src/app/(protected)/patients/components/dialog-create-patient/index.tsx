"use client";

import { PlusIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import CreatePatientForm from "./create-patient-form";

const CreateDialogPatient = () => {
  const [openCreateDialogPatient, setOpenCreateDialogPatient] = useState(false);

  return (
    <Dialog
      open={openCreateDialogPatient}
      onOpenChange={setOpenCreateDialogPatient}
    >
      <DialogTrigger asChild>
        <Button variant="default">
          <PlusIcon />
          Adicionar paciente
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar paciente</DialogTitle>
        </DialogHeader>
        <CreatePatientForm
          onSuccess={() => setOpenCreateDialogPatient(false)}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CreateDialogPatient;
