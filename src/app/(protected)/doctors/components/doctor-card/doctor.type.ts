import { type z } from "zod";

import { type doctorsTable } from "@/db/schema";

import { type MenuTabsDialogDoctorDetail } from "./dialog-doctor-detail";
import { type UpdateDoctorSchema } from "./update-doctor.schema";

export type UpdateDoctorFormType = z.infer<typeof UpdateDoctorSchema>;

export type DoctorProps = typeof doctorsTable.$inferSelect;

export interface DoctorCardProps {
  doctor: DoctorProps;
}

export interface UpdateDoctorFormProps extends DoctorCardProps {
  onSuccess: () => void;
}

export type TabsDoctorDetailType =
  (typeof MenuTabsDialogDoctorDetail)[keyof typeof MenuTabsDialogDoctorDetail];
