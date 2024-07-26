import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {observableToBeFn} from "rxjs/internal/testing/TestScheduler";
import {Observable} from "rxjs";
import {MyConfig} from "../../My-Config";
import {TimeSlot} from "./time-slots-model";
import { NgForm } from '@angular/forms';
import {
  DoctorsGetallEndpoint,
  DoctorsGetAllResponseDoctors
} from "./endpoints/doctors-getall.endpoint";
import {ActivatedRoute} from "@angular/router";
import {AppointmentAddEndpoint, AppointmentAddRequest} from "./endpoints/appointment-add.endpoint";
import {
    ExaminationsGetallEndpoint,
    ExaminationsGetAllResponseExamination
} from "./endpoints/examinations-getall.endpoint";



@Component({
  selector: 'app-medical-worker-make-an-appointment',
  templateUrl: './medical-worker-make-an-appointment.component.html',
  styleUrls: ['./medical-worker-make-an-appointment.component.css']
})

export class MedicalWorkerMakeAnAppointmentComponent implements OnInit {
  newAppointment: AppointmentAddRequest | null = null;
  doctorsPodaci: DoctorsGetAllResponseDoctors[] = [];
  examinationsPodaci: ExaminationsGetAllResponseExamination[] = [];
  timeSlots: TimeSlot[] = [];


  constructor(public activatedRoute: ActivatedRoute,
              private doctorsGetAllEndpoint: DoctorsGetallEndpoint,
              private AppointmentAddEndpoint: AppointmentAddEndpoint,
              private examinationGetAllEndpoint: ExaminationsGetallEndpoint) {
  }

  ngOnInit(): void {
    this.getDoctors();
    this.getExaminations();
  }

  getDoctors() {
    this.doctorsGetAllEndpoint.obradi().subscribe(x => {
      this.doctorsPodaci = x.doctors
    });
  }

  getExaminations() {
    this.examinationGetAllEndpoint.obradi().subscribe(x => {
      this.examinationsPodaci = x.examinations
    });
  }

  submitAppointment() {
    if (this.newAppointment != null) {
      this.AppointmentAddEndpoint.obradi(this.newAppointment!).subscribe(x => {
        this.clearForm();


        setTimeout(() => {
          console.log("All Good")
        }, 50);
      });
    }
  }

  private clearForm() {
    this.newAppointment = null;
  }

}
