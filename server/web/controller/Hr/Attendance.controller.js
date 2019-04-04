var CryptoJS = require("crypto-js");
var HrAttendanceModel = require('./../../models/Hr/Attendance.model.js');
var HrmsLeavesModel = require('./../../models/Hrms/Leaves.model.js');
var HrEmployeeModel = require('./../../models/Hr/Employee.model.js');
var PayrollModel = require('./../../models/Hr/Payroll.model.js');
var HrmsSettingsModel = require('./../../models/settings/Hr_Settings.model.js');
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
      .findOne( { 'Employee': mongoose.Types.ObjectId(ReceivingData.Employee), 'Attendance_Date' : new Date(ReceivingData.Date), 'If_Deleted': false, 'Attendance_Status': { "$ne": 'Rejected' } }, {}, {}, function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Employee Attendance Date Validate Query Error', 'Attendance.controller.js', err);
            res.status(417).send({status: false, Message: "Some error occurred while Validate Employee Attendance Date !."});
         } else {
            if (result !== null) {
               res.status(200).send({Status: true, Available: false });
            } else {
               HrmsLeavesModel.LeavesSchema.findOne(
                  { 'Employee': mongoose.Types.ObjectId(ReceivingData.Employee),
                     $and: [  { From_Date : { $lte: new Date(ReceivingData.Date) } },
                              { To_Date: { $gte: new Date(ReceivingData.Date) } } ,
                              { Current_Status: {$ne: 'Rejected'} }],
                     'If_Deleted': false 
                  }, {}, {}
               ).exec(function(err_1, result_1) {
                  if(err_1) {
                     ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Employee Attendance Date Validate Query Error', 'Attendance.controller.js', err_1);
                     res.status(417).send({status: false, Message: "Some error occurred while Validate Employee Attendance Date !."});
                  } else {
                     if (result_1 !== null) {
                        res.status(200).send({Status: true, Available: false });
                     } else {
                        HrmsSettingsModel.HolidaySchema
                        .findOne( {'Dates' : new Date(ReceivingData.Date), 'If_Deleted': false }, {}, {}, function(err_2, result_2) {
                           if(err_2) {
                              ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Employee Attendance Date Validate Query Error', 'Attendance.controller.js', err_2);
                              res.status(417).send({status: false, Message: "Some error occurred while Validate Employee Attendance Date !."});
                           } else {
                              if (result_2 !== null) {
                                 res.status(200).send({Status: true, Available: false });
                              } else {
                                 res.status(200).send({Status: true, Available: true });
                              }
                           }
                        });
                     }
                  }
               })
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
                     'Attendance_Status': { "$ne": 'Rejected' },
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
         Attendance_Status: 'Pending',
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
               .populate( { path: 'Employee', select: 'EmployeeName'})
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

exports.Attendance_Approve = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Attendance_Id || ReceivingData.Attendance_Id === '' ) {
      res.status(400).send({Status: false, Message: "Attendance Details can not be valid" });
   } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   }else {
      HrAttendanceModel.Employee_AttendanceSchema.findOne({'_id': mongoose.Types.ObjectId(ReceivingData.Attendance_Id)}, {}, {}, function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Attendance FindOne Query Error', 'Attendance.controller.js', err);
            res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Attendance Approve!."});
         } else {
            if (result !== null) {
               result.Attendance_Status = 'Approved';
               result.Last_Modified_By = mongoose.Types.ObjectId(ReceivingData.User_Id);
               result.save(function(err_1, result_1) {
                  if(err_1) {
                     ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Attendance Update Query Error', 'Attendance.controller.js');
                     res.status(417).send({Status: false, Error: err_1, Message: "Some error occurred while Update the Attendance Approve!."});
                  } else {
                     res.status(200).send({Status: true, Message: 'Successfully Approved'  });
                  }
               });
            } else {
               res.status(400).send({Status: false, Message: "Attendance Details can not be valid!" });
            }
         }
      });
   }
};

