var CryptoJS = require("crypto-js");
var HrSettingsModel = require('./../../models/settings/Hr_Settings.model.js');
var ErrorManagement = require('./../../../handling/ErrorHandling.js');
var mongoose = require('mongoose');


// ************************************************** Department *****************************************************
// -------------------------------------------------- Department Async Validate -----------------------------------------------
   exports.Department_AsyncValidate = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

      if(!ReceivingData.Department || ReceivingData.Department === '' ) {
         res.status(400).send({Status: false, Message: "Department can not be empty" });
      } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
         res.status(400).send({Status: false, Message: "User Details can not be empty" });
      }else {
         HrSettingsModel.DepartmentSchema.findOne({ 'Department': { $regex : new RegExp("^" + ReceivingData.Department + "$", "i") }, 'If_Deleted': false }, {}, {}, function(err, result) {
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Department Find Query Error', 'Hr_Settings.controller.js', err);
               res.status(417).send({status: false, Message: "Some error occurred while Find Department!."});
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
// Department Create -----------------------------------------------
   exports.Department_Create = function(req, res) {
      var CryptoBytes = CryptoJS.AES.decrypt( req.body.Info , 'SecretKeyIn@123' );
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
      
      if(!ReceivingData.Department || ReceivingData.Department === '' ) {
         res.status(400).send({Status: false, Message: "Department can not be empty" });
      } else if (!ReceivingData.Created_By || ReceivingData.Created_By === ''  ) {
         res.status(400).send({Status: false, Message: "Creator Details can not be empty" });
      }else {
         var Create_Department = new HrSettingsModel.DepartmentSchema({
            Department: ReceivingData.Department,
            Created_By: mongoose.Types.ObjectId(ReceivingData.Created_By),
            Last_Modified_By: mongoose.Types.ObjectId(ReceivingData.Created_By),
            Active_Status: true,
            If_Deleted: false
         });
         Create_Department.save(function(err, result) { // Department Save Query
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'HR Settings Department Creation Query Error', 'Hr_Settings.controller.js');
               res.status(417).send({Status: false, Message: "Some error occurred while creating the Department!."});
            } else {
               HrSettingsModel.DepartmentSchema
                  .findOne({'_id': result._id})
                  .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
                  .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
                  .exec(function(err_1, result_1) { // Department FindOne Query
                  if(err_1) {
                     ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'HR Settings Department Find Query Error', 'Hr_Settings.controller.js', err_1);
                     res.status(417).send({status: false, Message: "Some error occurred while Find The Department!."});
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
// Department List -----------------------------------------------
   exports.Department_List = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

      if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
         res.status(400).send({Status: false, Message: "User Details can not be empty" });
      }else {
         HrSettingsModel.DepartmentSchema
         .find({ 'If_Deleted': false }, {}, {sort: { updatedAt: -1 }})
         .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
         .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
         .exec(function(err, result) { // Department FindOne Query
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Hr Settings Department Find Query Error', 'Hr_Settings.controller.js', err);
            res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Department!."});
         } else {
            var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
            ReturnData = ReturnData.toString();
            res.status(200).send({Status: true, Response: ReturnData });
         }
      });
      }
   };
// Department Simple List -----------------------------------------------
   exports.Department_SimpleList = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

      if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
         res.status(400).send({Status: false, Message: "User Details can not be empty" });
      }else {
         HrSettingsModel.DepartmentSchema.find({ 'If_Deleted': false }, { Department : 1 }, {sort: { updatedAt: -1 }}, function(err, result) { // Department FindOne Query
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Hr Department Find Query Error', 'Hr_Settings.controller.js', err);
               res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Department!."});
            } else {
               var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
               ReturnData = ReturnData.toString();
               res.status(200).send({Status: true, Response: ReturnData });
            }
         });
      }
   };
// Department Update -----------------------------------------------
   exports. Department_Update = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

      if(!ReceivingData. Department_Id || ReceivingData.Department_Id === '' ) {
         res.status(400).send({Status: false, Message: "Department Id can not be empty" });
      }else if(!ReceivingData.Department || ReceivingData.Department === '' ) {
         res.status(400).send({Status: false, Message: "Department can not be empty" });
      } else if (!ReceivingData.Modified_By || ReceivingData.Modified_By === ''  ) {
         res.status(400).send({Status: false, Message: "Modified User Details can not be empty" });
      }else {
         HrSettingsModel.DepartmentSchema.findOne({'_id': ReceivingData.Department_Id}, {}, {}, function(err, result) { // Department FindOne Query
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'HR  Department FindOne Query Error', 'Hr_Settings.controller.js', err);
               res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Department!."});
            } else {
               if (result !== null) {
                  result.Department = ReceivingData.Department;
                  result.Last_Modified_By = mongoose.Types.ObjectId(ReceivingData.Modified_By);
                  result.save(function(err_1, result_1) { //  Department  Update Query
                     if(err_1) {
                        ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Hr Settings  Department  Update Query Error', 'Hr_Settings.controller.js');
                        res.status(417).send({Status: false, Error: err_1, Message: "Some error occurred while Update the  Department !."});
                     } else {
                        HrSettingsModel.DepartmentSchema
                           .findOne({'_id': result_1._id})
                           .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
                           .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
                           .exec(function(err_2, result_2) { //  Department  FindOne Query
                           if(err_2) {
                              ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Hr Settings  Department Find Query Error', 'Hr_Settings.controller.js', err_2);
                              res.status(417).send({status: false, Message: "Some error occurred while Find The  Department!."});
                           } else {
                              var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result_2), 'SecretKeyOut@123');
                                 ReturnData = ReturnData.toString();
                              res.status(200).send({Status: true, Response: ReturnData });
                           }
                        });
                     }
                  });
               } else {
                  res.status(400).send({Status: false, Message: "Department Id can not be valid!" });
               }
            }
         });
      }
   };
