var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Employee schema
   var EmployeeSchema = mongoose.Schema({
      EmployeeName: { type : String , require : true},
      EmployeeCode: { type : String },
      Department: { type: Schema.Types.ObjectId, ref: 'Department' },
      JobTitle: { type : String },
      MobileNo: { type : String, require : true},
      JoiningDate: { type : String },
      DateOfBirth: { type : String },
      MaritalStatus: { type : String },
      Address: { type : String },
      Customers: [{ type: Schema.Types.ObjectId, ref: 'CrmCustomers' }],
      If_UserManage: { type : Boolean, required : true},
      Created_By : { type: Schema.Types.ObjectId, ref: 'User_Management', required : true },
      Last_Modified_By: { type: Schema.Types.ObjectId, ref: 'User_Management', required : true },
      Active_Status: { type : Boolean , required : true},
      If_Deleted: { type : Boolean , required : true }
      },
      { timestamps : true }
   );
   var VarEmployees = mongoose.model( 'Employees' ,EmployeeSchema, 'Employees');

   
module.exports = {
   EmployeeSchema : VarEmployees
}