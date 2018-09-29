var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Department schema
   var DepartmentSchema = mongoose.Schema({
      Department: { type : String , require : true},
      Created_By : { type: Schema.Types.ObjectId, ref: 'User_Management', required : true },
      Last_Modified_By: { type: Schema.Types.ObjectId, ref: 'User_Management', required : true },
      Active_Status: { type : Boolean , required : true},
      If_Deleted: { type : Boolean , required : true }
      },
      { timestamps : true }
   );
   var VarDepartment = mongoose.model( 'Department' ,DepartmentSchema, 'HR_Department');
// Earnings schema
   var EarningsSchema = mongoose.Schema({
      Earnings_Type: { type : String , require : true},
      Created_By: { type : Schema.Types.ObjectId, ref: 'User_Management' , required : true },
      Last_Modified_By: { type : Schema.Types.ObjectId, ref: 'User_Management' , required : true },
      Active_Status: { type : Boolean , required : true},
      If_Deleted: { type : Boolean , required : true }
      },
      { timestamps : true }
   );
   var VarEarnings = mongoose.model( 'Earnings' ,EarningsSchema, 'HR_Earnings');
// Detections schema
   var DetectionsSchema = mongoose.Schema({
      Detections_Type: { type : String , require : true},
      Created_By: { type : Schema.Types.ObjectId, ref: 'User_Management' , required : true },
      Last_Modified_By: { type : Schema.Types.ObjectId, ref: 'User_Management' , required : true },
      Active_Status: { type : Boolean , required : true},
      If_Deleted: { type : Boolean , required : true }
      },
      { timestamps : true }
   );
   var VarDetections = mongoose.model( 'Detections' ,DetectionsSchema, 'HR_Detections');

   module.exports = {
      DepartmentSchema : VarDepartment,
      EarningsSchema : VarEarnings,
      DetectionsSchema : VarDetections
      
   }