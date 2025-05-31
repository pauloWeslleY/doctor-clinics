import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import AddPatientForm from "./_components/add-patient-form";

const PatientsPage = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Pacientes</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="default">Adicionar paciente</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar paciente</DialogTitle>
            </DialogHeader>
            <AddPatientForm />
          </DialogContent>
        </Dialog>
      </div>
      {/* Lista de pacientes será exibida aqui futuramente */}
    </div>
  );
};

export default PatientsPage;
