var CryptoJS = require("crypto-js");
var CRMSettingsModel = require('./../../models/settings/CRM_Settings.model.js');
var ErrorManagement = require('./../../../handling/ErrorHandling.js');
var mongoose = require('mongoose');




// ************************************************** Industry Type *****************************************************
   // Industry Type Async Validate -----------------------------------------------
      exports.IndustryType_AsyncValidate = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Industry_Type || ReceivingData.Industry_Type === '' ) {
            res.status(400).send({Status: false, Message: "Industry Type can not be empty" });
         } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
            res.status(400).send({Status: false, Message: "User Details can not be empty" });
         }else {
            CRMSettingsModel.IndustryTypeSchema.findOne({'Industry_Type': { $regex : new RegExp("^" + ReceivingData.Industry_Type + "$", "i") }, 'If_Deleted': false }, {}, {}, function(err, result) {
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Industry Type Find Query Error', 'CRM_Settings.controller.js', err);
                  res.status(417).send({status: false, Message: "Some error occurred while Find Industry Type!."});
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
   // Industry Type Create -----------------------------------------------
      exports.Industry_Type_Create = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Industry_Type || ReceivingData.Industry_Type === '' ) {
            res.status(400).send({Status: false, Message: "Industry Type can not be empty" });
         }else if (!ReceivingData.Created_By || ReceivingData.Created_By === ''  ) {
            res.status(400).send({Status: false, Message: "Creator Details can not be empty" });
         }else {
            var Create_IndustryType = new CRMSettingsModel.IndustryTypeSchema({
               Industry_Type: ReceivingData.Industry_Type,
               Created_By: mongoose.Types.ObjectId(ReceivingData.Created_By),
               Last_Modified_By: mongoose.Types.ObjectId(ReceivingData.Created_By),
               Active_Status: true,
               If_Deleted: false
            });
            Create_IndustryType.save(function(err, result) { // Industry Type Save Query
               if(err) {
                  console.log(err);
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Industry Type Creation Query Error', 'CRM_Settings.controller.js');
                  res.status(417).send({Status: false, Message: "Some error occurred while creating the Industry Type!."});
               } else {
                  CRMSettingsModel.IndustryTypeSchema
                     .findOne({'_id': result._id})
                     .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
                     .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
                     .exec(function(err_1, result_1) { // Industry Type FindOne Query
                     if(err_1) {
                        ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Industry Type Find Query Error', 'CRM_Settings.controller.js', err_1);
                        res.status(417).send({status: false, Message: "Some error occurred while Find The Industry Types!."});
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
   // Industry Type List -----------------------------------------------
      exports.Industry_Type_List = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
            res.status(400).send({Status: false, Message: "User Details can not be empty" });
         }else {
            const Skip_Count = parseInt(ReceivingData.Skip_Count, 0) || 0;
            const Limit_Count = parseInt(ReceivingData.Limit_Count, 0) || 5;
            const Last_Creation = new Date(ReceivingData.Last_Creation) || new Date();
            Promise.all([
               CRMSettingsModel.IndustryTypeSchema
                              .find({'If_Deleted': false, 'createdAt': { $lte: Last_Creation } },
                                    {},
                                    { 'skip': Skip_Count, 'limit': Limit_Count, 'sort': { updatedAt: -1 } })
                              .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
                              .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
                              .exec(),
               CRMSettingsModel.IndustryTypeSchema.count({'If_Deleted': false, 'createdAt': { $lte: Last_Creation } }).exec(),
               CRMSettingsModel.IndustryTypeSchema.count( {'If_Deleted': false, 'createdAt' : { $gt: Last_Creation } } ).exec()
            ]).then(result => {
               var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result[0]), 'SecretKeyOut@123');
               ReturnData = ReturnData.toString();
               const SubResult = { Total_Datas: result[1], New_Datas: result[2] };
               var SubReturnData = CryptoJS.AES.encrypt(JSON.stringify(SubResult), 'SecretKeyOut@123');
               SubReturnData = SubReturnData.toString();
               res.status(200).send({Status: true, Response: ReturnData, SubResponse: SubReturnData });
            }).catch(err => {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Industry Type Find Query Error', 'CRM_Settings.controller.js', err);
               res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Industry Types!."});
            });
         }
      };
   // Industry Type Simple List -----------------------------------------------
      exports.Industry_Type_SimpleList = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
            res.status(400).send({Status: false, Message: "User Details can not be empty" });
         }else {
            CRMSettingsModel.IndustryTypeSchema.find({ 'If_Deleted': false }, { Industry_Type : 1 }, {sort: { updatedAt: -1 }}, function(err, result) { // Industry Type FindOne Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Industry Type Find Query Error', 'CRM_Settings.controller.js', err);
                  res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Industry Types!."});
               } else {
                  var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
                  ReturnData = ReturnData.toString();
                  res.status(200).send({Status: true, Response: ReturnData });
               }
            });
         }
      };
   // Industry Type Update -----------------------------------------------
      exports.Industry_Type_Update = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Industry_Type_Id || ReceivingData.Industry_Type_Id === '' ) {
            res.status(400).send({Status: false, Message: "Industry Type Id can not be empty" });
         }else if(!ReceivingData.Industry_Type || ReceivingData.Industry_Type === '' ) {
            res.status(400).send({Status: false, Message: "Industry Type can not be empty" });
         } else if (!ReceivingData.Modified_By || ReceivingData.Modified_By === ''  ) {
            res.status(400).send({Status: false, Message: "Modified User Details can not be empty" });
         }else {
            CRMSettingsModel.IndustryTypeSchema.findOne({'_id': ReceivingData.Industry_Type_Id}, {}, {}, function(err, result) { // Industry Type FindOne Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Industry Type FindOne Query Error', 'CRM_Settings.controller.js', err);
                  res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Industry Type!."});
               } else {
                  if (result !== null) {
                     result.Industry_Type = ReceivingData.Industry_Type;
                     result.Last_Modified_By = mongoose.Types.ObjectId(ReceivingData.Modified_By);
                     result.save(function(err_1, result_1) { // Industry Type Update Query
                        if(err_1) {
                           ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Industry Type Update Query Error', 'CRM_Settings.controller.js');
                           res.status(417).send({Status: false, Error: err_1, Message: "Some error occurred while Update the Industry Type!."});
                        } else {
                           CRMSettingsModel.IndustryTypeSchema
                              .findOne({'_id': result_1._id})
                              .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
                              .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
                              .exec(function(err_2, result_2) { // Industry Type FindOne Query
                              if(err_2) {
                                 ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Industry Type Find Query Error', 'CRM_Settings.controller.js', err_2);
                                 res.status(417).send({status: false, Message: "Some error occurred while Find The Industry Types!."});
                              } else {
                                 var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result_2), 'SecretKeyOut@123');
                                    ReturnData = ReturnData.toString();
                                 res.status(200).send({Status: true, Response: ReturnData });
                              }
                           });
                        }
                     });
                  } else {
                     res.status(400).send({Status: false, Message: "Industry Type Id can not be valid!" });
                  }
               }
            });
         }
      };
   // Industry Type Delete -----------------------------------------------
      exports.Industry_Type_Delete = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Industry_Type_Id || ReceivingData.Industry_Type_Id === '' ) {
            res.status(400).send({Status: false, Message: "Industry Type Id can not be empty" });
         } else if (!ReceivingData.Modified_By || ReceivingData.Modified_By === ''  ) {
            res.status(400).send({Status: false, Message: "Modified User Details can not be empty" });
         }else {
            CRMSettingsModel.IndustryTypeSchema.findOne({'_id': ReceivingData.Industry_Type_Id}, {}, {}, function(err, result) { // Industry Type FindOne Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Industry Type FindOne Query Error', 'CRM_Settings.controller.js', err);
                  res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Industry Type!."});
               } else {
                  if (result !== null) {
                     result.If_Deleted = true;
                     result.Last_Modified_By = mongoose.Types.ObjectId(ReceivingData.Modified_By);
                     result.save(function(err_1, result_1) { // Industry Type Delete Query
                        if(err_1) {
                           ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Industry Type Delete Query Error', 'CRM_Settings.controller.js');
                           res.status(417).send({Status: false, Error: err_1, Message: "Some error occurred while Delete the Industry Type!."});
                        } else {
                           res.status(200).send({Status: true, Message: 'Successfully Deleted' });
                        }
                     });
                  } else {
                     res.status(400).send({Status: false, Message: "Industry Type Id can not be valid!" });
                  }
               }
            });
         }
      };





