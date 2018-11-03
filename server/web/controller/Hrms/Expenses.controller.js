var CryptoJS = require("crypto-js");
var ExpensesModel = require('./../../models/Hrms/Expenses.model.js');
var ErrorManagement = require('./../../../handling/ErrorHandling.js');
var mongoose = require('mongoose');



// ******************************** Expenses *************************
   exports.Expenses_Create = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
      
      if(!ReceivingData.User_Id || ReceivingData.User_Id === '' ) {
         res.status(400).send({Status: false, Message: "User Details can not be empty" });
      } else if(!ReceivingData.Employee || ReceivingData.Employee === '' ) {
         res.status(400).send({Status: false, Message: "Employee Name can not be empty" });
      } else if(!ReceivingData.Expenses_Type || ReceivingData.Expenses_Type === '' ) {
         res.status(400).send({Status: false, Message: "Expenses Type can not be empty" });
      } else if(!ReceivingData.Applied_Date || ReceivingData.Applied_Date === '' ) {
         res.status(400).send({Status: false, Message: "Date can not be empty" });
      } else if(!ReceivingData.Description || ReceivingData.Description === '' ) {
         res.status(400).send({Status: false, Message: "Description can not be empty" });
      } else if(!ReceivingData.Amount || ReceivingData.Amount === '' ) {
         res.status(400).send({Status: false, Message: "Amount can not be empty" });
      } else {
         var Create_Expenses = new ExpensesModel.ExpensesSchema({
            Employee: mongoose.Types.ObjectId(ReceivingData.Employee),
            Expenses_Type: mongoose.Types.ObjectId(ReceivingData.Expenses_Type),
            Applied_Date: ReceivingData.Applied_Date,
            Required_Date: ReceivingData.Required_Date,
            Description: ReceivingData.Description,
            Amount: ReceivingData.Amount,
            Current_Status: 'Draft',
            Stage: 'Stage_1',
            Created_By : mongoose.Types.ObjectId(ReceivingData.User_Id),
            Last_Modified_By: mongoose.Types.ObjectId(ReceivingData.User_Id),
            Active_Status: true,
            If_Deleted: false
         });
         Create_Expenses.save(function(err, result) {
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Expenses Creation Query Error', 'Expenses.controller.js', err);
               res.status(400).send({Status: false, Message: "Some error occurred while creating the Expenses!."});
            } else {
               var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
                  ReturnData = ReturnData.toString();
               res.status(200).send({Status: true, Message: 'New Expenses Successfully Created' });
            }
         });
      }
   };

   exports.Expenses_List = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
   
      if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
         res.status(400).send({Status: false, Message: "User Details can not be empty" });
      }else {
         ExpensesModel.ExpensesSchema
            .find({'If_Deleted': false }, {}, {sort: { updatedAt: -1 }})
            .populate({path: 'Employee', select:'EmployeeName'})
            .populate({path: 'Expenses_Type', select:'Expenses_Type'})
            .populate({path: 'Last_Modified_By', select:'Name'})
            .exec(function(err, result) {
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Expenses List Find Query Error', 'Expenses.controller.js', err);
               res.status(417).send({status: false, Message: "Some error occurred while Find The Expenses List!."});
            } else {
               var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
               ReturnData = ReturnData.toString();
               res.status(200).send({Status: true, Response: ReturnData });
            }
         });
      }
   };

   exports.Expenses_SendToApprove = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
   
      if(!ReceivingData.Expenses_Id || ReceivingData.Expenses_Id === '' ) {
         res.status(400).send({Status: false, Message: "Expenses Details can not be empty" });
      } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
         res.status(400).send({Status: false, Message: "User Details can not be empty" });
      }else {
         ExpensesModel.ExpensesSchema.findOne({'_id': mongoose.Types.ObjectId(ReceivingData.Expenses_Id)}, {}, {}, function(err, result) {
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Expenses FindOne Query Error', 'Expenses.controller.js', err);
               res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Expenses!."});
            } else {
               if (result !== null) {
                  result.Current_Status = 'Waiting For Approve';
                  result.Stage = 'Stage_2';
                  result.Last_Modified_By = mongoose.Types.ObjectId(ReceivingData.User_Id);
                  result.save(function(err_1, result_1) {
                     if(err_1) {
                        ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Expense Update Query Error', 'Expenses.controller.js');
                        res.status(417).send({Status: false, Error: err_1, Message: "Some error occurred while Update the Expenses !."});
                     } else {
                        res.status(200).send({Status: true, Message: 'Successfully Approve Request Sent'  });
                     }
                  });
               } else {
                  res.status(400).send({Status: false, Message: "Expenses Details can not be valid!" });
               }
            }
         });
      }
   };

   exports.Expenses_SendToModify = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
   
      if(!ReceivingData.Expenses_Id || ReceivingData.Expenses_Id === '' ) {
         res.status(400).send({Status: false, Message: "Expenses Details can not be empty" });
      } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
         res.status(400).send({Status: false, Message: "User Details can not be empty" });
      }else {
         ExpensesModel.ExpensesSchema.findOne({'_id': mongoose.Types.ObjectId(ReceivingData.Expenses_Id)}, {}, {}, function(err, result) {
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Expenses FindOne Query Error', 'Expenses.controller.js', err);
               res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Expenses!."});
            } else {
               if (result !== null) {
                  result.Current_Status = 'Modify';
                  result.Stage = 'Stage_3';
                  result.Last_Modified_By = mongoose.Types.ObjectId(ReceivingData.User_Id);
                  result.save(function(err_1, result_1) {
                     if(err_1) {
                        ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Expenses Update Query Error', 'Expenses.controller.js');
                        res.status(417).send({Status: false, Error: err_1, Message: "Some error occurred while Update the Modify !."});
                     } else {
                        res.status(200).send({Status: true, Message: 'Modify Request Sent Successfully'  });
                     }
                  });
               } else {
                  res.status(400).send({Status: false, Message: "Expenses Details can not be valid!" });
               }
            }
         });
      }
   };

   exports.Expenses_Approve = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
   
      if(!ReceivingData.Expenses_Id || ReceivingData.Expenses_Id === '' ) {
         res.status(400).send({Status: false, Message: "Expenses Details can not be empty" });
      } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
         res.status(400).send({Status: false, Message: "User Details can not be empty" });
      }else {
         ExpensesModel.ExpensesSchema.findOne({'_id': mongoose.Types.ObjectId(ReceivingData.Expenses_Id)}, {}, {}, function(err, result) {
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Expenses FindOne Query Error', 'Expenses.controller.js', err);
               res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Expenses!."});
            } else {
               if (result !== null) {
                  result.Current_Status = 'Approved';
                  result.Stage = 'Stage_5';
                  result.Last_Modified_By = mongoose.Types.ObjectId(ReceivingData.User_Id);
                  result.save(function(err_1, result_1) {
                     if(err_1) {
                        ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Expenses Update Query Error', 'Expenses.controller.js');
                        res.status(417).send({Status: false, Error: err_1, Message: "Some error occurred while Update the Approved !."});
                     } else {
                        res.status(200).send({Status: true, Message: 'Successfully Approved'  });
                     }
                  });
               } else {
                  res.status(400).send({Status: false, Message: "Expenses Details can not be valid!" });
               }
            }
         });
      }
   };

   exports.Expenses_Rejected = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
   
      if(!ReceivingData.Expenses_Id || ReceivingData.Expenses_Id === '' ) {
         res.status(400).send({Status: false, Message: "Expenses Details can not be empty" });
      } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
         res.status(400).send({Status: false, Message: "User Details can not be empty" });
      }else {
         ExpensesModel.ExpensesSchema.findOne({'_id': mongoose.Types.ObjectId(ReceivingData.Expenses_Id)}, {}, {}, function(err, result) {
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Expenses FindOne Query Error', 'Expenses.controller.js', err);
               res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Expenses!."});
            } else {
               if (result !== null) {
                  result.Current_Status = 'Rejected';
                  result.Stage = 'Stage_6';
                  result.Last_Modified_By = mongoose.Types.ObjectId(ReceivingData.User_Id);
                  result.save(function(err_1, result_1) {
                     if(err_1) {
                        ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Expenses Update Query Error', 'Expenses.controller.js');
                        res.status(417).send({Status: false, Error: err_1, Message: "Some error occurred while Update the Expenses Reject !."});
                     } else {
                        res.status(200).send({Status: true, Message: 'Rejected Successfully'  });
                     }
                  });
               } else {
                  res.status(400).send({Status: false, Message: "Expenses Details can not be valid!" });
               }
            }
         });
      }
   };

   exports.ExpensesList_ForEmployee = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

      if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
         res.status(400).send({Status: false, Message: "User Details can not be empty" });
      }else if (!ReceivingData.Employee_Id || ReceivingData.Employee_Id === ''  ) {
         res.status(400).send({Status: false, Message: "Employee Details can not be empty" });
      }else {
         ExpensesModel.ExpensesSchema
            .find({ 'If_Deleted': false,  $or: [ {'Employee': mongoose.Types.ObjectId(ReceivingData.Employee_Id) }, {'Created_By': mongoose.Types.ObjectId(ReceivingData.User_Id) } ] }, {}, { sort: { updatedAt: -1 } })
            .populate({path: 'Employee', select:'EmployeeName'})
            .populate({path: 'Expenses_Type', select:'Expenses_Type'})
            .populate({path: 'Last_Modified_By', select:'Name'})
            .exec(function(err, result) {
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Expenses List Find Query Error', 'Expenses.controller.js', err);
               res.status(417).send({status: false, Message: "Some error occurred while Find The Expenses List!."});
            } else {
               var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
               ReturnData = ReturnData.toString();
               res.status(200).send({Status: true, Response: ReturnData });
            }
         });
      }
   };

   exports.Expenses_View = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
   
      if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
         res.status(400).send({Status: false, Message: "User Details can not be empty" });
      } else if (!ReceivingData.Expenses_Id || ReceivingData.Expenses_Id === ''  ) {
         res.status(400).send({Status: false, Message: "Expenses Details can not be empty" });
      }else {
         ExpensesModel.ExpensesSchema
            .findOne({'_id': mongoose.Types.ObjectId(ReceivingData.Expenses_Id) }, {}, {})
            .exec(function(err, result) {
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Expenses List Find Query Error', 'Expenses.controller.js', err);
               res.status(417).send({status: false, Message: "Some error occurred while Find The Expenses List!."});
            } else {
               var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
               ReturnData = ReturnData.toString();
               res.status(200).send({Status: true, Response: ReturnData });
            }
         });
      }
   };

   exports.Expenses_Update = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
   
      if(!ReceivingData.Expenses_Id || ReceivingData.Expenses_Id === '' ) {
         res.status(400).send({Status: false, Message: "Expenses Details can not be empty" });
      }else if(!ReceivingData.Applied_Date || ReceivingData.Applied_Date === '' ) {
         res.status(400).send({Status: false, Message: "Date can not be empty" });
      }else if(!ReceivingData.Amount || ReceivingData.Amount === '' ) {
         res.status(400).send({Status: false, Message: "Amount can not be empty" });
      } else if ( !ReceivingData.Employee || ReceivingData.Employee === '' ) {
         res.status(400).send({Status: false, Message: "Employee Name can not be empty" });
      } else if ( !ReceivingData.Expenses_Type || ReceivingData.Expenses_Type === '') {
         res.status(400).send({Status: false, Message: "Expenses Type can not be empty" });
      } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
         res.status(400).send({Status: false, Message: "User Details can not be empty" });
      } else if (!ReceivingData.Description || ReceivingData.Description === ''  ) {
         res.status(400).send({Status: false, Message: "Expenses Description can not be empty" });
      }else {
         ExpensesModel.ExpensesSchema.findOne({'_id': mongoose.Types.ObjectId(ReceivingData.Expenses_Id)}, {}, {}, function(err, result) {
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Expenses FindOne Query Error', 'Expenses.controller.js', err);
               res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Expenses!."});
            } else {
               if (result !== null) {
                  result.Employee = mongoose.Types.ObjectId(ReceivingData.Employee);
                  result.Applied_Date = ReceivingData.Applied_Date;
                  result.Required_Date = ReceivingData.Required_Date;
                  result.Expenses_Type = mongoose.Types.ObjectId(ReceivingData.Expenses_Type);
                  result.Description = ReceivingData.Description;
                  result.Amount = ReceivingData.Amount;
                  result.Last_Modified_By = mongoose.Types.ObjectId(ReceivingData.User_Id);
                  result.save(function(err_1, result_1) {
                     if(err_1) {
                        ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Expenses Update Query Error', 'Expenses.controller.js');
                        res.status(417).send({Status: false, Error: err_1, Message: "Some error occurred while Update the Expenses !."});
                     } else {
                        res.status(200).send({Status: true, Message: 'Successfully Updated'  });
                     }
                  });
               } else {
                  res.status(400).send({Status: false, Message: "Expenses Details can not be valid!" });
               }
            }
         });
      }
   };

   exports.Expenses_Modify = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
   
      if(!ReceivingData.Expenses_Id || ReceivingData.Expenses_Id === '' ) {
         res.status(400).send({Status: false, Message: "Expenses Details can not be empty" });
      }else if(!ReceivingData.Applied_Date || ReceivingData.Applied_Date === '' ) {
         res.status(400).send({Status: false, Message: "Applied Date can not be empty" });
      }else if(!ReceivingData.Amount || ReceivingData.Amount === '' ) {
         res.status(400).send({Status: false, Message: "Expense Amount can not be empty" });
      } else if ( !ReceivingData.Expenses_Type || ReceivingData.Expenses_Type === '') {
         res.status(400).send({Status: false, Message: "Expenses Type can not be empty" });
      } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
         res.status(400).send({Status: false, Message: "User Details can not be empty" });
      } else if (!ReceivingData.Description || ReceivingData.Description === ''  ) {
         res.status(400).send({Status: false, Message: "Expenses Description can not be empty" });
      }else {
         ExpensesModel.ExpensesSchema.findOne({'_id': mongoose.Types.ObjectId(ReceivingData.Expenses_Id)}, {}, {}, function(err, result) {
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Expenses FindOne Query Error', 'Expenses.controller.js', err);
               res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Expenses!."});
            } else {
               if (result !== null) {
                  result.Applied_Date = ReceivingData.Applied_Date;
                  result.Required_Date = ReceivingData.Required_Date;
                  result.Expenses_Type = mongoose.Types.ObjectId(ReceivingData.Expenses_Type);
                  result.Description = ReceivingData.Description;
                  result.Amount = ReceivingData.Amount;
                  result.Current_Status = 'Waiting For Approve';
                  result.Stage = 'Stage_4';
                  result.Last_Modified_By = mongoose.Types.ObjectId(ReceivingData.User_Id);
                  result.save(function(err_1, result_1) {
                     if(err_1) {
                        ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Expenses Update Query Error', 'Expenses.controller.js');
                        res.status(417).send({Status: false, Error: err_1, Message: "Some error occurred while Update the Expenses !."});
                     } else {
                        res.status(200).send({Status: true, Message: 'Successfully Updated'  });
                     }
                  });
               } else {
                  res.status(400).send({Status: false, Message: "Expenses Details can not be valid!" });
               }
            }
         });
      }
   };