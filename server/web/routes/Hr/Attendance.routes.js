module.exports = function(app){

   var Controller = require('../../controller/Hr/Attendance.controller.js');

   // Attendance
      app.post('/API/Attendance/AttendanceDate_AsyncValidate', Controller.AttendanceDate_AsyncValidate);
      app.post('/API/Attendance/WeekOff_AsyncValidate', Controller.WeekOff_AsyncValidate);
      app.post('/API/Attendance/Attendance_Create', Controller.Attendance_Create);
      app.post('/API/Attendance/Attendance_Log', Controller.Attendance_Log);
      app.post('/API/Attendance/Complete_Attendance_Log', Controller.Complete_Attendance_Log);
};