// ************************************************** Ownership Type *****************************************************
   // Ownership Type Async Validate -----------------------------------------------
      exports.OwnershipType_AsyncValidate = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Ownership_Type || ReceivingData.Ownership_Type === '' ) {
            res.status(400).send({Status: false, Message: "Ownership Type can not be empty" });
         } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
            res.status(400).send({Status: false, Message: "User Details can not be empty" });
         }else {
            CRMSettingsModel.OwnershipTypeSchema.findOne({ 'Ownership_Type': { $regex : new RegExp("^" + ReceivingData.Ownership_Type + "$", "i") }, 'If_Deleted': false }, {}, {}, function(err, result) {
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Ownership Type Find Query Error', 'CRM_Settings.controller.js', err);
                  res.status(417).send({status: false, Message: "Some error occurred while Find Ownership Type!."});
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
   // Ownership Type Create -----------------------------------------------
      exports.Ownership_Type_Create = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Ownership_Type || ReceivingData.Ownership_Type === '' ) {
            res.status(400).send({Status: false, Message: "Ownership Type can not be empty" });
         } else if (!ReceivingData.Created_By || ReceivingData.Created_By === ''  ) {
            res.status(400).send({Status: false, Message: "Creator Details can not be empty" });
         }else {
            var Create_OwnershipType = new CRMSettingsModel.OwnershipTypeSchema({
               Ownership_Type: ReceivingData.Ownership_Type, 
               Created_By: mongoose.Types.ObjectId(ReceivingData.Created_By),
               Last_Modified_By: mongoose.Types.ObjectId(ReceivingData.Created_By),
               Active_Status: true,
               If_Deleted: false
            });
            Create_OwnershipType.save(function(err, result) { // Ownership Type Save Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Ownership Type Creation Query Error', 'CRM_Settings.controller.js');
                  res.status(417).send({Status: false, Message: "Some error occurred while creating the Ownership Type!."});
               } else {
                  CRMSettingsModel.OwnershipTypeSchema
                     .findOne({'_id': result._id})
                     .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
                     .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
                     .exec(function(err_1, result_1) { // Ownership Type FindOne Query
                     if(err_1) {
                        ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Ownership Type Find Query Error', 'CRM_Settings.controller.js', err_1);
                        res.status(417).send({status: false, Message: "Some error occurred while Find The Ownership Types!."});
                     } else {
                        var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result_1), 'SecretKeyOut@123');
                           ReturnData = ReturnData.toString();
                           // setTimeout(() => {
                              
                           // }, 5000);
                           res.status(200).send({Status: true, Response: ReturnData });
                     }
                  });
               }
            });
         }
      };
   // Ownership Type List -----------------------------------------------
      exports.Ownership_Type_List = function(req, res) {
         var CryptoBytes = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.User_Id || ReceivingData.User_Id === ''){
            res.status(400).send({Status: false, Message: "User Details Can not be Empty" });
         } else {
            CRMSettingsModel.OwnershipTypeSchema
               .find({ 'If_Deleted': false }, {}, {sort: { updatedAt: -1 }})
               .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
               .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
               .exec(function(err, result) { // Ownership Type FindOne Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Ownership Type Find Query Error', 'CRM_Settings.controller.js', err);
                  res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Ownership Types!."});
               } else {
                  var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
                  ReturnData = ReturnData.toString();
                  res.status(200).send({Status: true, Response: ReturnData });
               }
            });
         }
      };
   // Ownership Type Simple List -----------------------------------------------
      exports.Ownership_Type_SimpleList = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
            res.status(400).send({Status: false, Message: "User Details can not be empty" });
         }else {
            CRMSettingsModel.OwnershipTypeSchema.find({ 'If_Deleted': false }, { Ownership_Type : 1 }, {sort: { updatedAt: -1 }}, function(err, result) { // Ownership Type FindOne Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Ownership Type Find Query Error', 'CRM_Settings.controller.js', err);
                  res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Ownership Types!."});
               } else {
                  var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
                  ReturnData = ReturnData.toString();
                  res.status(200).send({Status: true, Response: ReturnData });
               }
            });
         }
      };
   // Ownership Type Update -----------------------------------------------
      exports.Ownership_Type_Update = function(req,res) {
         var CryptoBytes = CryptoJS.AES.decrypt(req.body.Info ,'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Ownership_Type_Id || ReceivingData.Ownership_Type_Id === '') {
            res.Status(400).send({status: false, Message: "Ownership Type Id can not be empty"});
         } else if(!ReceivingData.Ownership_Type || ReceivingData.Ownership_Type === '') {
            res.status(400).send({status: false, Message: "Ownership Type Cannot be Empty"});
         } else if(!ReceivingData.Modified_By || ReceivingData.Modified_By === '') {
            res.status(400).send({Status: false, Message: "Modified User Details can not be empty" });
         }else {
            CRMSettingsModel.OwnershipTypeSchema.findOne({'_id': ReceivingData.Ownership_Type_Id}, {}, {}, function(err, result) { // Ownership Type FindOne Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Ownership Type FindOne Query Error', 'CRM_Settings.controller.js', err);
                  res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Ownership Type!."});
               } else {
                  if (result !== null) {
                     result.Ownership_Type = ReceivingData.Ownership_Type;
                     result.Last_Modified_By = mongoose.Types.ObjectId(ReceivingData.Modified_By);
                     result.save(function(err_1, result_1) { // Ownership Type Update Query
                        if(err_1) {
                           ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Ownership Type Update Query Error', 'CRM_Settings.controller.js');
                           res.status(417).send({Status: false, Error: err_1, Message: "Some error occurred while Update the Ownership Type!."});
                        } else {
                           CRMSettingsModel.OwnershipTypeSchema
                              .findOne({'_id': result_1._id})
                              .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
                              .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
                              .exec(function(err_2, result_2) { // Ownership Type FindOne Query
                              if(err_2) {
                                 ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Ownership Type Find Query Error', 'CRM_Settings.controller.js', err_2);
                                 res.status(417).send({status: false, Message: "Some error occurred while Find The Ownership Types!."});
                              } else {
                                 var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result_2), 'SecretKeyOut@123');
                                    ReturnData = ReturnData.toString();
                                 res.status(200).send({Status: true, Response: ReturnData });
                              }
                           });
                        }
                     });
                  } else {
                     res.status(400).send({Status: false, Message: "Ownership Type Id can not be valid!" });
                  }
               }
            });
         }

      };
   // Ownership Type Delete -----------------------------------------------
      exports.Ownership_Type_Delete = function(req, res) {
            var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
            var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

            if(!ReceivingData.Ownership_Type_Id || ReceivingData.Ownership_Type_Id === '' ) {
            res.status(400).send({Status: false, Message: "Ownership Type Id can not be empty" });
            } else if (!ReceivingData.Modified_By || ReceivingData.Modified_By === ''  ) {
            res.status(400).send({Status: false, Message: "Modified User Details can not be empty" });
            }else {
            CRMSettingsModel.OwnershipTypeSchema.findOne({'_id': ReceivingData.Ownership_Type_Id}, {}, {}, function(err, result) { // Ownership Type FindOne Query
                  if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Ownership Type FindOne Query Error', 'CRM_Settings.controller.js', err);
                  res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Ownership Type!."});
                  } else {
                  if (result !== null) {
                        result.If_Deleted = true;
                        result.Last_Modified_By = mongoose.Types.ObjectId(ReceivingData.Modified_By);
                        result.save(function(err_1, result_1) { // Ownership Type Delete Query
                        if(err_1) {
                              ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Ownership Type Delete Query Error', 'CRM_Settings.controller.js');
                              res.status(417).send({Status: false, Error: err_1, Message: "Some error occurred while Delete the Ownership Type!."});
                        } else {
                              res.status(200).send({Status: true, Message: 'Successfully Deleted' });
                        }
                        });
                  } else {
                        res.status(400).send({Status: false, Message: "Ownership Type Id can not be valid!" });
                  }
                  }
            });
            }

      };





// ************************************************** Activity Type *****************************************************
   // Activity Type Async Validate ------------------------------------
      exports.ActivityType_AsyncValidate = function(req, res){
         var CryptoBytes = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Activity_Type || ReceivingData.Activity_Type === ''){
            res.status(400).send({ Status: false, Message: "Activity Type Cannot be empty"});
         } else if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
            res.status(400).send({ Status: false, Message: "Creator Details Cannot be empty"}); 
         } else{
            CRMSettingsModel.ActivityTypeSchema.findOne({'Activity_Type': {$regex : new RegExp("^" + ReceivingData.Activity_Type + "$", "i")}, 'If_Deleted' : false}, {},{}, function(err, result) {
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Activity Type Find Query Error', 'CRM_Settings.controller.js', err);
                  res.status(417).send({status: false, Message: "Some error occurred while Find Activity Type!."});
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
   // Activity Type Create -----------------------------------------------
      exports.Activity_Type_Create = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Activity_Type || ReceivingData.Activity_Type === '' ) {
            res.status(400).send({Status: false, Message: "Activity Type can not be empty" });
         } else if (!ReceivingData.Created_By || ReceivingData.Created_By === ''  ) {
            res.status(400).send({Status: false, Message: "Creator Details can not be empty" });
         }else {
            var Create_ActivityType = new CRMSettingsModel.ActivityTypeSchema({
               Activity_Type: ReceivingData.Activity_Type, 
               Created_By: mongoose.Types.ObjectId(ReceivingData.Created_By),
               Last_Modified_By: mongoose.Types.ObjectId(ReceivingData.Created_By),
               Active_Status: true,
               If_Deleted: false
            });
            Create_ActivityType.save(function(err, result) { // Activity Type Save Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Activity Type Creation Query Error', 'CRM_Settings.controller.js');
                  res.status(417).send({Status: false, Message: "Some error occurred while creating the Activity Type!."});
               } else {
                  CRMSettingsModel.ActivityTypeSchema
                     .findOne({'_id': result._id})
                     .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
                     .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
                     .exec(function(err_1, result_1) { // Activity Type FindOne Query
                     if(err_1) {
                        ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Activity Type Find Query Error', 'CRM_Settings.controller.js', err_1);
                        res.status(417).send({status: false, Message: "Some error occurred while Find The Activity Types!."});
                     } else {
                        var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result_1), 'SecretKeyOut@123');
                           ReturnData = ReturnData.toString();
                           // setTimeout(() => {
                              
                           // }, 5000);
                           res.status(200).send({Status: true, Response: ReturnData });
                     }
                  });
               }
            });
         }
      };
   // Activity Type List -----------------------------------------------
      exports.Activity_Type_List = function(req, res) {
         var CryptoBytes = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.User_Id || ReceivingData.User_Id === ''){
            res.status(400).send({Status: false, Message: "User Details Can not be Empty" });
         } else {
            CRMSettingsModel.ActivityTypeSchema
               .find({ 'If_Deleted': false }, {}, {sort: { updatedAt: -1 }})
               .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
               .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
               .exec(function(err, result) { // Activity Type FindOne Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Activity Type Find Query Error', 'CRM_Settings.controller.js', err);
                  res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Activity Types!."});
               } else {
                  var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
                  ReturnData = ReturnData.toString();
                  res.status(200).send({Status: true, Response: ReturnData });
               }
            });
         }
      };
   // Activity Type Simple List -----------------------------------------------
      exports.Activity_Type_SimpleList = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
            res.status(400).send({Status: false, Message: "User Details can not be empty" });
         }else {
            CRMSettingsModel.ActivityTypeSchema.find({'If_Deleted': false }, { Industry_Type : 1 }, {sort: { updatedAt: -1 }}, function(err, result) { // Activity Type FindOne Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Activity Type Find Query Error', 'CRM_Settings.controller.js', err);
                  res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Activity Types!."});
               } else {
                  var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
                  ReturnData = ReturnData.toString();
                  res.status(200).send({Status: true, Response: ReturnData });
               }
            });
         }
      };
   // Activity Type Update -----------------------------------------------
      exports.Activity_Type_Update = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Activity_Type_Id || ReceivingData.Activity_Type_Id === '' ) {
            res.status(400).send({Status: false, Message: "Activity Type Id can not be empty" });
         }else if(!ReceivingData.Activity_Type || ReceivingData.Activity_Type === '' ) {
            res.status(400).send({Status: false, Message: "Activity Type can not be empty" });
         } else if (!ReceivingData.Modified_By || ReceivingData.Modified_By === ''  ) {
            res.status(400).send({Status: false, Message: "Modified User Details can not be empty" });
         }else {
            CRMSettingsModel.ActivityTypeSchema.findOne({'_id': ReceivingData.Activity_Type_Id}, {}, {}, function(err, result) { // Activity Type FindOne Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Activity Type FindOne Query Error', 'CRM_Settings.controller.js', err);
                  res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Activity Type!."});
               } else {
                  if (result !== null) {
                     result.Activity_Type = ReceivingData.Activity_Type;
                     result.Last_Modified_By = mongoose.Types.ObjectId(ReceivingData.Modified_By);
                     result.save(function(err_1, result_1) { // Activity Type Update Query
                        if(err_1) {
                           ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Activity Type Update Query Error', 'CRM_Settings.controller.js');
                           res.status(417).send({Status: false, Error: err_1, Message: "Some error occurred while Update the Activity Type!."});
                        } else {
                           CRMSettingsModel.ActivityTypeSchema
                              .findOne({'_id': result_1._id})
                              .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
                              .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
                              .exec(function(err_2, result_2) { // Activity Type FindOne Query
                              if(err_2) {
                                 ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Activity Type Find Query Error', 'CRM_Settings.controller.js', err_2);
                                 res.status(417).send({status: false, Message: "Some error occurred while Find The Activity Types!."});
                              } else {
                                 var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result_2), 'SecretKeyOut@123');
                                    ReturnData = ReturnData.toString();
                                 res.status(200).send({Status: true, Response: ReturnData });
                              }
                           });
                        }
                     });
                  } else {
                     res.status(400).send({Status: false, Message: "Activity Type Id can not be valid!" });
                  }
               }
            });
         }
      };
   // Activity Type Delete -----------------------------------------------
      exports.Activity_Type_Delete = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Activity_Type_Id || ReceivingData.Activity_Type_Id === '' ) {
            res.status(400).send({Status: false, Message: "Activity Type Id can not be empty" });
         } else if (!ReceivingData.Modified_By || ReceivingData.Modified_By === ''  ) {
            res.status(400).send({Status: false, Message: "Modified User Details can not be empty" });
         }else {
            CRMSettingsModel.ActivityTypeSchema.findOne({'_id': ReceivingData.Activity_Type_Id}, {}, {}, function(err, result) { // Activity Type FindOne Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Activity Type FindOne Query Error', 'CRM_Settings.controller.js', err);
                  res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Activity Type!."});
               } else {
                  if (result !== null) {
                     result.If_Deleted = true;
                     result.Last_Modified_By = ReceivingData.Modified_By;
                     result.save(function(err_1, result_1) { // Activity Type Delete Query
                        if(err_1) {
                           ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Activity Type Delete Query Error', 'CRM_Settings.controller.js');
                           res.status(417).send({Status: false, Error: err_1, Message: "Some error occurred while Delete the Activity Type!."});
                        } else {
                           res.status(200).send({Status: true, Message: 'Successfully Deleted' });
                        }
                     });
                  } else {
                     res.status(400).send({Status: false, Message: "Activity Type Id can not be valid!" });
                  }
               }
            });
         }
      };


 
      

