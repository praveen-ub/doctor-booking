
var nextPatientId = 1;

var patientList = [];


var patientDao = {

  getList: function(callback){

      return callback(patientList);

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
