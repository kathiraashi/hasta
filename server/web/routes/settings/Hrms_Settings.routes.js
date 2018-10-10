module.exports = function(app){

   var Controller = require('../../controller/settings/Hrms_Settings.controller.js');

   // Leave Type
      app.post('/API/Hrms_Settings/LeaveType_AsyncValidate', Controller.LeaveType_AsyncValidate);
      app.post('/API/Hrms_Settings/Leave_Type_Create', Controller.Leave_Type_Create);
      app.post('/API/Hrms_Settings/Leave_Type_List', Controller.Leave_Type_List);
      app.post('/API/Hrms_Settings/Leave_Type_SimpleList', Controller.Leave_Type_SimpleList);
      app.post('/API/Hrms_Settings/Leave_Type_Update', Controller.Leave_Type_Update);
      app.post('/API/Hrms_Settings/Leave_Type_Delete', Controller.Leave_Type_Delete);
}