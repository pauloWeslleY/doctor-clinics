"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { type DoctorCardProps, type TabsDoctorDetailType } from "./doctor.type";
import DoctorDetail from "./doctor-detail";
import UpdateDoctorForm from "./doctor-update-form";

export const MenuTabsDialogDoctorDetail = {
  detail: "detail",
  form: "form",
} as const;

const DialogDoctorDetail = ({ doctor }: DoctorCardProps) => {
  const [openDialogUpdateDoctor, setOpenDialogUpdateDoctor] = useState(false);
  const [tabsDoctorDetail, setTabsDoctorDetail] =
    useState<TabsDoctorDetailType>(MenuTabsDialogDoctorDetail.detail);

  return (
    <Dialog
      open={openDialogUpdateDoctor}
      onOpenChange={setOpenDialogUpdateDoctor}
    >
      <DialogTrigger asChild>
        <Button className="w-full">Ver detalhes</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar informações desse médico</DialogTitle>
        </DialogHeader>

        <Tabs
          value={tabsDoctorDetail}
          onValueChange={(event) =>
            setTabsDoctorDetail(event as TabsDoctorDetailType)
          }
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value={MenuTabsDialogDoctorDetail.detail}>
              Detalhes
            </TabsTrigger>
            <TabsTrigger value={MenuTabsDialogDoctorDetail.form}>
              Editar Médico
            </TabsTrigger>
          </TabsList>
          <TabsContent value={MenuTabsDialogDoctorDetail.detail}>
            <DoctorDetail doctor={doctor} />
          </TabsContent>
          <TabsContent value={MenuTabsDialogDoctorDetail.form}>
            <UpdateDoctorForm
              doctor={doctor}
              onSuccess={() => setOpenDialogUpdateDoctor(false)}
            />
          </TabsContent>
        </Tabs>

        {MenuTabsDialogDoctorDetail.detail === tabsDoctorDetail && (
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Fechar</Button>
            </DialogClose>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DialogDoctorDetail;
