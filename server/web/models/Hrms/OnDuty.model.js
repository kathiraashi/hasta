var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// OnDuty Schema
var OnDutySchema = mongoose.Schema({
   Employee: { type : Schema.Types.ObjectId , ref : 'Employees'},
   From_Date: { type : String , required : true},
   To_Date: { type : String , required : true},
   From_Time: { type : String , required : true},
   To_Time: { type : String , required : true},
   Purpose: { type : String},
   Created_By : { type: Schema.Types.ObjectId, ref: 'User_Management', required : true },
   Last_Modified_By: { type: Schema.Types.ObjectId, ref: 'User_Management', required : true },
   Active_Status: { type : Boolean , required : true},
   If_Deleted: { type : Boolean , required : true }
   },
   { timestamps: true }
);
var VarOnDuty = mongoose.model('OnDuty', OnDutySchema, 'OnDuty_List');

module.exports = {
   OnDutySchema : VarOnDuty
}