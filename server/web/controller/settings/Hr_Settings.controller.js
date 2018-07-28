var CryptoJS = require("crypto-js");
var HrSettingsModel = require('./../../models/settings/Hr_Settings.model.js');
var ErrorManagement = require('./../../../handling/ErrorHandling.js');


// ************************************************** Employee category *****************************************************
   // Employee category Create -----------------------------------------------
      exports.Employee_category_Create = function(req, res) {
         var CryptoBytes = CryptoJS.AES.decrypt( req.body.Info , 'SecretKeyIn@123' );
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
         
         if(!ReceivingData.Employee_Category || ReceivingData.Employee_Category === '' ) {
            res.status(400).send({Status: false, Message: "Employee category can not be empty" });
         } else if (!ReceivingData.Company_Id || ReceivingData.Company_Id === ''  ) {
            res.status(400).send({Status: false, Message: "Company Details can not be empty" });
         } else if (!ReceivingData.Created_By || ReceivingData.Created_By === ''  ) {
            res.status(400).send({Status: false, Message: "Creator Details can not be empty" });
         }else {
            var Create_EmployeeCategory = new HrSettingsModel.EmployeeCategorySchema({
               Employee_Category: ReceivingData.Employee_Category, 
               Company_Id: ReceivingData.Company_Id,
               Created_By: ReceivingData.Created_By,
               Last_Modified_By: ReceivingData.Created_By,
               Active_Status: true,
               If_Deleted: false
            });
            Create_EmployeeCategory.save(function(err, result) { // Employee category Save Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'HR Employee category Creation Query Error', 'Hr_Settings.controller.js');
                  res.status(417).send({Status: false, Error: err, Message: "Some error occurred while creating the Employee category!."});
               } else {
                  var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
                  ReturnData = ReturnData.toString();
                  res.status(200).send({Status: true, Response: ReturnData });
               }
            });
         }
      };

   // Employee category List -----------------------------------------------
      exports.Employee_category_List = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '' ) {
            res.status(400).send({Status: false, Message: "Company Details can not be empty" });
         } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
            res.status(400).send({Status: false, Message: "User Details can not be empty" });
         }else {
            HrSettingsModel.EmployeeCategorySchema.find({'Company_Id': ReceivingData.Company_Id, 'If_Deleted': false }, {}, {sort: { updatedAt: -1 }}, function(err, result) { // Employee category FindOne Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'HR Employee category Find Query Error', 'Hr_Settings.controller.js', err);
                  res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Employee category!."});
               } else {
                  var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
                  ReturnData = ReturnData.toString();
                  res.status(200).send({Status: true, Response: ReturnData });
               }
            });
         }
      };

   // Employee category Simple List -----------------------------------------------
      exports.Employee_category_SimpleList = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '' ) {
            res.status(400).send({Status: false, Message: "Company Details can not be empty" });
         } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
            res.status(400).send({Status: false, Message: "User Details can not be empty" });
         }else {
            HrSettingsModel.EmployeeCategorySchema.find({'Company_Id': ReceivingData.Company_Id, 'If_Deleted': false }, { Industry_Type : 1 }, {sort: { updatedAt: -1 }}, function(err, result) { // Employee category FindOne Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Hr Employee category Find Query Error', 'Hr_Settings.controller.js', err);
                  res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Employee category!."});
               } else {
                  var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
                  ReturnData = ReturnData.toString();
                  res.status(200).send({Status: true, Response: ReturnData });
               }
            });
         }
      };

   //  Employee category Update -----------------------------------------------
      exports. Employee_category_Update = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData. Employee_category_Id || ReceivingData.Employee_category_Id === '' ) {
            res.status(400).send({Status: false, Message: "Employee Category Id can not be empty" });
         }else if(!ReceivingData.Employee_Category || ReceivingData.Employee_Category === '' ) {
            res.status(400).send({Status: false, Message: "Employee Category can not be empty" });
         } else if (!ReceivingData.Modified_By || ReceivingData.Modified_By === ''  ) {
            res.status(400).send({Status: false, Message: "Modified User Details can not be empty" });
         }else {
            HrSettingsModel.EmployeeCategorySchema.findOne({'_id': ReceivingData.Employee_category_Id}, {}, {}, function(err, result) { // Employee category FindOne Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'HR  Employee category FindOne Query Error', 'Hr_Settings.controller.js', err);
                  res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Employee category!."});
               } else {
                  if (result !== null) {
                     result.Employee_Category = ReceivingData.Employee_Category;
                     result.Last_Modified_By = ReceivingData.Modified_By;
                     result.save(function(err_1, result_1) { // Employee category Update Query
                        if(err_1) {
                           ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'HR Employee category Update Query Error', 'Hr_Settings.controller.js');
                           res.status(417).send({Status: false, Error: err_1, Message: "Some error occurred while Update the Employee category!."});
                        } else {
                           var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result_1), 'SecretKeyOut@123');
                           ReturnData = ReturnData.toString();
                           res.status(200).send({Status: true, Response: ReturnData });
                        }
                     });
                  } else {
                     res.status(400).send({Status: false, Message: "Employee category Id can not be valid!" });
                  }
               }
            });
         }
      };

   // Employee category Delete -----------------------------------------------
      exports.Employee_category_Delete = function(req, res) { 
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Employee_category_Id || ReceivingData.Employee_category_Id === '' ) {
            res.status(400).send({Status: false, Message: "Employee category Id can not be empty" });
         } else if (!ReceivingData.Modified_By || ReceivingData.Modified_By === ''  ) {
            res.status(400).send({Status: false, Message: "Modified User Details can not be empty" });
         }else {
            HrSettingsModel.EmployeeCategorySchema.findOne({'_id': ReceivingData.Employee_category_Id}, {}, {}, function(err, result) { // Employee category FindOne Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'HR Employee category FindOne Query Error', 'Hr_Settings.controller.js', err);
                  res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Employee category!."});
               } else {
                  if (result !== null) {
                     result.If_Deleted = true;
                     result.Last_Modified_By = ReceivingData.Modified_By;
                     result.save(function(err_1, result_1) { // Employee category Delete Query
                        if(err_1) {
                           ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'HR Employee category Delete Query Error', 'Hr_Settings.controller.js');
                           res.status(417).send({Status: false, Error: err_1, Message: "Some error occurred while Delete the Employee category!."});
                        } else {
                           res.status(200).send({Status: true, Message: 'Successfully Deleted' });
                        }
                     });
                  } else {
                     res.status(400).send({Status: false, Message: "Employee category Id can not be valid!" });
                  }
               }
            });
         }
      };



