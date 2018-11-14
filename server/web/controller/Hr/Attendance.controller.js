var CryptoJS = require("crypto-js");
var HrAttendanceModel = require('./../../models/Hr/Attendance.model.js');
var HrEmployeeModel = require('./../../models/Hr/Employee.model.js');
var ErrorManagement = require('./../../../handling/ErrorHandling.js');
var mongoose = require('mongoose');



// -------------------------------------------------- Attendance Employee Code Validate -----------------------------------------------
exports.AttendanceDate_AsyncValidate = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Employee || ReceivingData.Employee === '' ) {
      res.status(400).send({Status: false, Message: "Employee can not be empty" });
   } else if(!ReceivingData.Date || ReceivingData.Date === '' ) {
      res.status(400).send({Status: false, Message: "Date can not be empty" });
   } else if(!ReceivingData.User_Id || ReceivingData.User_Id === '' ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   }else {
      HrAttendanceModel.Employee_AttendanceSchema
      .findOne( { 'Employee': mongoose.Types.ObjectId(ReceivingData.Employee), 'Attendance_Date' : new Date(ReceivingData.Date), 'If_Deleted': false }, {}, {}, function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Employee Attendance Date Validate Query Error', 'Attendance.controller.js', err);
            res.status(417).send({status: false, Message: "Some error occurred while Validate Employee Attendance Date !."});
         } else {
            if (result !== null) {
               res.status(200).send({Status: true, Available: false });
            } else {
               res.status(200).send({Status: true, Available: true });
            }
         }
      });
   }
};


exports.WeekOff_AsyncValidate = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Employee || ReceivingData.Employee === '' ) {
      res.status(400).send({Status: false, Message: "Employee can not be empty" });
   } else if(!ReceivingData.Data || ReceivingData.Data === '' ) {
      res.status(400).send({Status: false, Message: "Data can not be empty" });
   } else if(!ReceivingData.Date || ReceivingData.Date === '' ) {
      res.status(400).send({Status: false, Message: "Date can not be empty" });
   } else if(!ReceivingData.User_Id || ReceivingData.User_Id === '' ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   }else {
      var Current_Date = new Date(ReceivingData.Date);
      var Week_First = new Date(Current_Date.setDate(Current_Date.getDate() - Current_Date.getDay()));
      var Week_Last = new Date(Current_Date.setDate(Current_Date.getDate() - Current_Date.getDay() + 6));
      if (ReceivingData.Data === 'Week Off') {
         HrAttendanceModel.Employee_AttendanceSchema
         .findOne( { 'Employee': mongoose.Types.ObjectId(ReceivingData.Employee),
                     'Attendance' : 'Week Off',
                     'If_Deleted': false,
                     $and: [ { 'Attendance_Date': { $gte: Week_First } }, { 'Attendance_Date': { $lte: Week_Last } } ]
                  }, {}, {}, function(err, result) {
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Employee Attendance Date Validate Query Error', 'Attendance.controller.js', err);
               res.status(417).send({status: false, Message: "Some error occurred while Validate Employee Attendance Date !."});
            } else {
               if ( result !== null) {
                  res.status(200).send({Status: true, Available: false });
               } else {
                  res.status(200).send({Status: true, Available: true });
               }
            }
         });
      } else {
         res.status(200).send({Status: true, Available: true });
      }

   }
};



exports.Attendance_Create = function(req, res) {
   var CryptoBytes = CryptoJS.AES.decrypt( req.body.Info , 'SecretKeyIn@123' );
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
   
   if(!ReceivingData.Employee || ReceivingData.Employee === '' ) {
      res.status(400).send({Status: false, Message: "Employee Details can not be empty" });
   } else if (!ReceivingData.Date || ReceivingData.Date === ''  ) {
      res.status(400).send({Status: false, Message: " Date can not be empty" });
   } else if (!ReceivingData.Attendance || ReceivingData.Attendance === ''  ) {
      res.status(400).send({Status: false, Message: " Attendance can not be empty" });
   } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
      res.status(400).send({Status: false, Message: " User Details can not be empty" });
   }else {
      var Create_Attendance = new HrAttendanceModel.Employee_AttendanceSchema({
         Employee: mongoose.Types.ObjectId(ReceivingData.Employee),
         Attendance_Date: ReceivingData.Date,
         Attendance: ReceivingData.Attendance,
         Created_By: mongoose.Types.ObjectId(ReceivingData.User_Id),
         Active_Status: true,
         If_Deleted: false
      });
      Create_Attendance.save(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'HR Attendance Creation Query Error', 'Attendance.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while creating the Attendance!."});
         } else {
            HrAttendanceModel.Employee_AttendanceSchema
               .findOne({'_id': result._id })
               .populate( { path: 'Created_By', select: 'Name'})
               .exec(function(err_1, result_1) {
               if(err_1) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Attendance Find Query Error', 'Attendance.controller.js', err_1);
                  res.status(417).send({status: false, Message: "Some error occurred while Find The Attendance!."});
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

exports.Attendance_Log = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   }else  if (!ReceivingData.Employee_Id || ReceivingData.Employee_Id === ''  ) {
      res.status(400).send({Status: false, Message: "Employee Details can not be empty" });
   }else {
      HrAttendanceModel.Employee_AttendanceSchema
         .find({'If_Deleted': false, Employee: mongoose.Types.ObjectId(ReceivingData.Employee_Id) }, {}, {sort: { Attendance_Date: -1 }})
         .populate( { path: 'Created_By', select: 'Name'})
         .populate( { path: 'Employee', select: 'EmployeeName'})
         .exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Attendance List Find Query Error', 'Attendance.controller.js', err);
            res.status(417).send({status: false, Message: "Some error occurred while Find The Attendance List!."});
         } else {
            var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
            ReturnData = ReturnData.toString();
            res.status(200).send({Status: true, Response: ReturnData });
         }
      });
   }
};

exports.Complete_Attendance_Log = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   }else {
      HrAttendanceModel.Employee_AttendanceSchema
         .find({'If_Deleted': false }, {}, {sort: { Attendance_Date: -1 }})
         .populate( { path: 'Employee', select: 'EmployeeName'})
         .populate( { path: 'Created_By', select: 'Name'})
         .exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Attendance List Find Query Error', 'Attendance.controller.js', err);
            res.status(417).send({status: false, Message: "Some error occurred while Find The Attendance List!."});
         } else {
            var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
            ReturnData = ReturnData.toString();
            res.status(200).send({Status: true, Response: ReturnData });
         }
      });
   }
};