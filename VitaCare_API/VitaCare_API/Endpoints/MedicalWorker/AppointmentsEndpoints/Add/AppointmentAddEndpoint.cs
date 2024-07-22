﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VitaCare_API.Data;
using VitaCare_API.Data.Models;
using VitaCare_API.Helpers;

namespace VitaCare_API.Endpoints.MedicalWorker.AppointmentsEndpoints.Add
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppointmentAddEndpoint : MyBaseEndpoint<AppointmentAddRequest, AppointmentAddResponse>
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public AppointmentAddEndpoint(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        [HttpPost]
        public override async Task<AppointmentAddResponse> Obradi([FromBody]AppointmentAddRequest request)
        {

            var patient = new Patient
            {
                FirstName = request.FirstName,
                LastName = request.LastName,
                PatientBirthDate = request.BirthDate,
                GenderID = request.GenderID,
                PhoneNumber = request.TelephoneNumber,
                PatientAddress = request.Address,
                Country = request.Country,
                PatientAllergies = request.Allegries,
                EmergencyContact = request.EmergencyContact
            };

            _applicationDbContext.Patient.Add(patient);
            await _applicationDbContext.SaveChangesAsync();

            var existingAppointment = await _applicationDbContext.Appointment
                .FirstOrDefaultAsync(a => a.AppointmentDate == request.AppointmentDate && a.Time == request.Time && a.DoctorID == request.DoctorID);

            if (existingAppointment != null)
            {
                throw new Exception("The selected appointment time is already taken.");
            }


            var appointment = new Appointment
            {
                PatientID = patient.PatientID,
                ExaminationID = request.ExaminationID,
                AppointmentDate = request.AppointmentDate,
                Time = request.Time,
                DoctorID = request.DoctorID,
                AppointmentNotes = request.Notes,
                AppointmentStatusInfo = "Approved"
            };

            _applicationDbContext.Appointment.Add(appointment);
            await _applicationDbContext.SaveChangesAsync();

            return new AppointmentAddResponse
            {
                PatientID = patient.PatientID,
                AppointmentID = appointment.AppointmentID,
            };
        }

        [HttpGet("Doctors")]
        public async Task<IActionResult> GetDoctors()
        {
            var doctors = await _applicationDbContext.Doctor.ToListAsync();

            return Ok(doctors);
        }

        [HttpGet("Examinations")]
        public async Task<IActionResult> GetExaminations()
        {
            var examinations = await _applicationDbContext.MedicalExaminations.ToListAsync();

            return Ok(examinations);
        }
    }
}
