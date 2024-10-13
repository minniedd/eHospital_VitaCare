import { Component, OnInit } from '@angular/core';
import {
  MedicalWorkerScheduledAppointmentsResponseMedicalWorker
} from "../../medical-worker/medical-worker-scheduled-appointments/medical-worker-scheduled-appointments-response";
import {
  AppointmentDetailsEndpoint,
  AppointmentDetailsResponse
} from "../../medical-worker/medical-worker-scheduled-appointments/endpoints/appointment-details.endpoint";
import {HttpClient} from "@angular/common/http";
import {
  DoctorScheduledAppointmentsResponse,
  DoctorScheduledAppointmentsResponseDoctor
} from "./doctor-scheduled-appointments-response";
import {MyConfig} from "../../My-Config";
import {
  MedicalWorkerScheduledAppointmentsComponent
} from "../../medical-worker/medical-worker-scheduled-appointments/medical-worker-scheduled-appointments.component";

@Component({
  selector: 'app-doctor-scheduled-appointments',
  templateUrl: './doctor-scheduled-appointments.component.html',
  styleUrls: ['./doctor-scheduled-appointments.component.css']
})
export class DoctorScheduledAppointmentsComponent implements OnInit {

  appointments: DoctorScheduledAppointmentsResponseDoctor[]=[];
  selectedAppointment: AppointmentDetailsResponse | null = null;

  constructor(public httpClient:HttpClient,private appointmentDetailEndpoint:AppointmentDetailsEndpoint) { }

  ngOnInit(): void {
    let url = MyConfig.server_address + '/api/AppointmentSeachEndpoint/SEARCH'
    this.httpClient.get<DoctorScheduledAppointmentsComponent>(url).subscribe((x:DoctorScheduledAppointmentsResponse)=>{
      this.appointments = x.appointments;
    })
  }

  searchDate($event: Event) {
    // @ts-ignore
    let patient = $event.target.value;
    let url = MyConfig.server_address + `/api/AppointmentSeachEndpoint/SEARCH?Search=${patient}`

    this.httpClient.get<DoctorScheduledAppointmentsComponent>(url).subscribe((x:DoctorScheduledAppointmentsResponse)=>{
      this.appointments = x.appointments;
    })
  }

  rejectAppointment(appointment: DoctorScheduledAppointmentsResponseDoctor) {
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
