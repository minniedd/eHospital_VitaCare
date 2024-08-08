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
import {TimeSlotEndpoint} from "./endpoints/time-slot.endpoint";
import { ChangeDetectorRef } from '@angular/core';
import {GenderGetAllEndpoint, GenderGetAllResponseGender} from "./endpoints/gender-getall.endpoint";




@Component({
  selector: 'app-medical-worker-make-an-appointment',
  templateUrl: './medical-worker-make-an-appointment.component.html',
  styleUrls: ['./medical-worker-make-an-appointment.component.css']
})

export class MedicalWorkerMakeAnAppointmentComponent implements OnInit {
  newAppointment: AppointmentAddRequest = {
    firstName: '',
    lastName: '',
    birthDate: '',
    genderID: 0,
    telephoneNumber: '',
    address: '',
    country: '',
    allegries: '',
    emergencyContact: '',
    examinationID: 0,
    appointmentDate: '',
    time: '',
    doctorID: 0,
    notes: ''
  };
  doctorsPodaci: DoctorsGetAllResponseDoctors[] = [];
  examinationsPodaci: ExaminationsGetAllResponseExamination[] = [];
  genderPodaci: GenderGetAllResponseGender[]=[];
  timeSlots: TimeSlot[] = [];


  constructor(public activatedRoute: ActivatedRoute,
              private doctorsGetAllEndpoint: DoctorsGetallEndpoint,
              private AppointmentAddEndpoint: AppointmentAddEndpoint,
              private examinationGetAllEndpoint: ExaminationsGetallEndpoint,
              private timeSlotEndpoint: TimeSlotEndpoint,
              private cdr: ChangeDetectorRef,
              private genderGetAllEndpoint:GenderGetAllEndpoint) {
  }

  ngOnInit(): void {
    this.getDoctors();
    this.getExaminations();
    this.getGenders();
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

  getGenders(){
    this.genderGetAllEndpoint.obradi().subscribe(x => {
      this.genderPodaci = x.genders
    });
  }

  onDateChange(event: any): void {
    const date = event.target.value;
    console.log('Date changed:', date);  // Debug line
    this.loadTimeSlots(date);
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
    this.newAppointment = {
      firstName: '',
      lastName: '',
      birthDate: '',
      genderID: 0,
      telephoneNumber: '',
      address: '',
      country: '',
      allegries: '',
      emergencyContact: '',
      examinationID: 0,
      appointmentDate: '',
      time: '',
      doctorID: 0,
      notes: ''
    };
  }

  private loadTimeSlots(date: string) {
    this.timeSlotEndpoint.getAvailableTimeSlot(date).subscribe(data => {
      console.log('Loaded time slots:', data);
      this.timeSlots = data;
      this.cdr.detectChanges();
    }, error => {
      console.error('Error loading time slots:', error);
    });
  }
}
