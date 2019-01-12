var CryptoJS = require("crypto-js");
var HrPayrollModel = require('./../../models/Hr/Payroll.model.js');
var HrEmployeeModel = require('./../../models/Hr/Employee.model.js');
var ErrorManagement = require('./../../../handling/ErrorHandling.js');
var mongoose = require('mongoose');




//  Payroll Master Create-----------------------------------------------
exports.PayrollMaster_Create = function(req, res) {
   var CryptoBytes = CryptoJS.AES.decrypt( req.body.Info , 'SecretKeyIn@123' );
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
   
   if(!ReceivingData.Employee || ReceivingData.Employee === '' ) {
      res.status(400).send({Status: false, Message: "Employee can not be empty" });
   } else if (!ReceivingData.PaidLeaves_inYear || ReceivingData.PaidLeaves_inYear === ''  ) {
      res.status(400).send({Status: false, Message: "No.of Paid Leaves per Year can not be empty" });
   } else if (!ReceivingData.Created_By || ReceivingData.Created_By === ''  ) {
      res.status(400).send({Status: false, Message: "Creator Details can not be empty" });
   }else {
      var Create_PayrollMaster = new HrPayrollModel.Employee_PayrollMasterSchema({
         Employee: mongoose.Types.ObjectId(ReceivingData.Employee),
         PaidLeaves_inYear: ReceivingData.PaidLeaves_inYear,
         PaidLeaves_perMonth: ReceivingData.PaidLeaves_perMonth,
         Monthly_Salary: ReceivingData.Monthly_Salary,
         Basic_Pay: ReceivingData.Basic_Pay,
         HRA: ReceivingData.HRA,
         HRA_Type: ReceivingData.HRA_Type,
         Conveyance: ReceivingData.Conveyance,
         Conveyance_Type: ReceivingData.Conveyance_Type,
         Medical_Reimbursement: ReceivingData.Medical_Reimbursement,
         Medical_Reimbursement_Type: ReceivingData.Medical_Reimbursement_Type,
         Food_Allowance: ReceivingData.Food_Allowance,
         Food_Allowance_Type: ReceivingData.Food_Allowance_Type,
         Other_Allowance: ReceivingData.Other_Allowance,
         Other_Allowance_Type: ReceivingData.Other_Allowance_Type,
         Professional_Tax: ReceivingData.Professional_Tax,
         Professional_Tax_Type: ReceivingData.Professional_Tax_Type,
         Provident_Fund: ReceivingData.Provident_Fund,
         Provident_Fund_Type: ReceivingData.Provident_Fund_Type,
         Employee_State_Insurance: ReceivingData.Employee_State_Insurance,
         Employee_State_Insurance_Type: ReceivingData.Employee_State_Insurance_Type,
         Medical_Insurance: ReceivingData.Medical_Insurance,
         Medical_Insurance_Type: ReceivingData.Medical_Insurance_Type,
         TDS: ReceivingData.TDS,
         TDS_Type: ReceivingData.TDS_Type,
         Created_By: mongoose.Types.ObjectId(ReceivingData.Created_By),
         Last_Modified_By: mongoose.Types.ObjectId(ReceivingData.Created_By),
         Active_Status: true,
         If_Deleted: false
      });
      Create_PayrollMaster.save(function(err, result) {
         if(err) {
            console.log(err);
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'HR Payroll Master Creation Query Error', 'Payroll.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while creating the HR Payroll Master !."});
         } else {
            HrEmployeeModel.EmployeeSchema.update({_id: result.Employee}, { $set: { If_PayrollMaster: true }}).exec();
            HrPayrollModel.Employee_PayrollMasterSchema
               .findOne({'_id': result._id})
               .populate({ path: 'Employee', select: ['EmployeeName'] })
               .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
               .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
               .exec(function(err_1, result_1) { // Holiday FindOne Query
               if(err_1) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'HR Payroll Master Find Query Error', 'Payroll.controller.js', err_1);
                  res.status(417).send({status: false, Message: "Some error occurred while Find The HR Payroll Master!."});
               } else {
                  var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result_1), 'SecretKeyOut@123');
                     ReturnData = ReturnData.toString();
                  res.status(200).send({Status: true, Response: ReturnData });
               }
            });
         }
      });
   }
};


