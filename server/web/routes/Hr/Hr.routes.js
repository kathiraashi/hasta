module.exports = function(app){

   var Controller = require('../../controller/Hr/Employee.controller.js');

   // Employee
      app.post('/API/Hr/MobileNo_AsyncValidate', Controller.MobileNo_AsyncValidate);
      app.post('/API/Hr/EmployeeCode_AsyncValidate', Controller.EmployeeCode_AsyncValidate);
      app.post('/API/Hr/Employee_Create', Controller.Employee_Create);
      app.post('/API/Hr/Employee_List', Controller.Employee_List);
      app.post('/API/Hr/Employee_View', Controller.Employee_View);
      app.post('/API/Hr/Employee_Deactivate', Controller.Employee_Deactivate);
      app.post('/API/Hr/Employee_Activate', Controller.Employee_Activate);
      app.post('/API/Hr/Employee_Update', Controller.Employee_Update);
      app.post('/API/Hr/Employee_SimpleList', Controller.Employee_SimpleList);
      app.post('/API/Hr/EmployeeList_WithoutUserManage', Controller.EmployeeList_WithoutUserManage);
      app.post('/API/Hr/EmployeeList_WithoutPayrollMaster', Controller.EmployeeList_WithoutPayrollMaster);
};
