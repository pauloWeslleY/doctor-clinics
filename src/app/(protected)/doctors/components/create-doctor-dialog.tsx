"use client";

import { PlusIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import CreateDoctorForm from "./create-doctor-form";

const CreateDoctor = () => {
  const [openDialogCreateDoctor, setOpenDialogCreateDoctor] = useState(false);

  return (
    <Dialog
      open={openDialogCreateDoctor}
      onOpenChange={setOpenDialogCreateDoctor}
    >
      <DialogTrigger asChild>
        <Button>
          <PlusIcon />
          Adicionar médico
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar médico</DialogTitle>
          <DialogDescription>Adicione um novo médico.</DialogDescription>
        </DialogHeader>

        <CreateDoctorForm
          handleOpenDialogCreateDoctor={setOpenDialogCreateDoctor}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CreateDoctor;
