import { Component, OnInit } from '@angular/core';
import {
  MedicalWorkerScheduledAppointmentsResponse,
  MedicalWorkerScheduledAppointmentsResponseMedicalWorker
} from "./medical-worker-scheduled-appointments-response";
import {MyConfig} from "../../My-Config";
import {HttpClient} from "@angular/common/http";
import {AppointmentDetailsEndpoint, AppointmentDetailsResponse} from "./endpoints/appointment-details.endpoint";

@Component({
  selector: 'app-medical-worker-scheduled-appointments',
  templateUrl: './medical-worker-scheduled-appointments.component.html',
  styleUrls: ['./medical-worker-scheduled-appointments.component.css']
})
export class MedicalWorkerScheduledAppointmentsComponent implements OnInit {

  appointments: MedicalWorkerScheduledAppointmentsResponseMedicalWorker[]=[];
  selectedAppointment: AppointmentDetailsResponse | null = null;

  constructor(public httpClient:HttpClient,private appointmentDetailEndpoint:AppointmentDetailsEndpoint) { }

  ngOnInit(): void {
    let url = MyConfig.server_address + '/api/AppointmentSeachEndpoint/SEARCH'
    this.httpClient.get<MedicalWorkerScheduledAppointmentsComponent>(url).subscribe((x:MedicalWorkerScheduledAppointmentsResponse)=>{
      this.appointments = x.appointments;
    })
  }

  searchDate($event: Event) {
    // @ts-ignore
    let patient = $event.target.value;
    let url = MyConfig.server_address + `/api/AppointmentSeachEndpoint/SEARCH?Search=${patient}`

    this.httpClient.get<MedicalWorkerScheduledAppointmentsComponent>(url).subscribe((x:MedicalWorkerScheduledAppointmentsResponse)=>{
      this.appointments = x.appointments;
    })
  }

  rejectAppointment(appointment: MedicalWorkerScheduledAppointmentsResponseMedicalWorker) {
    const url = MyConfig.server_address + `/api/AppointmentSeachEndpoint/Reject/${appointment.appointmentID}`;

    this.httpClient.post(url, {}).subscribe(()=>{
      this.appointments = this.appointments.filter(x=>x.appointmentID !== appointment.appointmentID);
    }, error => {
      console.error('Error rejecting appointment',error);
    });
  }

  showDetails(appointmentID: number) {
    this.appointmentDetailEndpoint.obradi(appointmentID).subscribe(
      (data: AppointmentDetailsResponse) => {
        this.selectedAppointment = data;
        // Ensure modal is displayed
        // This will depend on your modal implementation; if using Bootstrap, ensure modal is shown
      },
      (error) => {
        console.error('Error fetching appointment details:', error);
      }
    );
  }

  closeModal() {
    this.selectedAppointment = null;
  }
}
