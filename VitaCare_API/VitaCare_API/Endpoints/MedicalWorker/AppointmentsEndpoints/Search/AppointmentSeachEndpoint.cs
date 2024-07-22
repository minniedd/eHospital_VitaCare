﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VitaCare_API.Data;
using VitaCare_API.Helpers;

namespace VitaCare_API.Endpoints.MedicalWorker.AppointmentsEndpoints.Search
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppointmentSeachEndpoint : MyBaseEndpoint<AppointmentSearchRequest, AppointmentSearchResponse>
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public AppointmentSeachEndpoint(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        [HttpGet("SEARCH")]
        public override async Task<AppointmentSearchResponse> Obradi([FromQuery]AppointmentSearchRequest request)
        {
            var appointments = await _applicationDbContext.Appointment.Where(x => request.Search == null || 
            (x.Patient.FirstName.ToLower() + " " + x.Patient.LastName.ToLower()).StartsWith(request.Search) ||
            (x.Patient.LastName.ToLower() + " " + x.Patient.FirstName.ToLower()).StartsWith(request.Search)).OrderByDescending(x => x.AppointmentDate)
            .Where(x => x.AppointmentStatusInfo == "Approved").Select(x => new AppointmentSearchResponseAppointment()
            {
                AppointmentID = x.AppointmentID,
                Patient = x.Patient.FirstName + " " + x.Patient.LastName,
                Examination = x.Examination.ExaminationName,
                Doctor = "dr. " + x.Doctor.FirstName + " " + x.Doctor.LastName,
                AppointmentDateTime = x.AppointmentDate.ToString("d") + " " + x.Time,
                Notes = x.AppointmentNotes
            }).ToListAsync();

            return new AppointmentSearchResponse
            {
                Appointments = appointments
            };
        }

        [HttpPost("Reject/{id}")]
        public async Task<IActionResult> Reject(int id)
        {
            var appointment = await _applicationDbContext.Appointment.FindAsync(id);
            if (appointment == null)
            {
                return NotFound();
            }

            appointment.AppointmentStatusInfo = "Reject";
            _applicationDbContext.Appointment.Update(appointment);
            await _applicationDbContext.SaveChangesAsync();

            return Ok();
        }
    }
}