exports.Attendance_Reject = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Attendance_Id || ReceivingData.Attendance_Id === '' ) {
      res.status(400).send({Status: false, Message: "Attendance Details can not be valid" });
   } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   }else {
      HrAttendanceModel.Employee_AttendanceSchema.findOne({'_id': mongoose.Types.ObjectId(ReceivingData.Attendance_Id)}, {}, {}, function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Attendance FindOne Query Error', 'Attendance.controller.js', err);
            res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Attendance Reject!."});
         } else {
            if (result !== null) {
               result.Attendance_Status = 'Rejected';
               result.Last_Modified_By = mongoose.Types.ObjectId(ReceivingData.User_Id);
               result.save(function(err_1, result_1) {
                  if(err_1) {
                     ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Attendance Update Query Error', 'Attendance.controller.js');
                     res.status(417).send({Status: false, Error: err_1, Message: "Some error occurred while Update the Attendance Reject!."});
                  } else {
                     res.status(200).send({Status: true, Message: 'Successfully Rejected'  });
                  }
               });
            } else {
               res.status(400).send({Status: false, Message: "Attendance Details can not be valid!" });
            }
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

exports.Complete_Attendance_Pending_Log = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   }else {
      HrAttendanceModel.Employee_AttendanceSchema
         .find({'If_Deleted': false, 'Attendance_Status': 'Pending' }, {}, {sort: { Attendance_Date: -1 }})
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



// -------------------------------------------------- Attendance Report Validate -----------------------------------------------
exports.Attendance_Report_Validate = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Employee || ReceivingData.Employee === '' ) {
      res.status(400).send({Status: false, Message: "Employee can not be empty" });
   } else if(!ReceivingData.Month || ReceivingData.Month === '' ) {
      res.status(400).send({Status: false, Message: "Month can not be empty" });
   } else if(!ReceivingData.User_Id || ReceivingData.User_Id === '' ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   }else {
      ReceivingData.Month = new Date(ReceivingData.Month);
      HrAttendanceModel.AttendanceReportSchema
      .findOne( { 'Employee': mongoose.Types.ObjectId(ReceivingData.Employee), 'MonthYear' : ReceivingData.Month, 'If_Deleted': false }, {}, {}, function(err, result) {
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
   }
};


exports.Attendance_Report_Create = function(req, res) {
   var CryptoBytes = CryptoJS.AES.decrypt( req.body.Info , 'SecretKeyIn@123' );
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
   
   if(!ReceivingData.Employee || ReceivingData.Employee === '' ) {
      res.status(400).send({Status: false, Message: "Employee Details can not be empty" });
   } else if (!ReceivingData.Month || ReceivingData.Month === ''  ) {
      res.status(400).send({Status: false, Message: " Month can not be empty" });
   } else if (!ReceivingData.From || ReceivingData.From === ''  ) {
      res.status(400).send({Status: false, Message: " From Date can not be empty" });
   } else if (!ReceivingData.To || ReceivingData.To === ''  ) {
      res.status(400).send({Status: false, Message: " To Date can not be empty" });
   } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
      res.status(400).send({Status: false, Message: " User Details can not be empty" });
   }else {

      var From = new Date(ReceivingData.From);
      var To = new Date(ReceivingData.To);
      var Temp_From = new Date(ReceivingData.From);
      var DatArr = [];
      while (Temp_From <= To) {
         DatArr.push(new Date(Temp_From));
         Temp_From.setDate(Temp_From.getDate() + 1);
      }
      var Presents = 0;
      var Absents = 0;
      var WeekOffs = 0;
      var Leaves = 0;
      var Holidays = 0;
      HrEmployeeModel.EmployeeSchema.findOne({_id: mongoose.Types.ObjectId(ReceivingData.Employee) }, {}, {})
         .exec( function(err, result) {
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'HR Attendance Creation Query Error', 'Attendance.controller.js');
               res.status(417).send({Status: false, Message: "Some error occurred while creating the Attendance!."});
            } else {
               Promise.all(
                  DatArr.map(obj => DateDetailsFind(obj))
               ).then(response => {
                  var YearsFirstDay = new Date(result.DateOfJoining);
                  var YearsLastDay = new Date(YearsFirstDay.getFullYear() + 1, YearsFirstDay.getMonth(), YearsFirstDay.getDate());
                  if(YearsLastDay.valueOf() < From.valueOf()) {
                     var YearsFirstDay = new Date(From.getFullYear(), YearsFirstDay.getMonth(), YearsFirstDay.getDate())
                  }
                  Promise.all([
                     HrmsLeavesModel.LeavesSchema.find(
                        { 'Employee': mongoose.Types.ObjectId(ReceivingData.Employee),
                           $and: [  { From_Date : { $gte: YearsFirstDay } },
                                    { To_Date: { $lt: From } } ,
                                    { Current_Status: {$ne: 'Draft'} }, 
                                    { Current_Status: {$ne: 'Rejected'} },],
                           'If_Deleted': false 
                        }, {}, {sort: { createdAt: 1 }})
                        .populate({path: 'Leave_Type', select:['Name', 'Leave_Type']}).exec(),
                        PayrollModel.Employee_PayrollMasterSchema.findOne( { 'Employee': mongoose.Types.ObjectId(ReceivingData.Employee), 'If_Deleted': false }, {}, {}).exec()
                  ]).then(response_1 => {
                     var Previous_Leaves_Count = 0;
                     var PaidLeaves_inYear = 0;
                     var UnPaidLeaves = 0;
                     response_1[0].map(obj => {
                        const Count = Math.ceil((new Date(obj.To_Date) - new Date(obj.From_Date)) / 86400000) + 1;
                        Previous_Leaves_Count = Previous_Leaves_Count + Count;
                     });
                     if (response_1[1] !== null ) {
                        PaidLeaves_inYear = response_1[1]['PaidLeaves_inYear'];
                     }
                     if (Previous_Leaves_Count <= PaidLeaves_inYear ) {
                        if ((Previous_Leaves_Count + Leaves) > PaidLeaves_inYear) {
                           UnPaidLeaves = (Previous_Leaves_Count + Leaves) - PaidLeaves_inYear;
                        }
                     } else {
                        UnPaidLeaves = Leaves;
                     }
                     var Create_Attendance_Report = new HrAttendanceModel.AttendanceReportSchema({
                        Employee: mongoose.Types.ObjectId(ReceivingData.Employee),
                        From_Date: new Date(ReceivingData.From),
                        To_Date: new Date(ReceivingData.To),
                        MonthYear: new Date(ReceivingData.Month),
                        No_Of_Days: DatArr.length,
                        No_Of_Present: Presents,
                        No_Of_Absent: Absents,
                        No_Of_WeekOff: WeekOffs,
                        No_Of_Holiday: Holidays,
                        No_Of_Leaves: Leaves,
                        No_Of_PaidLeaves_inYear: PaidLeaves_inYear,
                        No_Of_UnPaidLeaves: UnPaidLeaves,
                        No_Of_Previous_Leaves: Previous_Leaves_Count,
                        Detailed_Report: response,
                        Payroll_Generated: false,
                        Created_By: mongoose.Types.ObjectId(ReceivingData.User_Id),
                        Active_Status: true,
                        If_Deleted: false
                     });
                     Create_Attendance_Report.save(function(err, result) {
                        if(err) {
                           ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'HR Attendance Report Creation Query Error', 'Attendance.controller.js');
                           res.status(417).send({Status: false, Message: "Some error occurred while creating the Attendance Report!."});
                        } else {
                           HrAttendanceModel.AttendanceReportSchema
                              .findOne({'_id': result._id })
                              .populate( { path: 'Created_By', select: 'Name'})
                              .populate( { path: 'Employee', select: 'EmployeeName'})
                              .exec(function(err_1, result_1) {
                              if(err_1) {
                                 ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Attendance Report Find Query Error', 'Attendance.controller.js', err_1);
                                 res.status(417).send({status: false, Message: "Some error occurred while Find The Attendance Report!."});
                              } else {
                                 var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result_1), 'SecretKeyOut@123');
                                 ReturnData = ReturnData.toString();
                                 res.status(200).send({Status: true, Response: ReturnData });
                              }
                           });
                        }
                     });
                     // res.status(200).send({Status: true, Available: true, response: response, basic_response: Basic_Data });
                  }).catch(catch_err => {
                     res.status(200).send({Status: false, Available: false, Message: catch_err });
                  });
               }).catch(catch_err => {
                  res.status(200).send({Status: false, Available: false, Message: catch_err });
               });

               function DateDetailsFind(Obj) {
                  return new Promise( (resole, reject) => {
                     Promise.all([
                        HrAttendanceModel.Employee_AttendanceSchema.findOne(
                           { 'Employee': mongoose.Types.ObjectId(ReceivingData.Employee),
                              'Attendance_Date' : new Date(Obj),
                              'If_Deleted': false,
                              'Attendance_Status': { "$ne": 'Rejected' }
                           }, {}, {}).exec(),
                        HrmsLeavesModel.LeavesSchema.findOne(
                           { 'Employee': mongoose.Types.ObjectId(ReceivingData.Employee),
                              $and: [  { From_Date : { $lte: new Date(Obj) } },
                                       { To_Date: { $gte: new Date(Obj) } } ,
                                       { Current_Status: {$ne: 'Draft'} }, 
                                       { Current_Status: {$ne: 'Rejected'} },],
                              'If_Deleted': false 
                           }, {}, {})
                           .populate({path: 'Leave_Type', select:['Name', 'Leave_Type']})
                           .exec(),
                        HrmsSettingsModel.HolidaySchema.findOne(
                           { 'Dates': new Date(Obj),
                              'If_Deleted': false 
                           }, {}, {}).exec()
                     ]).then(response => {
                        const ReturnData = { Date:  new Date(Obj),
                                             If_Attendance: false, Attendance: '', Attendance_Id: null,
                                             If_Leave: false, Leave_From: null, Leave_To: null, Leave_Status: '', Leave_Type: null, Leave_Id: null,
                                             If_Holiday: false, Holiday_Id: null, 
                                             If_Absent: false };
                        if (response[0] !== null) {
                           ReturnData.If_Attendance = true;
                           ReturnData.Attendance = response[0]['Attendance'];
                           ReturnData.Attendance_Id = response[0]['_id']; 
                           if (response[0]['Attendance'] === 'Present') {
                              Presents = Presents + 1;
                           } else {
                              WeekOffs = WeekOffs + 1;
                           }
                        }
                        if (response[1] !== null) {
                           ReturnData.If_Leave = true;
                           ReturnData.Leave_From = response[1]['From_Date'];
                           ReturnData.Leave_To = response[1]['To_Date'];
                           ReturnData.Leave_Status = response[1]['Current_Status'];
                           ReturnData.Leave_Type = response[1]['Leave_Type'];
                           ReturnData.Leave_Id = response[1]['_id'];
                           Leaves = Leaves + 1;
                        }
                        if (response[2] !== null) {
                           ReturnData.If_Holiday = true;
                           ReturnData.Holiday_Id = response[2]['_id'];
                           Holidays = Holidays + 1;
                        }
                        if (response[0] === null && response[1] === null && response[2] === null) {
                           ReturnData.If_Absent = true
                           Absents = Absents + 1;
                        }
                        resole(ReturnData);
                     }).catch( catch_err => {
                        reject(catch_err)
                     });
                  })
               }
            }
         })
   }
};


