var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Employee schema
   var EmployeeSchema = mongoose.Schema({
      EmployeeName: { type : String , require : true},
      EmployeeCode: { type : String , require : true},
      Department: { type: Schema.Types.ObjectId, ref: 'Department' },
      Designation: { type: Schema.Types.ObjectId, ref: 'Designation' },
      DateOfJoining: { type : String, require : true},
      EmployeeRole: { type : String },
      Working_Location: { type : String },
      Customers: [{ type: Schema.Types.ObjectId, ref: 'CrmCustomers' }],
      EmployeeFatherName: { type : String },
      DateOfBirth: { type : String },
      BloodGroup: { type : String },
      MaritalStatus: { type : String , require : true},
      Personal_MobileNo: { type : String, require : true },
      Official_MobileNo: { type : String },
      Emergency_MobileNo: { type : String, require : true  },
      Personal_Email: { type : String },
      Official_Email: { type : String },
      Aadhar_No: { type : String },
      AadharDocument: { type : Object},
      PanCard_No: { type : String },
      PanDocument: { type : Object},
      DrivingLicense_No: { type : String },
      DrivingDocument: { type : Object},
      Permanent_Address: { type : String },
      Temporary_Address: { type : String },
      Education_Qualification: { type : String },
      PF_AccountNo: { type : String },
      ESI_AccountNo: { type : String },
      Bank_Name: { type : String },
      Bank_AccountNo: { type : String },
      Bank_AccountType: { type : String },
      Bank_IFSCCode: { type : String },
      Bank_Address: { type : String },
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