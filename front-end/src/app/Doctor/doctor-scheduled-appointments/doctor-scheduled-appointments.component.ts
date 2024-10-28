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
import {FileEndpoint} from "./endpoints/file.endpoint";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-doctor-scheduled-appointments',
  templateUrl: './doctor-scheduled-appointments.component.html',
  styleUrls: ['./doctor-scheduled-appointments.component.css']
})
export class DoctorScheduledAppointmentsComponent implements OnInit {

  appointments: DoctorScheduledAppointmentsResponseDoctor[]=[];
  selectedAppointment: AppointmentDetailsResponse | null = null;
  selectedFile: File | null = null;
  selectedAppointmentId: number | null = null;
  fileUploaded: boolean = false;

  constructor(public httpClient:HttpClient,
              private appointmentDetailEndpoint:AppointmentDetailsEndpoint,
              private fileEndpoint:FileEndpoint,
              private snackBar:MatSnackBar) { }

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

  onFileSelected(event:any,appointmentId:number):void {
    if (this.fileUploaded) {
      this.openSnackBar('A file has already been uploaded for this appointment. Please choose a different appointment to upload a new file.', 'Close');
      return;
  }
    this.selectedFile = event.target.files[0];
    this.selectedAppointmentId = appointmentId;
}

  onUpload(appointmentId: number): void {
    if (this.selectedFile) {
      this.fileEndpoint.uploadFile(this.selectedFile, appointmentId)
        .subscribe(x => {
          console.log('File uploaded:', x);
          this.openSnackBar('File uploaded successfully!', 'Close');
          this.fileUploaded = true;
          this.selectedFile = null;
        }, error => {
          console.error('Upload failed:', error);
          this.openSnackBar('Upload failed. Please try again.', 'Close');
        });
    } else {
      this.openSnackBar('Please select a file before uploading.', 'Close');
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message,action, {
      duration: 3000,
    });
  }
}