// Department Delete -----------------------------------------------
   exports.Department_Delete = function(req, res) { 
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

      if(!ReceivingData.Department_Id || ReceivingData.Department_Id === '' ) {
         res.status(400).send({Status: false, Message: "Department Id can not be empty" });
      } else if (!ReceivingData.Modified_By || ReceivingData.Modified_By === ''  ) {
         res.status(400).send({Status: false, Message: "Modified User Details can not be empty" });
      }else {
         HrSettingsModel.DepartmentSchema.findOne({'_id': ReceivingData.Department_Id}, {}, {}, function(err, result) { // Department FindOne Query
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'HR Department FindOne Query Error', 'Hr_Settings.controller.js', err);
               res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Department!."});
            } else {
               if (result !== null) {
                  result.If_Deleted = true;
                  result.Last_Modified_By = ReceivingData.Modified_By;
                  result.save(function(err_1, result_1) { // Department Delete Query
                     if(err_1) {
                        ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'HR Department Delete Query Error', 'Hrms_Settings.controller.js');
                        res.status(417).send({Status: false, Error: err_1, Message: "Some error occurred while Delete the Department!."});
                     } else {
                        res.status(200).send({Status: true, Message: 'Successfully Deleted' });
                     }
                  });
               } else {
                  res.status(400).send({Status: false, Message: "Department Id can not be valid!" });
               }
            }
         });
      }
   };



   
