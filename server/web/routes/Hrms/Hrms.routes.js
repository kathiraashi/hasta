module.exports = function(app){

   var Leaves_Controller = require('../../controller/Hrms/Leaves.controller.js');
   var Expenses_Controller = require('../../controller/Hrms/Expenses.controller.js');
   var DailyReport_Controller = require('../../controller/Hrms/DailyReport.controller');



   // Leaves
   app.post('/API/Hrms/LeaveDate_AsyncValidate', Leaves_Controller.LeaveDate_AsyncValidate);
   app.post('/API/Hrms/Leaves_Create', Leaves_Controller.Leaves_Create);
   app.post('/API/Hrms/Leaves_List', Leaves_Controller.Leaves_List);
   app.post('/API/Hrms/LeavesList_ForEmployee', Leaves_Controller.LeavesList_ForEmployee);
   app.post('/API/Hrms/Leave_SendToApprove', Leaves_Controller.Leave_SendToApprove);
   app.post('/API/Hrms/Leave_SendToModify', Leaves_Controller.Leave_SendToModify);
   app.post('/API/Hrms/Leave_Rejected', Leaves_Controller.Leave_Rejected);
   app.post('/API/Hrms/Leave_Approve', Leaves_Controller.Leave_Approve);
   app.post('/API/Hrms/Leave_View', Leaves_Controller.Leave_View);
   app.post('/API/Hrms/Leaves_Update', Leaves_Controller.Leaves_Update);
   app.post('/API/Hrms/Leaves_Modify', Leaves_Controller.Leaves_Modify);


   // Expenses
   app.post('/API/Hrms/Expenses_Create', Expenses_Controller.Expenses_Create);
   app.post('/API/Hrms/Expenses_List', Expenses_Controller.Expenses_List);
   app.post('/API/Hrms/ExpensesList_ForEmployee', Expenses_Controller.ExpensesList_ForEmployee);
   app.post('/API/Hrms/Expenses_SendToApprove', Expenses_Controller.Expenses_SendToApprove);
   app.post('/API/Hrms/Expenses_SendToModify', Expenses_Controller.Expenses_SendToModify);
   app.post('/API/Hrms/Expenses_Rejected', Expenses_Controller.Expenses_Rejected);
   app.post('/API/Hrms/Expenses_Approve', Expenses_Controller.Expenses_Approve);
   app.post('/API/Hrms/Expenses_Pay', Expenses_Controller.Expenses_Pay);
   app.post('/API/Hrms/Expenses_View', Expenses_Controller.Expenses_View);
   app.post('/API/Hrms/Expenses_Update', Expenses_Controller.Expenses_Update);
   app.post('/API/Hrms/Expenses_Modify', Expenses_Controller.Expenses_Modify);


   // DailyReport
   app.post('/API/Hrms/DailyReport_Create', DailyReport_Controller.DailyReport_Create);
   app.post('/API/Hrms/DailyReport_Update', DailyReport_Controller.DailyReport_Update);
   app.post('/API/Hrms/DailyReport_List', DailyReport_Controller.DailyReport_List);
   app.post('/API/Hrms/DailyReport_List_ForEmployee', DailyReport_Controller.DailyReport_List_ForEmployee);
   app.post('/API/Hrms/DailyReport_Delete', DailyReport_Controller.DailyReport_Delete);

}