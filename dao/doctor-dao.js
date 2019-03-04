
var nextDoctorId = 1;

var doctorList = [];



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
          if(workingHoursToUpdate.sunday){

          }
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
  }
}
module.exports = doctorDao;
