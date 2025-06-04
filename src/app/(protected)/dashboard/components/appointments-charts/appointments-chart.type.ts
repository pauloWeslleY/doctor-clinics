export type DailyAppointmentsDataProps = {
  date: string;
  appointments: number;
  revenue: number;
};

export interface AppointmentsChartsProps {
  dailyAppointmentsData: DailyAppointmentsDataProps[];
}
