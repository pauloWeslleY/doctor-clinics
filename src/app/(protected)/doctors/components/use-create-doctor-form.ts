import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { upsertDoctor } from "@/actions/doctors";

import { CreateDoctorSchema } from "./create-doctor.schema";
import { type CreateDoctorFormType } from "./create-doctor-form.type";

const useCreateDoctorForm = (callback: (open: boolean) => void) => {
  const form = useForm<CreateDoctorFormType>({
    resolver: zodResolver(CreateDoctorSchema),
    defaultValues: {
      name: "",
      specialty: "",
      appointmentPrice: 0,
      availableFromWeekDay: "1",
      availableToWeekDay: "5",
      availableFromTime: "",
      availableToTime: "",
    },
  });

  const createDoctorAction = useAction(upsertDoctor, {
    onSuccess: () => {
      form.reset();
      callback(false);
      toast.success("Medico cadastrado com sucesso.");
    },
    onError: () => {
      toast.error("Error ao cadastrar medico.");
    },
  });

  const onSubmit = (values: CreateDoctorFormType) => {
    createDoctorAction.execute({
      ...values,
      availableFromWeekDay: Number.parseInt(values.availableFromWeekDay),
      availableToWeekDay: Number.parseInt(values.availableToWeekDay),
      appointmentPriceInCents: values.appointmentPrice * 100,
    });
  };

  return {
    form,
    onSubmit,
    createDoctorAction,
  };
};

export default useCreateDoctorForm;
