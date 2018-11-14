var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// PayrollMaster Schema
var Employee_PayrollMasterSchema = mongoose.Schema({
   Employee: { type : Schema.Types.ObjectId , ref : 'Employees'},
   PaidLeaves_inYear: { type : Number , required : true},
   PaidLeaves_perMonth: { type : String},
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