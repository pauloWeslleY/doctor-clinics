import { type patientsTable } from "@/db/schema";

export type PatientProps = typeof patientsTable.$inferSelect;

export type PatientsProps = Omit<PatientProps, "phoneNumber" | "sex"> & {
  phone_number: string;
  sex: string;
};

export interface DataTablePatientProps {
  data: PatientsProps[];
}
