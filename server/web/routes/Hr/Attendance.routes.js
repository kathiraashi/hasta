module.exports = function(app){

   var Controller = require('../../controller/Hr/Attendance.controller.js');

   // Attendance
      app.post('/API/Hr/EmployeeCode_Validate', Controller.EmployeeCode_Validate);
      app.post('/API/Hr/Attendance_Create', Controller.Attendance_Create);
      app.post('/API/Hr/Attendance_Update', Controller.Attendance_Update);
};