// ************************************************** Designation *****************************************************
// -------------------------------------------------- Designation Async Validate -----------------------------------------------
exports.Designation_AsyncValidate = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Designation || ReceivingData.Designation === '' ) {
      res.status(400).send({Status: false, Message: "Designation can not be empty" });
   } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   }else {
      HrSettingsModel.DesignationSchema.findOne({ 'Designation': { $regex : new RegExp("^" + ReceivingData.Designation + "$", "i") }, 'If_Deleted': false }, {}, {}, function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Designation Find Query Error', 'Hr_Settings.controller.js', err);
            res.status(417).send({status: false, Message: "Some error occurred while Find Designation!."});
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
// Designation Create -----------------------------------------------
exports.Designation_Create = function(req, res) {
   var CryptoBytes = CryptoJS.AES.decrypt( req.body.Info , 'SecretKeyIn@123' );
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
   
   if(!ReceivingData.Designation || ReceivingData.Designation === '' ) {
      res.status(400).send({Status: false, Message: "Designation can not be empty" });
   } else if (!ReceivingData.Created_By || ReceivingData.Created_By === ''  ) {
      res.status(400).send({Status: false, Message: "Creator Details can not be empty" });
   }else {
      var Create_Designation = new HrSettingsModel.DesignationSchema({
         Designation: ReceivingData.Designation,
         Created_By: mongoose.Types.ObjectId(ReceivingData.Created_By),
         Last_Modified_By: mongoose.Types.ObjectId(ReceivingData.Created_By),
         Active_Status: true,
         If_Deleted: false
      });
      Create_Designation.save(function(err, result) { // Designation Save Query
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'HR Settings Designation Creation Query Error', 'Hr_Settings.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while creating the Designation!."});
         } else {
            HrSettingsModel.DesignationSchema
               .findOne({'_id': result._id})
               .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
               .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
               .exec(function(err_1, result_1) { // Designation FindOne Query
               if(err_1) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'HR Settings Designation Find Query Error', 'Hr_Settings.controller.js', err_1);
                  res.status(417).send({status: false, Message: "Some error occurred while Find The Designation!."});
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
// Designation List -----------------------------------------------
exports.Designation_List = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   }else {
      HrSettingsModel.DesignationSchema
      .find({ 'If_Deleted': false }, {}, {sort: { updatedAt: -1 }})
      .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
      .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
      .exec(function(err, result) { // Designation FindOne Query
      if(err) {
         ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Hr Settings Designation Find Query Error', 'Hr_Settings.controller.js', err);
         res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Designation!."});
      } else {
         var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
         ReturnData = ReturnData.toString();
         res.status(200).send({Status: true, Response: ReturnData });
      }
   });
   }
};
// Designation Simple List -----------------------------------------------
exports.Designation_SimpleList = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   }else {
      HrSettingsModel.DesignationSchema.find({ 'If_Deleted': false }, { Designation : 1 }, {sort: { updatedAt: -1 }}, function(err, result) { // Designation FindOne Query
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Hr Designation Find Query Error', 'Hr_Settings.controller.js', err);
            res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Designation!."});
         } else {
            var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
            ReturnData = ReturnData.toString();
            res.status(200).send({Status: true, Response: ReturnData });
         }
      });
   }
};
// Designation Update -----------------------------------------------
exports. Designation_Update = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData. Designation_Id || ReceivingData.Designation_Id === '' ) {
      res.status(400).send({Status: false, Message: "Designation Id can not be empty" });
   }else if(!ReceivingData.Designation || ReceivingData.Designation === '' ) {
      res.status(400).send({Status: false, Message: "Designation can not be empty" });
   } else if (!ReceivingData.Modified_By || ReceivingData.Modified_By === ''  ) {
      res.status(400).send({Status: false, Message: "Modified User Details can not be empty" });
   }else {
      HrSettingsModel.DesignationSchema.findOne({'_id': ReceivingData.Designation_Id}, {}, {}, function(err, result) { // Designation FindOne Query
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'HR  Designation FindOne Query Error', 'Hr_Settings.controller.js', err);
            res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Designation!."});
         } else {
            if (result !== null) {
               result.Designation = ReceivingData.Designation;
               result.Last_Modified_By = mongoose.Types.ObjectId(ReceivingData.Modified_By);
               result.save(function(err_1, result_1) { //  Designation  Update Query
                  if(err_1) {
                     ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Hr Settings  Designation  Update Query Error', 'Hr_Settings.controller.js');
                     res.status(417).send({Status: false, Error: err_1, Message: "Some error occurred while Update the  Designation !."});
                  } else {
                     HrSettingsModel.DesignationSchema
                        .findOne({'_id': result_1._id})
                        .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
                        .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
                        .exec(function(err_2, result_2) { //  Designation  FindOne Query
                        if(err_2) {
                           ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Hr Settings  Designation Find Query Error', 'Hr_Settings.controller.js', err_2);
                           res.status(417).send({status: false, Message: "Some error occurred while Find The  Designation!."});
                        } else {
                           var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result_2), 'SecretKeyOut@123');
                              ReturnData = ReturnData.toString();
                           res.status(200).send({Status: true, Response: ReturnData });
                        }
                     });
                  }
               });
            } else {
               res.status(400).send({Status: false, Message: "Designation Id can not be valid!" });
            }
         }
      });
   }
};
// Designation Delete -----------------------------------------------
exports.Designation_Delete = function(req, res) { 
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Designation_Id || ReceivingData.Designation_Id === '' ) {
      res.status(400).send({Status: false, Message: "Designation Id can not be empty" });
   } else if (!ReceivingData.Modified_By || ReceivingData.Modified_By === ''  ) {
      res.status(400).send({Status: false, Message: "Modified User Details can not be empty" });
   }else {
      HrSettingsModel.DesignationSchema.findOne({'_id': ReceivingData.Designation_Id}, {}, {}, function(err, result) { // Designation FindOne Query
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'HR Designation FindOne Query Error', 'Hr_Settings.controller.js', err);
            res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Designation!."});
         } else {
            if (result !== null) {
               result.If_Deleted = true;
               result.Last_Modified_By = ReceivingData.Modified_By;
               result.save(function(err_1, result_1) { // Designation Delete Query
                  if(err_1) {
                     ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'HR Designation Delete Query Error', 'Hrms_Settings.controller.js');
                     res.status(417).send({Status: false, Error: err_1, Message: "Some error occurred while Delete the Designation!."});
                  } else {
                     res.status(200).send({Status: true, Message: 'Successfully Deleted' });
                  }
               });
            } else {
               res.status(400).send({Status: false, Message: "Designation Id can not be valid!" });
            }
         }
      });
   }
};

