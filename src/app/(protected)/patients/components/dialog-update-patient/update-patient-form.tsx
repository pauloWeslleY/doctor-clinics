"use client";

import { Loader2Icon } from "lucide-react";
import { PatternFormat } from "react-number-format";

import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { sexPatientOptions } from "../../constants/sex-options";
import { type UpdatePatientFormProps } from "./update-patient.type";
import { useUpdatePatientForm } from "./use-update-patient-form";

const UpdatePatientForm = ({ onSuccess, patient }: UpdatePatientFormProps) => {
  const { form, onSubmit, updatePatientAction } = useUpdatePatientForm({
    onSuccess,
    patient,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Nome do paciente" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input placeholder="E-mail do paciente" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Número de telefone</FormLabel>
              <FormControl>
                <PatternFormat
                  format="(##) #####-####"
                  mask="_"
                  placeholder="(11) 99999-9999"
                  value={field.value}
                  onValueChange={(value) => {
                    field.onChange(value.value);
                  }}
                  customInput={Input}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="sex"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sexo</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione o sexo" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {sexPatientOptions.map((option) => {
                    return (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <Button
            type="submit"
            className="w-full"
            disabled={updatePatientAction.isPending}
          >
            {updatePatientAction.isPending && (
              <Loader2Icon className="h-4 w-4 animate-spin" />
            )}
            Atualizar
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default UpdatePatientForm;
