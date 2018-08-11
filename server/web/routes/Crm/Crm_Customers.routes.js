module.exports = function(app) {

   var Controller = require('./../../controller/Crm/Crm_Customers.controller.js');

   app.post('/API/CrmCustomers/CrmCustomers_Create', Controller.CrmCustomers_Create);
   app.post('/API/CrmCustomers/CrmCustomers_List', Controller.CrmCustomers_List);
   app.post('/API/CrmCustomers/CrmCustomers_SimpleList', Controller.CrmCustomers_SimpleList);
   app.post('/API/CrmCustomers/CrmCustomers_View', Controller.CrmCustomers_View);
 

   app.post('/API/CrmCustomers/CrmCustomerContact_Create', Controller.CrmCustomerContact_Create);
   app.post('/API/CrmCustomers/CrmCustomerContact_List', Controller.CrmCustomerContact_List);
   app.post('/API/CrmCustomers/CrmCustomerContact_SimpleList', Controller.CrmCustomerContact_SimpleList);
   app.post('/API/CrmCustomers/CrmCustomerContact_View', Controller.CrmCustomerContact_View);


   app.post('/API/CrmCustomers/CrmMachines_Create', Controller.CrmMachines_Create);
   app.post('/API/CrmCustomers/CrmMachines_List', Controller.CrmMachines_List);
   app.post('/API/CrmCustomers/CrmCustomerBasedMachines_List', Controller.CrmCustomerBasedMachines_List);
   app.post('/API/CrmCustomers/CrmMachines_SimpleList', Controller.CrmMachines_SimpleList);
   app.post('/API/CrmCustomers/CrmCustomerBasedMachines_SimpleList', Controller.CrmCustomerBasedMachines_SimpleList);
   app.post('/API/CrmCustomers/CrmMachine_View', Controller.CrmMachine_View);


   app.post('/API/CrmCustomers/CrmTicketId_Search', Controller.CrmTicketId_Search);
   app.post('/API/CrmCustomers/CrmTickets_Create', Controller.CrmTickets_Create);
   app.post('/API/CrmCustomers/CrmTickets_List', Controller.CrmTickets_List);
   app.post('/API/CrmCustomers/CrmCustomerBasedTickets_List', Controller.CrmCustomerBasedTickets_List);
   app.post('/API/CrmCustomers/CrmMachineBasedTickets_List', Controller.CrmMachineBasedTickets_List);
   app.post('/API/CrmCustomers/CrmTickets_View', Controller.CrmTickets_View);


   app.post('/API/CrmCustomers/CrmTicketActivities_Create', Controller.CrmTicketActivities_Create);
   app.post('/API/CrmCustomers/CrmTicketActivities_List', Controller.CrmTicketActivities_List);

   app.post('/API/CrmCustomers/CrmTicketActivities_Time', Controller.CrmTicketActivities_Time);
   app.post('/API/CrmCustomers/CrmMachineMapData', Controller.CrmMachineMapData);


};
