export interface MedicalWorkerScheduledAppointmentsResponse {
  appointments: MedicalWorkerScheduledAppointmentsResponseMedicalWorker[];
}

export interface MedicalWorkerScheduledAppointmentsResponseMedicalWorker {
  appointmentID: number;
  patient: string;
  examination: string;
  doctor: string;
  appointmentDate: string;
  notes: string;
}
