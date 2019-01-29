module.exports = function(app) {

   var Controller = require('./../../controller/Crm/Crm_Customers.controller.js');

   app.post('/API/CrmCustomers/CrmCustomers_Create', Controller.CrmCustomers_Create);
   app.post('/API/CrmCustomers/CrmCustomers_List', Controller.CrmCustomers_List);
   app.post('/API/CrmCustomers/CrmCustomers_SimpleList', Controller.CrmCustomers_SimpleList);
   app.post('/API/CrmCustomers/CrmCustomers_View', Controller.CrmCustomers_View);
   app.post('/API/CrmCustomers/CrmCustomers_Update', Controller.CrmCustomers_Update);

 
   app.post('/API/CrmCustomers/CrmCustomersList_ForEmployee', Controller.CrmCustomersList_ForEmployee);
   app.post('/API/CrmCustomers/CrmCustomers_SimpleList_ForEmployee', Controller.CrmCustomers_SimpleList_ForEmployee);



   app.post('/API/CrmCustomers/CrmCustomerContact_Create', Controller.CrmCustomerContact_Create);
   app.post('/API/CrmCustomers/CrmCustomerContact_List', Controller.CrmCustomerContact_List);
   app.post('/API/CrmCustomers/CrmCustomerContact_SimpleList', Controller.CrmCustomerContact_SimpleList);
   app.post('/API/CrmCustomers/CrmCustomerContact_View', Controller.CrmCustomerContact_View);
   app.post('/API/CrmCustomers/CrmCustomerContact_Update', Controller.CrmCustomerContact_Update);
   app.post('/API/CrmCustomers/CrmCustomerContact_Delete', Controller.CrmCustomerContact_Delete);




   app.post('/API/CrmCustomers/CrmMachines_Create', Controller.CrmMachines_Create);
   app.post('/API/CrmCustomers/CrmMachines_List', Controller.CrmMachines_List);
   app.post('/API/CrmCustomers/CrmCustomerBasedMachines_List', Controller.CrmCustomerBasedMachines_List);
   app.post('/API/CrmCustomers/CrmMachines_SimpleList', Controller.CrmMachines_SimpleList);
   app.post('/API/CrmCustomers/CrmCustomerBasedMachines_SimpleList', Controller.CrmCustomerBasedMachines_SimpleList);
   app.post('/API/CrmCustomers/CrmMachine_View', Controller.CrmMachine_View);

   app.post('/API/CrmCustomers/CrmMachinesList_ForEmployee', Controller.CrmMachinesList_ForEmployee);
   app.post('/API/CrmCustomers/CrmMachines_SimpleList_ForEmployee', Controller.CrmMachines_SimpleList_ForEmployee);


   app.post('/API/CrmCustomers/CrmMachine_MaintenanceSchedule_Today', Controller.CrmMachine_MaintenanceSchedule_Today);
   app.post('/API/CrmCustomers/CrmMachine_MaintenanceSchedule_UpdateToday', Controller.CrmMachine_MaintenanceSchedule_UpdateToday);
   
   app.post('/API/CrmCustomers/ScheduleActivity_AsyncValidate', Controller.ScheduleActivity_AsyncValidate);
   app.post('/API/CrmCustomers/CrmMachine_ScheduleActivity_Create', Controller.CrmMachine_ScheduleActivity_Create);
   app.post('/API/CrmCustomers/CrmMachine_ScheduleActivity_List', Controller.CrmMachine_ScheduleActivity_List);
   app.post('/API/CrmCustomers/CrmMachine_ScheduleActivity_Update', Controller.CrmMachine_ScheduleActivity_Update);
   app.post('/API/CrmCustomers/CrmMachine_ScheduleActivity_ReSchedule', Controller.CrmMachine_ScheduleActivity_ReSchedule);
   app.post('/API/CrmCustomers/CrmMachine_ScheduleActivity_Delete', Controller.CrmMachine_ScheduleActivity_Delete);


   app.post('/API/CrmCustomers/CrmMachine_WorkingHours_Create', Controller.CrmMachine_WorkingHours_Create);
   app.post('/API/CrmCustomers/CrmMachine_WorkingHours_List', Controller.CrmMachine_WorkingHours_List);
   app.post('/API/CrmCustomers/CrmMachine_WorkingHours_Update', Controller.CrmMachine_WorkingHours_Update);
   app.post('/API/CrmCustomers/CrmMachinesList_ForWorking', Controller.CrmMachinesList_ForWorking);
   app.post('/API/CrmCustomers/CrmMachine_WorkingUpdate', Controller.CrmMachine_WorkingUpdate);


   app.post('/API/CrmCustomers/CrmTickets_Create', Controller.CrmTickets_Create);
   app.post('/API/CrmCustomers/CrmTickets_IdleCheck', Controller.CrmTickets_IdleCheck);
   app.post('/API/CrmCustomers/CrmTickets_List', Controller.CrmTickets_List);
   app.post('/API/CrmCustomers/CrmCustomerBasedTickets_List', Controller.CrmCustomerBasedTickets_List);
   app.post('/API/CrmCustomers/CrmMachineBasedTickets_List', Controller.CrmMachineBasedTickets_List);
   app.post('/API/CrmCustomers/CrmTickets_View', Controller.CrmTickets_View);

   app.post('/API/CrmCustomers/CrmTicketsList_ForEmployee', Controller.CrmTicketsList_ForEmployee);


   app.post('/API/CrmCustomers/CrmTicketActivities_Create', Controller.CrmTicketActivities_Create);
   app.post('/API/CrmCustomers/CustomerBased_Employees', Controller.CustomerBased_Employees);
   app.post('/API/CrmCustomers/CrmTicketActivities_List', Controller.CrmTicketActivities_List);



   app.post('/API/CrmCustomers/CrmCustomerBased_ActivitiesList', Controller.CrmCustomerBased_ActivitiesList);



   app.post('/API/CrmCustomers/CrmCustomerBasedMachine_ChartData', Controller.CrmCustomerBasedMachine_ChartData);
   app.post('/API/CrmCustomers/CrmSingleMachine_ChartData', Controller.CrmSingleMachine_ChartData);
   app.post('/API/CrmCustomers/CrmCustomerBasedMachinesMonthly_ChartData', Controller.CrmCustomerBasedMachinesMonthly_ChartData);

};
