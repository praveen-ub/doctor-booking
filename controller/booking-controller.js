
const request = require("request");
const routes = require("express").Router();


var bookingService = require("../service/booking-service.js");

routes.post("/", (req,res) =>{
    bookingService.book(req.body, function(response){
        res.send(response);
    });
});

routes.get("/",function(req,res){

    bookingService.getBookings(req, function(bookings){
        res.send(bookings);
    })
});
module.exports = routes;
