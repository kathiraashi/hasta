var CryptoJS = require("crypto-js");
var HrmsSettingsModel = require('./../../models/settings/Hrms_Settings.model.js');
var ErrorManagement = require('./../../../handling/ErrorHandling.js');
var mongoose = require('mongoose');

// ************************************************** Leave Type *****************************************************
   // -------------------------------------------------- Leave Type Async Validate -----------------------------------------------
   exports.LeaveType_AsyncValidate = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

      if(!ReceivingData.Name || ReceivingData.Name === '' ) {
         res.status(400).send({Status: false, Message: "Name can not be empty" });
      } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
         res.status(400).send({Status: false, Message: "User Details can not be empty" });
      }else {
         HrmsSettingsModel.LeaveTypeSchema.findOne({'Name': { $regex : new RegExp("^" + ReceivingData.Name + "$", "i") }, 'If_Deleted': false }, {}, {}, function(err, result) {
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Leave Type Find Query Error', 'Hrms_Settings.controller.js', err);
               res.status(417).send({status: false, Message: "Some error occurred while Find Leave Type!."});
            } else {
               if ( result !== null) {
                  res.status(200).send({Status: true, Available: false });
               } else {
                  res.status(200).send({Status: true, Available: true });
               }
            }
         });
      }
   };         
