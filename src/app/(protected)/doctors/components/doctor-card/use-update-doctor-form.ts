import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { upsertDoctor } from "@/actions/doctors";

import {
  type UpdateDoctorFormProps,
  type UpdateDoctorFormType,
} from "./doctor.type";
import { UpdateDoctorSchema } from "./update-doctor.schema";

const useUpdateDoctorForm = ({ doctor, onSuccess }: UpdateDoctorFormProps) => {
  const form = useForm<UpdateDoctorFormType>({
    resolver: zodResolver(UpdateDoctorSchema),
    defaultValues: {
      name: doctor.name ?? "",
      specialty: doctor.specialty ?? "",
      appointmentPrice: doctor.appointmentPriceInCents
        ? doctor.appointmentPriceInCents / 100
        : 0,
      availableFromWeekDay: doctor.availableFromWeekDay?.toString() ?? "1",
      availableToWeekDay: doctor.availableToWeekDay?.toString() ?? "5",
      availableFromTime: doctor.availableFromTime.concat(":00") ?? "",
      availableToTime: doctor.availableToTime.concat(":00") ?? "",
    },
  });

  const updateDoctorAction = useAction(upsertDoctor, {
    onSuccess: () => {
      onSuccess();
      toast.success("Medico atualizado com sucesso.");
    },
    onError: () => {
      toast.error("Error ao atualizar medico.");
    },
  });

  const onSubmit = (values: UpdateDoctorFormType) => {
    updateDoctorAction.execute({
      ...values,
      id: doctor.id,
      availableFromWeekDay: Number.parseInt(values.availableFromWeekDay),
      availableToWeekDay: Number.parseInt(values.availableToWeekDay),
      appointmentPriceInCents: values.appointmentPrice * 100,
    });
  };

  return {
    form,
    onSubmit,
    updateDoctorAction,
  };
};

export default useUpdateDoctorForm;