// Payroll Master List -----------------------------------------------
exports.PayrollMaster_List = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   }else {
      HrPayrollModel.Employee_PayrollMasterSchema
      .find({ 'If_Deleted': false }, {}, {sort: { updatedAt: -1 }})
      .populate({ path: 'Employee', select: ['EmployeeName'] })
      .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
      .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
      .exec(function(err, result) { // Holiday FindOne Query
      if(err) {
         ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'HR Payroll Master Find Find Query Error', 'Payroll.controller.js', err);
         res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The HR Payroll Master Find!."});
      } else {
         var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
         ReturnData = ReturnData.toString();
         res.status(200).send({Status: true, Response: ReturnData });
      }
   });
   }
};


// Payroll Master Update -----------------------------------------------
exports. PayrollMaster_Update = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));


   if(!ReceivingData. PayrollMaster_Id || ReceivingData.PayrollMaster_Id === '' ) {
      res.status(400).send({Status: false, Message: "Payroll Master Details can not be empty" });   
   } else if (!ReceivingData.PaidLeaves_inYear || ReceivingData.PaidLeaves_inYear === ''  ) {
      res.status(400).send({Status: false, Message: "No.of Paid Leaves per Year can not be empty" });
   } else if (!ReceivingData.Modified_By || ReceivingData.Modified_By === ''  ) {
      res.status(400).send({Status: false, Message: "Modified User Details can not be empty" });
   }else {
      HrPayrollModel.Employee_PayrollMasterSchema.findOne({'_id': mongoose.Types.ObjectId(ReceivingData.PayrollMaster_Id)}, {}, {}, function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'HR Payroll Master FindOne Query Error', 'Payroll.controller.js', err);
            res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Payroll Master!."});
         } else {
            if (result !== null) {
               result.PaidLeaves_inYear = ReceivingData.PaidLeaves_inYear;
               result.PaidLeaves_perMonth = ReceivingData.PaidLeaves_perMonth;
               result.Monthly_Salary = ReceivingData.Monthly_Salary;
               result.Basic_Pay = ReceivingData.Basic_Pay;
               result.HRA = ReceivingData.HRA;
               result.HRA_Type = ReceivingData.HRA_Type;
               result.Conveyance = ReceivingData.Conveyance;
               result.Conveyance_Type = ReceivingData.Conveyance_Type;
               result.Medical_Reimbursement = ReceivingData.Medical_Reimbursement;
               result.Medical_Reimbursement_Type = ReceivingData.Medical_Reimbursement_Type;
               result.Food_Allowance = ReceivingData.Food_Allowance;
               result.Food_Allowance_Type = ReceivingData.Food_Allowance_Type;
               result.Other_Allowance = ReceivingData.Other_Allowance;
               result.Other_Allowance_Type = ReceivingData.Other_Allowance_Type;
               result.Professional_Tax = ReceivingData.Professional_Tax;
               result.Professional_Tax_Type = ReceivingData.Professional_Tax_Type;
               result.Provident_Fund = ReceivingData.Provident_Fund;
               result.Provident_Fund_Type = ReceivingData.Provident_Fund_Type;
               result.Employee_State_Insurance = ReceivingData.Employee_State_Insurance;
               result.Employee_State_Insurance_Type = ReceivingData.Employee_State_Insurance_Type;
               result.Medical_Insurance = ReceivingData.Medical_Insurance;
               result.Medical_Insurance_Type = ReceivingData.Medical_Insurance_Type;
               result.TDS = ReceivingData.TDS;
               result.TDS_Type = ReceivingData.TDS_Type;
               result.Last_Modified_By = mongoose.Types.ObjectId(ReceivingData.Modified_By);
               result.save(function(err_1, result_1) {
                  if(err_1) {
                     ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'HR Payroll Master Update Query Error', 'Payroll.controller.js');
                     res.status(417).send({Status: false, Error: err_1, Message: "Some error occurred while Update the HR Payroll Master !."});
                  } else {
                     HrPayrollModel.Employee_PayrollMasterSchema
                        .findOne({'_id': result_1._id})
                        .populate({ path: 'Employee', select: ['EmployeeName'] })
                        .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
                        .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
                        .exec(function(err_2, result_2) { //  Holiday  FindOne Query
                        if(err_2) {
                           ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'HR Payroll Master Find Query Error', 'Payroll.controller.js', err_2);
                           res.status(417).send({status: false, Message: "Some error occurred while Find The HR Payroll Master!."});
                        } else {
                           var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result_2), 'SecretKeyOut@123');
                              ReturnData = ReturnData.toString();
                           res.status(200).send({Status: true, Response: ReturnData });
                        }
                     });
                  }
               });
            } else {
               res.status(400).send({Status: false, Message: "Holiday Id can not be valid!" });
            }
         }
      });
   }
};
