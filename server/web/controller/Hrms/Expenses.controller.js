var CryptoJS = require("crypto-js");
var ExpensesModel = require('./../../models/Hrms/Expenses.model.js');
var ErrorManagement = require('./../../../handling/ErrorHandling.js');
var mongoose = require('mongoose');
var multer = require('multer');


var Expenses_Documents_Storage = multer.diskStorage({
   destination: (req, file, cb) => { cb(null, './Uploads/Expense_Documents'); },
   filename: (req, file, cb) => {
      let extArray = file.originalname.split(".");
      let extension = (extArray[extArray.length - 1]).toLowerCase();
      cb(null, 'Document_' + Date.now() + '.' + extension);
   }
});
var Expenses_Documents = multer({
   storage: Expenses_Documents_Storage
}).array('documents');



// ******************************** Expenses *************************
   exports.Expenses_Create = function(req, res) {
      Expenses_Documents(req, res, function(upload_err) {
         if (upload_err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Expenses Creation Upload Error', 'Expenses.controller.js', upload_err);
            res.status(400).send({Status: false, Message: "Documents Upload Failed Please Try Again."});
         } else {
            var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
            var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
            
            if(!ReceivingData.User_Id || ReceivingData.User_Id === '' ) {
               res.status(400).send({Status: false, Message: "User Details can not be empty" });
            } else if(!ReceivingData.Employee || ReceivingData.Employee === '' ) {
               res.status(400).send({Status: false, Message: "Employee Name can not be empty" });
            } else if(!ReceivingData.Total_Expenses || ReceivingData.Total_Expenses === '' ) {
               res.status(400).send({Status: false, Message: "Total Expenses can not be empty" });
            } else {
               ReceivingData.Expenses_Array = ReceivingData.Expenses_Array.map(obj => {
                  obj.Expenses_Type = mongoose.Types.ObjectId(obj.Expenses_Type);
                  obj.Approved_Amount = 0;
                  obj.Paid_Amount = 0;
                  return obj;
               });
               var Documents = [];
               if (req.files.length > 0) {
                  req.files.map(obj => {
                     Documents.push({ filename: obj.filename, mimetype: obj.mimetype, size: obj.size });
                  });
               }
               var Create_Expenses = new ExpensesModel.ExpensesSchema({
                  Employee: mongoose.Types.ObjectId(ReceivingData.Employee),
                  Total_Expenses: ReceivingData.Total_Expenses,
                  Total_Approved_Expenses: 0,
                  Total_Paid_Expenses: 0,
                  Expenses_Array: ReceivingData.Expenses_Array,
                  Documents: Documents,
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
         }
      });
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
            .populate({path: 'Expenses_Array.Expenses_Type', select:'Expenses_Type'})
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
      } else if (!ReceivingData.Total_Approved_Expenses || ReceivingData.Total_Approved_Expenses === ''  ) {
         res.status(400).send({Status: false, Message: "Total Approved Amount can not be empty" });
      } else if (!ReceivingData.Expenses_Array || ReceivingData.Expenses_Array.length <= 0  ) {
         res.status(400).send({Status: false, Message: "Expenses can not be valid" });
      }else {
         if (ReceivingData.Expenses_Array.length > 0) {
            Promise.all(
               ReceivingData.Expenses_Array.map(Obj => {
                  return ExpensesModel.ExpensesSchema.updateOne(
                     { _id : mongoose.Types.ObjectId(ReceivingData.Expenses_Id), "Expenses_Array._id": mongoose.Types.ObjectId(Obj.Expenses_Array_Id) },
                     {  $set: { "Expenses_Array.$.Approved_Amount" : Obj.Approved_Amount } }
                  ).exec();
               })
            ).then(response => {
               ExpensesModel.ExpensesSchema.updateOne(
                  { _id: mongoose.Types.ObjectId(ReceivingData.Expenses_Id) },
                  { $set: {   Total_Approved_Expenses : ReceivingData.Total_Approved_Expenses,
                              Current_Status : 'Approved',
                              Stage: 'Stage_5',
                              Last_Modified_By : mongoose.Types.ObjectId(ReceivingData.User_Id)
                           } 
                  }, function(err_1, result_1) {
                     if(err_1) {
                        ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Expenses Update Query Error', 'Expenses.controller.js');
                        res.status(417).send({Status: false, Error: err_1, Message: "Some error occurred while Update the Approved !."});
                     } else {
                        res.status(200).send({Status: true, Message: 'Successfully Approved'  });
                     }
                  });
            }).catch( catch_err => {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Expenses Update Query Error', 'Expenses.controller.js', catch_err);
               res.status(417).send({Status: false, Error: err_1, Message: "Some error occurred while Update the Approved !."});
            });
         } else {
            res.status(400).send({Status: false, Message: "Expenses Details can not be valid!" });
         }
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
            .populate({path: 'Expenses_Array.Expenses_Type', select:'Expenses_Type'})
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
            .populate({path: 'Employee', select:'EmployeeName'})
            .populate({path: 'Expenses_Array.Expenses_Type', select:'Expenses_Type'})
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

   exports.Expenses_Update = function(req, res) {
      Expenses_Documents(req, res, function(upload_err) {
         if (upload_err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Expenses Creation Upload Error', 'Expenses.controller.js', upload_err);
            res.status(400).send({Status: false, Message: "Documents Upload Failed Please Try Again."});
         } else {
            var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
            var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
         
            if(!ReceivingData.Expenses_Id || ReceivingData.Expenses_Id === '' ) {
               res.status(400).send({Status: false, Message: "Expenses Details can not be empty" });
            } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
               res.status(400).send({Status: false, Message: "User Details can not be empty" });
            } else if(!ReceivingData.Employee || ReceivingData.Employee === '' ) {
               res.status(400).send({Status: false, Message: "Employee Name can not be empty" });
            } else if(!ReceivingData.Total_Expenses || ReceivingData.Total_Expenses === '' ) {
               res.status(400).send({Status: false, Message: "Total Expenses can not be empty" });
            }else {

               ReceivingData.Expenses_Array = ReceivingData.Expenses_Array.map(obj => {
                  obj.Expenses_Type = mongoose.Types.ObjectId(obj.Expenses_Type);
                  obj.Approved_Amount = 0;
                  obj.Paid_Amount = 0;
                  return obj;
               });
               var Documents = [];
               if (req.files.length > 0) {
                  req.files.map(obj => {
                     Documents.push({ filename: obj.filename, mimetype: obj.mimetype, size: obj.size });
                  });
               }
               if (ReceivingData.Previous_Documents) {
                  ReceivingData.Previous_Documents = JSON.parse(ReceivingData.Previous_Documents);
                  if (ReceivingData.Previous_Documents.length > 0) {
                     ReceivingData.Previous_Documents.map(obj => {Documents.push(obj);  return obj;});
                  }
               }
               ExpensesModel.ExpensesSchema.findOne({'_id': mongoose.Types.ObjectId(ReceivingData.Expenses_Id)}, {}, {}, function(err, result) {
                  if(err) {
                     ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Expenses FindOne Query Error', 'Expenses.controller.js', err);
                     res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Expenses!."});
                  } else {
                     if (result !== null) {
                        result.Employee = mongoose.Types.ObjectId(ReceivingData.Employee);
                        result.Total_Expenses = ReceivingData.Total_Expenses;
                        result.Expenses_Array = ReceivingData.Expenses_Array;
                        result.Documents = Documents;
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
         }
      });
   };

   exports.Expenses_Modify = function(req, res) {
      Expenses_Documents(req, res, function(upload_err) {
         if (upload_err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Expenses Creation Upload Error', 'Expenses.controller.js', upload_err);
            res.status(400).send({Status: false, Message: "Documents Upload Failed Please Try Again."});
         } else {
            var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
            var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
         
            if(!ReceivingData.Expenses_Id || ReceivingData.Expenses_Id === '' ) {
               res.status(400).send({Status: false, Message: "Expenses Details can not be empty" });
            } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
               res.status(400).send({Status: false, Message: "User Details can not be empty" });
            } else if(!ReceivingData.Employee || ReceivingData.Employee === '' ) {
               res.status(400).send({Status: false, Message: "Employee Name can not be empty" });
            } else if(!ReceivingData.Total_Expenses || ReceivingData.Total_Expenses === '' ) {
               res.status(400).send({Status: false, Message: "Total Expenses can not be empty" });
            }else {

               ReceivingData.Expenses_Array = ReceivingData.Expenses_Array.map(obj => {
                  obj.Expenses_Type = mongoose.Types.ObjectId(obj.Expenses_Type);
                  obj.Approved_Amount = 0;
                  obj.Paid_Amount = 0;
                  return obj;
               });
               var Documents = [];
               if (req.files.length > 0) {
                  req.files.map(obj => {
                     Documents.push({ filename: obj.filename, mimetype: obj.mimetype, size: obj.size });
                  });
               }
               if (ReceivingData.Previous_Documents) {
                  ReceivingData.Previous_Documents = JSON.parse(ReceivingData.Previous_Documents);
                  if (ReceivingData.Previous_Documents.length > 0) {
                     ReceivingData.Previous_Documents.map(obj => {Documents.push(obj);  return obj;});
                  }
               }
               ExpensesModel.ExpensesSchema.findOne({'_id': mongoose.Types.ObjectId(ReceivingData.Expenses_Id)}, {}, {}, function(err, result) {
                  if(err) {
                     ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Expenses FindOne Query Error', 'Expenses.controller.js', err);
                     res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Expenses!."});
                  } else {
                     if (result !== null) {
                        result.Employee = mongoose.Types.ObjectId(ReceivingData.Employee);
                        result.Total_Expenses = ReceivingData.Total_Expenses;
                        result.Expenses_Array = ReceivingData.Expenses_Array;
                        result.Documents = Documents;
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
         }
      });
   };