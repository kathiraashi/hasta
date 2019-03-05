module.exports = function(app){

   var Controller = require('../../controller/Hr/Payroll.controller.js');

   // Payroll Master
      app.post('/API/Payroll/PayrollMaster_Create', Controller.PayrollMaster_Create);
      app.post('/API/Payroll/PayrollMaster_View', Controller.PayrollMaster_View);
      app.post('/API/Payroll/PayrollMaster_List', Controller.PayrollMaster_List);
      app.post('/API/Payroll/PayrollMaster_Update', Controller.PayrollMaster_Update);

      app.post('/API/Payroll/Payroll_Create', Controller.Payroll_Create);
      app.post('/API/Payroll/Payroll_List', Controller.Payroll_List);
      app.post('/API/Payroll/Payroll_View', Controller.Payroll_View);
};