// ************************************************** Activity Status *****************************************************
   // Activity Status Async Validate ------------------------------------
      exports.ActivityStatus_AsyncValidate = function(req, res){
         var CryptoBytes = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Activity_Status || ReceivingData.Activity_Status === ''){
            res.status(400).send({ Status: false, Message: "Activity Status Cannot be empty"});
         } else if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
            res.status(400).send({ Status: false, Message: "Creator Details Cannot be empty"}); 
         } else{
            CRMSettingsModel.ActivityStatusSchema.findOne({ 'Activity_Status': {$regex : new RegExp("^" + ReceivingData.Activity_Status + "$", "i")}, 'If_Deleted' : false}, {},{}, function(err, result) {
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Activity Status Find Query Error', 'CRM_Settings.controller.js', err);
                  res.status(417).send({status: false, Message: "Some error occurred while Find Activity Status!."});
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
// Activity Status Create -----------------------------------------------
      exports.Activity_Status_Create = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Activity_Status || ReceivingData.Activity_Status === '' ) {
            res.status(400).send({Status: false, Message: "Activity Status can not be empty" });
         } else if (!ReceivingData.Created_By || ReceivingData.Created_By === ''  ) {
            res.status(400).send({Status: false, Message: "Creator Details can not be empty" });
         }else {
            var Create_ActivityStatus = new CRMSettingsModel.ActivityStatusSchema({
               Activity_Status: ReceivingData.Activity_Status, 
               Created_By: mongoose.Types.ObjectId(ReceivingData.Created_By),
               Last_Modified_By: mongoose.Types.ObjectId(ReceivingData.Created_By),
               Active_Status: true,
               If_Deleted: false
            });
            Create_ActivityStatus.save(function(err, result) { // Activity Status Save Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Activity Status Creation Query Error', 'CRM_Settings.controller.js');
                  res.status(417).send({Status: false, Message: "Some error occurred while creating the Activity Status!."});
               } else {
                  CRMSettingsModel.ActivityStatusSchema
                     .findOne({'_id': result._id})
                     .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
                     .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
                     .exec(function(err_1, result_1) { // Activity Status FindOne Query
                     if(err_1) {
                        ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Activity Status Find Query Error', 'CRM_Settings.controller.js', err_1);
                        res.status(417).send({status: false, Message: "Some error occurred while Find The Activity Status!."});
                     } else {
                        var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result_1), 'SecretKeyOut@123');
                           ReturnData = ReturnData.toString();
                           // setTimeout(() => {
                              
                           // }, 5000);
                           res.status(200).send({Status: true, Response: ReturnData });
                     }
                  });
               }
            });
         }
      };
   // Activity Status List -----------------------------------------------
      exports.Activity_Status_List = function(req, res) {
         var CryptoBytes = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.User_Id || ReceivingData.User_Id === ''){
            res.status(400).send({Status: false, Message: "User Details Can not be Empty" });
         } else {
            CRMSettingsModel.ActivityStatusSchema
               .find({ 'If_Deleted': false }, {}, {sort: { updatedAt: -1 }})
               .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
               .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
               .exec(function(err, result) { // Activity Status FindOne Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Activity Status Find Query Error', 'CRM_Settings.controller.js', err);
                  res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Activity Status!."});
               } else {
                  var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
                  ReturnData = ReturnData.toString();
                  res.status(200).send({Status: true, Response: ReturnData });
               }
            });
         }
      };
   // Activity Status Simple List -----------------------------------------------
      exports.Activity_Status_SimpleList = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
            res.status(400).send({Status: false, Message: "User Details can not be empty" });
         }else {
            CRMSettingsModel.ActivityStatusSchema.find({ 'If_Deleted': false }, { Industry_Type : 1 }, {sort: { updatedAt: -1 }}, function(err, result) { // Activity Status FindOne Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Activity Status Find Query Error', 'CRM_Settings.controller.js', err);
                  res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Activity Status!."});
               } else {
                  var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
                  ReturnData = ReturnData.toString();
                  res.status(200).send({Status: true, Response: ReturnData });
               }
            });
         }
      };
   // Activity Status Update -----------------------------------------------
      exports.Activity_Status_Update = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Activity_Status_Id || ReceivingData.Activity_Status_Id === '' ) {
            res.status(400).send({Status: false, Message: "Activity Status Id can not be empty" });
         }else if(!ReceivingData.Activity_Status || ReceivingData.Activity_Status === '' ) {
            res.status(400).send({Status: false, Message: "Activity Status can not be empty" });
         } else if (!ReceivingData.Modified_By || ReceivingData.Modified_By === ''  ) {
            res.status(400).send({Status: false, Message: "Modified User Details can not be empty" });
         }else {
            CRMSettingsModel.ActivityStatusSchema.findOne({'_id': ReceivingData.Activity_Status_Id}, {}, {}, function(err, result) { // Activity Status FindOne Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Activity Status FindOne Query Error', 'CRM_Settings.controller.js', err);
                  res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Activity Status!."});
               } else {
                  if (result !== null) {
                     result.Activity_Status = ReceivingData.Activity_Status;
                     result.Last_Modified_By = mongoose.Types.ObjectId(ReceivingData.Modified_By);
                     result.save(function(err_1, result_1) { // Activity Status Update Query
                        if(err_1) {
                           ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Activity Status Update Query Error', 'CRM_Settings.controller.js');
                           res.status(417).send({Status: false, Error: err_1, Message: "Some error occurred while Update the Activity Status!."});
                        } else {
                           CRMSettingsModel.ActivityStatusSchema
                              .findOne({'_id': result_1._id})
                              .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
                              .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
                              .exec(function(err_2, result_2) { // Activity Status FindOne Query
                              if(err_2) {
                                 ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Activity Status Find Query Error', 'CRM_Settings.controller.js', err_2);
                                 res.status(417).send({status: false, Message: "Some error occurred while Find The Activity Status!."});
                              } else {
                                 var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result_2), 'SecretKeyOut@123');
                                    ReturnData = ReturnData.toString();
                                 res.status(200).send({Status: true, Response: ReturnData });
                              }
                           });
                        }
                     });
                  } else {
                     res.status(400).send({Status: false, Message: "Activity Status Id can not be valid!" });
                  }
               }
            });
         }
      };
   // Activity Status Delete -----------------------------------------------
      exports.Activity_Status_Delete = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Activity_Status_Id || ReceivingData.Activity_Status_Id === '' ) {
            res.status(400).send({Status: false, Message: "Activity Status Id can not be empty" });
         } else if (!ReceivingData.Modified_By || ReceivingData.Modified_By === ''  ) {
            res.status(400).send({Status: false, Message: "Modified User Details can not be empty" });
         }else {
            CRMSettingsModel.ActivityStatusSchema.findOne({'_id': ReceivingData.Activity_Status_Id}, {}, {}, function(err, result) { // Activity Status FindOne Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Activity Status FindOne Query Error', 'CRM_Settings.controller.js', err);
                  res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Activity Status!."});
               } else {
                  if (result !== null) {
                     result.If_Deleted = true;
                     result.Last_Modified_By = ReceivingData.Modified_By;
                     result.save(function(err_1, result_1) { // Activity Status Delete Query
                        if(err_1) {
                           ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Activity Status Delete Query Error', 'CRM_Settings.controller.js');
                           res.status(417).send({Status: false, Error: err_1, Message: "Some error occurred while Delete the Activity Status!."});
                        } else {
                           res.status(200).send({Status: true, Message: 'Successfully Deleted' });
                        }
                     });
                  } else {
                     res.status(400).send({Status: false, Message: "Activity Status Id can not be valid!" });
                  }
               }
            });
         }
      };





