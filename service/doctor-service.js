
var doctorDao = require('../dao/doctor-dao.js');

var doctorService = {

    getList: function(callback){

        doctorDao.getList(function(doctorList){
            callback(doctorList);
        });
    },
    getDoctor:function(id, callback){

      doctorDao.getDoctor(id,function(doctor){
          callback(doctor);
      });
    },
    getWorkingHours:function(id,callback){
      doctorDao.getWorkingHours(id,function(hours){
          callback(hours);
      });
    },
    addDoctor: function(request, callback){

        doctorDao.addDoctor(request, function(doctor){
            callback(doctor);
        });
    },
    updateDoctor: function(id, request, callback){

        doctorDao.updateDoctor(id, request, function(doctor){
            callback(doctor);
        });
    }
    // bookDoctor: function(){
    //
    // }
}

module.exports = doctorService;
