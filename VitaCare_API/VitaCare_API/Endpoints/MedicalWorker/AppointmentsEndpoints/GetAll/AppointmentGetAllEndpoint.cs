using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VitaCare_API.Data;
using VitaCare_API.Helpers;

namespace VitaCare_API.Endpoints.MedicalWorker.AppointmentsEndpoints.GetAll
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppointmentGetAllEndpoint : MyBaseEndpoint<AppointmentGetAllRequest, AppointmentGetAllResponse>
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public AppointmentGetAllEndpoint(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        [HttpGet("GET-ALL")]
        public override async Task<AppointmentGetAllResponse> Obradi([FromQuery]AppointmentGetAllRequest request)
        {
            var appointments = await _applicationDbContext.Appointment.OrderByDescending(x => x.AppointmentDate).Where(x=>x.AppointmentStatusInfo == "Pending")
                .Select(x => new AppointmentGetAllResponseAppointment()
                {
                    AppointmentID = x.AppointmentID,
                    Patient = x.Patient.FirstName + " " + x.Patient.LastName,
                    Examination = x.Examination.ExaminationName,
                    Doctor = "dr. " + x.Doctor.FirstName + " " + x.Doctor.LastName,
                    AppointmentDate = x.AppointmentDate.ToString(),
                    Notes = x.AppointmentNotes
                }).ToListAsync();

            return new AppointmentGetAllResponse
            {
                Appointments = appointments
            };
        }
    }
}
