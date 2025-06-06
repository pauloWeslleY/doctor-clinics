import { redirect } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getUserAuthenticated } from "@/helpers/user-auth";
import { Routes } from "@/lib/routes";

import CreateClinicForm from "./components";

const ClinicFormPage = async () => {
  const { session } = await getUserAuthenticated();

  if (!session) {
    redirect(Routes.Appointments);
  }

  return (
    <Dialog open>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar Clínica</DialogTitle>
          <DialogDescription>
            Adicione uma clínica para continuar.
          </DialogDescription>
        </DialogHeader>

        <CreateClinicForm />
      </DialogContent>
    </Dialog>
  );
};

export default ClinicFormPage;
