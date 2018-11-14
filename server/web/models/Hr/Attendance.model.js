var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Attendance Schema
var Employee_AttendanceSchema = mongoose.Schema({
   Employee: { type : Schema.Types.ObjectId , ref : 'Employees'},
   Attendance_Date: { type : Date , required : true},
   Attendance: { type : String}, // Present, Week Off
   Created_By: { type : Schema.Types.ObjectId , ref : 'User_Management'},
   Active_Status: { type : Boolean , required : true},
   If_Deleted: { type : Boolean , required : true }
   },
   { timestamps: true }
);
var VarEmployee_Attendance = mongoose.model('Employee_Attendance', Employee_AttendanceSchema, 'Employee_Attendance');

module.exports = {
   Employee_AttendanceSchema : VarEmployee_Attendance
}