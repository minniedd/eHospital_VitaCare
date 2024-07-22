import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {observableToBeFn} from "rxjs/internal/testing/TestScheduler";
import {Observable} from "rxjs";
import {MyConfig} from "../../My-Config";
import {DoctorsGetAll, DoctorsGetAllDoctors} from "./get-all-doctors";
import {ExaminationsGetAll, ExaminationsGetAllExaminations} from "./get-all-examinations";


@Component({
  selector: 'app-medical-worker-make-an-appointment',
  templateUrl: './medical-worker-make-an-appointment.component.html',
  styleUrls: ['./medical-worker-make-an-appointment.component.css']
})
export class MedicalWorkerMakeAnAppointmentComponent implements OnInit {
  appointmentForm: FormGroup;
  doctors:DoctorsGetAllDoctors[] = [];
  examinations:ExaminationsGetAllExaminations[]=[];

  constructor(public httpClient: HttpClient, private fb: FormBuilder) {
    this.appointmentForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: ['', Validators.required],
      gender: ['', Validators.required],
      telephoneNumber: ['', Validators.required],
      address: ['', Validators.required],
      country: ['', Validators.required],
      allergies: [''],
      emergencyContact: [''],
      examination: ['', Validators.required],
      appointmentDate: ['', Validators.required],
      time: ['', Validators.required],
      doctor: ['', Validators.required],
      notes: ['']
    });
  }

  ngOnInit(): void {
    this.getDoctors();
    this.getExaminations();
  }

  getDoctors(){
    let url = MyConfig.server_address + '/api/AppointmentAddEndpoint/Doctors'
    this.httpClient.get<DoctorsGetAll>(url).subscribe((x:DoctorsGetAll)=>{
      this.doctors = x.doctors;
    })
  }

    getExaminations(){
        let url = MyConfig.server_address + '/api/AppointmentAddEndpoint/Examinations'
        this.httpClient.get<ExaminationsGetAll>(url).subscribe((x:ExaminationsGetAll)=>{
            this.examinations = x.examinations;
        })
    }

  submitAppointment(){
    if (this.appointmentForm.valid) {
      this.httpClient.post('/api/AppointmentAddEndpoint', this.appointmentForm.value).subscribe(response=>{
        console.log('Appointment create successfully.', response);
      }, error => {
        console.log('Creating appointment failed.', error);
      });
    }
  }
}
