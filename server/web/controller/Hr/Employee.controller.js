var CryptoJS = require("crypto-js");
var AdminModel = require('./../../models/Admin/AdminManagement.model.js');
var HrModel = require('./../../models/Hr/Employee.model.js');
var ErrorManagement = require('./../../../handling/ErrorHandling.js');
var mongoose = require('mongoose');
var multer = require('multer');


var Employee_Files_Storage = multer.diskStorage({
   destination: (req, file, cb) => { cb(null, './Uploads/Employee'); },
   filename: (req, file, cb) => {
      let extArray = file.originalname.split(".");
      let extension = (extArray[extArray.length - 1]).toLowerCase();
      if (file.fieldname === 'AadharDocument') { cb(null, 'EmpAadhar_' + Date.now() + '.' + extension); }
      if (file.fieldname === 'PanDocument') { cb(null, 'EmpPan_' + Date.now() + '.' + extension); }
      if (file.fieldname === 'DrivingDocument') { cb(null, 'EmpDriving_' + Date.now() + '.' + extension); } 
   }
});
var Employee_Files = multer({
   storage: Employee_Files_Storage
}).fields([{ name: 'AadharDocument', maxCount: 1 }, { name: 'PanDocument', maxCount: 1 }, { name: 'DrivingDocument', maxCount: 1 }])


