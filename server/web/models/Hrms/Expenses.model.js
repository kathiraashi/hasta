var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Leaves Schema
var ExpensesSchema = mongoose.Schema({
   Employee: { type : Schema.Types.ObjectId , ref : 'Employees'},
   Expenses_Type: { type : Schema.Types.ObjectId , ref : 'ExpensesType'},
   Applied_Date: { type : Date , required : true},
   Required_Date: { type : Date},
   Description: { type : String , required : true},
   Amount: { type : String , required : true},
   Current_Status: { type : String , required : true},
   Stage: { type : String , required : true}, // Stage_1: Draft, Stage_2: Send To Approve, Stage_3: Send To Modify, Stage_4: Send To Again Approve, Stage_5: Approved, Stage_6: Rejected;
   Created_By : { type: Schema.Types.ObjectId, ref: 'User_Management', required : true },
   Last_Modified_By: { type: Schema.Types.ObjectId, ref: 'User_Management', required : true },
   Active_Status: { type : Boolean , required : true},
   If_Deleted: { type : Boolean , required : true }
   },
   { timestamps: true }
);
var VarExpenses = mongoose.model('Expenses', ExpensesSchema, 'Expenses_List');

module.exports = {
   ExpensesSchema : VarExpenses
}