var CryptoJS = require("crypto-js");
var LeadsSettingsModel = require('./../../models/settings/Leads_Settings.model.js');
var ErrorManagement = require('./../../../handling/ErrorHandling.js');
var mongoose = require('mongoose');


// ************************************************** Lead Source *****************************************************
   // -------------------------------------------------- Lead Source Async Validate -----------------------------------------------
   exports.LeadSource_AsyncValidate = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

      if(!ReceivingData.Lead_Source || ReceivingData.Lead_Source === '' ) {
         res.status(400).send({Status: false, Message: "Lead Source can not be empty" });
      } else if (!ReceivingData.Company_Id || ReceivingData.Company_Id === ''  ) {
         res.status(400).send({Status: false, Message: "Company Details can not be empty" });
      } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
         res.status(400).send({Status: false, Message: "User Details can not be empty" });
      }else {
         LeadsSettingsModel.LeadSourceSchema.findOne({'Company_Id': ReceivingData.Company_Id, 'Lead_Source': { $regex : new RegExp("^" + ReceivingData.Lead_Source + "$", "i") }, 'If_Deleted': false }, {}, {}, function(err, result) {
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Lead Source Find Query Error', 'Leads_Settings.controller.js', err);
               res.status(417).send({status: false, Message: "Some error occurred while Find Lead Source!."});
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
// Lead Source Create -----------------------------------------------
      exports.Lead_Source_Create = function(req, res) {
         var CryptoBytes = CryptoJS.AES.decrypt( req.body.Info , 'SecretKeyIn@123' );
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
         
         if(!ReceivingData.Lead_Source || ReceivingData.Lead_Source === '' ) {
            res.status(400).send({Status: false, Message: "Lead Source can not be empty" });
         } else if (!ReceivingData.Company_Id || ReceivingData.Company_Id === ''  ) {
            res.status(400).send({Status: false, Message: "Company Details can not be empty" });
         } else if (!ReceivingData.Created_By || ReceivingData.Created_By === ''  ) {
            res.status(400).send({Status: false, Message: "Creator Details can not be empty" });
         }else {
            var Create_LeadSource = new LeadsSettingsModel.LeadSourceSchema({
               Lead_Source: ReceivingData.Lead_Source, 
               Company_Id: mongoose.Types.ObjectId(ReceivingData.Company_Id),
               Created_By: mongoose.Types.ObjectId(ReceivingData.Created_By),
               Last_Modified_By: mongoose.Types.ObjectId(ReceivingData.Created_By),
               Active_Status: true,
               If_Deleted: false
            });
            Create_LeadSource.save(function(err, result) { // Lead Source Save Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Lead Settings Lead Source Creation Query Error', 'Leads_Settings.controller.js');
                  res.status(417).send({Status: false, Message: "Some error occurred while creating the Lead Source!."});
               } else {
                  LeadsSettingsModel.LeadSourceSchema
                     .findOne({'_id': result._id})
                     .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
                     .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
                     .exec(function(err_1, result_1) { // Lead Source FindOne Query
                     if(err_1) {
                        ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Lead Settings Lead Source Find Query Error', 'Leads_Settings.controller.js', err_1);
                        res.status(417).send({status: false, Message: "Some error occurred while Find The Lead Source!."});
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

   // Lead Source List -----------------------------------------------
      exports.Lead_Source_List = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '' ) {
            res.status(400).send({Status: false, Message: "Lead Source Id can not be empty" });
         } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
            res.status(400).send({Status: false, Message: "User Details can not be empty" });
         }else {
            LeadsSettingsModel.LeadSourceSchema
               .find({'Company_Id': ReceivingData.Company_Id, 'If_Deleted': false }, {}, {sort: { updatedAt: -1 }})
               .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
               .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
               .exec(function(err, result) { // Lead Source FindOne Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'lead Settings Lead Source Find Query Error', 'Leads_Settings.controller.js', err);
                  res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Lead Source!."});
               } else {
                  var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
                  ReturnData = ReturnData.toString();
                  res.status(200).send({Status: true, Response: ReturnData });
               }
            });
         }
      };

   // Lead Source Simple List -----------------------------------------------
      exports.Lead_Source_SimpleList = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '' ) {
            res.status(400).send({Status: false, Message: "Company Details can not be empty" });
         } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
            res.status(400).send({Status: false, Message: "User Details can not be empty" });
         }else {
            LeadsSettingsModel.LeadSourceSchema.find({'Company_Id': ReceivingData.Company_Id, 'If_Deleted': false }, { Industry_Type : 1 }, {sort: { updatedAt: -1 }}, function(err, result) { // Lead Source FindOne Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Leads Lead SourceFind Query Error', 'Leads_Settings.controller.js', err);
                  res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Lead Source!."});
               } else {
                  var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
                  ReturnData = ReturnData.toString();
                  res.status(200).send({Status: true, Response: ReturnData });
               }
            });
         }
      };

   // Lead Source Update -----------------------------------------------
      exports.Lead_Source_Update = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Lead_Source_Id || ReceivingData.Lead_Source_Id === '' ) {
            res.status(400).send({Status: false, Message: "Lead Source Id can not be empty" });
         }else if(!ReceivingData.Lead_Source || ReceivingData.Lead_Source === '' ) {
            res.status(400).send({Status: false, Message: "Lead Source can not be empty" });
         } else if (!ReceivingData.Modified_By || ReceivingData.Modified_By === ''  ) {
            res.status(400).send({Status: false, Message: "Modified User Details can not be empty" });
         }else {
            LeadsSettingsModel.LeadSourceSchema.findOne({'_id': ReceivingData.Lead_Source_Id}, {}, {}, function(err, result) { // Lead Source FindOne Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Lead Settings Lead Source FindOne Query Error', 'Leads_Settings.controller.js', err);
                  res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Lead Source!."});
               } else {
                  if (result !== null) {
                     result.Lead_Source = ReceivingData.Lead_Source;
                     result.Last_Modified_By = mongoose.Types.ObjectId(ReceivingData.Modified_By);
                     result.save(function(err_1, result_1) { // Lead Source Update Query
                        if(err_1) {
                           ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Lead Settings Lead Source Update Query Error', 'Leads_Settings.controller.js');
                           res.status(417).send({Status: false, Error: err_1, Message: "Some error occurred while Update the Lead Source!."});
                        } else {
                           LeadsSettingsModel.LeadSourceSchema
                              .findOne({'_id': result_1._id})
                              .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
                              .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
                              .exec(function(err_2, result_2) { // Lead Source FindOne Query
                              if(err_2) {
                                 ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Lead Settings Lead Source Find Query Error', 'Leads_Settings.controller.js', err_2);
                                 res.status(417).send({status: false, Message: "Some error occurred while Find The Lead Source!."});
                              } else {
                                 var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result_2), 'SecretKeyOut@123');
                                    ReturnData = ReturnData.toString();
                                 res.status(200).send({Status: true, Response: ReturnData });
                              }
                           });
                        }
                     });
                  } else {
                     res.status(400).send({Status: false, Message: "Lead Source Id can not be valid!" });
                  }
               }
            });
         }
      };

   // Lead Source Delete -----------------------------------------------
      exports.Lead_Source_Delete = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Lead_Source_Id || ReceivingData.Lead_Source_Id === '' ) {
            res.status(400).send({Status: false, Message: "Lead Source Id can not be empty" });
         } else if (!ReceivingData.Modified_By || ReceivingData.Modified_By === ''  ) {
            res.status(400).send({Status: false, Message: "Modified User Details can not be empty" });
         }else {
            LeadsSettingsModel.LeadSourceSchema.findOne({'_id': ReceivingData.Lead_Source_Id}, {}, {}, function(err, result) { // Lead source FindOne Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Leads Lead source FindOne Query Error', 'Leads_Settings.controller.js', err);
                  res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Lead source!."});
               } else {
                  if (result !== null) {
                     result.If_Deleted = true;
                     result.Last_Modified_By = ReceivingData.Modified_By;
                     result.save(function(err_1, result_1) { // Lead Source Delete Query
                        if(err_1) {
                           ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Leads Lead source Delete Query Error', 'Leads_Settings.controller.js');
                           res.status(417).send({Status: false, Error: err_1, Message: "Some error occurred while Delete the Lead source!."});
                        } else {
                           res.status(200).send({Status: true, Message: 'Successfully Deleted' });
                        }
                     });
                  } else {
                     res.status(400).send({Status: false, Message: "Lead Source Id can not be valid!" });
                  }
               }
            });
         }
      };