// Leave Type Create -----------------------------------------------
      exports.Leave_Type_Create = function(req, res) {
         var CryptoBytes = CryptoJS.AES.decrypt( req.body.Info , 'SecretKeyIn@123' );
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
         
         if(!ReceivingData.Name || ReceivingData.Name === '' ) {
            res.status(400).send({Status: false, Message: "Name can not be empty" });
         } else if(!ReceivingData.Leave_Type || ReceivingData.Leave_Type === '' ) {
            res.status(400).send({Status: false, Message: "Leave Type can not be empty" });
         } else if (!ReceivingData.Created_By || ReceivingData.Created_By === ''  ) {
            res.status(400).send({Status: false, Message: "Creator Details can not be empty" });
         }else {
            var Create_LeaveType = new HrmsSettingsModel.LeaveTypeSchema({
               Name: ReceivingData.Name,
               Leave_Type: ReceivingData.Leave_Type,  
               Created_By: mongoose.Types.ObjectId(ReceivingData.Created_By),
               Last_Modified_By: mongoose.Types.ObjectId(ReceivingData.Created_By),
               Active_Status: true,
               If_Deleted: false
            });
            Create_LeaveType.save(function(err, result) { // Leave Type Save Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'HRMS Settings Leave Type Creation Query Error', 'Hrms_Settings.controller.js');
                  res.status(417).send({Status: false, Message: "Some error occurred while creating the Leave Type!."});
               } else {
                  HrmsSettingsModel.LeaveTypeSchema
                     .findOne({'_id': result._id})
                     .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
                     .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
                     .exec(function(err_1, result_1) { // Leave Type FindOne Query
                     if(err_1) {
                        ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'HRMS Settings LLeave Type Find Query Error', 'Hrms_Settings.controller.js', err_1);
                        res.status(417).send({status: false, Message: "Some error occurred while Find The Leave Type!."});
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

   // Leave Type List -----------------------------------------------
      exports.Leave_Type_List = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

          if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
            res.status(400).send({Status: false, Message: "User Details can not be empty" });
         }else {
            HrmsSettingsModel.LeaveTypeSchema
            .find({'If_Deleted': false }, {}, {sort: { updatedAt: -1 }})
            .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
            .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
            .exec(function(err, result) { // Leave Type FindOne Query
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Hrms Settings Leave Type Find Query Error', 'Hrms_Settings.controller.js', err);
               res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Leave Type!."});
            } else {
               var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
               ReturnData = ReturnData.toString();
               res.status(200).send({Status: true, Response: ReturnData });
            }
         });
         }
      };

   // Leave Type Simple List -----------------------------------------------
      exports.Leave_Type_SimpleList = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

          if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
            res.status(400).send({Status: false, Message: "User Details can not be empty" });
         }else {
            HrmsSettingsModel.LeaveTypeSchema.find({'If_Deleted': false }, { Name : 1 }, {sort: { updatedAt: -1 }}, function(err, result) { // Leave Type FindOne Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Hrms Leave Type Find Query Error', 'Hrms_Settings.controller.js', err);
                  res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Leave Type!."});
               } else {
                  var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
                  ReturnData = ReturnData.toString();
                  res.status(200).send({Status: true, Response: ReturnData });
               }
            });
         }
      };

   // Leave Type Update -----------------------------------------------
      exports.Leave_Type_Update = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Leave_Type_Id || ReceivingData.Leave_Type_Id === '' ) {
            res.status(400).send({Status: false, Message: "Leave Type Id can not be empty" });
         }else if(!ReceivingData.Leave_Type || ReceivingData.Leave_Type === '' ) {
            res.status(400).send({Status: false, Message: "Leave Type can not be empty" });
         } else if(!ReceivingData.Name || ReceivingData.Name === '' ) {
            res.status(400).send({Status: false, Message: "Name can not be empty" });
         } else if (!ReceivingData.Modified_By || ReceivingData.Modified_By === ''  ) {
            res.status(400).send({Status: false, Message: "Modified User Details can not be empty" });
         }else {
            HrmsSettingsModel.LeaveTypeSchema.findOne({'_id': ReceivingData.Leave_Type_Id}, {}, {}, function(err, result) { // Leave Type FindOne Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'HRMS  Leave Type FindOne Query Error', 'Hrms_Settings.controller.js', err);
                  res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Leave Type!."});
               } else {
                  if (result !== null) {
                     result.Leave_Type = ReceivingData.Leave_Type;
                     result.Name = ReceivingData.Name;
                     result.Last_Modified_By = mongoose.Types.ObjectId(ReceivingData.Modified_By);
                     result.save(function(err_1, result_1) { // Leave Type  Update Query
                        if(err_1) {
                           ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Hrms Settings Leave Type  Update Query Error', 'Hrms_Settings.controller.js');
                           res.status(417).send({Status: false, Error: err_1, Message: "Some error occurred while Update the Leave Type !."});
                        } else {
                           HrmsSettingsModel.LeaveTypeSchema
                              .findOne({'_id': result_1._id})
                              .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
                              .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
                              .exec(function(err_2, result_2) { // Leave Type  FindOne Query
                              if(err_2) {
                                 ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Hrms Settings Leave Type  Find Query Error', 'Hrms_Settings.controller.js', err_2);
                                 res.status(417).send({status: false, Message: "Some error occurred while Find The Leave Type !."});
                              } else {
                                 var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result_2), 'SecretKeyOut@123');
                                    ReturnData = ReturnData.toString();
                                 res.status(200).send({Status: true, Response: ReturnData });
                              }
                           });
                        }
                     });
                  } else {
                     res.status(400).send({Status: false, Message: "Leave Type Id can not be valid!" });
                  }
               }
            });
         }
      };

   // Leave Type Delete -----------------------------------------------
      exports.Leave_Type_Delete = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Leave_Type_Id || ReceivingData.Leave_Type_Id === '' ) {
            res.status(400).send({Status: false, Message: "Leave Type Id can not be empty" });
         } else if (!ReceivingData.Modified_By || ReceivingData.Modified_By === ''  ) {
            res.status(400).send({Status: false, Message: "Modified User Details can not be empty" });
         }else {
            HrmsSettingsModel.LeaveTypeSchema.findOne({'_id': ReceivingData.Leave_Type_Id}, {}, {}, function(err, result) { // Leave Type FindOne Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'HRMS Leave Type FindOne Query Error', 'Hrms_Settings.controller.js', err);
                  res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Leave Type!."});
               } else {
                  if (result !== null) {
                     result.If_Deleted = true;
                     result.Last_Modified_By = ReceivingData.Modified_By;
                     result.save(function(err_1, result_1) { // Leave Type Delete Query
                        if(err_1) {
                           ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'HRMS Leave Type Delete Query Error', 'Hrms_Settings.controller.js');
                           res.status(417).send({Status: false, Error: err_1, Message: "Some error occurred while Delete the Leave Type!."});
                        } else {
                           res.status(200).send({Status: true, Message: 'Successfully Deleted' });
                        }
                     });
                  } else {
                     res.status(400).send({Status: false, Message: "Leave Type Id can not be valid!" });
                  }
               }
            });
         }
      };