// ************************************************** Earnings *****************************************************
// -------------------------------------------------- Earnings Async Validate -----------------------------------------------
exports.Earnings_AsyncValidate = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Earnings_Type || ReceivingData.Earnings_Type === '' ) {
      res.status(400).send({Status: false, Message: "Earnings Type can not be empty" });
   } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   }else {
      HrSettingsModel.EarningsSchema.findOne({'Earnings_Type': { $regex : new RegExp("^" + ReceivingData.Earnings_Type + "$", "i") }, 'If_Deleted': false }, {}, {}, function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Earnings Find Query Error', 'Hr_Settings.controller.js', err);
            res.status(417).send({status: false, Message: "Some error occurred while Find Earnings!."});
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
// Earnings Create -----------------------------------------------
   exports.Earnings_Create = function(req, res) {
      var CryptoBytes = CryptoJS.AES.decrypt( req.body.Info , 'SecretKeyIn@123' );
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
      
      if(!ReceivingData.Earnings_Type || ReceivingData.Earnings_Type === '' ) {
         res.status(400).send({Status: false, Message: "Earnings can not be empty" });
      } else if (!ReceivingData.Created_By || ReceivingData.Created_By === ''  ) {
         res.status(400).send({Status: false, Message: "Creator Details can not be empty" });
      }else {
         console.log(ReceivingData);
         
         var Create_Earnings = new HrSettingsModel.EarningsSchema({
            Earnings_Type: ReceivingData.Earnings_Type,
            Created_By: mongoose.Types.ObjectId(ReceivingData.Created_By),
            Last_Modified_By: mongoose.Types.ObjectId(ReceivingData.Created_By),
            Active_Status: true,
            If_Deleted: false
         });
         Create_Earnings.save(function(err, result) { // Earnings Save Query
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'HR Settings Earnings Creation Query Error', 'Hr_Settings.controller.js');
               res.status(417).send({Status: false, Message: "Some error occurred while creating the Earnings!."});
            } else {
               HrSettingsModel.EarningsSchema
                  .findOne({'_id': result._id})
                  .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
                  .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
                  .exec(function(err_1, result_1) { // Earnings FindOne Query
                  if(err_1) {
                     ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'HR Settings Earnings Find Query Error', 'Hr_Settings.controller.js', err_1);
                     res.status(417).send({status: false, Message: "Some error occurred while Find The Earnings!."});
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
// Earnings List -----------------------------------------------
   exports.Earnings_List = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

      if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
         res.status(400).send({Status: false, Message: "User Details can not be empty" });
      }else {
         HrSettingsModel.EarningsSchema
         .find({ 'If_Deleted': false }, {}, {sort: { updatedAt: -1 }})
         .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
         .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
         .exec(function(err, result) { // Department FindOne Query
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Hr Settings Earnings Find Query Error', 'Hr_Settings.controller.js', err);
            res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Earnings!."});
         } else {
            var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
            ReturnData = ReturnData.toString();
            res.status(200).send({Status: true, Response: ReturnData });
         }
      });
      }
   };

// Earnings Simple List -----------------------------------------------
   exports.Earnings_SimpleList = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

      if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
         res.status(400).send({Status: false, Message: "User Details can not be empty" });
      }else {
         HrSettingsModel.EarningsSchema.find({ 'If_Deleted': false }, { Earnings_Type : 1 }, {sort: { updatedAt: -1 }}, function(err, result) { // Earnings FindOne Query
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Hr Earnings Find Query Error', 'Hr_Settings.controller.js', err);
               res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Earnings!."});
            } else {
               var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
               ReturnData = ReturnData.toString();
               res.status(200).send({Status: true, Response: ReturnData });
            }
         });
      }
   };

// Earnings Update -----------------------------------------------
   exports. Earnings_Update = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

      if(!ReceivingData. Earnings_Type_Id || ReceivingData.Earnings_Type_Id === '' ) {
         res.status(400).send({Status: false, Message: "Earnings Id can not be empty" });
      }else if(!ReceivingData.Earnings_Type || ReceivingData.Earnings_Type === '' ) {
         res.status(400).send({Status: false, Message: "Earnings can not be empty" });
      } else if (!ReceivingData.Modified_By || ReceivingData.Modified_By === ''  ) {
         res.status(400).send({Status: false, Message: "Modified User Details can not be empty" });
      }else {
         HrSettingsModel.EarningsSchema.findOne({'_id': ReceivingData.Earnings_Type_Id}, {}, {}, function(err, result) { // Earnings FindOne Query
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'HR  Earnings FindOne Query Error', 'Hr_Settings.controller.js', err);
               res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Earnings!."});
            } else {
               if (result !== null) {
                  result.Earnings_Type = ReceivingData.Earnings_Type;
                  result.Last_Modified_By = mongoose.Types.ObjectId(ReceivingData.Modified_By);
                  result.save(function(err_1, result_1) { //  Earnings  Update Query
                     if(err_1) {
                        ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Hr Settings  Earnings  Update Query Error', 'Hr_Settings.controller.js');
                        res.status(417).send({Status: false, Error: err_1, Message: "Some error occurred while Update the  Earnings !."});
                     } else {
                        HrSettingsModel.EarningsSchema
                           .findOne({'_id': result_1._id})
                           .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
                           .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
                           .exec(function(err_2, result_2) { //  Earnings  FindOne Query
                           if(err_2) {
                              ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Hr Settings  Earnings Find Query Error', 'Hr_Settings.controller.js', err_2);
                              res.status(417).send({status: false, Message: "Some error occurred while Find The  Earnings!."});
                           } else {
                              var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result_2), 'SecretKeyOut@123');
                                 ReturnData = ReturnData.toString();
                              res.status(200).send({Status: true, Response: ReturnData });
                           }
                        });
                     }
                  });
               } else {
                  res.status(400).send({Status: false, Message: "Earnings Id can not be valid!" });
               }
            }
         });
      }
   };