// ************************************************** Department *****************************************************
   // Department Create -----------------------------------------------
      exports.Department_Create = function(req, res) {
         var CryptoBytes = CryptoJS.AES.decrypt( req.body.Info , 'SecretKeyIn@123' );
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
         
         if(!ReceivingData.Department || ReceivingData.Department === '' ) {
            res.status(400).send({Status: false, Message: "Department can not be empty" });
         } else if (!ReceivingData.Company_Id || ReceivingData.Company_Id === ''  ) {
            res.status(400).send({Status: false, Message: "Company Details can not be empty" });
         } else if (!ReceivingData.Created_By || ReceivingData.Created_By === ''  ) {
            res.status(400).send({Status: false, Message: "Creator Details can not be empty" });
         }else {
            var Create_Department = new HrSettingsModel.DepartmentSchema({
               Department: ReceivingData.Department, 
               Company_Id: ReceivingData.Company_Id,
               Created_By: ReceivingData.Created_By,
               Last_Modified_By: ReceivingData.Created_By,
               Active_Status: true,
               If_Deleted: false
            });
            Create_Department.save(function(err, result) { // Department Save Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'HR Department Creation Query Error', 'Hr_Settings.controller.js');
                  res.status(417).send({Status: false, Error: err, Message: "Some error occurred while creating the Department!."});
               } else {
                  var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
                  ReturnData = ReturnData.toString();
                  res.status(200).send({Status: true, Response: ReturnData });
               }
            });
         }
      };

   // Department List -----------------------------------------------
      exports.Department_List = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '' ) {
            res.status(400).send({Status: false, Message: "Company Details can not be empty" });
         } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
            res.status(400).send({Status: false, Message: "User Details can not be empty" });
         }else {
            HrSettingsModel.DepartmentSchema.find({'Company_Id': ReceivingData.Company_Id, 'If_Deleted': false }, {}, {sort: { updatedAt: -1 }}, function(err, result) { // Department FindOne Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'HR Department Find Query Error', 'Hr_Settings.controller.js', err);
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

         if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '' ) {
            res.status(400).send({Status: false, Message: "Company Details can not be empty" });
         } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
            res.status(400).send({Status: false, Message: "User Details can not be empty" });
         }else {
            HrSettingsModel.DepartmentSchema.find({'Company_Id': ReceivingData.Company_Id, 'If_Deleted': false }, { Industry_Type : 1 }, {sort: { updatedAt: -1 }}, function(err, result) { // Department FindOne Query
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
                     result.Last_Modified_By = ReceivingData.Modified_By;
                     result.save(function(err_1, result_1) { // Department Update Query
                        if(err_1) {
                           ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'HR Department Update Query Error', 'Hr_Settings.controller.js');
                           res.status(417).send({Status: false, Error: err_1, Message: "Some error occurred while Update the Department!."});
                        } else {
                           var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result_1), 'SecretKeyOut@123');
                           ReturnData = ReturnData.toString();
                           res.status(200).send({Status: true, Response: ReturnData });
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
   // Designation Create -----------------------------------------------
      exports.Designation_Create = function(req, res) {
         var CryptoBytes = CryptoJS.AES.decrypt( req.body.Info , 'SecretKeyIn@123' );
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
         
         if(!ReceivingData.Designation || ReceivingData.Designation === '' ) {
            res.status(400).send({Status: false, Message: "Designation can not be empty" });
         } else if (!ReceivingData.Company_Id || ReceivingData.Company_Id === ''  ) {
            res.status(400).send({Status: false, Message: "Company Details can not be empty" });
         } else if (!ReceivingData.Created_By || ReceivingData.Created_By === ''  ) {
            res.status(400).send({Status: false, Message: "Creator Details can not be empty" });
         }else {
            var Create_Designation = new HrSettingsModel.DesignationSchema({
               Designation: ReceivingData.Designation, 
               Company_Id: ReceivingData.Company_Id,
               Created_By: ReceivingData.Created_By,
               Last_Modified_By: ReceivingData.Created_By,
               Active_Status: true,
               If_Deleted: false
            });
            Create_Designation.save(function(err, result) { // Designation Save Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'HR Designation Creation Query Error', 'Hr_Settings.controller.js');
                  res.status(417).send({Status: false, Error: err, Message: "Some error occurred while creating the Designation!."});
               } else {
                  var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
                  ReturnData = ReturnData.toString();
                  res.status(200).send({Status: true, Response: ReturnData });
               }
            });
         }
      };

// Designation List -----------------------------------------------
   exports.Designation_List = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

      if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '' ) {
         res.status(400).send({Status: false, Message: "Company Details can not be empty" });
      } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
         res.status(400).send({Status: false, Message: "User Details can not be empty" });
      }else {
         HrSettingsModel.DesignationSchema.find({'Company_Id': ReceivingData.Company_Id, 'If_Deleted': false }, {}, {sort: { updatedAt: -1 }}, function(err, result) { // Designation FindOne Query
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'HR Designation Find Query Error', 'Hr_Settings.controller.js', err);
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

      if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '' ) {
         res.status(400).send({Status: false, Message: "Company Details can not be empty" });
      } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
         res.status(400).send({Status: false, Message: "User Details can not be empty" });
      }else {
         HrSettingsModel.DesignationSchema.find({'Company_Id': ReceivingData.Company_Id, 'If_Deleted': false }, { Industry_Type : 1 }, {sort: { updatedAt: -1 }}, function(err, result) { // Designation FindOne Query
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
                  result.Last_Modified_By = ReceivingData.Modified_By;
                  result.save(function(err_1, result_1) { // Designation Update Query
                     if(err_1) {
                        ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'HR Designation Update Query Error', 'Hr_Settings.controller.js');
                        res.status(417).send({Status: false, Error: err_1, Message: "Some error occurred while Update the Designation!."});
                     } else {
                        var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result_1), 'SecretKeyOut@123');
                        ReturnData = ReturnData.toString();
                        res.status(200).send({Status: true, Response: ReturnData });
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

