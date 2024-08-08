import {MyBaseEndpoint} from "../../../MyBaseEndpoint";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import { Observable } from "rxjs";
import {MyConfig} from "../../../My-Config";

@Injectable({providedIn: 'root'})
export class AppointmentDetailsEndpoint implements MyBaseEndpoint<number, AppointmentDetailsResponse> {
  private apiUrl = `${MyConfig.server_address}/api/AppointmentDetailsGetAllEndpoint/`;

  constructor(private httpClient: HttpClient) {}

  obradi(appointmentID: number): Observable<AppointmentDetailsResponse> {
    const url = `${this.apiUrl}${appointmentID}`;
    return this.httpClient.get<AppointmentDetailsResponse>(url);
  }


}

export interface AppointmentDetailsResponse {
  firstName: string;
  lastName: string;
  birthDate: string;
  genderID: number;
  telephoneNumber: string;
  address: string;
  country: string;
  allergies: string;
  emergencyContact: string;
  examinationID: number;
  appointmentDate: string;
  time: string;
  doctorID: number;
  notes: string;
}
