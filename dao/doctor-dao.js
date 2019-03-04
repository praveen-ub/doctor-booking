
var nextDoctorId = 1;

var doctorList = [];

var daysOfWeek = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];

var bookedByDoctor ={
  // doctorid vs bookings by date
};
// var doctor = require('../model/doctor.js');

var doctorDao = {

  getList: function(callback){

      return callback(doctorList);

  },
  getDoctor: function(id, callback){

      var doctor;
      doctorList.forEach(function(dctr){
          if(id == dctr.id){
             doctor = dctr;
          }
      });
      console.log("Going to return doctor::"+doctor.firstName);
      if(callback){
          callback(doctor);
      }
  },
  getWorkingHours: function(id, callback){

      this.getDoctor(id, function(doctor){
        callback(doctor.workingHours);
      });
  },
  getBookingByDate:function(id, dateStr, callback){
    console.log("Whole booking data::"+JSON.stringify(bookedByDoctor));
    console.log("Getting booked slots for::"+id+"::"+dateStr);
    var date = new Date(dateStr);
    var dateString = date.getDate();
    var monthString = date.getMonth()+1;
    var yearString = date.getFullYear();
    var fullDateString = dateString+"-"+monthString+"-"+yearString;
     var slots;
     var bookingByDate = bookedByDoctor[id];
     if(bookingByDate && bookingByDate[fullDateString]){
       slots = bookingByDate[fullDateString];
     }
     callback(slots);
  },
  addDoctor: function(request, callback){

     // var newDoctor = doctor.create(nextDoctorId, request.firstName, request.lastName);
     var doctor  = {};
     doctor['firstName'] = request.firstName;
     doctor['lastName'] = request.lastName;
     doctor['id'] = nextDoctorId;
     doctor['workingHours'] = request.workingHours;
     doctorList.push(doctor);
     console.log("List after adding");
     console.log(doctorList);
     nextDoctorId = nextDoctorId+1;
     callback(doctor);
  },
  updateDoctor: function(id, request, callback){

     // var newDoctor = doctor.create(nextDoctorId, request.firstName, request.lastName);
     // var updatedDoctor;
     this.getDoctor(id, function(doctor){
       // var doctor = dctr;
       if(request.firstName){
         doctor['firstName'] = request.firstName;
       }
       if(request.lastName){
         doctor['lastName'] = request.lastName;
       }
       if(request.workingHours){

          var currentWorkingHours = doctor.workingHours;
          var workingHoursToUpdate = request.workingHours;
          daysOfWeek.forEach(function(day){
              if(workingHoursToUpdate[day]){
                currentWorkingHours[day] = workingHoursToUpdate[day];
              }
          });
       }
       callback(doctor);
     });
     //
     // doctor['id'] = nextDoctorId;
     // doctor['workingHours'] = request.workingHours;
     // doctorList.push(doctor);
     // console.log("List after adding");
     // console.log(doctorList);
     // nextDoctorId = nextDoctorId+1;
  },
  updateBookedHours:function(id, date, slot){
      var dateString = date.getDate();
      var monthString = date.getMonth()+1;
      var yearString = date.getFullYear();
      var fullDateString = dateString+"-"+monthString+"-"+yearString;
      console.log("Full date string::"+fullDateString);
      console.log("Doctor Dao updateBookedHours::"+id+"::"+date+"::"+slot);
      console.log("Whole booking data::"+JSON.stringify(bookedByDoctor));
      var bookingByDate = bookedByDoctor[id];
      if(bookingByDate){
            console.log("Bookings exists for doctor"+"::"+JSON.stringify(bookingByDate));
            var bookingSlots = bookingByDate[fullDateString];
            if(bookingSlots){
              bookingSlots.push(slot);
            }
            else{
              bookingSlots = [];
              bookingSlots.push(slot);
              bookingByDate[fullDateString] = bookingSlots;
            }
      }
      else{
          console.log("Bookings does not exists for doctor");
          var bookingSlots = [];
          bookingSlots.push(slot);
          bookingByDate = {};
          bookingByDate[fullDateString] = bookingSlots;
          console.log("Whole booking data::"+JSON.stringify(bookedByDoctor));
      }
      bookedByDoctor[id] = bookingByDate;
  }
}
module.exports = doctorDao;
