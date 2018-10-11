var CryptoJS = require("crypto-js");
var LeavesModel = require('./../../models/Hrms/Leaves.model.js');
var ErrorManagement = require('./../../../handling/ErrorHandling.js');
var mongoose = require('mongoose');



// ******************************** Leaves *************************
   exports.Leaves_Create = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
      
      if(!ReceivingData.User_Id || ReceivingData.User_Id === '' ) {
         res.status(400).send({Status: false, Message: "User Details can not be empty" });
      } else if(!ReceivingData.Employee || ReceivingData.Employee === '' ) {
         res.status(400).send({Status: false, Message: "Employee Name can not be empty" });
      } else if(!ReceivingData.Leave_Type || ReceivingData.Leave_Type === '' ) {
         res.status(400).send({Status: false, Message: "Leave Type can not be empty" });
      } else if(!ReceivingData.From_Date || ReceivingData.From_Date === '' ) {
         res.status(400).send({Status: false, Message: "From Date can not be empty" });
      } else if(!ReceivingData.To_Date || ReceivingData.To_Date === '' ) {
         res.status(400).send({Status: false, Message: "To Date can not be empty" });
      } else if(!ReceivingData.Purpose || ReceivingData.Purpose === '' ) {
         res.status(400).send({Status: false, Message: "Leave Purpose can not be empty" });
      } else {
         var Create_Leaves = new LeavesModel.LeavesSchema({
            Employee: mongoose.Types.ObjectId(ReceivingData.Employee),
            Leave_Type: mongoose.Types.ObjectId(ReceivingData.Leave_Type),
            From_Date: ReceivingData.From_Date,
            To_Date: ReceivingData.To_Date,
            Purpose: ReceivingData.Purpose,
            Current_Status: 'Draft',
            Stage: 'Stage_1',
            Created_By : mongoose.Types.ObjectId(ReceivingData.User_Id),
            Last_Modified_By: mongoose.Types.ObjectId(ReceivingData.User_Id),
            Active_Status: true,
            If_Deleted: false
         });
         Create_Leaves.save(function(err, result) {
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Leaves Creation Query Error', 'Leaves.controller.js', err);
               res.status(400).send({Status: false, Message: "Some error occurred while creating the Leaves!."});
            } else {
               var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
                  ReturnData = ReturnData.toString();
               res.status(200).send({Status: true, Message: 'New Leave Successfully Created' });
            }
         });
      }
   };

   exports.Leaves_List = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
   
      if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
         res.status(400).send({Status: false, Message: "User Details can not be empty" });
      }else {
         LeavesModel.LeavesSchema
            .find({'If_Deleted': false }, {}, {sort: { updatedAt: -1 }})
            .populate({path: 'Employee', select:'EmployeeName'})
            .populate({path: 'Leave_Type', select:'Name'})
            .populate({path: 'Last_Modified_By', select:'Name'})
            .exec(function(err, result) {
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Leaves List Find Query Error', 'Leaves.controller.js', err);
               res.status(417).send({status: false, Message: "Some error occurred while Find The Leaves List!."});
            } else {
               var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
               ReturnData = ReturnData.toString();
               res.status(200).send({Status: true, Response: ReturnData });
            }
         });
      }
   };

   exports.Leave_SendToApprove = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
   
      if(!ReceivingData.Leaves_Id || ReceivingData.Leaves_Id === '' ) {
         res.status(400).send({Status: false, Message: "Leaves Details can not be empty" });
      } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
         res.status(400).send({Status: false, Message: "User Details can not be empty" });
      }else {
         LeavesModel.LeavesSchema.findOne({'_id': mongoose.Types.ObjectId(ReceivingData.Leaves_Id)}, {}, {}, function(err, result) {
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Leaves FindOne Query Error', 'Leaves.controller.js', err);
               res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Leaves!."});
            } else {
               if (result !== null) {
                  result.Current_Status = 'Waiting For Approve';
                  result.Stage = 'Stage_2';
                  result.Last_Modified_By = mongoose.Types.ObjectId(ReceivingData.User_Id);
                  result.save(function(err_1, result_1) {
                     if(err_1) {
                        ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Leave Update Query Error', 'Leaves.controller.js');
                        res.status(417).send({Status: false, Error: err_1, Message: "Some error occurred while Update the Leaves !."});
                     } else {
                        res.status(200).send({Status: true, Message: 'Successfully Approve Request Sent'  });
                     }
                  });
               } else {
                  res.status(400).send({Status: false, Message: "Leave Details can not be valid!" });
               }
            }
         });
      }
   };

   exports.Leave_SendToModify = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
   
      if(!ReceivingData.Leaves_Id || ReceivingData.Leaves_Id === '' ) {
         res.status(400).send({Status: false, Message: "Leaves Details can not be empty" });
      } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
         res.status(400).send({Status: false, Message: "User Details can not be empty" });
      }else {
         LeavesModel.LeavesSchema.findOne({'_id': mongoose.Types.ObjectId(ReceivingData.Leaves_Id)}, {}, {}, function(err, result) {
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Leaves FindOne Query Error', 'Leaves.controller.js', err);
               res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Leaves!."});
            } else {
               if (result !== null) {
                  result.Current_Status = 'Modify';
                  result.Stage = 'Stage_3';
                  result.Last_Modified_By = mongoose.Types.ObjectId(ReceivingData.User_Id);
                  result.save(function(err_1, result_1) {
                     if(err_1) {
                        ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Leave Update Query Error', 'Leaves.controller.js');
                        res.status(417).send({Status: false, Error: err_1, Message: "Some error occurred while Update the Modify !."});
                     } else {
                        res.status(200).send({Status: true, Message: 'Modify Request Sent Successfully'  });
                     }
                  });
               } else {
                  res.status(400).send({Status: false, Message: "Leave Details can not be valid!" });
               }
            }
         });
      }
   };

   exports.Leave_Approve = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
   
      if(!ReceivingData.Leaves_Id || ReceivingData.Leaves_Id === '' ) {
         res.status(400).send({Status: false, Message: "Leaves Details can not be empty" });
      } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
         res.status(400).send({Status: false, Message: "User Details can not be empty" });
      }else {
         LeavesModel.LeavesSchema.findOne({'_id': mongoose.Types.ObjectId(ReceivingData.Leaves_Id)}, {}, {}, function(err, result) {
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Leaves FindOne Query Error', 'Leaves.controller.js', err);
               res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Leaves!."});
            } else {
               if (result !== null) {
                  result.Current_Status = 'Approved';
                  result.Stage = 'Stage_5';
                  result.Last_Modified_By = mongoose.Types.ObjectId(ReceivingData.User_Id);
                  result.save(function(err_1, result_1) {
                     if(err_1) {
                        ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Leave Update Query Error', 'Leaves.controller.js');
                        res.status(417).send({Status: false, Error: err_1, Message: "Some error occurred while Update the Approved !."});
                     } else {
                        res.status(200).send({Status: true, Message: 'Successfully Approved'  });
                     }
                  });
               } else {
                  res.status(400).send({Status: false, Message: "Leave Details can not be valid!" });
               }
            }
         });
      }
   };

   exports.Leave_Rejected = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
   
      if(!ReceivingData.Leaves_Id || ReceivingData.Leaves_Id === '' ) {
         res.status(400).send({Status: false, Message: "Leaves Details can not be empty" });
      } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
         res.status(400).send({Status: false, Message: "User Details can not be empty" });
      }else {
         LeavesModel.LeavesSchema.findOne({'_id': mongoose.Types.ObjectId(ReceivingData.Leaves_Id)}, {}, {}, function(err, result) {
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Leaves FindOne Query Error', 'Leaves.controller.js', err);
               res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Leaves!."});
            } else {
               if (result !== null) {
                  result.Current_Status = 'Rejected';
                  result.Stage = 'Stage_6';
                  result.Last_Modified_By = mongoose.Types.ObjectId(ReceivingData.User_Id);
                  result.save(function(err_1, result_1) {
                     if(err_1) {
                        ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Leave Update Query Error', 'Leaves.controller.js');
                        res.status(417).send({Status: false, Error: err_1, Message: "Some error occurred while Update the Leave Reject !."});
                     } else {
                        res.status(200).send({Status: true, Message: 'Rejected Successfully'  });
                     }
                  });
               } else {
                  res.status(400).send({Status: false, Message: "Leave Details can not be valid!" });
               }
            }
         });
      }
   };

   exports.LeavesList_ForEmployee = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

      if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
         res.status(400).send({Status: false, Message: "User Details can not be empty" });
      }else if (!ReceivingData.Employee_Id || ReceivingData.Employee_Id === ''  ) {
         res.status(400).send({Status: false, Message: "Employee Details can not be empty" });
      }else {
         LeavesModel.LeavesSchema
            .find({ 'If_Deleted': false, 'Employee': mongoose.Types.ObjectId(ReceivingData.Employee_Id) }, {}, { sort: { updatedAt: -1 } })
            .populate({path: 'Employee', select:'EmployeeName'})
            .populate({path: 'Leave_Type', select:'Name'})
            .populate({path: 'Last_Modified_By', select:'Name'})
            .exec(function(err, result) {
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Leaves List Find Query Error', 'Leaves.controller.js', err);
               res.status(417).send({status: false, Message: "Some error occurred while Find The Leaves List!."});
            } else {
               var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
               ReturnData = ReturnData.toString();
               res.status(200).send({Status: true, Response: ReturnData });
            }
         });
      }
   };

   exports.Leave_View = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
   
      if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
         res.status(400).send({Status: false, Message: "User Details can not be empty" });
      } else if (!ReceivingData.Leave_Id || ReceivingData.Leave_Id === ''  ) {
         res.status(400).send({Status: false, Message: "Leave Details can not be empty" });
      }else {
         LeavesModel.LeavesSchema
            .findOne({'_id': mongoose.Types.ObjectId(ReceivingData.Leave_Id) }, {}, {})
            .exec(function(err, result) {
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Leaves List Find Query Error', 'Leaves.controller.js', err);
               res.status(417).send({status: false, Message: "Some error occurred while Find The Leaves List!."});
            } else {
               var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
               ReturnData = ReturnData.toString();
               res.status(200).send({Status: true, Response: ReturnData });
            }
         });
      }
   };

   exports.Leaves_Update = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
   
      if(!ReceivingData.Leaves_Id || ReceivingData.Leaves_Id === '' ) {
         res.status(400).send({Status: false, Message: "Leaves Details can not be empty" });
      }else if(!ReceivingData.From_Date || ReceivingData.From_Date === '' ) {
         res.status(400).send({Status: false, Message: "From Date can not be empty" });
      }else if(!ReceivingData.To_Date || ReceivingData.To_Date === '' ) {
         res.status(400).send({Status: false, Message: "To Date can not be empty" });
      } else if ( !ReceivingData.Employee || ReceivingData.Employee === '' ) {
         res.status(400).send({Status: false, Message: "Employee Name can not be empty" });
      } else if ( !ReceivingData.Leave_Type || ReceivingData.Leave_Type === '') {
         res.status(400).send({Status: false, Message: "Leave Type can not be empty" });
      } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
         res.status(400).send({Status: false, Message: "User Details can not be empty" });
      } else if (!ReceivingData.Purpose || ReceivingData.Purpose === ''  ) {
         res.status(400).send({Status: false, Message: "Leave Purpose can not be empty" });
      }else {
         LeavesModel.LeavesSchema.findOne({'_id': mongoose.Types.ObjectId(ReceivingData.Leaves_Id)}, {}, {}, function(err, result) {
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Leaves FindOne Query Error', 'Leaves.controller.js', err);
               res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Leaves!."});
            } else {
               if (result !== null) {
                  result.Employee = mongoose.Types.ObjectId(ReceivingData.Employee);
                  result.From_Date = ReceivingData.From_Date;
                  result.To_Date = ReceivingData.To_Date;
                  result.Leave_Type = mongoose.Types.ObjectId(ReceivingData.Leave_Type);
                  result.Purpose = ReceivingData.Purpose,
                  result.Last_Modified_By = mongoose.Types.ObjectId(ReceivingData.User_Id);
                  result.save(function(err_1, result_1) {
                     if(err_1) {
                        ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Leave Update Query Error', 'Leaves.controller.js');
                        res.status(417).send({Status: false, Error: err_1, Message: "Some error occurred while Update the Leaves !."});
                     } else {
                        res.status(200).send({Status: true, Message: 'Successfully Updated'  });
                     }
                  });
               } else {
                  res.status(400).send({Status: false, Message: "Leave Details can not be valid!" });
               }
            }
         });
      }
   };

   exports.Leaves_Modify = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
   
      if(!ReceivingData.Leaves_Id || ReceivingData.Leaves_Id === '' ) {
         res.status(400).send({Status: false, Message: "Leaves Details can not be empty" });
      }else if(!ReceivingData.From_Date || ReceivingData.From_Date === '' ) {
         res.status(400).send({Status: false, Message: "From Date can not be empty" });
      }else if(!ReceivingData.To_Date || ReceivingData.To_Date === '' ) {
         res.status(400).send({Status: false, Message: "To Date can not be empty" });
      } else if ( !ReceivingData.Leave_Type || ReceivingData.Leave_Type === '') {
         res.status(400).send({Status: false, Message: "Leave Type can not be empty" });
      } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
         res.status(400).send({Status: false, Message: "User Details can not be empty" });
      } else if (!ReceivingData.Purpose || ReceivingData.Purpose === ''  ) {
         res.status(400).send({Status: false, Message: "Leave Purpose can not be empty" });
      }else {
         LeavesModel.LeavesSchema.findOne({'_id': mongoose.Types.ObjectId(ReceivingData.Leaves_Id)}, {}, {}, function(err, result) {
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Leaves FindOne Query Error', 'Leaves.controller.js', err);
               res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Leaves!."});
            } else {
               if (result !== null) {
                  result.From_Date = ReceivingData.From_Date;
                  result.To_Date = ReceivingData.To_Date;
                  result.Leave_Type = mongoose.Types.ObjectId(ReceivingData.Leave_Type);
                  result.Purpose = ReceivingData.Purpose,
                  result.Current_Status = 'Waiting For Approve';
                  result.Stage = 'Stage_4';
                  result.Last_Modified_By = mongoose.Types.ObjectId(ReceivingData.User_Id);
                  result.save(function(err_1, result_1) {
                     if(err_1) {
                        ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Leave Update Query Error', 'Leaves.controller.js');
                        res.status(417).send({Status: false, Error: err_1, Message: "Some error occurred while Update the Leaves !."});
                     } else {
                        res.status(200).send({Status: true, Message: 'Successfully Updated'  });
                     }
                  });
               } else {
                  res.status(400).send({Status: false, Message: "Leave Details can not be valid!" });
               }
            }
         });
      }
   };