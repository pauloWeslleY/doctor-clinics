import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { CreateDoctorSchema } from "./create-doctor.schema";
import { type CreateDoctorFormType } from "./create-doctor-form.type";

const useCreateDoctorForm = () => {
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

  const onSubmit = (values: CreateDoctorFormType) => {
    console.log(values);
  };

  return {
    form,
    onSubmit,
  };
};

export default useCreateDoctorForm;
