var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

// Lead source schema
   var LeadSourceSchema = mongoose.Schema({
      Lead_Source: { type : String , require : true},
      Company_Id: { type : Schema.Types.ObjectId,ref: 'Company_Management' , required: true },
      Created_By: { type : Schema.Types.ObjectId, ref: 'User_Management' , required : true },
      Last_Modified_By: { type : Schema.Types.ObjectId, ref: 'User_Management' , required : true },
      Active_Status: { type : Boolean , required : true},
      If_Deleted: { type : Boolean , required : true }
      },
      { timestamps : true }
   );
   var VarLeadSource = mongoose.model( 'LeadSource' ,LeadSourceSchema, 'Leads_Lead_Source');

module.exports = {
   LeadSourceSchema : VarLeadSource
}