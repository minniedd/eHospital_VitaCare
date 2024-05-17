import { Component, OnInit } from '@angular/core';
import {MyConfig} from "../../My-Config";
import {AppointmentsGetAllResponse} from "./appointments-getAll-response";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-medical-worker-appointments',
  templateUrl: './medical-worker-appointments.component.html',
  styleUrls: ['./medical-worker-appointments.component.css']
})
export class MedicalWorkerAppointmentsComponent implements OnInit {

  constructor(public httpClient: HttpClient) {

  }

  ngOnInit(): void {
    this.getAppointments();
  }

  appointments : AppointmentsGetAllResponse[]=[];
  getAppointments(){
    let url = MyConfig.server_address+ `api/AppointmentGetAllEndpoint/GET-ALL`

    this.httpClient.get<AppointmentsGetAllResponse>(url).subscribe(data=>{
      // @ts-ignore
      this.appointments = data;
    })
  }
}
