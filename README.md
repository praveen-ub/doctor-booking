## doctor-booking
RESTFul API that exposes the functionality of a doctor appointment scheduling system. Users will be able to create doctors, patients, manage doctor's working hours and schedule bookings

Doctor's working hours are configured per week day, multiple time windows during the day can be specified. For ex: A doctor's working hours on Monday can be 8am-11pm and 1pm-4pm. Each booking slot is assumed to be of 1 hour duration. So in this case, there are 6 slots ie) 8am, 9am, 10am, 1pm, 2pm and 3pm

## Supported Features 
1. Create Doctors with working hours/days
2. Get List of doctors
2. Create Patients
3. Get list of patients
3. Get Doctor's working hours/days
4. Update Doctor's working hours/days
5. Get Doctor's availablity on a specific date
6. Create a booking
7. Get list of bookings

API Documentation published at https://documenter.getpostman.com/view/6550960/S11RKFG5

Published as an npm package, **npm i doctor-booking**
