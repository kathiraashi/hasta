var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Industry Type Schema
   var IndustryTypeSchema = mongoose.Schema({
      Industry_Type: { type : String , required : true},
      Company_Id: { type: Schema.Types.ObjectId, ref: 'Company_Management', required : true },
      Created_By : { type: Schema.Types.ObjectId, ref: 'User_Management', required : true },
      Last_Modified_By: { type: Schema.Types.ObjectId, ref: 'User_Management', required : true },
      Active_Status: { type : Boolean , required : true},
      If_Deleted: { type : Boolean , required : true }
      },
      { timestamps: true }
   );
   var VarIndustryType = mongoose.model('IndustryType', IndustryTypeSchema, 'CRM_Industry_Type');


// Ownership Type Schema
   var OwnershipTypeSchema = mongoose.Schema({
      Ownership_Type: { type : String , required : true},
      Company_Id: { type: Schema.Types.ObjectId, ref: 'Company_Management', required : true },
      Created_By : { type: Schema.Types.ObjectId, ref: 'User_Management', required : true },
      Last_Modified_By: { type: Schema.Types.ObjectId, ref: 'User_Management', required : true },
      Active_Status: { type : Boolean , required : true},
      If_Deleted: { type : Boolean , required : true }
      },
      { timestamps: true }
   );
   var VarOwnershipType = mongoose.model('OwnershipType', OwnershipTypeSchema, 'CRM_Ownership_Type');

// Activity Type
   var ActivityTypeSchema = mongoose.Schema({
      Activity_Type: { type : String , required : true},
      Company_Id: { type : Schema.Types.ObjectId,ref: 'Company_Management' , required: true },
      Created_By: { type : Schema.Types.ObjectId, ref: 'User_Management' , required : true },
      Last_Modified_By: { type : Schema.Types.ObjectId, ref: 'User_Management' , required : true },
      Active_Status: { type : Boolean , required : true },
      If_Deleted: { type : Boolean , required : true },
      },
      { timestamps: true }
   );
   var VarActivityType = mongoose.model( 'ActivityType', ActivityTypeSchema, 'CRM_Activity_Type');
   
   
// Activity Status
   var ActivityStatusSchema = mongoose.Schema({
      Activity_Status: { type : String , required : true},
      Company_Id: { type : Schema.Types.ObjectId, ref: 'Company_Management', required : true },
      Created_By: { type : Schema.Types.ObjectId, ref: 'User_Management' , required : true },
      Last_Modified_By: { type : Schema.Types.ObjectId, ref: 'User_Management' , required : true },
      Active_Status: { type : Boolean , required : true },
      If_Deleted: { type : Boolean , required : true },
      },
      { timestamps: true }
   );
   var VarActivityStatus = mongoose.model( 'ActivityStatus', ActivityStatusSchema, 'CRM_Activity_Status');


// Activity Priority
   var ActivityPrioritySchema = mongoose.Schema({
      Activity_Priority: { type : String , required : true},
      Company_Id: { type : Schema.Types.ObjectId, ref: 'Company_Management', required : true },
      Created_By: { type : Schema.Types.ObjectId, ref: 'User_Management' , required : true },
      Last_Modified_By: { type : Schema.Types.ObjectId, ref: 'User_Management' , required : true },
      Active_Status: { type : Boolean , required : true },
      If_Deleted: { type : Boolean , required : true },
      },
      { timestamps: true }
   );
   var VarActivityPriority = mongoose.model( 'ActivityPriority', ActivityPrioritySchema, 'CRM_Activity_Priority');


// Contact Role
   var ContactRoleSchema = mongoose.Schema({
      Contact_Role: { type : String , require : true },
      Company_Id: { type : Schema.Types.ObjectId, ref: 'Company_Management', required : true },
      Created_By: { type : Schema.Types.ObjectId, ref: 'User_Management' , required : true },
      Last_Modified_By: { type : Schema.Types.ObjectId, ref: 'User_Management' , required : true },
      Active_Status: { type : Boolean , require : true },
      If_Deleted: { type : Boolean , require : true },
      },
      { timestamps: true }
   );
   var VarContactRole = mongoose.model( 'ContactRole', ContactRoleSchema, 'CRM_Contact_Role');


// Machine Type Schema
   var MachineTypeSchema = mongoose.Schema({
      Machine_Type: { type : String , required : true},
      Company_Id: { type: Schema.Types.ObjectId, ref: 'Company_Management', required : true },
      Created_By : { type: Schema.Types.ObjectId, ref: 'User_Management', required : true },
      Last_Modified_By: { type: Schema.Types.ObjectId, ref: 'User_Management', required : true },
      Active_Status: { type : Boolean , required : true},
      If_Deleted: { type : Boolean , required : true }
      },
      { timestamps: true }
   );
   var VarMachineType = mongoose.model('MachineType', MachineTypeSchema, 'CRM_Machine_Type');


// Controller Type Schema
   var ControllerTypeSchema = mongoose.Schema({
      Controller_Type: { type : String , required : true},
      Company_Id: { type: Schema.Types.ObjectId, ref: 'Company_Management', required : true },
      Created_By : { type: Schema.Types.ObjectId, ref: 'User_Management', required : true },
      Last_Modified_By: { type: Schema.Types.ObjectId, ref: 'User_Management', required : true },
      Active_Status: { type : Boolean , required : true},
      If_Deleted: { type : Boolean , required : true }
      },
      { timestamps: true }
   );
   var VarControllerType = mongoose.model('ControllerType', ControllerTypeSchema, 'CRM_Controller_Type');

// Ticket Type Schema
   var TicketTypeSchema = mongoose.Schema({
      Ticket_Type: { type : String , required : true},
      Company_Id: { type: Schema.Types.ObjectId, ref: 'Company_Management', required : true },
      Created_By : { type: Schema.Types.ObjectId, ref: 'User_Management', required : true },
      Last_Modified_By: { type: Schema.Types.ObjectId, ref: 'User_Management', required : true },
      Active_Status: { type : Boolean , required : true},
      If_Deleted: { type : Boolean , required : true }
      },
      { timestamps: true }
   );
   var VarTicketType = mongoose.model('TicketType', TicketTypeSchema, 'CRM_Ticket_Type');



   
module.exports = {
   IndustryTypeSchema : VarIndustryType,
   OwnershipTypeSchema : VarOwnershipType,
   ActivityTypeSchema : VarActivityType,
   ActivityStatusSchema : VarActivityStatus,
   ActivityPrioritySchema : VarActivityPriority,
   ContactRoleSchema : VarContactRole,
   MachineTypeSchema : VarMachineType,
   ControllerTypeSchema : VarControllerType,
   TicketTypeSchema : VarTicketType
};