exports.Attendance_Report_List = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   }else {
      HrAttendanceModel.AttendanceReportSchema
         .find({'If_Deleted': false }, {Detailed_Report: 0}, {sort: { MonthYear: -1 }})
         .populate( { path: 'Created_By', select: 'Name'})
         .populate( { path: 'Employee', select: 'EmployeeName'})
         .exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Attendance Report List Find Query Error', 'Attendance.controller.js', err);
            res.status(417).send({status: false, Message: "Some error occurred while Find The Attendance Reports List!."});
         } else {
            var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
            ReturnData = ReturnData.toString();
            res.status(200).send({Status: true, Response: ReturnData });
         }
      });
   }
};


exports.Attendance_Report_View = function(req, res) {

   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Report_Id || ReceivingData.Report_Id === '' ) {
      res.status(400).send({Status: false, Message: "Attendance Report Details can not be empty" });
   } else if(!ReceivingData.User_Id || ReceivingData.User_Id === '' ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   } else {
      HrAttendanceModel.AttendanceReportSchema
      .findOne({'_id': mongoose.Types.ObjectId(ReceivingData.Report_Id) })
      .populate( { path: 'Created_By', select: 'Name'})
      .populate( { path: 'Employee', select: 'EmployeeName'})
      .populate( { path: 'Detailed_Report.Leave_Type', select: ['Name', 'Leave_Type']})
      .exec(function(err_1, result_1) {
      if(err_1) {
         ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Attendance Report Find Query Error', 'Attendance.controller.js', err_1);
         res.status(417).send({status: false, Message: "Some error occurred while Find The Attendance Report!."});
      } else {
         var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result_1), 'SecretKeyOut@123');
         ReturnData = ReturnData.toString();
         res.status(200).send({Status: true, Response: ReturnData });
      }
   });
   }
};


exports.Attendance_Report_Delete = function(req, res) {

   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Report_Id || ReceivingData.Report_Id === '' ) {
      res.status(400).send({Status: false, Message: "Attendance Report Details can not be empty" });
   } else if(!ReceivingData.User_Id || ReceivingData.User_Id === '' ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   } else {
      Promise.all([
         HrAttendanceModel.AttendanceReportSchema.updateOne(
            { _id : mongoose.Types.ObjectId(ReceivingData.Report_Id)  },
            {  $set: { If_Deleted : true } }).exec(),
         PayrollModel.Payroll.updateMany(
            { Attendance_Report : mongoose.Types.ObjectId(ReceivingData.Report_Id)  },
            {  $set: { If_Deleted : true } }).exec(),
      ]).then( result => {
         res.status(200).send({Status: true, Message: 'Attendance Report Successfully Hided'  });
      }).catch(err => {
         ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Attendance Report Delete Query Error', 'Attendance.controller.js', err);
         res.status(400).send({Status: false, Message: "Some error occurred while hide the Attendance Report!."});
      });
   }
};