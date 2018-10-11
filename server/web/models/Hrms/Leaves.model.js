var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Leaves Schema
var LeavesSchema = mongoose.Schema({
   Employee: { type : Schema.Types.ObjectId , ref : 'Employees'},
   Leave_Type: { type : Schema.Types.ObjectId , ref : 'LeaveType'},
   From_Date: { type : Date , required : true},
   To_Date: { type : Date , required : true},
   Purpose: { type : String , required : true},
   Current_Status: { type : String , required : true},
   Stage: { type : String , required : true}, // Stage_1: Draft, Stage_2: Send To Approve, Stage_3: Send To Modify, Stage_4: Send To Again Approve, Stage_5: Approved, Stage_6: Rejected;
   Created_By : { type: Schema.Types.ObjectId, ref: 'User_Management', required : true },
   Last_Modified_By: { type: Schema.Types.ObjectId, ref: 'User_Management', required : true },
   Active_Status: { type : Boolean , required : true},
   If_Deleted: { type : Boolean , required : true }
   },
   { timestamps: true }
);
var VarLeaves = mongoose.model('Leaves', LeavesSchema, 'Leaves_List');

module.exports = {
   LeavesSchema : VarLeaves
}