// Earnings Delete -----------------------------------------------
   exports.Earnings_Delete = function(req, res) { 
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

      if(!ReceivingData.Earnings_Type_Id || ReceivingData.Earnings_Type_Id === '' ) {
         res.status(400).send({Status: false, Message: "Earnings Id can not be empty" });
      } else if (!ReceivingData.Modified_By || ReceivingData.Modified_By === ''  ) {
         res.status(400).send({Status: false, Message: "Modified User Details can not be empty" });
      }else {
         HrSettingsModel.EarningsSchema.findOne({'_id': ReceivingData.Earnings_Type_Id}, {}, {}, function(err, result) { // Earnings FindOne Query
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'HR Earnings FindOne Query Error', 'Hr_Settings.controller.js', err);
               res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Earnings!."});
            } else {
               if (result !== null) {
                  result.If_Deleted = true;
                  result.Last_Modified_By = ReceivingData.Modified_By;
                  result.save(function(err_1, result_1) { // Earnings Delete Query
                     if(err_1) {
                        ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'HR Earnings Delete Query Error', 'Hrms_Settings.controller.js');
                        res.status(417).send({Status: false, Error: err_1, Message: "Some error occurred while Delete the Earnings!."});
                     } else {
                        res.status(200).send({Status: true, Message: 'Successfully Deleted' });
                     }
                  });
               } else {
                  res.status(400).send({Status: false, Message: "Earnings Id can not be valid!" });
               }
            }
         });
      }
   };

