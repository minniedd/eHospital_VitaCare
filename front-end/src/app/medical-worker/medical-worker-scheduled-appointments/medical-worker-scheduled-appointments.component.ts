import { Component, OnInit } from '@angular/core';
import {
  MedicalWorkerScheduledAppointmentsResponse,
  MedicalWorkerScheduledAppointmentsResponseMedicalWorker
} from "./medical-worker-scheduled-appointments-response";
import {MyConfig} from "../../My-Config";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-medical-worker-scheduled-appointments',
  templateUrl: './medical-worker-scheduled-appointments.component.html',
  styleUrls: ['./medical-worker-scheduled-appointments.component.css']
})
export class MedicalWorkerScheduledAppointmentsComponent implements OnInit {

  appointments: MedicalWorkerScheduledAppointmentsResponseMedicalWorker[]=[];

  constructor(public httpClient:HttpClient) { }

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
}
