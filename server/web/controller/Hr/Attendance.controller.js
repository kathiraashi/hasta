var CryptoJS = require("crypto-js");
var HrAttendanceModel = require('./../../models/Hr/Attendance.model.js');
var HrEmployeeModel = require('./../../models/Hr/Employee.model.js');
var ErrorManagement = require('./../../../handling/ErrorHandling.js');
var mongoose = require('mongoose');



// -------------------------------------------------- Attendance Employee Code Validate -----------------------------------------------
exports.EmployeeCode_Validate = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Employee_Code || ReceivingData.Employee_Code === '' ) {
      res.status(400).send({Status: false, Message: "Employee Code can not be empty" });
   }else {
      HrEmployeeModel.EmployeeSchema.findOne( { 'EmployeeCode': { $regex : new RegExp("^" + ReceivingData.Employee_Code + "$", "i") }, 'If_Deleted': false }, {_id: 1, EmployeeName: 1, EmployeeCode: 1}, {}, function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Employee Code Validate Query Error', 'Attendance.controller.js', err);
            res.status(417).send({status: false, Message: "Some error occurred while Validate Employee Code !."});
         } else {
            if ( result !== null) {
               HrAttendanceModel.AttendanceSchema
               .find({Employee: result._id, Current_Status: 'OnlyInCompleted' }, {}, { sort: { updatedAt: -1 }, limit: 1 } )
               .populate({ path: 'Employee', select: ['EmployeeName', 'EmployeeCode'] })
               .exec( function(err_1, result_1) {
                  if (err_1) {
                     ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Employee Attendance Attendance Find Query Error', 'Attendance.controller.js', err);
                     res.status(417).send({status: false, Message: "Some error occurred while Validate Employee Code !."});
                  } else {
                     if (result_1.length > 0 && Object.keys(result_1[0]).length > 0 ) {
                        var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result_1[0]), 'SecretKeyOut@123');
                        ReturnData = ReturnData.toString();
                        res.status(200).send({Status: true, Type: 'Old', Response: ReturnData });
                     } else {
                        var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
                        ReturnData = ReturnData.toString();
                        res.status(200).send({Status: true, Type: 'New', Response: ReturnData });
                     }
                  }
               })
            } else {
               res.status(200).send({Status: false, Message: 'Employee Code Not Valid!' });
            }
         }
      });
   }
};


exports.Attendance_Create = function(req, res) {
   var CryptoBytes = CryptoJS.AES.decrypt( req.body.Info , 'SecretKeyIn@123' );
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
   
   if(!ReceivingData.Employee_Id || ReceivingData.Employee_Id === '' ) {
      res.status(400).send({Status: false, Message: "Employee Details can not be empty" });
   } else if (!ReceivingData.InOrOut || ReceivingData.InOrOut === ''  ) {
      res.status(400).send({Status: false, Message: " Entry Type can not be empty" });
   } else if (!ReceivingData.Date || ReceivingData.Date === ''  ) {
      res.status(400).send({Status: false, Message: " Date can not be empty" });
   } else if (!ReceivingData.Time || ReceivingData.Time === ''  ) {
      res.status(400).send({Status: false, Message: " Time can not be empty" });
   }else {
      var Create_Attendance = new HrAttendanceModel.AttendanceSchema({
         Employee: mongoose.Types.ObjectId(ReceivingData.Employee_Id),
         Attendance_InDate: ReceivingData.Date,
         Attendance_InTime: ReceivingData.Time,
         Current_Status: 'OnlyInCompleted',
         Active_Status: true,
         If_Deleted: false
      });
      Create_Attendance.save(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'HR Attendance Creation Query Error', 'Attendance.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while creating the Attendance!."});
         } else {
            res.status(200).send({Status: true, Message: 'Successfully In Time Registered' });
         }
      });
   }
};



exports. Attendance_Update = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));


   if(!ReceivingData.Attendance_Id || ReceivingData.Attendance_Id === '' ) {
      res.status(400).send({Status: false, Message: "Attendance Details can not be empty" });
   } else if (!ReceivingData.InOrOut || ReceivingData.InOrOut === ''  ) {
      res.status(400).send({Status: false, Message: " Entry Type can not be empty" });
   } else if (!ReceivingData.Date || ReceivingData.Date === ''  ) {
      res.status(400).send({Status: false, Message: " Date can not be empty" });
   } else if (!ReceivingData.Time || ReceivingData.Time === ''  ) {
      res.status(400).send({Status: false, Message: " Time can not be empty" });
   }else {
      HrAttendanceModel.AttendanceSchema.findOne({'_id': mongoose.Types.ObjectId(ReceivingData.Attendance_Id)}, {}, {}, function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'HR Attendance FindOne Query Error', 'Attendance.controller.js', err);
            res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Attendance!."});
         } else {
            if (result !== null) {
               result.Attendance_OutDate = ReceivingData.Date;
               result.Attendance_OutTime = ReceivingData.Time;
               result.Current_Status = 'Completed';
               result.save(function(err_1, result_1) {
                  if(err_1) {
                     ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Hr Settings  Department  Update Query Error', 'Hr_Settings.controller.js');
                     res.status(417).send({Status: false, Error: err_1, Message: "Some error occurred while Update the  Department !."});
                  } else {
                     res.status(200).send({Status: true, Message: 'Successfully Out Time Registered' });
                  }
               });
            } else {
               res.status(400).send({Status: false, Message: "Attendance Details can not be valid!" });
            }
         }
      });
   }
};