// ************************************************** Activity Priority *****************************************************
   // Activity Priority Async Validate -------------------------------------
      exports.ActivityPriority_AsyncValidate = function(req, res){
         var CryptoBytes = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Activity_Priority || ReceivingData.Activity_Priority === ''){
            res.status(400).send({ Status: false, Message: "Activity Priority Cannot be empty"});
         } else if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
            res.status(400).send({ Status: false, Message: "Creator Details Cannot be empty"}); 
         } else{
            CRMSettingsModel.ActivityPrioritySchema.findOne({'Activity_Priority': {$regex : new RegExp("^" + ReceivingData.Activity_Priority + "$", "i")}, 'If_Deleted' : false}, {},{}, function(err, result) {
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Activity Priority Find Query Error', 'CRM_Settings.controller.js', err);
                  res.status(417).send({status: false, Message: "Some error occurred while Find Activity Priority!."});
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
   // Activity Priority Create -----------------------------------------------
      exports.Activity_Priority_Create = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Activity_Priority || ReceivingData.Activity_Priority === '' ) {
            res.status(400).send({Status: false, Message: "Activity Priority can not be empty" });
         } else if (!ReceivingData.Created_By || ReceivingData.Created_By === ''  ) {
            res.status(400).send({Status: false, Message: "Creator Details can not be empty" });
         }else {
            var Create_ActivityPriority  = new CRMSettingsModel.ActivityPrioritySchema({
               Activity_Priority: ReceivingData.Activity_Priority,
               Created_By: mongoose.Types.ObjectId(ReceivingData.Created_By),
               Last_Modified_By: mongoose.Types.ObjectId(ReceivingData.Created_By),
               Active_Status: true,
               If_Deleted: false
            });
            Create_ActivityPriority.save(function(err, result) { // Activity Priority Save Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Activity Priority Creation Query Error', 'CRM_Settings.controller.js');
                  res.status(417).send({Status: false, Message: "Some error occurred while creating the Activity Priority!."});
               } else {
                  CRMSettingsModel.ActivityPrioritySchema
                     .findOne({'_id': result._id})
                     .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
                     .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
                     .exec(function(err_1, result_1) { // Activity Priority FindOne Query
                     if(err_1) {
                        ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Activity Priority Find Query Error', 'CRM_Settings.controller.js', err_1);
                        res.status(417).send({status: false, Message: "Some error occurred while Find The Activity Priority!."});
                     } else {
                        var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result_1), 'SecretKeyOut@123');
                           ReturnData = ReturnData.toString();
                           // setTimeout(() => {
                              
                           // }, 5000);
                           res.status(200).send({Status: true, Response: ReturnData });
                     }
                  });
               }
            });
         }
      };
   // Activity Priority List -----------------------------------------------
      exports.Activity_Priority_List = function(req, res) {
         var CryptoBytes = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.User_Id || ReceivingData.User_Id === ''){
            res.status(400).send({Status: false, Message: "User Details Can not be Empty" });
         } else {
            CRMSettingsModel.ActivityPrioritySchema
               .find({'If_Deleted': false }, {}, {sort: { updatedAt: -1 }})
               .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
               .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
               .exec(function(err, result) { // Activity Priority FindOne Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Activity Priority Find Query Error', 'CRM_Settings.controller.js', err);
                  res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Activity Priority!."});
               } else {
                  var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
                  ReturnData = ReturnData.toString();
                  res.status(200).send({Status: true, Response: ReturnData });
               }
            });
         }
      };
   // Activity Priority Simple List -----------------------------------------------
      exports.Activity_Priority_SimpleList = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
            res.status(400).send({Status: false, Message: "User Details can not be empty" });
         }else {
            CRMSettingsModel.ActivityPrioritySchema.find({ 'If_Deleted': false }, { Industry_Type : 1 }, {sort: { updatedAt: -1 }}, function(err, result) { // Activity Priority FindOne Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Activity Priority Find Query Error', 'CRM_Settings.controller.js', err);
                  res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Activity Priority!."});
               } else {
                  var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
                  ReturnData = ReturnData.toString();
                  res.status(200).send({Status: true, Response: ReturnData });
               }
            });
         }
      };
   // Activity Priority Update -----------------------------------------------
      exports.Activity_Priority_Update = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Activity_Priority_Id || ReceivingData.Activity_Priority_Id === '' ) {
            res.status(400).send({Status: false, Message: "Activity Priority Id can not be empty" });
         }else if(!ReceivingData.Activity_Priority || ReceivingData.Activity_Priority === '' ) {
            res.status(400).send({Status: false, Message: "Activity Priority can not be empty" });
         } else if (!ReceivingData.Modified_By || ReceivingData.Modified_By === ''  ) {
            res.status(400).send({Status: false, Message: "Modified User Details can not be empty" });
         }else {
            CRMSettingsModel.ActivityPrioritySchema.findOne({'_id': ReceivingData.Activity_Priority_Id}, {}, {}, function(err, result) { // Activity Priority FindOne Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Activity Priority FindOne Query Error', 'CRM_Settings.controller.js', err);
                  res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Activity Priority!."});
               } else {
                  if (result !== null) {
                     result.Activity_Priority = ReceivingData.Activity_Priority;
                     result.Last_Modified_By = mongoose.Types.ObjectId(ReceivingData.Modified_By);
                     result.save(function(err_1, result_1) { // Activity Priority Update Query
                        if(err_1) {
                           ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Activity Priority Update Query Error', 'CRM_Settings.controller.js');
                           res.status(417).send({Status: false, Error: err_1, Message: "Some error occurred while Update the Activity Priority!."});
                        } else {
                           CRMSettingsModel.ActivityPrioritySchema
                              .findOne({'_id': result_1._id})
                              .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
                              .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
                              .exec(function(err_2, result_2) { // Activity Priority FindOne Query
                              if(err_2) {
                                 ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Activity Priority Find Query Error', 'CRM_Settings.controller.js', err_2);
                                 res.status(417).send({status: false, Message: "Some error occurred while Find The Activity Priority!."});
                              } else {
                                 var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result_2), 'SecretKeyOut@123');
                                    ReturnData = ReturnData.toString();
                                 res.status(200).send({Status: true, Response: ReturnData });
                              }
                           });
                        }
                     });
                  } else {
                     res.status(400).send({Status: false, Message: "Activity Priority Id can not be valid!" });
                  }
               }
            });
         }
      };
   // Activity Priority Delete -----------------------------------------------
      exports.Activity_Priority_Delete = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Activity_Priority_Id || ReceivingData.Activity_Priority_Id === '' ) {
            res.status(400).send({Status: false, Message: "Activity Priority Id can not be empty" });
         } else if (!ReceivingData.Modified_By || ReceivingData.Modified_By === ''  ) {
            res.status(400).send({Status: false, Message: "Modified User Details can not be empty" });
         }else {
            CRMSettingsModel.ActivityPrioritySchema.findOne({'_id': ReceivingData.Activity_Priority_Id}, {}, {}, function(err, result) { // Activity Priority FindOne Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Activity Priority FindOne Query Error', 'CRM_Settings.controller.js', err);
                  res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Activity Priority!."});
               } else {
                  if (result !== null) {
                     result.If_Deleted = true;
                     result.Last_Modified_By = ReceivingData.Modified_By;
                     result.save(function(err_1, result_1) { // Activity Priority Delete Query
                        if(err_1) {
                           ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Activity Priority Delete Query Error', 'CRM_Settings.controller.js');
                           res.status(417).send({Status: false, Error: err_1, Message: "Some error occurred while Delete the Activity Priority!."});
                        } else {
                           res.status(200).send({Status: true, Message: 'Successfully Deleted' });
                        }
                     });
                  } else {
                     res.status(400).send({Status: false, Message: "Activity Priority Id can not be valid!" });
                  }
               }
            });
         }
      };





