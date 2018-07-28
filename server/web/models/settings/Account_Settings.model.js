var mongoose = require('mongoose');

// Bank Schema
   var BankSchema = mongoose.Schema({
      Bank_Name: { type: String , require: true },
      Account_Name: { type: String , require: true},
      Account_No: { type: String , require: true},
      IFSC_Code: { type: String , require: true},
      Address: { type: String },
      Company_Id: { type : String , required : true },
      Created_By : { type : String, required : true },
      Last_Modified_By: { type : String , required : true },
      Active_Status: { type : Boolean , required : true},
      If_Deleted: { type : Boolean , required : true },
      },
      { timestamps : true}
   );
   var VarBank = mongoose.model('Bank', BankSchema, 'Account_Bank');


// Income Type schema
   var IncomeTypeSchema = mongoose.Schema({
      Income_Type: { type : String , require : true},
      Company_Id: { type : String , required : true },
      Created_By : { type : String, required : true },
      Last_Modified_By: { type : String , required : true },
      Active_Status: { type : Boolean , required : true},
      If_Deleted: { type : Boolean , required : true }
      },
      { timestamps : true }
   );
   var VarIncomeType = mongoose.model( 'IncomeType' ,IncomeTypeSchema, 'Account_Income_Type');

// Payment Terms schema
      var PaymentTermsSchema = mongoose.Schema({
         Payment_Terms: { type : String , require : true},
         Company_Id: { type : String , required : true },
         Created_By : { type : String, required : true },
         Last_Modified_By: { type : String , required : true },
         Active_Status: { type : Boolean , required : true},
         If_Deleted: { type : Boolean , required : true }
         },
         { timestamps : true }
      );
      var VarPaymentTerms = mongoose.model( 'PaymentTerms' ,PaymentTermsSchema, 'Account_Payment_Terms');

module.exports = {
   IncomeTypeSchema : VarIncomeType,
   PaymentTermsSchema : VarPaymentTerms,
   BankSchema:VarBank
}