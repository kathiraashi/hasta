var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Leave Type schema
   var LeaveTypeSchema = mongoose.Schema({
      Name: { type : String , require : true},
      Leave_Type: { type : String , require : true},
      Created_By: { type : Schema.Types.ObjectId, ref: 'User_Management' , required : true },
      Last_Modified_By: { type : Schema.Types.ObjectId, ref: 'User_Management' , required : true },
      Active_Status: { type : Boolean , required : true},
      If_Deleted: { type : Boolean , required : true }
      },
      { timestamps : true }
   );
   var VarLeaveType = mongoose.model( 'LeaveType' ,LeaveTypeSchema, 'Hrms_Leave_Type');

   // Expenses Type Schema
   var ExpensesTypeSchema = mongoose.Schema({
      Expenses_Type: { type : String , required : true},
      Created_By : { type: Schema.Types.ObjectId, ref: 'User_Management', required : true },
      Last_Modified_By: { type: Schema.Types.ObjectId, ref: 'User_Management', required : true },
      Active_Status: { type : Boolean , required : true},
      If_Deleted: { type : Boolean , required : true }
      },
      { timestamps: true }
   );
   var VarExpensesType = mongoose.model('ExpensesType', ExpensesTypeSchema, 'Hrms_Expenses_Type');



module.exports = {
   LeaveTypeSchema : VarLeaveType,
   ExpensesTypeSchema : VarExpensesType,
}