var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Customers schema
   var CrmCustomersSchema = mongoose.Schema({
      CompanyName: { type : String , required : true},
      PhoneNumber: { type : String },
      EmailAddress: { type : String },
      Website: { type : String },
      NoOfEmployees: { type : String },
      CompanyType: { type : String },
      StateCode: { type : String },
      IndustryType: { type: Schema.Types.ObjectId, ref: 'IndustryType' },
      OwnershipType: { type: Schema.Types.ObjectId, ref: 'OwnershipType' },
      GSTNo: { type : String },
      Notes: { type : String },
      Image: { type : Object },
      BillingAddress: { Street: { type : String },
                        Area: { type : String },
                        ZipCode: { type : String },
                        Country: {  _id: { type: Schema.Types.ObjectId, ref: 'Global_Country' },
                                    Country_Name: { type : String } },
                        State: { _id: { type: Schema.Types.ObjectId, ref: 'Global_State' },
                                 State_Name: { type : String } },
                        City: {  _id: { type: Schema.Types.ObjectId, ref: 'Global_City' },
                                 City_Name: { type : String } } },
      SameAddresses: { type : Boolean },
      ShopFloorAddress: {  Street: { type : String },
                           Area: { type : String },
                           ZipCode: { type : String },
                           Country: {  _id: { type: Schema.Types.ObjectId, ref: 'Global_Country' },
                                       Country_Name: { type : String } },
                           State: { _id: { type: Schema.Types.ObjectId, ref: 'Global_State' },
                                    State_Name: { type : String } },
                           City: {  _id: { type: Schema.Types.ObjectId, ref: 'Global_City' },
                                    City_Name: { type : String } } },
      Created_By : { type: Schema.Types.ObjectId, ref: 'User_Management', required : true },
      Last_Modified_By: { type: Schema.Types.ObjectId, ref: 'User_Management', required : true },
      Active_Status: { type : Boolean , required : true},
      If_Deleted: { type : Boolean , required : true }
      },
      { timestamps : true }
   );
   var VarCrmCustomers = mongoose.model( 'CrmCustomers' ,CrmCustomersSchema, 'Crm_Customers');

   // Customers Contacts schema
   var CrmCustomerContactsSchema = mongoose.Schema({
      Customer: { type: Schema.Types.ObjectId, ref: 'CrmCustomers', required : true },
      ContactRole: { type: Schema.Types.ObjectId, ref: 'ContactRole' },
      Title: { type : String, required : true },
      Name: { type : String, required : true },
      Email: { type : String },
      Mobile: { type : String },
      JobPosition: { type : String },
      Created_By : { type: Schema.Types.ObjectId, ref: 'User_Management', required : true },
      Last_Modified_By: { type: Schema.Types.ObjectId, ref: 'User_Management', required : true },
      Active_Status: { type : Boolean , required : true},
      If_Deleted: { type : Boolean , required : true }
      },
      { timestamps : true }
   );
   var VarCrmCustomerContacts = mongoose.model( 'CrmCustomerContacts' ,CrmCustomerContactsSchema, 'Crm_Customer_Contacts');