// ************************************************** Contact Role *****************************************************
   // Contact Role Async Validate -----------------------------------
      exports.ContactRole_AsyncValidate = function(req, res){
         var CryptoBytes = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Contact_Role || ReceivingData.Contact_Role === ''){
            res.status(400).send({ Status: false, Message: "Contact Role Cannot be empty"});
         } else if(!ReceivingData.User_Id || ReceivingData.User_Id === '') {
            res.status(400).send({ Status: false, Message: "Creator Details Cannot be empty"}); 
         } else{
            CRMSettingsModel.ContactRoleSchema.findOne({'Contact_Role': {$regex : new RegExp("^" + ReceivingData.Contact_Role + "$", "i")}, 'If_Deleted' : false}, {},{}, function(err, result) {
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Contact Role Find Query Error', 'CRM_Settings.controller.js', err);
                  res.status(417).send({status: false, Message: "Some error occurred while Find Contact Role!."});
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
   // Contact Role Create -----------------------------------------------
      exports.Contact_Role_Create = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Contact_Role || ReceivingData.Contact_Role === '' ) {
            res.status(400).send({Status: false, Message: "Contact Role can not be empty" });
         } else if (!ReceivingData.Created_By || ReceivingData.Created_By === ''  ) {
            res.status(400).send({Status: false, Message: "Creator Details can not be empty" });
         }else {
            var Create_ContactRole = new CRMSettingsModel.ContactRoleSchema({
               Contact_Role: ReceivingData.Contact_Role,
               Created_By: mongoose.Types.ObjectId(ReceivingData.Created_By),
               Last_Modified_By: mongoose.Types.ObjectId(ReceivingData.Created_By),
               Active_Status: true,
               If_Deleted: false
            });
            Create_ContactRole.save(function(err, result) { // Contact Role Save Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Contact Role Creation Query Error', 'CRM_Settings.controller.js');
                  res.status(417).send({Status: false, Message: "Some error occurred while creating the Contact Role!."});
               } else {
                  CRMSettingsModel.ContactRoleSchema
                     .findOne({'_id': result._id})
                     .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
                     .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
                     .exec(function(err_1, result_1) { // Contact Role FindOne Query
                     if(err_1) {
                        ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Contact RoleFind Query Error', 'CRM_Settings.controller.js', err_1);
                        res.status(417).send({status: false, Message: "Some error occurred while Find The Contact Role!."});
                     } else {
                        var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result_1), 'SecretKeyOut@123');
                           ReturnData = ReturnData.toString();
                           // setTimeout(() => {
                              
                           // }, 5000);
                           res.status(200).send({Status: true, Response: ReturnData });
                     }
                  });
               }
            });
         }
      };
   // Contact Role List -----------------------------------------------
      exports.Contact_Role_List = function(req, res) {
         var CryptoBytes = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.User_Id || ReceivingData.User_Id === ''){
            res.status(400).send({Status: false, Message: "User Details Can not be Empty" });
         } else {
            CRMSettingsModel.ContactRoleSchema
            .find({'If_Deleted': false }, {}, {sort: { updatedAt: -1 }})
            .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
            .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
            .exec(function(err, result) { // Contact Role FindOne Query
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Contact Role Find Query Error', 'CRM_Settings.controller.js', err);
               res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Contact Role!."});
            } else {
               var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
               ReturnData = ReturnData.toString();
               res.status(200).send({Status: true, Response: ReturnData });
            }
         });
         }
      };
   // Contact Role Simple List -----------------------------------------------
      exports.Contact_Role_SimpleList = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
            res.status(400).send({Status: false, Message: "User Details can not be empty" });
         }else {
            CRMSettingsModel.ContactRoleSchema.find({'If_Deleted': false }, {Contact_Role: 1}, {sort: { updatedAt: -1 }}, function(err, result) { // Contact Role FindOne Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Contact Role Find Query Error', 'CRM_Settings.controller.js', err);
                  res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Contact Role!."});
               } else {
                  var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
                  ReturnData = ReturnData.toString();
                  res.status(200).send({Status: true, Response: ReturnData });
               }
            });
         }
      };
   // Contact Role Update -----------------------------------------------
      exports.Contact_Role_Update = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Contact_Role_Id || ReceivingData.Contact_Role_Id === '' ) {
            res.status(400).send({Status: false, Message: "Contact Role Id can not be empty" });
         }else if(!ReceivingData.Contact_Role || ReceivingData.Contact_Role === '' ) {
            res.status(400).send({Status: false, Message: "Contact Role can not be empty" });
         } else if (!ReceivingData.Modified_By || ReceivingData.Modified_By === ''  ) {
            res.status(400).send({Status: false, Message: "Modified User Details can not be empty" });
         }else {
            CRMSettingsModel.ContactRoleSchema.findOne({'_id': ReceivingData.Contact_Role_Id}, {}, {}, function(err, result) { // Contact Role FindOne Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Contact Role FindOne Query Error', 'CRM_Settings.controller.js', err);
                  res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Contact Role!."});
               } else {
                  if (result !== null) {
                     result.Contact_Role = ReceivingData.Contact_Role;
                     result.Last_Modified_By = mongoose.Types.ObjectId(ReceivingData.Modified_By);
                     result.save(function(err_1, result_1) { // Contact Role Update Query
                        if(err_1) {
                           ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Contact Role Update Query Error', 'CRM_Settings.controller.js');
                           res.status(417).send({Status: false, Error: err_1, Message: "Some error occurred while Update the Contact Role!."});
                        } else {
                           CRMSettingsModel.ContactRoleSchema
                              .findOne({'_id': result_1._id})
                              .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
                              .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
                              .exec(function(err_2, result_2) { // Contact Role FindOne Query
                              if(err_2) {
                                 ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Contact Role Find Query Error', 'CRM_Settings.controller.js', err_2);
                                 res.status(417).send({status: false, Message: "Some error occurred while Find The Contact Role!."});
                              } else {
                                 var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result_2), 'SecretKeyOut@123');
                                    ReturnData = ReturnData.toString();
                                 res.status(200).send({Status: true, Response: ReturnData });
                              }
                           });
                        }
                     });
                  } else {
                     res.status(400).send({Status: false, Message: "Contact Role Id can not be valid!" });
                  }
               }
            });
         }
      };
   // Contact Role Delete -----------------------------------------------
      exports.Contact_Role_Delete = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Contact_Role_Id || ReceivingData.Contact_Role_Id === '' ) {
            res.status(400).send({Status: false, Message: "Contact Role Id can not be empty" });
         } else if (!ReceivingData.Modified_By || ReceivingData.Modified_By === ''  ) {
            res.status(400).send({Status: false, Message: "Modified User Details can not be empty" });
         }else {
            CRMSettingsModel.ContactRoleSchema.findOne({'_id': ReceivingData.Contact_Role_Id}, {}, {}, function(err, result) { // Contact Role FindOne Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Contact Role FindOne Query Error', 'CRM_Settings.controller.js', err);
                  res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Contact Role!."});
               } else {
                  if (result !== null) {
                     result.If_Deleted = true;
                     result.Last_Modified_By = ReceivingData.Modified_By;
                     result.save(function(err_1, result_1) { // Contact Role Id Delete Query
                        if(err_1) {
                           ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Contact Role Id Delete Query Error', 'CRM_Settings.controller.js');
                           res.status(417).send({Status: false, Error: err_1, Message: "Some error occurred while Delete the Contact_Role_Id!."});
                        } else {
                           res.status(200).send({Status: true, Message: 'Successfully Deleted' });
                        }
                     });
                  } else {
                     res.status(400).send({Status: false, Message: "Contact Role Id Id can not be valid!" });
                  }
               }
            });
         }
      };





// ************************************************** Machine Type *****************************************************
   // Machine Type Async Validate -----------------------------------------------
      exports.MachineType_AsyncValidate = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Machine_Type || ReceivingData.Machine_Type === '' ) {
            res.status(400).send({Status: false, Message: "Machine Type can not be empty" });
         } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
            res.status(400).send({Status: false, Message: "User Details can not be empty" });
         }else {
            CRMSettingsModel.MachineTypeSchema.findOne({'Machine_Type': { $regex : new RegExp("^" + ReceivingData.Machine_Type + "$", "i") }, 'If_Deleted': false }, {}, {}, function(err, result) {
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Machine Type Find Query Error', 'CRM_Settings.controller.js', err);
                  res.status(417).send({status: false, Message: "Some error occurred while Find Machine Type!."});
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
   // Machine Type Create -----------------------------------------------
      exports.Machine_Type_Create = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Machine_Type || ReceivingData.Machine_Type === '' ) {
            res.status(400).send({Status: false, Message: "Machine Type can not be empty" });
         } else if (!ReceivingData.Created_By || ReceivingData.Created_By === ''  ) {
            res.status(400).send({Status: false, Message: "Creator Details can not be empty" });
         }else {
            var Create_MachineType = new CRMSettingsModel.MachineTypeSchema({
               Machine_Type: ReceivingData.Machine_Type,
               Created_By: mongoose.Types.ObjectId(ReceivingData.Created_By),
               Last_Modified_By: mongoose.Types.ObjectId(ReceivingData.Created_By),
               Active_Status: true,
               If_Deleted: false
            });
            Create_MachineType.save(function(err, result) { // Machine Type Save Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Machine Type Creation Query Error', 'CRM_Settings.controller.js');
                  res.status(417).send({Status: false, Message: "Some error occurred while creating the Machine Type!."});
               } else {
                  CRMSettingsModel.MachineTypeSchema
                     .findOne({'_id': result._id})
                     .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
                     .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
                     .exec(function(err_1, result_1) { // Machine Type FindOne Query
                     if(err_1) {
                        ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Machine Type Find Query Error', 'CRM_Settings.controller.js', err_1);
                        res.status(417).send({status: false, Message: "Some error occurred while Find The Machine Types!."});
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
   // Machine Type List -----------------------------------------------
      exports.Machine_Type_List = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
            res.status(400).send({Status: false, Message: "User Details can not be empty" });
         }else {
            CRMSettingsModel.MachineTypeSchema
               .find({'If_Deleted': false }, {}, {sort: { updatedAt: -1 }})
               .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
               .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
               .exec(function(err, result) { // Machine Type FindOne Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Machine Type Find Query Error', 'CRM_Settings.controller.js', err);
                  res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Machine Types!."});
               } else {
                  var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
                  ReturnData = ReturnData.toString();
                  res.status(200).send({Status: true, Response: ReturnData });
               }
            });
         }
      };
   // Machine Type Simple List -----------------------------------------------
      exports.Machine_Type_SimpleList = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
            res.status(400).send({Status: false, Message: "User Details can not be empty" });
         }else {
            CRMSettingsModel.MachineTypeSchema.find({'If_Deleted': false }, { Machine_Type : 1 }, {sort: { updatedAt: -1 }}, function(err, result) { // Machine Type FindOne Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Machine Type Find Query Error', 'CRM_Settings.controller.js', err);
                  res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Machine Types!."});
               } else {
                  var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
                  ReturnData = ReturnData.toString();
                  res.status(200).send({Status: true, Response: ReturnData });
               }
            });
         }
      };
   // Machine Type Update -----------------------------------------------
      exports.Machine_Type_Update = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Machine_Type_Id || ReceivingData.Machine_Type_Id === '' ) {
            res.status(400).send({Status: false, Message: "Machine Type Id can not be empty" });
         }else if(!ReceivingData.Machine_Type || ReceivingData.Machine_Type === '' ) {
            res.status(400).send({Status: false, Message: "Machine Type can not be empty" });
         } else if (!ReceivingData.Modified_By || ReceivingData.Modified_By === ''  ) {
            res.status(400).send({Status: false, Message: "Modified User Details can not be empty" });
         }else {
            CRMSettingsModel.MachineTypeSchema.findOne({'_id': ReceivingData.Machine_Type_Id}, {}, {}, function(err, result) { // Machine Type FindOne Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Machine Type FindOne Query Error', 'CRM_Settings.controller.js', err);
                  res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Machine Type!."});
               } else {
                  if (result !== null) {
                     result.Machine_Type = ReceivingData.Machine_Type;
                     result.Last_Modified_By = mongoose.Types.ObjectId(ReceivingData.Modified_By);
                     result.save(function(err_1, result_1) { // Machine Type Update Query
                        if(err_1) {
                           ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Machine Type Update Query Error', 'CRM_Settings.controller.js');
                           res.status(417).send({Status: false, Error: err_1, Message: "Some error occurred while Update the Machine Type!."});
                        } else {
                           CRMSettingsModel.MachineTypeSchema
                              .findOne({'_id': result_1._id})
                              .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
                              .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
                              .exec(function(err_2, result_2) { // Machine Type FindOne Query
                              if(err_2) {
                                 ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Machine Type Find Query Error', 'CRM_Settings.controller.js', err_2);
                                 res.status(417).send({status: false, Message: "Some error occurred while Find The Machine Types!."});
                              } else {
                                 var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result_2), 'SecretKeyOut@123');
                                    ReturnData = ReturnData.toString();
                                 res.status(200).send({Status: true, Response: ReturnData });
                              }
                           });
                        }
                     });
                  } else {
                     res.status(400).send({Status: false, Message: "Machine Type Id can not be valid!" });
                  }
               }
            });
         }
      };
   // Machine Type Delete -----------------------------------------------
      exports.Machine_Type_Delete = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Machine_Type_Id || ReceivingData.Machine_Type_Id === '' ) {
            res.status(400).send({Status: false, Message: "Machine Type Id can not be empty" });
         } else if (!ReceivingData.Modified_By || ReceivingData.Modified_By === ''  ) {
            res.status(400).send({Status: false, Message: "Modified User Details can not be empty" });
         }else {
            CRMSettingsModel.MachineTypeSchema.findOne({'_id': ReceivingData.Machine_Type_Id}, {}, {}, function(err, result) { // Machine Type FindOne Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Machine Type FindOne Query Error', 'CRM_Settings.controller.js', err);
                  res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Machine Type!."});
               } else {
                  if (result !== null) {
                     result.If_Deleted = true;
                     result.Last_Modified_By = mongoose.Types.ObjectId(ReceivingData.Modified_By);
                     result.save(function(err_1, result_1) { // Machine Type Delete Query
                        if(err_1) {
                           ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Machine Type Delete Query Error', 'CRM_Settings.controller.js');
                           res.status(417).send({Status: false, Error: err_1, Message: "Some error occurred while Delete the Machine Type!."});
                        } else {
                           res.status(200).send({Status: true, Message: 'Successfully Deleted' });
                        }
                     });
                  } else {
                     res.status(400).send({Status: false, Message: "Machine Type Id can not be valid!" });
                  }
               }
            });
         }
      };





