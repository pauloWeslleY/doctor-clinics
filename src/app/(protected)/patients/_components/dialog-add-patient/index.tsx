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

import AddPatientForm from "./add-patient-form";

const AddDialogPatient = () => {
  const [openAddDialogPatient, setOpenAddDialogPatient] = useState(false);

  return (
    <Dialog open={openAddDialogPatient} onOpenChange={setOpenAddDialogPatient}>
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
        <AddPatientForm onSuccess={() => setOpenAddDialogPatient(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default AddDialogPatient;