// Machine schema
   var CrmMachinesSchema = mongoose.Schema({
      MachineName: { type : String, require : true},
      Customer: { type: Schema.Types.ObjectId, ref: 'CrmCustomers', required : true },
      MachineModel: { type : String },
      MachineMake: { type : String },
      MfgSerialNo: { type : String },
      MachineId: { type : String },
      MfgYear: { type : String },
      MachineType: { type: Schema.Types.ObjectId, ref: 'MachineType' },
      ControllerType: { type: Schema.Types.ObjectId, ref: 'ControllerType' },
      ControllerModelNo: { type : String },
      Maintenance_Parts: [ {type: Schema.Types.ObjectId, ref: 'MachineMaintenancePart'} ],
      Created_By : { type: Schema.Types.ObjectId, ref: 'User_Management', required : true },
      Last_Modified_By: { type: Schema.Types.ObjectId, ref: 'User_Management', required : true },
      Open_Ticket: { type : Boolean , required : true},
      Active_Status: { type : Boolean , required : true},
      If_Deleted: { type : Boolean , required : true }
      },
      { timestamps : true }
   );
   var VarCrmMachines = mongoose.model( 'CrmMachines' ,CrmMachinesSchema, 'Crm_Machines');


   // Machine Maintenance schema
   var CrmMachinesMaintenanceSchema = mongoose.Schema({
      Machine: { type : Schema.Types.ObjectId, ref: 'CrmMachines', require : true },
      MachineMaintenancePart: { type: Schema.Types.ObjectId, ref: 'MachineMaintenancePart', required : true },
      Status: { type : Boolean, required : true },
      MaintenanceDate: { type : Date, required : true },
      Description: { type : String },
      Updated_By: { type: String },
      If_Updated: { type : Boolean , required : true  },
      If_Deleted: { type : Boolean , required : true }
      },
      { timestamps : true }
   );
   var VarCrmMachinesMaintenance = mongoose.model( 'CrmMachinesMaintenance' ,CrmMachinesMaintenanceSchema, 'Crm_Machines_Maintenance');


   // Machine Schedule Activity schema
   var CrmMachinesScheduleActivitySchema = mongoose.Schema({
      Machine: { type : Schema.Types.ObjectId, ref: 'CrmMachines', require : true },
      Schedule_Activity: { type: Schema.Types.ObjectId, ref: 'MachineScheduleActivity', required : true },
      Schedule_Date: { type : Date, required : true },
      Description: { type : String},
      Activity_By: { type: String },
      Last_Activity_Id: { type : Schema.Types.ObjectId, ref: 'CrmMachinesScheduleActivity' },
      Active_Status: { type : Boolean , required : true },
      If_Deleted: { type : Boolean , required : true },
      Created_By : { type: Schema.Types.ObjectId, ref: 'User_Management', required : true },
      Last_Modified_By: { type: Schema.Types.ObjectId, ref: 'User_Management', required : true },
      },
      { timestamps : true }
   );
   var VarCrmMachinesScheduleActivity = mongoose.model( 'CrmMachinesScheduleActivity' ,CrmMachinesScheduleActivitySchema, 'Crm_Machines_Schedule');

   // Machine Idle Time Create
   var CrmMachinesIdleTimeSchema = mongoose.Schema({
      Machine: { type : Schema.Types.ObjectId, ref: 'CrmMachines', require : true },
      Idle_Date: { type : Date, required : true },
      Idle_Time: { type : String, required : true },
      Description: { type : String},
      Idle_CloseDate: { type : Date},
      Idle_CloseTime: { type : String},
      Active_Status: { type : Boolean , required : true },
      If_Deleted: { type : Boolean , required : true },
      Created_By : { type: Schema.Types.ObjectId, ref: 'User_Management', required : true },
      Last_Modified_By: { type: Schema.Types.ObjectId, ref: 'User_Management', required : true },
      },
      { timestamps : true }
   );
   var VarCrmMachinesIdleTime = mongoose.model( 'CrmMachinesIdleTime' ,CrmMachinesIdleTimeSchema, 'Crm_Machines_IdleTime');



// Ticket schema
   var CrmTicketsSchema = mongoose.Schema({
      Machine:  { type: Schema.Types.ObjectId, ref: 'CrmMachines', required : true },
      Customer: { type: Schema.Types.ObjectId, ref: 'CrmCustomers', required : true },
      TicketId: { type : String, required: true, unique: true, },
      NumberOfTicketId: { type : Number, required: true, },
      TicketOpenDate: { type : Date, required: true, },
      TicketOpenTime: { type : String, required: true },
      TicketCloseDate: { type : Date  },
      TicketCloseTime: { type : String },
      CurrentStatus: { type : Object, required: true },
      Issue: { type : String, required: true, },
      TicketType: { type: Schema.Types.ObjectId, ref: 'TicketType' },
      Created_By : { type: Schema.Types.ObjectId, ref: 'User_Management', required : true },
      Last_Modified_By: { type: Schema.Types.ObjectId, ref: 'User_Management', required : true },
      Active_Status: { type : Boolean , required : true},
      If_Deleted: { type : Boolean , required : true }
      },
      { timestamps : true }
   );
   var VarCrmTickets = mongoose.model( 'CrmTickets' ,CrmTicketsSchema, 'Crm_Tickets');



   // Ticket Activity schema
   var CrmTicketActivitiesSchema = mongoose.Schema({
      Machine:  { type: Schema.Types.ObjectId, ref: 'CrmMachines', required : true },
      Customer: { type: Schema.Types.ObjectId, ref: 'CrmCustomers', required : true },
      Ticket: { type: Schema.Types.ObjectId, ref: 'CrmTickets', required: true },
      Contact: { type: Schema.Types.ObjectId, ref: 'CrmCustomerContacts' },
      Employee: { type : String },
      StartDate: { type : Date, required: true },
      StartTime: { type : String, required: true  },
      EndDate: { type : Date },
      EndTime: { type : String },
      Status: { type : Object, required: true },
      Description: { type : String},
      Created_By : { type: Schema.Types.ObjectId, ref: 'User_Management', required : true },
      Last_Modified_By: { type: Schema.Types.ObjectId, ref: 'User_Management', required : true },
      Active_Status: { type : Boolean , required : true},
      If_Deleted: { type : Boolean , required : true }
      },
      { timestamps : true }
   );
   var VarCrmTicketActivities = mongoose.model( 'CrmTicketActivities' ,CrmTicketActivitiesSchema, 'CrmTicket_Activities');

      
module.exports = {
   CrmCustomersSchema : VarCrmCustomers,
   CrmMachinesSchema : VarCrmMachines,
   CrmTicketsSchema : VarCrmTickets,
   CrmCustomerContactsSchema : VarCrmCustomerContacts,
   CrmTicketActivitiesSchema : VarCrmTicketActivities,
   CrmMachinesMaintenanceSchema : VarCrmMachinesMaintenance,
   CrmMachinesScheduleActivitySchema: VarCrmMachinesScheduleActivity,
   CrmMachinesIdleTimeSchema: VarCrmMachinesIdleTime
};
