"use client";

import { Plus } from "lucide-react";
import { useState } from "react";

import { type DoctorProps } from "@/app/(protected)/doctors/components/doctor-card/doctor.type";
import { type PatientProps } from "@/app/(protected)/patients/types/patient.type";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import CreateAppointmentForm from "./create-appointment-form";

interface CreateAppointmentProps {
  patients: PatientProps[];
  doctors: DoctorProps[];
}

const CreateAppointment = ({ patients, doctors }: CreateAppointmentProps) => {
  const [isOpenCreateAppointment, setIsOpenCreateAppointment] = useState(false);

  return (
    <Dialog
      open={isOpenCreateAppointment}
      onOpenChange={setIsOpenCreateAppointment}
    >
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Novo agendamento
        </Button>
      </DialogTrigger>

      <CreateAppointmentForm
        patients={patients}
        doctors={doctors}
        onSuccess={() => setIsOpenCreateAppointment(false)}
      />
    </Dialog>
  );
};

export default CreateAppointment;
