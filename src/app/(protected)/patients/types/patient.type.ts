import { type patientsTable } from "@/db/schema";

export type PatientProps = typeof patientsTable.$inferSelect;

export interface DataTablePatientProps {
  data: PatientProps[];
}
