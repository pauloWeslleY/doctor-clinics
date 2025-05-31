import { Loader2Icon } from "lucide-react";
import { NumericFormat } from "react-number-format";

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
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { medicalSpecialties } from "../../constants";
import { timeOptions } from "../../constants/hours";
import { weekDays } from "../../constants/week-days";
import { type UpdateDoctorFormProps } from "./doctor.type";
import useUpdateDoctorForm from "./use-update-doctor-form";

const UpdateDoctorForm = (props: UpdateDoctorFormProps) => {
  const { form, onSubmit, updateDoctorAction } = useUpdateDoctorForm(props);

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
                <Input placeholder="Digite o nome" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="specialty"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Especialidade</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione a especialidade" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {medicalSpecialties.map((specialty, index) => (
                    <SelectItem
                      key={`${index}-${specialty.value}`}
                      value={specialty.value}
                    >
                      {specialty.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="appointmentPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preço da consulta</FormLabel>
              <NumericFormat
                value={field.value}
                onValueChange={(value) => {
                  field.onChange(value.floatValue);
                }}
                decimalScale={2}
                fixedDecimalScale
                decimalSeparator=","
                allowNegative={false}
                allowLeadingZeros={false}
                thousandSeparator="."
                customInput={Input}
                prefix="R$"
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="availableFromWeekDay"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dia inicial de disponibilidade</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione um dia" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {weekDays.map((weekDay, index) => (
                    <SelectItem
                      key={`${index}-${weekDay.value}`}
                      value={weekDay.value}
                    >
                      {weekDay.month}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="availableToWeekDay"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dia final de disponibilidade</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value?.toString()}
              >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione um dia" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {weekDays.map((weekDay, index) => (
                    <SelectItem
                      key={`${index}-${weekDay.value}`}
                      value={weekDay.value}
                    >
                      {weekDay.month}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="availableFromTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Horário inicial de disponibilidade</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione um horário" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {timeOptions.map((timeOption, index) => (
                    <SelectGroup key={index}>
                      <SelectLabel>{timeOption.label}</SelectLabel>
                      {timeOption.items.map((item, index) => (
                        <SelectItem
                          key={`${index}-${item.value}`}
                          value={item.value}
                        >
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="availableToTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Horário final de disponibilidade</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione um horário" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {timeOptions.map((timeOption, index) => (
                    <SelectGroup key={index}>
                      <SelectLabel>{timeOption.label}</SelectLabel>
                      {timeOption.items.map((item, index) => (
                        <SelectItem
                          key={`${index}-${item.value}`}
                          value={item.value}
                        >
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <DialogFooter>
          <Button type="submit" disabled={updateDoctorAction.isPending}>
            {updateDoctorAction.isPending ? (
              <>
                <Loader2Icon className="h-4 w-4 animate-spin" />
                Atualizando...
              </>
            ) : (
              "Atualizar"
            )}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default UpdateDoctorForm;