// ************************************************** Controller Type *****************************************************
   // Controller Type Async Validate -----------------------------------------------
      exports.ControllerType_AsyncValidate = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Controller_Type || ReceivingData.Controller_Type === '' ) {
            res.status(400).send({Status: false, Message: "Controller Type can not be empty" });
         } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
            res.status(400).send({Status: false, Message: "User Details can not be empty" });
         }else {
            CRMSettingsModel.ControllerTypeSchema.findOne({ 'Controller_Type': { $regex : new RegExp("^" + ReceivingData.Controller_Type + "$", "i") }, 'If_Deleted': false }, {}, {}, function(err, result) {
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Controller Type Find Query Error', 'CRM_Settings.controller.js', err);
                  res.status(417).send({status: false, Message: "Some error occurred while Find Controller Type!."});
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
   // Controller Type Create -----------------------------------------------
      exports.Controller_Type_Create = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Controller_Type || ReceivingData.Controller_Type === '' ) {
            res.status(400).send({Status: false, Message: "Controller Type can not be empty" });
         } else if (!ReceivingData.Created_By || ReceivingData.Created_By === ''  ) {
            res.status(400).send({Status: false, Message: "Creator Details can not be empty" });
         }else {
            var Create_ControllerType = new CRMSettingsModel.ControllerTypeSchema({
               Controller_Type: ReceivingData.Controller_Type,
               Created_By: mongoose.Types.ObjectId(ReceivingData.Created_By),
               Last_Modified_By: mongoose.Types.ObjectId(ReceivingData.Created_By),
               Active_Status: true,
               If_Deleted: false
            });
            Create_ControllerType.save(function(err, result) { // Controller Type Save Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Controller Type Creation Query Error', 'CRM_Settings.controller.js');
                  res.status(417).send({Status: false, Message: "Some error occurred while creating the Controller Type!."});
               } else {
                  CRMSettingsModel.ControllerTypeSchema
                     .findOne({'_id': result._id})
                     .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
                     .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
                     .exec(function(err_1, result_1) { // Controller Type FindOne Query
                     if(err_1) {
                        ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Controller Type Find Query Error', 'CRM_Settings.controller.js', err_1);
                        res.status(417).send({status: false, Message: "Some error occurred while Find The Controller Types!."});
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
   // Controller Type List -----------------------------------------------
      exports.Controller_Type_List = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
            res.status(400).send({Status: false, Message: "User Details can not be empty" });
         }else {
            CRMSettingsModel.ControllerTypeSchema
               .find({ 'If_Deleted': false }, {}, {sort: { updatedAt: -1 }})
               .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
               .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
               .exec(function(err, result) { // Controller Type FindOne Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Controller Type Find Query Error', 'CRM_Settings.controller.js', err);
                  res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Controller Types!."});
               } else {
                  var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
                  ReturnData = ReturnData.toString();
                  res.status(200).send({Status: true, Response: ReturnData });
               }
            });
         }
      };
   // Controller Type Simple List -----------------------------------------------
      exports.Controller_Type_SimpleList = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
            res.status(400).send({Status: false, Message: "User Details can not be empty" });
         }else {
            CRMSettingsModel.ControllerTypeSchema.find({ 'If_Deleted': false }, { Controller_Type : 1 }, {sort: { updatedAt: -1 }}, function(err, result) { // Controller Type FindOne Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Controller Type Find Query Error', 'CRM_Settings.controller.js', err);
                  res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Controller Types!."});
               } else {
                  var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
                  ReturnData = ReturnData.toString();
                  res.status(200).send({Status: true, Response: ReturnData });
               }
            });
         }
      };
   // Controller Type Update -----------------------------------------------
      exports.Controller_Type_Update = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Controller_Type_Id || ReceivingData.Controller_Type_Id === '' ) {
            res.status(400).send({Status: false, Message: "Controller Type Id can not be empty" });
         }else if(!ReceivingData.Controller_Type || ReceivingData.Controller_Type === '' ) {
            res.status(400).send({Status: false, Message: "Controller Type can not be empty" });
         } else if (!ReceivingData.Modified_By || ReceivingData.Modified_By === ''  ) {
            res.status(400).send({Status: false, Message: "Modified User Details can not be empty" });
         }else {
            CRMSettingsModel.ControllerTypeSchema.findOne({'_id': ReceivingData.Controller_Type_Id}, {}, {}, function(err, result) { // Controller Type FindOne Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Controller Type FindOne Query Error', 'CRM_Settings.controller.js', err);
                  res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Controller Type!."});
               } else {
                  if (result !== null) {
                     result.Controller_Type = ReceivingData.Controller_Type;
                     result.Last_Modified_By = mongoose.Types.ObjectId(ReceivingData.Modified_By);
                     result.save(function(err_1, result_1) { // Controller Type Update Query
                        if(err_1) {
                           ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Controller Type Update Query Error', 'CRM_Settings.controller.js');
                           res.status(417).send({Status: false, Error: err_1, Message: "Some error occurred while Update the Controller Type!."});
                        } else {
                           CRMSettingsModel.ControllerTypeSchema
                              .findOne({'_id': result_1._id})
                              .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
                              .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
                              .exec(function(err_2, result_2) { // Controller Type FindOne Query
                              if(err_2) {
                                 ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Controller Type Find Query Error', 'CRM_Settings.controller.js', err_2);
                                 res.status(417).send({status: false, Message: "Some error occurred while Find The Controller Types!."});
                              } else {
                                 var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result_2), 'SecretKeyOut@123');
                                    ReturnData = ReturnData.toString();
                                 res.status(200).send({Status: true, Response: ReturnData });
                              }
                           });
                        }
                     });
                  } else {
                     res.status(400).send({Status: false, Message: "Controller Type Id can not be valid!" });
                  }
               }
            });
         }
      };
   // Controller Type Delete -----------------------------------------------
      exports.Controller_Type_Delete = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Controller_Type_Id || ReceivingData.Controller_Type_Id === '' ) {
            res.status(400).send({Status: false, Message: "Controller Type Id can not be empty" });
         } else if (!ReceivingData.Modified_By || ReceivingData.Modified_By === ''  ) {
            res.status(400).send({Status: false, Message: "Modified User Details can not be empty" });
         }else {
            CRMSettingsModel.ControllerTypeSchema.findOne({'_id': ReceivingData.Controller_Type_Id}, {}, {}, function(err, result) { // Controller Type FindOne Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Controller Type FindOne Query Error', 'CRM_Settings.controller.js', err);
                  res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Controller Type!."});
               } else {
                  if (result !== null) {
                     result.If_Deleted = true;
                     result.Last_Modified_By = mongoose.Types.ObjectId(ReceivingData.Modified_By);
                     result.save(function(err_1, result_1) { // Controller Type Delete Query
                        if(err_1) {
                           ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Controller Type Delete Query Error', 'CRM_Settings.controller.js');
                           res.status(417).send({Status: false, Error: err_1, Message: "Some error occurred while Delete the Controller Type!."});
                        } else {
                           res.status(200).send({Status: true, Message: 'Successfully Deleted' });
                        }
                     });
                  } else {
                     res.status(400).send({Status: false, Message: "Controller Type Id can not be valid!" });
                  }
               }
            });
         }
      };



      

