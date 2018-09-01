module.exports = function(app) {

   var Controller = require('../../controller/settings/CRM_Settings.controller.js');

   // Industry Type -----------------------------------------------
      app.post('/API/CRM_Settings/IndustryType_AsyncValidate', Controller.IndustryType_AsyncValidate);
      app.post('/API/CRM_Settings/Industry_Type_Create', Controller.Industry_Type_Create);
      app.post('/API/CRM_Settings/Industry_Type_List', Controller.Industry_Type_List);
      app.post('/API/CRM_Settings/Industry_Type_SimpleList', Controller.Industry_Type_SimpleList);
      app.post('/API/CRM_Settings/Industry_Type_Update', Controller.Industry_Type_Update);
      app.post('/API/CRM_Settings/Industry_Type_Delete', Controller.Industry_Type_Delete);

      
   // Ownership Type -----------------------------------------------
      app.post('/API/CRM_Settings/OwnershipType_AsyncValidate', Controller.OwnershipType_AsyncValidate);
      app.post('/API/CRM_Settings/Ownership_Type_Create', Controller.Ownership_Type_Create);
      app.post('/API/CRM_Settings/Ownership_Type_List', Controller.Ownership_Type_List);
      app.post('/API/CRM_Settings/Ownership_Type_SimpleList', Controller.Ownership_Type_SimpleList);
      app.post('/API/CRM_Settings/Ownership_Type_Update', Controller.Ownership_Type_Update);
      app.post('/API/CRM_Settings/Ownership_Type_Delete', Controller.Ownership_Type_Delete);

   // Activity Type --------------------------------------------------
      app.post('/API/CRM_Settings/ActivityType_AsyncValidate', Controller.ActivityType_AsyncValidate);
      app.post('/API/CRM_Settings/Activity_Type_Create', Controller.Activity_Type_Create); 
      app.post('/API/CRM_Settings/Activity_Type_List', Controller.Activity_Type_List); 
      app.post('/API/CRM_Settings/Activity_Type_SimpleList', Controller.Activity_Type_SimpleList); 
      app.post('/API/CRM_Settings/Activity_Type_Update', Controller.Activity_Type_Update); 
      app.post('/API/CRM_Settings/Activity_Type_Delete', Controller.Activity_Type_Delete);      
      
   // Activity Status --------------------------------------------------
      app.post('/API/CRM_Settings/ActivityStatus_AsyncValidate', Controller.ActivityStatus_AsyncValidate);
      app.post('/API/CRM_Settings/Activity_Status_Create', Controller.Activity_Status_Create); 
      app.post('/API/CRM_Settings/Activity_Status_List', Controller.Activity_Status_List); 
      app.post('/API/CRM_Settings/Activity_Status_SimpleList', Controller.Activity_Status_SimpleList); 
      app.post('/API/CRM_Settings/Activity_Status_Update', Controller.Activity_Status_Update); 
      app.post('/API/CRM_Settings/Activity_Status_Delete', Controller.Activity_Status_Delete); 

   // Activity Priority --------------------------------------------------
      app.post('/API/CRM_Settings/ActivityPriority_AsyncValidate', Controller.ActivityPriority_AsyncValidate);
      app.post('/API/CRM_Settings/Activity_Priority_Create', Controller.Activity_Priority_Create); 
      app.post('/API/CRM_Settings/Activity_Priority_List', Controller.Activity_Priority_List); 
      app.post('/API/CRM_Settings/Activity_Priority_SimpleList', Controller.Activity_Priority_SimpleList); 
      app.post('/API/CRM_Settings/Activity_Priority_Update', Controller.Activity_Priority_Update); 
      app.post('/API/CRM_Settings/Activity_Priority_Delete', Controller.Activity_Priority_Delete); 

   // Contact role --------------------------------------------------
      app.post('/API/CRM_Settings/ContactRole_AsyncValidate', Controller.ContactRole_AsyncValidate);
      app.post('/API/CRM_Settings/Contact_Role_Create', Controller.Contact_Role_Create); 
      app.post('/API/CRM_Settings/Contact_Role_List', Controller.Contact_Role_List); 
      app.post('/API/CRM_Settings/Contact_Role_SimpleList', Controller.Contact_Role_SimpleList); 
      app.post('/API/CRM_Settings/Contact_Role_Update', Controller.Contact_Role_Update); 
      app.post('/API/CRM_Settings/Contact_Role_Delete', Controller.Contact_Role_Delete); 

   // Machine Type -----------------------------------------------
      app.post('/API/CRM_Settings/MachineType_AsyncValidate', Controller.MachineType_AsyncValidate);
      app.post('/API/CRM_Settings/Machine_Type_Create', Controller.Machine_Type_Create);
      app.post('/API/CRM_Settings/Machine_Type_List', Controller.Machine_Type_List);
      app.post('/API/CRM_Settings/Machine_Type_SimpleList', Controller.Machine_Type_SimpleList);
      app.post('/API/CRM_Settings/Machine_Type_Update', Controller.Machine_Type_Update);
      app.post('/API/CRM_Settings/Machine_Type_Delete', Controller.Machine_Type_Delete);
      
   // Controller Type -----------------------------------------------
      app.post('/API/CRM_Settings/ControllerType_AsyncValidate', Controller.ControllerType_AsyncValidate);
      app.post('/API/CRM_Settings/Controller_Type_Create', Controller.Controller_Type_Create);
      app.post('/API/CRM_Settings/Controller_Type_List', Controller.Controller_Type_List);
      app.post('/API/CRM_Settings/Controller_Type_SimpleList', Controller.Controller_Type_SimpleList);
      app.post('/API/CRM_Settings/Controller_Type_Update', Controller.Controller_Type_Update);
      app.post('/API/CRM_Settings/Controller_Type_Delete', Controller.Controller_Type_Delete);

   // Machine Maintenance Part -----------------------------------------------
      app.post('/API/CRM_Settings/MachineMaintenancePart_AsyncValidate', Controller.Machine_MaintenancePart_AsyncValidate);
      app.post('/API/CRM_Settings/MachineMaintenancePart_Create', Controller.Machine_MaintenancePart_Create);
      app.post('/API/CRM_Settings/MachineMaintenancePart_List', Controller.Machine_MaintenancePart_List);
      app.post('/API/CRM_Settings/MachineMaintenancePart_SimpleList', Controller.Machine_MaintenancePart_SimpleList);
      app.post('/API/CRM_Settings/MachineMaintenancePart_Update', Controller.Machine_MaintenancePart_Update);
      app.post('/API/CRM_Settings/MachineMaintenancePart_Delete', Controller.Machine_MaintenancePart_Delete);

   // Machine Schedule Activity -----------------------------------------------
      app.post('/API/CRM_Settings/MachineScheduleActivity_AsyncValidate', Controller.Machine_ScheduleActivity_AsyncValidate);
      app.post('/API/CRM_Settings/MachineScheduleActivity_Create', Controller.Machine_ScheduleActivity_Create);
      app.post('/API/CRM_Settings/MachineScheduleActivity_List', Controller.Machine_ScheduleActivity_List);
      app.post('/API/CRM_Settings/MachineScheduleActivity_SimpleList', Controller.Machine_ScheduleActivity_SimpleList);
      app.post('/API/CRM_Settings/MachineScheduleActivity_Update', Controller.Machine_ScheduleActivity_Update);
      app.post('/API/CRM_Settings/MachineScheduleActivity_Delete', Controller.Machine_ScheduleActivity_Delete);

   // Ticket Type -----------------------------------------------
      app.post('/API/CRM_Settings/TicketType_AsyncValidate', Controller.TicketType_AsyncValidate);
      app.post('/API/CRM_Settings/Ticket_Type_Create', Controller.Ticket_Type_Create);
      app.post('/API/CRM_Settings/Ticket_Type_List', Controller.Ticket_Type_List);
      app.post('/API/CRM_Settings/Ticket_Type_SimpleList', Controller.Ticket_Type_SimpleList);
      app.post('/API/CRM_Settings/Ticket_Type_Update', Controller.Ticket_Type_Update);
      app.post('/API/CRM_Settings/Ticket_Type_Delete', Controller.Ticket_Type_Delete);

};