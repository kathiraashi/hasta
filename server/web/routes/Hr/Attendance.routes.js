module.exports = function(app){

   var Controller = require('../../controller/Hr/Attendance.controller.js');

   // Attendance
      app.post('/API/Attendance/AttendanceDate_AsyncValidate', Controller.AttendanceDate_AsyncValidate);
      app.post('/API/Attendance/WeekOff_AsyncValidate', Controller.WeekOff_AsyncValidate);
      app.post('/API/Attendance/Attendance_Create', Controller.Attendance_Create);
      app.post('/API/Attendance/Attendance_Approve', Controller.Attendance_Approve);
      app.post('/API/Attendance/Attendance_Reject', Controller.Attendance_Reject);
      app.post('/API/Attendance/Attendance_Log', Controller.Attendance_Log);
      app.post('/API/Attendance/Complete_Attendance_Log', Controller.Complete_Attendance_Log);
      app.post('/API/Attendance/Complete_Attendance_Pending_Log', Controller.Complete_Attendance_Pending_Log);


   // Attendance Report
      app.post('/API/Attendance/Attendance_Report_Validate', Controller.Attendance_Report_Validate);
      app.post('/API/Attendance/Attendance_Report_Create', Controller.Attendance_Report_Create);
      app.post('/API/Attendance/Attendance_Report_List', Controller.Attendance_Report_List);
      app.post('/API/Attendance/Attendance_Report_View', Controller.Attendance_Report_View);
      app.post('/API/Attendance/Attendance_Report_Delete', Controller.Attendance_Report_Delete);


};