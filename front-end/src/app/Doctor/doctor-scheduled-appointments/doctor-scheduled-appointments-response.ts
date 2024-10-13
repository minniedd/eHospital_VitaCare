export interface DoctorScheduledAppointmentsResponse {
  appointments: DoctorScheduledAppointmentsResponseDoctor[];
}

export interface DoctorScheduledAppointmentsResponseDoctor {
  appointmentID: number;
  patient: string;
  examination: string;
  doctor: string;
  appointmentDateTime: string;
  notes: string;
}
