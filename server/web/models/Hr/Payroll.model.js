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


// Payroll Schema
var PayrollSchema = mongoose.Schema({
   Employee: { type : Schema.Types.ObjectId , ref : 'Employees'},
   Attendance_Report: { type : Schema.Types.ObjectId , ref : 'Attendance_Report'},
   Month: { type : Date, required : true},
   Payable_Days: { type : String},
   UnPayable_Days: { type : String},

   Basic_Pay: { type : String , required : true},
   HRA: { type : String , required : true},
   Conveyance: { type : String , required : true},
   Medical_Reimbursement: { type : String , required : true},
   Food_Allowance: { type : String , required : true},
   Other_Allowance: { type : String , required : true},

   Professional_Tax: { type : String , required : true},
   Provident_Fund: { type : String , required : true},
   Employee_State_Insurance: { type : String , required : true},
   Medical_Insurance: { type : String , required : true},
   TDS: { type : String , required : true},

   More_Earnings: [{
      Earnings: { type : String , required : true},
      Amount: { type : String , required : true},
   }],

   More_Detections: [{
      Detections: { type : String , required : true},
      Amount: { type : String , required : true},
   }],

   Total_Earning: { type : String , required : true},
   Total_Detection: { type : String , required : true},
   Total_Salary: { type : String , required : true},

   Created_By: { type : Schema.Types.ObjectId , ref : 'User_Management'},
   Last_Modified_By: { type : Schema.Types.ObjectId , ref : 'User_Management'},
   Active_Status: { type : Boolean , required : true},
   If_Deleted: { type : Boolean , required : true }
   },
   { timestamps: true }
);

var VarEmployee_PayrollMaster = mongoose.model('Employee_PayrollMaster', Employee_PayrollMasterSchema, 'Employee_PayrollMaster');
var VarPayroll = mongoose.model('Payroll', PayrollSchema, 'Payroll');

module.exports = {
   Employee_PayrollMasterSchema : VarEmployee_PayrollMaster,
   Payroll : VarPayroll
};