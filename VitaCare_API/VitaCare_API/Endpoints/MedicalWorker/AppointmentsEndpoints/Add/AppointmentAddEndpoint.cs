using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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

            var examination = _applicationDbContext.MedicalExaminations.FirstOrDefault(x => x.ExaminationID == request.ExaminationID);
            if (examination == null)
            {
                throw new Exception("Examination doesn't exist!");
            }

            var duration = examination.ExaminationDuration;

            var appointmentEndTime = request.AppointmentStartTime?.AddMinutes(duration);

            var appointment = new Appointment
            {
                PatientID = patient.PatientID,
                ExaminationID = request.ExaminationID,
                AppointmentDate = request.AppointmentDate,
                AppointmentStartTime = request.AppointmentStartTime,
                AppointmentEndTime = appointmentEndTime,
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
    }
}