// ************************************************** Detections *****************************************************
// -------------------------------------------------- Detections Async Validate -----------------------------------------------
   exports.Detections_AsyncValidate = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

      if(!ReceivingData.Detections_Type || ReceivingData.Detections_Type === '' ) {
         res.status(400).send({Status: false, Message: "Detections Type can not be empty" });
      } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
         res.status(400).send({Status: false, Message: "User Details can not be empty" });
      }else {
         HrSettingsModel.DetectionsSchema.findOne({'Detections_Type': { $regex : new RegExp("^" + ReceivingData.Detections_Type + "$", "i") }, 'If_Deleted': false }, {}, {}, function(err, result) {
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Detections Find Query Error', 'Hr_Settings.controller.js', err);
               res.status(417).send({status: false, Message: "Some error occurred while Find Detections!."});
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
// Detections Create -----------------------------------------------
   exports.Detections_Create = function(req, res) {
      var CryptoBytes = CryptoJS.AES.decrypt( req.body.Info , 'SecretKeyIn@123' );
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
      
      if(!ReceivingData.Detections_Type || ReceivingData.Detections_Type === '' ) {
         res.status(400).send({Status: false, Message: "Detections can not be empty" });
      } else if (!ReceivingData.Created_By || ReceivingData.Created_By === ''  ) {
         res.status(400).send({Status: false, Message: "Creator Details can not be empty" });
      }else {
      var Create_Detections = new HrSettingsModel.DetectionsSchema({
            Detections_Type: ReceivingData.Detections_Type,
            Created_By: mongoose.Types.ObjectId(ReceivingData.Created_By),
            Last_Modified_By: mongoose.Types.ObjectId(ReceivingData.Created_By),
            Active_Status: true,
            If_Deleted: false
         });
         Create_Detections.save(function(err, result) { // Detections Save Query
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'HR Settings Detections Creation Query Error', 'Hr_Settings.controller.js');
               res.status(417).send({Status: false, Message: "Some error occurred while creating the Detections!."});
            } else {
               HrSettingsModel.DetectionsSchema
                  .findOne({'_id': result._id})
                  .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
                  .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
                  .exec(function(err_1, result_1) { // Detections FindOne Query
                  if(err_1) {
                     ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'HR Settings Detections Find Query Error', 'Hr_Settings.controller.js', err_1);
                     res.status(417).send({status: false, Message: "Some error occurred while Find The Detections!."});
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
// Detections List -----------------------------------------------
   exports.Detections_List = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

      if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
         res.status(400).send({Status: false, Message: "User Details can not be empty" });
      }else {
         HrSettingsModel.DetectionsSchema
         .find({'If_Deleted': false }, {}, {sort: { updatedAt: -1 }})
         .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
         .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
         .exec(function(err, result) { // Department FindOne Query
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Hr Settings Detections Find Query Error', 'Hr_Settings.controller.js', err);
            res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Detections!."});
         } else {
            var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
            ReturnData = ReturnData.toString();
            res.status(200).send({Status: true, Response: ReturnData });
         }
      });
      }
   };
// Detections Simple List -----------------------------------------------
   exports.Detections_SimpleList = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

      if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
         res.status(400).send({Status: false, Message: "User Details can not be empty" });
      }else {
         HrSettingsModel.DetectionsSchema.find({ 'If_Deleted': false }, { Detections_Type : 1 }, {sort: { updatedAt: -1 }}, function(err, result) { // Detections FindOne Query
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Hr Detections Find Query Error', 'Hr_Settings.controller.js', err);
               res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Detections!."});
            } else {
               var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
               ReturnData = ReturnData.toString();
               res.status(200).send({Status: true, Response: ReturnData });
            }
         });
      }
   };
// Detections Update -----------------------------------------------
   exports. Detections_Update = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

      if(!ReceivingData. Detections_Type_Id || ReceivingData.Detections_Type_Id === '' ) {
         res.status(400).send({Status: false, Message: "Detections Id can not be empty" });
      }else if(!ReceivingData.Detections_Type || ReceivingData.Detections_Type === '' ) {
         res.status(400).send({Status: false, Message: "Detections can not be empty" });
      } else if (!ReceivingData.Modified_By || ReceivingData.Modified_By === ''  ) {
         res.status(400).send({Status: false, Message: "Modified User Details can not be empty" });
      }else {
         HrSettingsModel.DetectionsSchema.findOne({'_id': ReceivingData.Detections_Type_Id}, {}, {}, function(err, result) { // Detections FindOne Query
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'HR  Detections FindOne Query Error', 'Hr_Settings.controller.js', err);
               res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Detections!."});
            } else {
               if (result !== null) {
                  result.Detections_Type = ReceivingData.Detections_Type;
                  result.Last_Modified_By = mongoose.Types.ObjectId(ReceivingData.Modified_By);
                  result.save(function(err_1, result_1) { //  Detections  Update Query
                     if(err_1) {
                        ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Hr Settings  Detections  Update Query Error', 'Hr_Settings.controller.js');
                        res.status(417).send({Status: false, Error: err_1, Message: "Some error occurred while Update the  Detections !."});
                     } else {
                        HrSettingsModel.DetectionsSchema
                           .findOne({'_id': result_1._id})
                           .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
                           .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
                           .exec(function(err_2, result_2) { //  Detections  FindOne Query
                           if(err_2) {
                              ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Hr Settings  Detections Find Query Error', 'Hr_Settings.controller.js', err_2);
                              res.status(417).send({status: false, Message: "Some error occurred while Find The  Detections!."});
                           } else {
                              var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result_2), 'SecretKeyOut@123');
                                 ReturnData = ReturnData.toString();
                              res.status(200).send({Status: true, Response: ReturnData });
                           }
                        });
                     }
                  });
               } else {
                  res.status(400).send({Status: false, Message: "Detections Id can not be valid!" });
               }
            }
         });
      }
   };
