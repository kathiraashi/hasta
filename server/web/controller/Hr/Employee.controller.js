var CryptoJS = require("crypto-js");
var HrModel = require('./../../models/Hr/Employee.model.js');
var ErrorManagement = require('./../../../handling/ErrorHandling.js');
var mongoose = require('mongoose');



// -------------------------------------------------- Employee -----------------------------------------------
exports.Employee_AsyncValidate = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.MobileNo || ReceivingData.MobileNo === '' ) {
      res.status(400).send({Status: false, Message: "Mobile Number can not be empty" });
   } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   }else {
      HrModel.EmployeeSchema.findOne({ 'MobileNo': { $regex : new RegExp("^" + ReceivingData.MobileNo + "$", "i") }, 'If_Deleted': false }, {}, {}, function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Employee Find Query Error', 'Employee.controller.js', err);
            res.status(417).send({status: false, Message: "Some error occurred while Find Employee!."});
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

exports.Employee_Create = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
   
   if(!ReceivingData.User_Id || ReceivingData.User_Id === '' ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   } else if(!ReceivingData.EmployeeName || ReceivingData.EmployeeName === '' ) {
      res.status(400).send({Status: false, Message: "Employee Name can not be empty" });
   } else if(!ReceivingData.MobileNo || ReceivingData.MobileNo === '' ) {
      res.status(400).send({Status: false, Message: "Mobile Number can not be empty" });
   } else if(!ReceivingData.Customers || ReceivingData.Customers.length <= 0 ) {
      res.status(400).send({Status: false, Message: "Customers can not be empty" });
   } else {
      ReceivingData.Customers = ReceivingData.Customers.map(obj => mongoose.Types.ObjectId(obj));
      var Employee_Create = new HrModel.EmployeeSchema({
         EmployeeName: ReceivingData.EmployeeName,
         EmployeeCode: ReceivingData.EmployeeCode,
         Department: ReceivingData.Department,
         JobTitle: ReceivingData.JobTitle,
         MobileNo: ReceivingData.MobileNo,
         JoiningDate: ReceivingData.JoiningDate,
         DateOfBirth: ReceivingData.DateOfBirth,
         MaritalStatus: ReceivingData.MaritalStatus,
         Address: ReceivingData.Address,
         Customers: ReceivingData.Customers,
         If_UserManage: false,
         Created_By : mongoose.Types.ObjectId(ReceivingData.User_Id),
         Last_Modified_By: mongoose.Types.ObjectId(ReceivingData.User_Id),
         Active_Status: true,
         If_Deleted: false
      });
      Employee_Create.save(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Employee Creation Query Error', 'Employee.controller.js', err);
            res.status(400).send({Status: false, Message: "Some error occurred while creating the Employee!."});
         } else {
            var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
               ReturnData = ReturnData.toString();
            res.status(200).send({Status: true, Message: 'New Employee Successfully Created' });
         }
      });
   }
};

exports.Employee_List = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   }else {
      HrModel.EmployeeSchema
         .find({'If_Deleted': false }, {}, {sort: { updatedAt: -1 }})
         .populate({path: 'Department', select:'Department'})
         .exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Employee List Find Query Error', 'Employee.controller.js', err);
            res.status(417).send({status: false, Message: "Some error occurred while Find The Employee List!."});
         } else {
            var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
            ReturnData = ReturnData.toString();
            res.status(200).send({Status: true, Response: ReturnData });
         }
      });
   }
};

exports.Employee_View = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   }else if (!ReceivingData.Employee_Id || ReceivingData.Employee_Id === ''  ) {
         res.status(400).send({Status: false, Message: "Employee Details can not be empty" });
   }else {
      HrModel.EmployeeSchema
         .findOne({'_id': mongoose.Types.ObjectId(ReceivingData.Employee_Id) }, {}, {})
         .populate({path: 'Department', select:'Department'})
         .populate({path: 'Created_By', select:'Name'})
         .populate({path: 'Last_Modified_By', select:'Name'})
         .populate({path: 'Customers', select:'CompanyName'})
         .exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Employee Find Query Error', 'Employee.controller.js', err);
            res.status(417).send({status: false, Message: "Some error occurred while Find The Employee!."});
         } else {
            var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
            ReturnData = ReturnData.toString();
            res.status(200).send({Status: true, Response: ReturnData });
         }
      });
   }
};

exports.Employee_Update = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Employee_Id || ReceivingData.Employee_Id === '' ) {
      res.status(400).send({Status: false, Message: "Employee Details can not be empty" });
   }else if(!ReceivingData.EmployeeName || ReceivingData.EmployeeName === '' ) {
      res.status(400).send({Status: false, Message: "Employee Name can not be empty" });
   }else if(!ReceivingData.MobileNo || ReceivingData.MobileNo === '' ) {
      res.status(400).send({Status: false, Message: "Mobile Number can not be empty" });
   } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   } else if (!ReceivingData.Customers || ReceivingData.Customers === ''  ) {
      res.status(400).send({Status: false, Message: "Customer Details can not be empty" });
   }else {
      HrModel.EmployeeSchema.findOne({'_id': mongoose.Types.ObjectId(ReceivingData.Employee_Id)}, {}, {}, function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Employee FindOne Query Error', 'Employee.controller.js', err);
            res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Employee!."});
         } else {
            if (result !== null) {
               ReceivingData.Customers = ReceivingData.Customers.map(obj => mongoose.Types.ObjectId(obj));
               result.EmployeeName = ReceivingData.EmployeeName;
               result.EmployeeCode = ReceivingData.EmployeeCode;
               result.Department = ReceivingData.Department;
               result.JobTitle = ReceivingData.JobTitle;
               result.MobileNo = ReceivingData.MobileNo;
               result.JoiningDate = ReceivingData.JoiningDate;
               result.DateOfBirth = ReceivingData.DateOfBirth;
               result.MaritalStatus = ReceivingData.MaritalStatus;
               result.Address = ReceivingData.Address;
               result.Customers = ReceivingData.Customers;
               result.Last_Modified_By = mongoose.Types.ObjectId(ReceivingData.User_Id);
               result.save(function(err_1, result_1) { //  Employee  Update Query
                  if(err_1) {
                     ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Employee Update Query Error', 'Employee.controller.js');
                     res.status(417).send({Status: false, Error: err_1, Message: "Some error occurred while Update the Employee !."});
                  } else {
                     res.status(200).send({Status: true, Message: 'Successfully Updated'  });
                  }
               });
            } else {
               res.status(400).send({Status: false, Message: "Employee Details can not be valid!" });
            }
         }
      });
   }
};

exports.Employee_SimpleList = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   }else {
      HrModel.EmployeeSchema
         .find({'If_Deleted': false}, { EmployeeName: 1 }, {sort: { updatedAt: -1 }})
         .exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Employee List Find Query Error', 'Employee.controller.js', err);
            res.status(417).send({status: false, Message: "Some error occurred while Find The Employee List!."});
         } else {
            var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
            ReturnData = ReturnData.toString();
            res.status(200).send({Status: true, Response: ReturnData });
         }
      });
   }
};

exports.EmployeeList_WithoutUserManage = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   }else {
      HrModel.EmployeeSchema
         .find({'If_Deleted': false, If_UserManage: false }, { EmployeeName: 1 }, {sort: { updatedAt: -1 }})
         .exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Employee List Find Query Error', 'Employee.controller.js', err);
            res.status(417).send({status: false, Message: "Some error occurred while Find The Employee List!."});
         } else {
            var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
            ReturnData = ReturnData.toString();
            res.status(200).send({Status: true, Response: ReturnData });
         }
      });
   }
};