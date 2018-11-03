var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Attendance Schema
var AttendanceSchema = mongoose.Schema({
   Employee: { type : Schema.Types.ObjectId , ref : 'Employees'},
   Attendance_InDate: { type : Date , required : true},
   Attendance_InTime: { type : String , required : true},
   Attendance_OutDate: { type : Date},
   Attendance_OutTime: { type : String},
   Current_Status: { type : String , required : true},
   Active_Status: { type : Boolean , required : true},
   If_Deleted: { type : Boolean , required : true }
   },
   { timestamps: true }
);
var VarAttendance = mongoose.model('Attendance', AttendanceSchema, 'Attendance_List');

module.exports = {
   AttendanceSchema : VarAttendance
}