// Detections Delete -----------------------------------------------
   exports.Detections_Delete = function(req, res) { 
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

      if(!ReceivingData.Detections_Type_Id || ReceivingData.Detections_Type_Id === '' ) {
         res.status(400).send({Status: false, Message: "Detections Id can not be empty" });
      } else if (!ReceivingData.Modified_By || ReceivingData.Modified_By === ''  ) {
         res.status(400).send({Status: false, Message: "Modified User Details can not be empty" });
      }else {
         HrSettingsModel.DetectionsSchema.findOne({'_id': ReceivingData.Detections_Type_Id}, {}, {}, function(err, result) { // Detections FindOne Query
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'HR Detections FindOne Query Error', 'Hr_Settings.controller.js', err);
               res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Detections!."});
            } else {
               if (result !== null) {
                  result.If_Deleted = true;
                  result.Last_Modified_By = ReceivingData.Modified_By;
                  result.save(function(err_1, result_1) { // Detections Delete Query
                     if(err_1) {
                        ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'HR Detections Delete Query Error', 'Hrms_Settings.controller.js');
                        res.status(417).send({Status: false, Error: err_1, Message: "Some error occurred while Delete the Detections!."});
                     } else {
                        res.status(200).send({Status: true, Message: 'Successfully Deleted' });
                     }
                  });
               } else {
                  res.status(400).send({Status: false, Message: "Detections Id can not be valid!" });
               }
            }
         });
      }
   };