// -------------------------------------------------- Employee -----------------------------------------------
exports.MobileNo_AsyncValidate = function(req, res) {
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

exports.EmployeeCode_AsyncValidate = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.EmployeeCode || ReceivingData.EmployeeCode === '' ) {
      res.status(400).send({Status: false, Message: "Employee Code can not be empty" });
   } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   }else {
      HrModel.EmployeeSchema.findOne({ 'EmployeeCode': { $regex : new RegExp("^" + ReceivingData.EmployeeCode + "$", "i") }, 'If_Deleted': false }, {}, {}, function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Employee Code Find Query Error', 'Employee.controller.js', err);
            res.status(417).send({status: false, Message: "Some error occurred while Find Employee Code!."});
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
   Employee_Files(req, res, function(upload_err) {

      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
      
      if(!ReceivingData.User_Id || ReceivingData.User_Id === '' ) {
         res.status(400).send({Status: false, Message: "User Details can not be empty" });
      } else if(!ReceivingData.EmployeeName || ReceivingData.EmployeeName === '' ) {
         res.status(400).send({Status: false, Message: "Employee Name can not be empty" });
      } else if(!ReceivingData.EmployeeCode || ReceivingData.EmployeeCode === '' ) {
         res.status(400).send({Status: false, Message: "Employee Code can not be empty" });
      } else if(!ReceivingData.DateOfJoining || ReceivingData.DateOfJoining === '' ) {
         res.status(400).send({Status: false, Message: "Date of joining can not be empty" });
      } else if(!ReceivingData.MaritalStatus || ReceivingData.MaritalStatus === '' ) {
         res.status(400).send({Status: false, Message: "Marital Status can not be empty" });
      } else if(!ReceivingData.Personal_MobileNo || ReceivingData.Personal_MobileNo === '' ) {
         res.status(400).send({Status: false, Message: "Personal Mobile Number can not be empty" });
      } else if(!ReceivingData.Emergency_MobileNo || ReceivingData.Emergency_MobileNo === '' ) {
         res.status(400).send({Status: false, Message: "Emergency Mobile Number can not be empty" });
      } else if(!ReceivingData.Customers || ReceivingData.Customers.length <= 0 ) {
         res.status(400).send({Status: false, Message: "Customers can not be empty" });
      } else {
         var AadharDocument = {};
         var DrivingDocument = {};
         var PanDocument = {};
         if (req.files['AadharDocument']) {
            if(req.files['AadharDocument'][0] !== null && req.files['AadharDocument'][0] !== undefined && req.files['AadharDocument'][0] !== ''){
               AadharDocument = { filename: req.files['AadharDocument'][0].filename, mimetype: req.files['AadharDocument'][0].mimetype, size: req.files['AadharDocument'][0].size };
            }
         }
         if (req.files['PanDocument']) {
            if(req.files['PanDocument'][0] !== null && req.files['PanDocument'][0] !== undefined && req.files['PanDocument'][0] !== ''){
               PanDocument = { filename: req.files['PanDocument'][0].filename, mimetype: req.files['PanDocument'][0].mimetype, size: req.files['PanDocument'][0].size };
            }
         }
         if (req.files['DrivingDocument']) {
            if(req.files['DrivingDocument'][0] !== null && req.files['DrivingDocument'][0] !== undefined && req.files['DrivingDocument'][0] !== ''){
               DrivingDocument = { filename: req.files['DrivingDocument'][0].filename, mimetype: req.files['DrivingDocument'][0].mimetype, size: req.files['DrivingDocument'][0].size };
            }
         }
         ReceivingData.Customers = ReceivingData.Customers.map(obj => mongoose.Types.ObjectId(obj));
         if (ReceivingData.Department !== null && ReceivingData.Department !== '') {
            ReceivingData.Department = mongoose.Types.ObjectId(ReceivingData.Department);
         }
         if (ReceivingData.Designation !== null && ReceivingData.Designation !== '') {
            ReceivingData.Designation = mongoose.Types.ObjectId(ReceivingData.Designation);
         }

         var Employee_Create = new HrModel.EmployeeSchema({
            EmployeeName: ReceivingData.EmployeeName,
            EmployeeCode: ReceivingData.EmployeeCode,
            Department: ReceivingData.Department,
            Designation: ReceivingData.Designation,
            DateOfJoining: ReceivingData.DateOfJoining,
            EmployeeRole: ReceivingData.EmployeeRole,
            Working_Location: ReceivingData.Working_Location,
            Customers: ReceivingData.Customers,
            EmployeeFatherName: ReceivingData.EmployeeFatherName,
            DateOfBirth: ReceivingData.DateOfBirth,
            BloodGroup: ReceivingData.BloodGroup,
            MaritalStatus: ReceivingData.MaritalStatus,
            Personal_MobileNo: ReceivingData.Personal_MobileNo,
            Official_MobileNo: ReceivingData.Official_MobileNo,
            Emergency_MobileNo: ReceivingData.Emergency_MobileNo,
            Personal_Email: ReceivingData.Personal_Email,
            Official_Email: ReceivingData.Official_Email,
            Aadhar_No: ReceivingData.Aadhar_No,
            AadharDocument: AadharDocument,
            PanCard_No: ReceivingData.PanCard_No,
            PanDocument: PanDocument,
            DrivingLicense_No: ReceivingData.DrivingLicense_No,
            DrivingDocument: DrivingDocument,
            Permanent_Address: ReceivingData.Permanent_Address,
            Temporary_Address: ReceivingData.Temporary_Address,
            Education_Qualification: ReceivingData.Education_Qualification,
            PF_AccountNo: ReceivingData.PF_AccountNo,
            ESI_AccountNo: ReceivingData.ESI_AccountNo,
            Bank_Name: ReceivingData.Bank_Name,
            Bank_AccountNo: ReceivingData.Bank_AccountNo,
            Bank_AccountType: ReceivingData.Bank_AccountType,
            Bank_IFSCCode: ReceivingData.Bank_IFSCCode,
            Bank_Address: ReceivingData.Bank_Address,
            If_UserManage: false,
            If_PayrollMaster: false,
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
   });
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
         .populate({path: 'Designation', select:'Designation'})
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
         .populate({path: 'Designation', select:'Designation'})
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

exports.Employee_Deactivate = function(req, res) {

   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Employee_Id || ReceivingData.Employee_Id === '' ) {
      res.status(400).send({Status: false, Message: "Employee Details can not be empty" });
   } else if(!ReceivingData.User_Id || ReceivingData.User_Id === '' ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   } else {
      Promise.all([
         HrModel.EmployeeSchema.updateOne(
            { _id : mongoose.Types.ObjectId(ReceivingData.Employee_Id)  },
            {  $set: { Active_Status : false } }).exec(),
         AdminModel.User_Management.updateMany(
            { Employee : mongoose.Types.ObjectId(ReceivingData.Employee_Id)  },
            {  $set: { Active_Status : false } }).exec(),
      ]).then( result => {
         res.status(200).send({Status: true, Message: 'Employee Successfully Deactivated!'  });
      }).catch(err => {
         ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Employee Deactivate Query Error', 'Employee.controller.js', err);
         res.status(400).send({Status: false, Message: "Some error occurred while Deactivate the Employee!."});
      });
   }
};

exports.Employee_Activate = function(req, res) {

   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Employee_Id || ReceivingData.Employee_Id === '' ) {
      res.status(400).send({Status: false, Message: "Employee Details can not be empty" });
   } else if(!ReceivingData.User_Id || ReceivingData.User_Id === '' ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   } else {
      HrModel.EmployeeSchema.updateOne(
         { _id : mongoose.Types.ObjectId(ReceivingData.Employee_Id)  },
         {  $set: { Active_Status : true } }
      ).exec( function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Employee Activate Query Error', 'Employee.controller.js', err);
            res.status(400).send({Status: false, Message: "Some error occurred while Activate the Employee!."});
         } else {
            res.status(200).send({Status: true, Message: 'Employee Successfully Activated!'  });
         }
      });
   }
};

exports.Employee_Update = function(req, res) {
   Employee_Files(req, res, function(upload_err) {

      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
      
      if(!ReceivingData.User_Id || ReceivingData.User_Id === '' ) {
         res.status(400).send({Status: false, Message: "User Details can not be empty" });
      } else if(!ReceivingData.Employee_Id || ReceivingData.Employee_Id === '' ) {
         res.status(400).send({Status: false, Message: "Employee Details can not be empty" });
      } else if(!ReceivingData.EmployeeName || ReceivingData.EmployeeName === '' ) {
         res.status(400).send({Status: false, Message: "Employee Name can not be empty" });
      } else if(!ReceivingData.EmployeeCode || ReceivingData.EmployeeCode === '' ) {
         res.status(400).send({Status: false, Message: "Employee Code can not be empty" });
      } else if(!ReceivingData.DateOfJoining || ReceivingData.DateOfJoining === '' ) {
         res.status(400).send({Status: false, Message: "Date of joining can not be empty" });
      } else if(!ReceivingData.MaritalStatus || ReceivingData.MaritalStatus === '' ) {
         res.status(400).send({Status: false, Message: "Marital Status can not be empty" });
      } else if(!ReceivingData.Personal_MobileNo || ReceivingData.Personal_MobileNo === '' ) {
         res.status(400).send({Status: false, Message: "Personal Mobile Number can not be empty" });
      } else if(!ReceivingData.Emergency_MobileNo || ReceivingData.Emergency_MobileNo === '' ) {
         res.status(400).send({Status: false, Message: "Emergency Mobile Number can not be empty" });
      } else if(!ReceivingData.Customers || ReceivingData.Customers.length <= 0 ) {
         res.status(400).send({Status: false, Message: "Customers can not be empty" });
      } else {
         if (ReceivingData.OldAadharDocument === null) { ReceivingData.OldAadharDocument = {}; }
         if (ReceivingData.OldDrivingDocument === null) { ReceivingData.OldDrivingDocument = {}; }
         if (ReceivingData.OldPanDocument === null) { ReceivingData.OldPanDocument = {}; }

         var AadharDocument = ReceivingData.OldAadharDocument || {};
         var DrivingDocument = ReceivingData.OldDrivingDocument || {};
         var PanDocument = ReceivingData.OldPanDocument || {};
         
         if (req.files['AadharDocument']) {
            if(req.files['AadharDocument'][0] !== null && req.files['AadharDocument'][0] !== undefined && req.files['AadharDocument'][0] !== ''){
               AadharDocument = { filename: req.files['AadharDocument'][0].filename, mimetype: req.files['AadharDocument'][0].mimetype, size: req.files['AadharDocument'][0].size };
            }
         }
         if (req.files['PanDocument']) {
            if(req.files['PanDocument'][0] !== null && req.files['PanDocument'][0] !== undefined && req.files['PanDocument'][0] !== ''){
               PanDocument = { filename: req.files['PanDocument'][0].filename, mimetype: req.files['PanDocument'][0].mimetype, size: req.files['PanDocument'][0].size };
            }
         }
         if (req.files['DrivingDocument']) {
            if(req.files['DrivingDocument'][0] !== null && req.files['DrivingDocument'][0] !== undefined && req.files['DrivingDocument'][0] !== ''){
               DrivingDocument = { filename: req.files['DrivingDocument'][0].filename, mimetype: req.files['DrivingDocument'][0].mimetype, size: req.files['DrivingDocument'][0].size };
            }
         }
         ReceivingData.Customers = ReceivingData.Customers.map(obj => mongoose.Types.ObjectId(obj));
         if (ReceivingData.Department !== null && ReceivingData.Department !== '') {
            ReceivingData.Department = mongoose.Types.ObjectId(ReceivingData.Department);
         }
         if (ReceivingData.Designation !== null && ReceivingData.Designation !== '') {
            ReceivingData.Designation = mongoose.Types.ObjectId(ReceivingData.Designation);
         }

         HrModel.EmployeeSchema.updateOne(
            { _id : mongoose.Types.ObjectId(ReceivingData.Employee_Id)  },
            {  $set: {
                  EmployeeName: ReceivingData.EmployeeName,
                  EmployeeCode: ReceivingData.EmployeeCode,
                  Department: ReceivingData.Department,
                  Designation: ReceivingData.Designation,
                  DateOfJoining: ReceivingData.DateOfJoining,
                  EmployeeRole: ReceivingData.EmployeeRole,
                  Working_Location: ReceivingData.Working_Location,
                  Customers: ReceivingData.Customers,
                  EmployeeFatherName: ReceivingData.EmployeeFatherName,
                  DateOfBirth: ReceivingData.DateOfBirth,
                  BloodGroup: ReceivingData.BloodGroup,
                  MaritalStatus: ReceivingData.MaritalStatus,
                  Personal_MobileNo: ReceivingData.Personal_MobileNo,
                  Official_MobileNo: ReceivingData.Official_MobileNo,
                  Emergency_MobileNo: ReceivingData.Emergency_MobileNo,
                  Personal_Email: ReceivingData.Personal_Email,
                  Official_Email: ReceivingData.Official_Email,
                  Aadhar_No: ReceivingData.Aadhar_No,
                  AadharDocument: AadharDocument,
                  PanCard_No: ReceivingData.PanCard_No,
                  PanDocument: PanDocument,
                  DrivingLicense_No: ReceivingData.DrivingLicense_No,
                  DrivingDocument: DrivingDocument,
                  Permanent_Address: ReceivingData.Permanent_Address,
                  Temporary_Address: ReceivingData.Temporary_Address,
                  Education_Qualification: ReceivingData.Education_Qualification,
                  PF_AccountNo: ReceivingData.PF_AccountNo,
                  ESI_AccountNo: ReceivingData.ESI_AccountNo,
                  Bank_Name: ReceivingData.Bank_Name,
                  Bank_AccountNo: ReceivingData.Bank_AccountNo,
                  Bank_AccountType: ReceivingData.Bank_AccountType,
                  Bank_IFSCCode: ReceivingData.Bank_IFSCCode,
                  Bank_Address: ReceivingData.Bank_Address,
                  Last_Modified_By : mongoose.Types.ObjectId(ReceivingData.User_Id),
               } 
            }
         ).exec( function(err, result) {
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Employee Details Updating Query Error', 'Employee.controller.js', err);
               res.status(400).send({Status: false, Message: "Some error occurred while Updating the Employee Details!."});
            } else {
               res.status(200).send({Status: true, Message: 'Employee Details Successfully Updated' });
            }
         });
      }
   });
};

exports.Employee_SimpleList = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   }else {
      HrModel.EmployeeSchema
         .find({'If_Deleted': false, 'Active_Status': true}, { EmployeeName: 1 }, {sort: { updatedAt: -1 }})
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
         .find({'If_Deleted': false, 'Active_Status': true, If_UserManage: false }, { EmployeeName: 1 }, {sort: { updatedAt: -1 }})
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

exports.EmployeeList_WithoutPayrollMaster = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   }else {
      HrModel.EmployeeSchema
         .find({'If_Deleted': false, 'Active_Status': true, If_PayrollMaster: false }, { EmployeeName: 1 }, {sort: { updatedAt: -1 }})
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