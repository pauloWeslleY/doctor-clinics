import { type z } from "zod";

import { type doctorsTable } from "@/db/schema";

import { type MenuTabsDialogDoctorDetail } from "./dialog-doctor-detail";
import { type UpdateDoctorSchema } from "./update-doctor.schema";

export type UpdateDoctorFormType = z.infer<typeof UpdateDoctorSchema>;

export interface DoctorProps {
  doctor: typeof doctorsTable.$inferSelect;
}

export interface UpdateDoctorFormProps extends DoctorProps {
  onSuccess: () => void;
}

export type TabsDoctorDetailType =
  (typeof MenuTabsDialogDoctorDetail)[keyof typeof MenuTabsDialogDoctorDetail];
