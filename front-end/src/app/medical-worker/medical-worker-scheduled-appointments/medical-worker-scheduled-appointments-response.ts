export interface MedicalWorkerScheduledAppointmentsResponse {
  appointments: MedicalWorkerScheduledAppointmentsResponseMedicalWorker[];
}

export interface MedicalWorkerScheduledAppointmentsResponseMedicalWorker {
  appointmentID: number;
  patient: string;
  examination: string;
  doctor: string;
  appointmentDateTime: string;
  notes: string;
}
