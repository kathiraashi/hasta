var CryptoJS = require("crypto-js");
var DailyReportsModel = require('./../../models/Hrms/DailyReport.model');
var ErrorManagement = require('./../../../handling/ErrorHandling.js');
var mongoose = require('mongoose');



exports.DailyReport_Create = function(req, res) {
   var CryptoBytes = CryptoJS.AES.decrypt( req.body.Info , 'SecretKeyIn@123' );
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
   
   if(!ReceivingData.Employee || ReceivingData.Employee === '' ) {
      res.status(400).send({Status: false, Message: "Employee can not be empty" });
   } else if (!ReceivingData.Date || ReceivingData.Date === ''  ) {
      res.status(400).send({Status: false, Message: "Date can not be empty" });
   } else if (!ReceivingData.Time_In || ReceivingData.Time_In === ''  ) {
      res.status(400).send({Status: false, Message: "In Time can not be empty" });
   } else if (!ReceivingData.Out_Time || ReceivingData.Out_Time === ''  ) {
      res.status(400).send({Status: false, Message: "Out Time can not be empty" });
   } else if (!ReceivingData.Customer || ReceivingData.Customer === ''  ) {
      res.status(400).send({Status: false, Message: "Customer Details can not be empty" });
   } else if (!ReceivingData.Machine || ReceivingData.Machine === ''  ) {
      res.status(400).send({Status: false, Message: "Machine Details can not be empty" });
   } else if (!ReceivingData.Created_By || ReceivingData.Created_By === ''  ) {
      res.status(400).send({Status: false, Message: "Creator Details can not be empty" });
   }else {
      var Create_DailyReport = new DailyReportsModel.DailyReportSchema({
         Employee: mongoose.Types.ObjectId(ReceivingData.Employee),
         Date: ReceivingData.Date,
         In_Time: ReceivingData.In_Time,
         Out_Time: ReceivingData.Out_Time,
         Customer: ReceivingData.Customer,
         Machine: ReceivingData.Machine,
         Model: ReceivingData.Model,
         Category: ReceivingData.Category,
         Problem: ReceivingData.Problem,
         Work_Complete_Status: ReceivingData.Work_Complete_Status,
         Report_Number: ReceivingData.Report_Number,
         Remarks: ReceivingData.Remarks,
         Created_By: mongoose.Types.ObjectId(ReceivingData.Created_By),
         Last_Modified_By: mongoose.Types.ObjectId(ReceivingData.Created_By),
         Active_Status: true,
         If_Deleted: false
      });
      Create_DailyReport.save(function(err, result) { // DailyReport Save Query
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'DailyReport Creation Query Error', 'DailyReport.controller.js', err);
            res.status(417).send({Status: false, Message: "Some error occurred while creating the DailyReport!."});
         } else {
            HrSettingsModel.DepartmentSchema
               .findOne({'_id': result._id})
               .populate({ path: 'Employee', select: ['EmployeeName'] })
               .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
               .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
               .exec(function(err_1, result_1) { // DailyReport FindOne Query
               if(err_1) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'DailyReport Find Query Error', 'DailyReport.controller.js', err_1);
                  res.status(417).send({status: false, Message: "Some error occurred while Find The DailyReport!."});
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


exports.DailyReport_Update = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.DailyReport_Id || ReceivingData.DailyReport_Id === '' ) {
      res.status(400).send({Status: false, Message: "DailyReport Id can not be empty" });
   }else if(!ReceivingData.Employee || ReceivingData.Employee === '' ) {
      res.status(400).send({Status: false, Message: "Employee can not be empty" });
   } else if (!ReceivingData.Date || ReceivingData.Date === ''  ) {
      res.status(400).send({Status: false, Message: "Date can not be empty" });
   } else if (!ReceivingData.Time_In || ReceivingData.Time_In === ''  ) {
      res.status(400).send({Status: false, Message: "In Time can not be empty" });
   } else if (!ReceivingData.Out_Time || ReceivingData.Out_Time === ''  ) {
      res.status(400).send({Status: false, Message: "Out Time can not be empty" });
   } else if (!ReceivingData.Customer || ReceivingData.Customer === ''  ) {
      res.status(400).send({Status: false, Message: "Customer Details can not be empty" });
   } else if (!ReceivingData.Machine || ReceivingData.Machine === ''  ) {
      res.status(400).send({Status: false, Message: "Machine Details can not be empty" });
   } else if (!ReceivingData.Modified_By || ReceivingData.Modified_By === ''  ) {
      res.status(400).send({Status: false, Message: "Modified User Details can not be empty" });
   }else {
      DailyReportsModel.DailyReportSchema.findOne({'_id': ReceivingData.DailyReport_Id}, {}, {}, function(err, result) { 
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'DailyReport FindOne Query Error', 'DailyReport.controller.js', err);
            res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The DailyReport!."});
         } else {
            if (result !== null) {
               result.Employee = ReceivingData.Employee;
               result.Date = ReceivingData.Date;
               result.In_Time = ReceivingData.In_Time;
               result.Out_Time = ReceivingData.Out_Time;
               result.Customer = ReceivingData.Customer;
               result.Machine = ReceivingData.Machine;
               result.Model = ReceivingData.Model;
               result.Category = ReceivingData.Category;
               result.Problem = ReceivingData.Problem;
               result.Work_Complete_Status = ReceivingData.Work_Complete_Status;
               result.Report_Number = ReceivingData.Report_Number;
               result.Remarks = ReceivingData.Remarks;
               result.Last_Modified_By = mongoose.Types.ObjectId(ReceivingData.Modified_By);
               result.save(function(err_1, result_1) {
                  if(err_1) {
                     ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'DailyReport Update Query Error', 'DailyReport.controller.js');
                     res.status(417).send({Status: false, Error: err_1, Message: "Some error occurred while Update the DailyReport!."});
                  } else {
                     DailyReportsModel.DailyReportSchema
                        .findOne({'_id': result_1._id})
                        .populate({ path: 'Employee', select: ['EmployeeName'] })
                        .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
                        .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
                        .exec(function(err_2, result_2) { // Industry Type FindOne Query
                        if(err_2) {
                           ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'DailyReport Find Query Error', 'DailyReport.controller.js', err_2);
                           res.status(417).send({status: false, Message: "Some error occurred while Find The DailyReport!."});
                        } else {
                           var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result_2), 'SecretKeyOut@123');
                              ReturnData = ReturnData.toString();
                           res.status(200).send({Status: true, Response: ReturnData });
                        }
                     });
                  }
               });
            } else {
               res.status(400).send({Status: false, Message: "DailyReport Id can not be valid!" });
            }
         }
      });
   }
};