// ************************************************** Machine Maintenance Part  *****************************************************
   // Machine Maintenance Part Async Validate -----------------------------------------------
      exports.Machine_MaintenancePart_AsyncValidate = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Part_Name || ReceivingData.Part_Name === '' ) {
            res.status(400).send({Status: false, Message: "Machine Maintenance Part Name can not be empty" });
         } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
            res.status(400).send({Status: false, Message: "User Details can not be empty" });
         }else {
            CRMSettingsModel.MachineMaintenancePartSchema.findOne({ 'Part_Name': { $regex : new RegExp("^" + ReceivingData.Part_Name + "$", "i") }, 'If_Deleted': false }, {}, {}, function(err, result) {
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Machine Maintenance Part Name Find Query Error', 'CRM_Settings.controller.js', err);
                  res.status(417).send({status: false, Message: "Some error occurred while Find Maintenance Part Name!."});
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
   // Machine Maintenance Part Create -----------------------------------------------
      exports.Machine_MaintenancePart_Create = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Part_Name || ReceivingData.Part_Name === '' ) {
            res.status(400).send({Status: false, Message: "Machine Maintenance Part Name can not be empty" });
         } else if (!ReceivingData.Created_By || ReceivingData.Created_By === ''  ) {
            res.status(400).send({Status: false, Message: "Creator Details can not be empty" });
         }else {
            var Create_MachineMaintenancePart = new CRMSettingsModel.MachineMaintenancePartSchema({
               Part_Name: ReceivingData.Part_Name,
               Created_By: mongoose.Types.ObjectId(ReceivingData.Created_By),
               Last_Modified_By: mongoose.Types.ObjectId(ReceivingData.Created_By),
               Active_Status: true,
               If_Deleted: false
            });
            Create_MachineMaintenancePart.save(function(err, result) { // Machine Maintenance Part Save Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Machine Maintenance Part Creation Query Error', 'CRM_Settings.controller.js');
                  res.status(417).send({Status: false, Message: "Some error occurred while creating the Machine Maintenance Part!."});
               } else {
                  CRMSettingsModel.MachineMaintenancePartSchema
                     .findOne({'_id': result._id})
                     .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
                     .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
                     .exec(function(err_1, result_1) { // Machine Maintenance Part FindOne Query
                     if(err_1) {
                        ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Machine Maintenance Part Find Query Error', 'CRM_Settings.controller.js', err_1);
                        res.status(417).send({status: false, Message: "Some error occurred while Find The Machine Maintenance Part!."});
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
   // Machine Maintenance Part List -----------------------------------------------
      exports.Machine_MaintenancePart_List = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
            res.status(400).send({Status: false, Message: "User Details can not be empty" });
         }else {
            CRMSettingsModel.MachineMaintenancePartSchema
               .find({'If_Deleted': false }, {}, {sort: { updatedAt: -1 }})
               .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
               .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
               .exec(function(err, result) { // Machine Maintenance Part Find Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Machine Maintenance Parts Find Query Error', 'CRM_Settings.controller.js', err);
                  res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Machine Maintenance Parts!."});
               } else {
                  var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
                  ReturnData = ReturnData.toString();
                  res.status(200).send({Status: true, Response: ReturnData });
               }
            });
         }
      };
   // Machine Maintenance Part Simple List -----------------------------------------------
      exports.Machine_MaintenancePart_SimpleList = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
            res.status(400).send({Status: false, Message: "User Details can not be empty" });
         }else {
            CRMSettingsModel.MachineMaintenancePartSchema.find({ 'If_Deleted': false }, { Part_Name : 1 }, {sort: { updatedAt: -1 }}, function(err, result) { // Machine Type FindOne Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Machine Maintenance Parts Find Query Error', 'CRM_Settings.controller.js', err);
                  res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Machine Maintenance Parts!."});
               } else {
                  var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
                  ReturnData = ReturnData.toString();
                  res.status(200).send({Status: true, Response: ReturnData });
               }
            });
         }
      };
   // Machine Maintenance Part Update -----------------------------------------------
      exports.Machine_MaintenancePart_Update = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Machine_Maintenance_Part_Id || ReceivingData.Machine_Maintenance_Part_Id === '' ) {
            res.status(400).send({Status: false, Message: "Machine Maintenance Part Id can not be empty" });
         }else if(!ReceivingData.Part_Name || ReceivingData.Part_Name === '' ) {
            res.status(400).send({Status: false, Message: "Machine Maintenance Part Name can not be empty" });
         } else if (!ReceivingData.Modified_By || ReceivingData.Modified_By === ''  ) {
            res.status(400).send({Status: false, Message: "Modified User Details can not be empty" });
         }else {
            CRMSettingsModel.MachineMaintenancePartSchema.findOne({'_id': ReceivingData.Machine_Maintenance_Part_Id}, {}, {}, function(err, result) { // Machine Type FindOne Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Machine Maintenance Part FindOne Query Error', 'CRM_Settings.controller.js', err);
                  res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Machine Maintenance Part!."});
               } else {
                  if (result !== null) {
                     result.Part_Name = ReceivingData.Part_Name;
                     result.Last_Modified_By = mongoose.Types.ObjectId(ReceivingData.Modified_By);
                     result.save(function(err_1, result_1) { // Machine Type Update Query
                        if(err_1) {
                           ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Maintenance Part Update Query Error', 'CRM_Settings.controller.js');
                           res.status(417).send({Status: false, Error: err_1, Message: "Some error occurred while Update the Machine Maintenance Part!."});
                        } else {
                           CRMSettingsModel.MachineMaintenancePartSchema
                              .findOne({'_id': result_1._id})
                              .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
                              .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
                              .exec(function(err_2, result_2) { // Machine Type FindOne Query
                              if(err_2) {
                                 ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Machine Maintenance Part Find Query Error', 'CRM_Settings.controller.js', err_2);
                                 res.status(417).send({status: false, Message: "Some error occurred while Find The Machine Maintenance Part!."});
                              } else {
                                 var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result_2), 'SecretKeyOut@123');
                                    ReturnData = ReturnData.toString();
                                 res.status(200).send({Status: true, Response: ReturnData });
                              }
                           });
                        }
                     });
                  } else {
                     res.status(400).send({Status: false, Message: "Machine Maintenance Part Id can not be valid!" });
                  }
               }
            });
         }
      };
   // Machine Maintenance Part Delete -----------------------------------------------
      exports.Machine_MaintenancePart_Delete = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Machine_Maintenance_Part_Id || ReceivingData.Machine_Maintenance_Part_Id === '' ) {
            res.status(400).send({Status: false, Message: "Machine Maintenance Part Id can not be empty" });
         } else if (!ReceivingData.Modified_By || ReceivingData.Modified_By === ''  ) {
            res.status(400).send({Status: false, Message: "Modified User Details can not be empty" });
         }else {
            CRMSettingsModel.MachineMaintenancePartSchema.findOne({'_id': ReceivingData.Machine_Maintenance_Part_Id}, {}, {}, function(err, result) { // Machine Maintenance Part FindOne Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Machine Maintenance Part FindOne Query Error', 'CRM_Settings.controller.js', err);
                  res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Machine Maintenance Part!."});
               } else {
                  if (result !== null) {
                     result.If_Deleted = true;
                     result.Last_Modified_By = mongoose.Types.ObjectId(ReceivingData.Modified_By);
                     result.save(function(err_1, result_1) { // Machine Maintenance Part Delete Query
                        if(err_1) {
                           ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Machine Maintenance Part Delete Query Error', 'CRM_Settings.controller.js');
                           res.status(417).send({Status: false, Error: err_1, Message: "Some error occurred while Delete the Machine Maintenance Part!."});
                        } else {
                           res.status(200).send({Status: true, Message: 'Successfully Deleted' });
                        }
                     });
                  } else {
                     res.status(400).send({Status: false, Message: "Machine Maintenance Part Id can not be valid!" });
                  }
               }
            });
         }
      };




   
// ************************************************** Machine Schedule Activity *****************************************************
   // Machine Schedule Activity Async Validate -----------------------------------------------
      exports.Machine_ScheduleActivity_AsyncValidate = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Activity_Name || ReceivingData.Activity_Name === '' ) {
            res.status(400).send({Status: false, Message: "Machine Schedule Activity Name can not be empty" });
         } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
            res.status(400).send({Status: false, Message: "User Details can not be empty" });
         }else {
            CRMSettingsModel.MachineScheduleActivitySchema.findOne({ 'Activity_Name': { $regex : new RegExp("^" + ReceivingData.Activity_Name + "$", "i") }, 'If_Deleted': false }, {}, {}, function(err, result) {
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Machine Schedule Activity Find Query Error', 'CRM_Settings.controller.js', err);
                  res.status(417).send({status: false, Message: "Some error occurred while Find Machine Schedule Activity!."});
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
   // Machine Schedule Activity Create -----------------------------------------------
      exports.Machine_ScheduleActivity_Create = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Activity_Name || ReceivingData.Activity_Name === '' ) {
            res.status(400).send({Status: false, Message: "Machine Schedule Activity Name can not be empty" });
         } else if (!ReceivingData.Created_By || ReceivingData.Created_By === ''  ) {
            res.status(400).send({Status: false, Message: "Creator Details can not be empty" });
         }else {
            var Create_MachineScheduleActivity = new CRMSettingsModel.MachineScheduleActivitySchema({
               Activity_Name: ReceivingData.Activity_Name,
               Created_By: mongoose.Types.ObjectId(ReceivingData.Created_By),
               Last_Modified_By: mongoose.Types.ObjectId(ReceivingData.Created_By),
               Active_Status: true,
               If_Deleted: false
            });
            Create_MachineScheduleActivity.save(function(err, result) { // Machine Type Save Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Machine Schedule Activity Creation Query Error', 'CRM_Settings.controller.js');
                  res.status(417).send({Status: false, Message: "Some error occurred while creating the Machine Schedule Activity!."});
               } else {
                  CRMSettingsModel.MachineScheduleActivitySchema
                     .findOne({'_id': result._id})
                     .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
                     .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
                     .exec(function(err_1, result_1) { // Machine Type FindOne Query
                     if(err_1) {
                        ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Machine Schedule Activity Find Query Error', 'CRM_Settings.controller.js', err_1);
                        res.status(417).send({status: false, Message: "Some error occurred while Find The Machine Schedule Activity!."});
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
   // Machine Schedule Activity List -----------------------------------------------
      exports.Machine_ScheduleActivity_List = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
            res.status(400).send({Status: false, Message: "User Details can not be empty" });
         }else {
            CRMSettingsModel.MachineScheduleActivitySchema
               .find({'If_Deleted': false }, {}, {sort: { updatedAt: -1 }})
               .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
               .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
               .exec(function(err, result) { // Machine Type FindOne Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Machine Schedule Activity Find Query Error', 'CRM_Settings.controller.js', err);
                  res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Machine Schedule Activity!."});
               } else {
                  var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
                  ReturnData = ReturnData.toString();
                  res.status(200).send({Status: true, Response: ReturnData });
               }
            });
         }
      };
   // Machine Schedule Activity Simple List -----------------------------------------------
      exports.Machine_ScheduleActivity_SimpleList = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
            res.status(400).send({Status: false, Message: "User Details can not be empty" });
         }else {
            CRMSettingsModel.MachineScheduleActivitySchema.find({'If_Deleted': false }, { Activity_Name : 1 }, {sort: { updatedAt: -1 }}, function(err, result) { // Machine Type FindOne Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Machine Schedule Activity Find Query Error', 'CRM_Settings.controller.js', err);
                  res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Machine Schedule Activity!."});
               } else {
                  var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
                  ReturnData = ReturnData.toString();
                  res.status(200).send({Status: true, Response: ReturnData });
               }
            });
         }
      };
   // Machine Schedule Activity Update -----------------------------------------------
      exports.Machine_ScheduleActivity_Update = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Machine_Schedule_Activity_Id || ReceivingData.Machine_Schedule_Activity_Id === '' ) {
            res.status(400).send({Status: false, Message: "Machine Schedule Activity Id can not be empty" });
         }else if(!ReceivingData.Activity_Name || ReceivingData.Activity_Name === '' ) {
            res.status(400).send({Status: false, Message: "Machine Schedule Activity Name can not be empty" });
         } else if (!ReceivingData.Modified_By || ReceivingData.Modified_By === ''  ) {
            res.status(400).send({Status: false, Message: "Modified User Details can not be empty" });
         }else {
            CRMSettingsModel.MachineScheduleActivitySchema.findOne({'_id': ReceivingData.Machine_Schedule_Activity_Id}, {}, {}, function(err, result) { // Machine Schedule Activity FindOne Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Machine Type FindOne Query Error', 'CRM_Settings.controller.js', err);
                  res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Machine Type!."});
               } else {
                  if (result !== null) {
                     result.Activity_Name = ReceivingData.Activity_Name;
                     result.Last_Modified_By = mongoose.Types.ObjectId(ReceivingData.Modified_By);
                     result.save(function(err_1, result_1) { // Machine Schedule Activity Update Query
                        if(err_1) {
                           ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Machine Schedule Activity Update Query Error', 'CRM_Settings.controller.js');
                           res.status(417).send({Status: false, Error: err_1, Message: "Some error occurred while Update the Machine Schedule Activity!."});
                        } else {
                           CRMSettingsModel.MachineScheduleActivitySchema
                              .findOne({'_id': result_1._id})
                              .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
                              .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
                              .exec(function(err_2, result_2) { // Machine Schedule Activity FindOne Query
                              if(err_2) {
                                 ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Machine Schedule Activity Find Query Error', 'CRM_Settings.controller.js', err_2);
                                 res.status(417).send({status: false, Message: "Some error occurred while Find The Machine Schedule Activity!."});
                              } else {
                                 var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result_2), 'SecretKeyOut@123');
                                    ReturnData = ReturnData.toString();
                                 res.status(200).send({Status: true, Response: ReturnData });
                              }
                           });
                        }
                     });
                  } else {
                     res.status(400).send({Status: false, Message: "Machine Schedule Activity Id can not be valid!" });
                  }
               }
            });
         }
      };
   // Machine Schedule Activity Delete -----------------------------------------------
      exports.Machine_ScheduleActivity_Delete = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Machine_Schedule_Activity_Id || ReceivingData.Machine_Schedule_Activity_Id === '' ) {
            res.status(400).send({Status: false, Message: "Machine Type Id can not be empty" });
         } else if (!ReceivingData.Modified_By || ReceivingData.Modified_By === ''  ) {
            res.status(400).send({Status: false, Message: "Modified User Details can not be empty" });
         }else {
            CRMSettingsModel.MachineScheduleActivitySchema.findOne({'_id': ReceivingData.Machine_Schedule_Activity_Id}, {}, {}, function(err, result) { // Machine Schedule Activity FindOne Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Machine Schedule Activity FindOne Query Error', 'CRM_Settings.controller.js', err);
                  res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Machine Schedule Activity!."});
               } else {
                  if (result !== null) {
                     result.If_Deleted = true;
                     result.Last_Modified_By = mongoose.Types.ObjectId(ReceivingData.Modified_By);
                     result.save(function(err_1, result_1) { // Machine Schedule Activity Delete Query
                        if(err_1) {
                           ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Machine Schedule Activity Delete Query Error', 'CRM_Settings.controller.js');
                           res.status(417).send({Status: false, Error: err_1, Message: "Some error occurred while Delete the Machine Schedule Activity!."});
                        } else {
                           res.status(200).send({Status: true, Message: 'Successfully Deleted' });
                        }
                     });
                  } else {
                     res.status(400).send({Status: false, Message: "Machine Schedule Activity Id can not be valid!" });
                  }
               }
            });
         }
      };





