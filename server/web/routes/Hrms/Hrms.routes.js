module.exports = function(app){

   var Controller = require('../../controller/Hrms/Leaves.controller.js');

   // Leaves
   app.post('/API/Hrms/Leaves_Create', Controller.Leaves_Create);
   app.post('/API/Hrms/Leaves_List', Controller.Leaves_List);
   app.post('/API/Hrms/LeavesList_ForEmployee', Controller.LeavesList_ForEmployee);
   app.post('/API/Hrms/Leave_SendToApprove', Controller.Leave_SendToApprove);
   app.post('/API/Hrms/Leave_SendToModify', Controller.Leave_SendToModify);
   app.post('/API/Hrms/Leave_Rejected', Controller.Leave_Rejected);
   app.post('/API/Hrms/Leave_Approve', Controller.Leave_Approve);
   app.post('/API/Hrms/Leave_View', Controller.Leave_View);
   app.post('/API/Hrms/Leaves_Update', Controller.Leaves_Update);
   app.post('/API/Hrms/Leaves_Modify', Controller.Leaves_Modify);



}