exports.DailyReport_List = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   }else {
      DailyReportsModel.DailyReportSchema
      .find({ 'If_Deleted': false }, {}, {sort: { updatedAt: -1 }})
      .populate({ path: 'Employee', select: ['EmployeeName', 'EmployeeCode'] })
      .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
      .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
      .exec(function(err, result) {
      if(err) {
         ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'DailyReports Find Find Query Error', 'DailyReport.controller.js', err);
         res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The DailyReport!."});
      } else {
         var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
         ReturnData = ReturnData.toString();
         res.status(200).send({Status: true, Response: ReturnData });
      }
   });
   }
};


exports.DailyReport_List_ForEmployee = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   } else if(!ReceivingData.Employee || ReceivingData.Employee === '' ) {
      res.status(400).send({Status: false, Message: "Employee can not be empty" });
   }else {
      DailyReportsModel.DailyReportSchema
      .find({ 'If_Deleted': false, 'Employee': mongoose.Types.ObjectId(ReceivingData.Employee)  }, {}, {sort: { updatedAt: -1 }})
      .populate({ path: 'Employee', select: ['EmployeeName', 'EmployeeCode'] })
      .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
      .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
      .exec(function(err, result) {
      if(err) {
         ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'DailyReports Find Find Query Error', 'DailyReport.controller.js', err);
         res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The DailyReport!."});
      } else {
         var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
         ReturnData = ReturnData.toString();
         res.status(200).send({Status: true, Response: ReturnData });
      }
   });
   }
};


exports.DailyReport_Delete = function(req, res) { 
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.DailyReport_Id || ReceivingData.DailyReport_Id === '' ) {
      res.status(400).send({Status: false, Message: "DailyReport Id can not be empty" });
   } else if (!ReceivingData.Modified_By || ReceivingData.Modified_By === ''  ) {
      res.status(400).send({Status: false, Message: "Modified User Details can not be empty" });
   }else {
      DailyReportsModel.DailyReportSchema.findOne({'_id': ReceivingData.DailyReport_Id}, {}, {}, function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'DailyReport FindOne Query Error', 'DailyReport.controller.js', err);
            res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The DailyReport!."});
         } else {
            if (result !== null) {
               result.If_Deleted = true;
               result.Last_Modified_By = ReceivingData.Modified_By;
               result.save(function(err_1, result_1) { 
                  if(err_1) {
                     ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'DailyReport Delete Query Error', 'DailyReport.controller.js');
                     res.status(417).send({Status: false, Error: err_1, Message: "Some error occurred while Delete the DailyReport!."});
                  } else {
                     res.status(200).send({Status: true, Message: 'Successfully Deleted' });
                  }
               });
            } else {
               res.status(400).send({Status: false, Message: "DailyReport Id can not be valid!" });
            }
         }
      });
   }
};