// ************************************************** Ticket Type *****************************************************
   // Ticket Type Async Validate -----------------------------------------------
      exports.TicketType_AsyncValidate = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Ticket_Type || ReceivingData.Ticket_Type === '' ) {
            res.status(400).send({Status: false, Message: "Ticket Type can not be empty" });
         } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
            res.status(400).send({Status: false, Message: "User Details can not be empty" });
         }else {
            CRMSettingsModel.TicketTypeSchema.findOne({ 'Ticket_Type': { $regex : new RegExp("^" + ReceivingData.Ticket_Type + "$", "i") }, 'If_Deleted': false }, {}, {}, function(err, result) {
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Ticket Type Find Query Error', 'CRM_Settings.controller.js', err);
                  res.status(417).send({status: false, Message: "Some error occurred while Find Ticket Type!."});
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
   // Ticket Type Create -----------------------------------------------
      exports.Ticket_Type_Create = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Ticket_Type || ReceivingData.Ticket_Type === '' ) {
            res.status(400).send({Status: false, Message: "Ticket Type can not be empty" });
         } else if (!ReceivingData.Created_By || ReceivingData.Created_By === ''  ) {
            res.status(400).send({Status: false, Message: "Creator Details can not be empty" });
         }else {
            var Create_TicketType = new CRMSettingsModel.TicketTypeSchema({
               Ticket_Type: ReceivingData.Ticket_Type,
               Created_By: mongoose.Types.ObjectId(ReceivingData.Created_By),
               Last_Modified_By: mongoose.Types.ObjectId(ReceivingData.Created_By),
               Active_Status: true,
               If_Deleted: false
            });
            Create_TicketType.save(function(err, result) { // Ticket Type Save Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Ticket Type Creation Query Error', 'CRM_Settings.controller.js');
                  res.status(417).send({Status: false, Message: "Some error occurred while creating the Ticket Type!."});
               } else {
                  CRMSettingsModel.TicketTypeSchema
                     .findOne({'_id': result._id})
                     .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
                     .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
                     .exec(function(err_1, result_1) { // Ticket Type FindOne Query
                     if(err_1) {
                        ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Ticket Type Find Query Error', 'CRM_Settings.controller.js', err_1);
                        res.status(417).send({status: false, Message: "Some error occurred while Find The Ticket Types!."});
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
   // Ticket Type List -----------------------------------------------
      exports.Ticket_Type_List = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
            res.status(400).send({Status: false, Message: "User Details can not be empty" });
         }else {
            CRMSettingsModel.TicketTypeSchema
               .find({ 'If_Deleted': false }, {}, {sort: { updatedAt: -1 }})
               .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
               .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
               .exec(function(err, result) { // Ticket Type FindOne Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Ticket Type Find Query Error', 'CRM_Settings.controller.js', err);
                  res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Ticket Types!."});
               } else {
                  var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
                  ReturnData = ReturnData.toString();
                  res.status(200).send({Status: true, Response: ReturnData });
               }
            });
         }
      };
   // Ticket Type Simple List -----------------------------------------------
      exports.Ticket_Type_SimpleList = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
            res.status(400).send({Status: false, Message: "User Details can not be empty" });
         }else {
            CRMSettingsModel.TicketTypeSchema.find({ 'If_Deleted': false }, { Ticket_Type : 1 }, {sort: { updatedAt: -1 }}, function(err, result) { // Ticket Type FindOne Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Ticket Type Find Query Error', 'CRM_Settings.controller.js', err);
                  res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Ticket Types!."});
               } else {
                  var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
                  ReturnData = ReturnData.toString();
                  res.status(200).send({Status: true, Response: ReturnData });
               }
            });
         }
      };
   // Ticket Type Update -----------------------------------------------
      exports.Ticket_Type_Update = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Ticket_Type_Id || ReceivingData.Ticket_Type_Id === '' ) {
            res.status(400).send({Status: false, Message: "Ticket Type Id can not be empty" });
         }else if(!ReceivingData.Ticket_Type || ReceivingData.Ticket_Type === '' ) {
            res.status(400).send({Status: false, Message: "Ticket Type can not be empty" });
         } else if (!ReceivingData.Modified_By || ReceivingData.Modified_By === ''  ) {
            res.status(400).send({Status: false, Message: "Modified User Details can not be empty" });
         }else {
            CRMSettingsModel.TicketTypeSchema.findOne({'_id': ReceivingData.Ticket_Type_Id}, {}, {}, function(err, result) { // Ticket Type FindOne Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Ticket Type FindOne Query Error', 'CRM_Settings.controller.js', err);
                  res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Ticket Type!."});
               } else {
                  if (result !== null) {
                     result.Ticket_Type = ReceivingData.Ticket_Type;
                     result.Last_Modified_By = mongoose.Types.ObjectId(ReceivingData.Modified_By);
                     result.save(function(err_1, result_1) { // Ticket Type Update Query
                        if(err_1) {
                           ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Ticket Type Update Query Error', 'CRM_Settings.controller.js');
                           res.status(417).send({Status: false, Error: err_1, Message: "Some error occurred while Update the Ticket Type!."});
                        } else {
                           CRMSettingsModel.TicketTypeSchema
                              .findOne({'_id': result_1._id})
                              .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
                              .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
                              .exec(function(err_2, result_2) { // Ticket Type FindOne Query
                              if(err_2) {
                                 ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Ticket Type Find Query Error', 'CRM_Settings.controller.js', err_2);
                                 res.status(417).send({status: false, Message: "Some error occurred while Find The Ticket Types!."});
                              } else {
                                 var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result_2), 'SecretKeyOut@123');
                                    ReturnData = ReturnData.toString();
                                 res.status(200).send({Status: true, Response: ReturnData });
                              }
                           });
                        }
                     });
                  } else {
                     res.status(400).send({Status: false, Message: "Ticket Type Id can not be valid!" });
                  }
               }
            });
         }
      };
   // Ticket Type Delete -----------------------------------------------
      exports.Ticket_Type_Delete = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Ticket_Type_Id || ReceivingData.Ticket_Type_Id === '' ) {
            res.status(400).send({Status: false, Message: "Ticket Type Id can not be empty" });
         } else if (!ReceivingData.Modified_By || ReceivingData.Modified_By === ''  ) {
            res.status(400).send({Status: false, Message: "Modified User Details can not be empty" });
         }else {
            CRMSettingsModel.TicketTypeSchema.findOne({'_id': ReceivingData.Ticket_Type_Id}, {}, {}, function(err, result) { // Ticket Type FindOne Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Ticket Type FindOne Query Error', 'CRM_Settings.controller.js', err);
                  res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Ticket Type!."});
               } else {
                  if (result !== null) {
                     result.If_Deleted = true;
                     result.Last_Modified_By = mongoose.Types.ObjectId(ReceivingData.Modified_By);
                     result.save(function(err_1, result_1) { // Ticket Type Delete Query
                        if(err_1) {
                           ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Settings Ticket Type Delete Query Error', 'CRM_Settings.controller.js');
                           res.status(417).send({Status: false, Error: err_1, Message: "Some error occurred while Delete the Ticket Type!."});
                        } else {
                           res.status(200).send({Status: true, Message: 'Successfully Deleted' });
                        }
                     });
                  } else {
                     res.status(400).send({Status: false, Message: "Ticket Type Id can not be valid!" });
                  }
               }
            });
         }
      };