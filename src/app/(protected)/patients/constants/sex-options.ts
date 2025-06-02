export const sexPatientOptions = [
  { value: "male", label: "Masculino" },
  { value: "female", label: "Feminino" },
] as const;

export const handleFindSexPatientSelected = (sex: string) => {
  return sexPatientOptions.find((option) => option.value === sex)?.label ?? "";
};
