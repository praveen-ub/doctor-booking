
var patientDao = require('../dao/patient-dao.js');

var patientService = {

    getList: function(callback){

        patientDao.getList(function(patientList){
            callback(patientList);
        });
    },
    addPatient: function(request, callback){

        patientDao.addPatient(request, function(){
            callback("Success");
        });
    }
}

module.exports = patientService;
