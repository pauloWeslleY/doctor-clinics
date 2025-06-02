import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useAction } from "next-safe-action/hooks";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { addAppointment } from "@/actions/add-appointment";
import { getAvailableTimes } from "@/actions/get-available-times";
import { type DoctorProps } from "@/app/(protected)/doctors/components/doctor-card/doctor.type";

import { CreateAppointmentSchema } from "./create-appointment.schema";
import { type CreateAppointmentFormType } from "./create-appointment.type";

interface UseCreateAppointmentProps {
  doctors: DoctorProps[];
  onSuccess?: () => void;
}

const useCreateAppointment = ({
  doctors,
  onSuccess,
}: UseCreateAppointmentProps) => {
  const form = useForm<CreateAppointmentFormType>({
    shouldUnregister: true,
    resolver: zodResolver(CreateAppointmentSchema),
    defaultValues: {
      patientId: "",
      doctorId: "",
      appointmentPrice: 0,
      date: undefined,
      time: "",
    },
  });

  const selectedDoctorId = form.watch("doctorId");
  const selectedPatientId = form.watch("patientId");
  const selectedDate = form.watch("date");

  const { data: availableTimes } = useQuery({
    queryKey: ["available-times", selectedDate, selectedDoctorId],
    queryFn: () => {
      return getAvailableTimes({
        date: dayjs(selectedDate).format("YYYY-MM-DD"),
        doctorId: selectedDoctorId,
      });
    },
    enabled: !!selectedDate && !!selectedDoctorId,
  });

  // Atualizar o preço quando o médico for selecionado
  const handleUpdatePriceWhenDoctorSelected = useCallback(() => {
    if (selectedDoctorId) {
      const selectedDoctor = doctors.find(
        (doctor) => doctor.id === selectedDoctorId,
      );
      if (selectedDoctor) {
        form.setValue(
          "appointmentPrice",
          selectedDoctor.appointmentPriceInCents / 100,
        );
      }
    }
  }, [selectedDoctorId, doctors, form]);

  useEffect(() => {
    handleUpdatePriceWhenDoctorSelected();
  }, [handleUpdatePriceWhenDoctorSelected]);

  const createAppointmentAction = useAction(addAppointment, {
    onSuccess: () => {
      toast.success("Agendamento criado com sucesso.");
      form.reset();
      onSuccess?.();
    },
    onError: () => {
      toast.error("Erro ao criar agendamento.");
    },
  });

  const onSubmit = (values: CreateAppointmentFormType) => {
    createAppointmentAction.execute({
      ...values,
      appointmentPriceInCents: values.appointmentPrice * 100,
    });
  };

  const isDateAvailable = (date: Date) => {
    if (!selectedDoctorId) return false;

    const selectedDoctor = doctors.find(
      (doctor) => doctor.id === selectedDoctorId,
    );

    if (!selectedDoctor) return false;

    const dayOfWeek = date.getDay();

    return (
      dayOfWeek >= selectedDoctor.availableFromWeekDay &&
      dayOfWeek <= selectedDoctor.availableToWeekDay
    );
  };

  const isDateTimeEnabled = selectedPatientId && selectedDoctorId;

  return {
    form,
    selectedDate,
    selectedDoctorId,
    availableTimes,
    isDateTimeEnabled,
    isPendingCreateAppointmentAction: createAppointmentAction.isPending,
    isDateAvailable,
    onSubmit,
  };
};

export default useCreateAppointment;
