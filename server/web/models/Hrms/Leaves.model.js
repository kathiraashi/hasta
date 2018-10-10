var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Leaves Schema
var LeavesSchema = mongoose.Schema({
   Employee: { type : Schema.Types.ObjectId , ref : 'Employees'},
   Name: { type : Schema.Types.ObjectId , ref : 'LeaveType'},
   From_Date: { type : String , required : true},
   To_Date: { type : String , required : true},
   Purpose: { type : String},
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