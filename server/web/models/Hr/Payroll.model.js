var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// PayrollMaster Schema
var Employee_PayrollMasterSchema = mongoose.Schema({
   Employee: { type : Schema.Types.ObjectId , ref : 'Employees'},
   PaidLeaves_inYear: { type : Number , required : true},
   PaidLeaves_perMonth: { type : String},
   // Pay
   Monthly_Salary:  { type : String , required : true},
   Basic_Pay: { type : String , required : true},
   HRA: { type : String , required : true},
   HRA_Type: { type : String , required : true},
   Conveyance: { type : String , required : true},
   Conveyance_Type: { type : String , required : true},
   Medical_Reimbursement: { type : String , required : true},
   Medical_Reimbursement_Type: { type : String , required : true},
   Food_Allowance: { type : String , required : true},
   Food_Allowance_Type: { type : String , required : true},
   Other_Allowance: { type : String , required : true},
   Other_Allowance_Type: { type : String , required : true},
   // Detection
   Professional_Tax: { type : String , required : true},
   Professional_Tax_Type: { type : String , required : true},
   Provident_Fund: { type : String , required : true},
   Provident_Fund_Type: { type : String , required : true},
   Employee_State_Insurance: { type : String , required : true},
   Employee_State_Insurance_Type: { type : String , required : true},
   Medical_Insurance: { type : String , required : true},
   Medical_Insurance_Type: { type : String , required : true},
   TDS: { type : String , required : true},
   TDS_Type: { type : String , required : true},

   Created_By: { type : Schema.Types.ObjectId , ref : 'User_Management'},
   Last_Modified_By: { type : Schema.Types.ObjectId , ref : 'User_Management'},
   Active_Status: { type : Boolean , required : true},
   If_Deleted: { type : Boolean , required : true }
   },
   { timestamps: true }
);
var VarEmployee_PayrollMaster = mongoose.model('Employee_PayrollMaster', Employee_PayrollMasterSchema, 'Employee_PayrollMaster');

module.exports = {
   Employee_PayrollMasterSchema : VarEmployee_PayrollMaster
}