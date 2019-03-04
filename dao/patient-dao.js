
var nextPatientId = 1;

var patientList = [];


var patientDao = {

  getList: function(callback){

      return callback(patientList);

  },
  getPatient: function(id, callback){

      var patient;
      patientList.forEach(function(pat){
          if(id == pat.id){
             patient = pat;
          }
      });
      console.log("Going to return patient::"+patient.firstName);
      if(callback){
          callback(patient);
      }
  },
  addPatient: function(request, callback){

     var patient  = {};
     patient['firstName'] = request.firstName;
     patient['lastName'] = request.lastName;
     patient['id'] = nextPatientId;
     patientList.push(patient);
     console.log("List after adding");
     console.log(patientList);
     nextPatientId = nextPatientId+1;
     callback(patient);
  }
}
module.exports = patientDao;
