export interface DoctorsGetAll {
  doctors: DoctorsGetAllDoctors[]
}

export interface DoctorsGetAllDoctors {
  doctorID: number;
  name: string;
}
