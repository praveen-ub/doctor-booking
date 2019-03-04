
//doctor, patient, date, slot

var doctorService = require("../service/doctor-service.js");
var patientService = require("../service/patient-service.js");
var bookingList = [];

var bookingService = {

  book: function(request, callback){

      var doctorId = request.doctor;
      //validate if date is present or not
      var date = new Date(request.date);
      var patientId = request.patient;
      var slot = request.slot;
      doctorService.getWorkingHourSlots(doctorId, date, function(workingHourSlots){
        console.log("Working slots for::"+date+"::is"+workingHourSlots);
        console.log("Booking for slot::"+slot+"::"+workingHourSlots.indexOf(parseInt(slot)));
        if(!workingHourSlots || workingHourSlots.length == 0 || workingHourSlots.indexOf(parseInt(slot)) == -1){
          return callback("Failure, slot not available");
        }
        doctorService.getBookedSlots(doctorId, date, function(bookedSlots){
          if(bookedSlots && bookedSlots.indexOf(slot)!=-1){
            return callback("failure, slot already booked");
          }
          else{
            var booking = {
              "doctor":doctorId,
              "patient":patientId,
              "slot":slot,
              "date":date
            };
            bookingList.push(booking);
            doctorService.updateBookedSlots(doctorId, date, slot);
            return callback("success");
          }
        });
      });
  },
  getBookings: function(request, callback){

      var processedBookings = [];
      bookingList.forEach(function(booking){
            var processedBooking = {};
            doctorService.getDoctor(booking.doctor,function(doctor){
              //patientService.getPatient
              console.log("Doctor");
              console.log(booking.doctor);
              var doctorName = doctor.firstName;
              if(doctor.lastName){
                doctorName = doctorName + " "+doctor.lastName;
              }
              patientService.getPatient(booking.patient,function(patient){
                processedBooking["doctor"] = doctorName;
                var patientName = patient.firstName;
                if(patient.lastName){
                  patientName = patientName + " "+patient.lastName;
                }
                processedBooking["patient"] = patientName;
                processedBooking["date"] = booking.date;
                processedBooking["slot"] = booking.slot;
              });
            });
            processedBookings.push(processedBooking);
      });
      callback(processedBookings);
  }
}

module.exports = bookingService;
