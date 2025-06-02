import { type ColumnDef } from "@tanstack/react-table";

import { type appointmentsTable } from "@/db/schema";

export type AppointmentProps = typeof appointmentsTable.$inferSelect & {
  patient: {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    sex: "male" | "female";
  };
  doctor: {
    id: string;
    name: string;
    specialty: string;
  };
};

export type ColumnsAppointmentTable = ColumnDef<AppointmentProps>[];
