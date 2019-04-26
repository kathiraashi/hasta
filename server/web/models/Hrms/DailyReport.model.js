var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Daily Reports Schema
var DailyReportSchema = mongoose.Schema({
   Employee: { type : Schema.Types.ObjectId , ref : 'Employees'},
   Date: { type : Date , required : true},
   In_Time: { type : String , required : true},
   Out_Time: { type : String , required : true},
   Customer: { type : String , required : true},
   Machine: { type : String , required : true},
   Model: { type : String },
   Category: { type : String }, // AMC, BD, PMT, PROJECT
   Problem: { type : String },
   Work_Complete_Status: { type : String }, // Completed, Not Completed
   Report_Number: { type : String},
   Remarks: { type : String },
   Created_By : { type: Schema.Types.ObjectId, ref: 'User_Management', required : true },
   Last_Modified_By: { type: Schema.Types.ObjectId, ref: 'User_Management', required : true },
   Active_Status: { type : Boolean , required : true},
   If_Deleted: { type : Boolean , required : true }
   },
   { timestamps: true }
);
var VarDailyReport = mongoose.model('DailyReport', DailyReportSchema, 'Daily_Reports');

module.exports = {
   DailyReportSchema : VarDailyReport
}