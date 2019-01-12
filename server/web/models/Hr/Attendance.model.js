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


// Attendance Report Schema
var AttendanceReportSchema = mongoose.Schema({
   Employee: { type : Schema.Types.ObjectId , ref : 'Employees' },
   From_Date: { type : Date , required : true },
   To_Date: { type : Date , required : true },
   MonthYear: { type : Date , required : true },
   No_Of_Days: { type : String , required : true },
   No_Of_WorkingDays: { type : String , required : true },
   No_Of_Present: { type : String , required : true },
   No_Of_Absent: { type : String , required : true },
   No_Of_WeekOff: { type : String , required : true },
   No_Of_Holiday: { type : String , required : true },
   Created_By: { type : Schema.Types.ObjectId , ref : 'User_Management' },
   Active_Status: { type : Boolean , required : true },
   If_Deleted: { type : Boolean , required : true }
   },
   { timestamps: true }
);
var VarAttendance_Report = mongoose.model('Attendance_Report', AttendanceReportSchema, 'Attendance_Report');


module.exports = {
   Employee_AttendanceSchema : VarEmployee_Attendance,
   AttendanceReportSchema : VarAttendance_Report
}