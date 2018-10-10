var CryptoJS = require("crypto-js");
var OnDutyModel = require('./../../models/Hrms/OnDuty.model.js');
var ErrorManagement = require('./../../../handling/ErrorHandling.js');
var mongoose = require('mongoose');

// ******************************** On Duty *************************
exports.OnDuty_Create = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
   
   if(!ReceivingData.User_Id || ReceivingData.User_Id === '' ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   } else if(!ReceivingData.Employee || ReceivingData.Employee === '' ) {
      res.status(400).send({Status: false, Message: "Employee Name can not be empty" });
   } else if(!ReceivingData.From_Date || ReceivingData.From_Date === '' ) {
      res.status(400).send({Status: false, Message: "From Date can not be empty" });
   } else if(!ReceivingData.To_Date || ReceivingData.To_Date === '' ) {
      res.status(400).send({Status: false, Message: "To Date can not be empty" });
   } else if(!ReceivingData.From_Time || ReceivingData.From_Time === '' ) {
      res.status(400).send({Status: false, Message: "From Time can not be empty" });
   } else if(!ReceivingData.To_Time || ReceivingData.To_Time === '' ) {
      res.status(400).send({Status: false, Message: "To Time can not be empty" });
   }else {
      if( ReceivingData.EmployeeName && typeof ReceivingData.EmployeeName === 'object' && Object.keys(ReceivingData.EmployeeName).length > 0){
         ReceivingData.EmployeeName = mongoose.Types.ObjectId(ReceivingData.EmployeeName._id)
      }
      var Create_OnDuty = new OnDutyModel.OnDutySchema({
         Employee: ReceivingData.Employee,
         From_Date: ReceivingData.From_Date,
         To_Date: ReceivingData.To_Date,
         From_Time: ReceivingData.From_Time,
         To_Time: ReceivingData.To_Time,
         Purpose: ReceivingData.Purpose,
         Created_By : mongoose.Types.ObjectId(ReceivingData.User_Id),
         Last_Modified_By: mongoose.Types.ObjectId(ReceivingData.User_Id),
         Active_Status: true,
         If_Deleted: false
      });
      Create_OnDuty.save(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'OnDuty Creation Query Error', 'OnDuty.controller.js', err);
            res.status(400).send({Status: false, Message: "Some error occurred while creating the OnDuty!."});
         } else {
            var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
               ReturnData = ReturnData.toString();
            res.status(200).send({Status: true, Message: 'New OnDuty Successfully Created' });
         }
      });
   }
};
// OnDuty List
exports.OnDuty_List = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   }else {
      OnDutyModel.OnDutySchema
         .find({'If_Deleted': false }, {}, {sort: { updatedAt: -1 }})
         .populate({path: 'Employee', select:'EmployeeName'})
         .exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'OnDuty List Find Query Error', 'OnDuty.controller.js', err);
            res.status(417).send({status: false, Message: "Some error occurred while Find The OnDuty List!."});
         } else {
            var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
            ReturnData = ReturnData.toString();
            res.status(200).send({Status: true, Response: ReturnData });
         }
      });
   }
};


// exports.Leaves_Update = function(req, res) {
//    var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
//    var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

//    if(!ReceivingData.Leaves_Id || ReceivingData.Leaves_Id === ''  ) {
//    res.status(400).send({Status: false, Message: "Leaves Id Details can not be empty" });
//    } else if(!ReceivingData.From_Date || ReceivingData.From_Date === ''  ) {
//    res.status(400).send({Status: false, Message: "From Date can not be empty" });
// } else if (!ReceivingData.To_Date || ReceivingData.To_Date === ''  ) {
//    res.status(400).send({Status: false, Message: "To_Date can not be empty" });
// } else if ( !ReceivingData.EmployeeName || typeof ReceivingData.EmployeeName !== 'object' || Object.keys(ReceivingData.EmployeeName).length < 2) {
//    res.status(400).send({Status: false, Message: "Employee Name can not be empty" });
// } else if ( !ReceivingData.Name || typeof ReceivingData.Name !== 'object' || Object.keys(ReceivingData.Name).length < 2) {
//    res.status(400).send({Status: false, Message: "Name can not be empty" });
// } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
//    res.status(400).send({Status: false, Message: "User Details can not be empty" });
// } else if (!ReceivingData.Modified_By || ReceivingData.Modified_By === ''  ) {
//       res.status(400).send({Status: false, Message: "Modified User Details can not be empty" });
//    }else {
//       if( ReceivingData.EmployeeName && typeof ReceivingData.EmployeeName === 'object' && Object.keys(ReceivingData.EmployeeName).length > 0){
//          ReceivingData.EmployeeName = mongoose.Types.ObjectId(ReceivingData.EmployeeName._id)
//       }
//       if( ReceivingData.Name && typeof ReceivingData.Name === 'object' && Object.keys(ReceivingData.Name).length > 0){
//          ReceivingData.Name = mongoose.Types.ObjectId(ReceivingData.Name._id)
//       }
//       LeavesModel.LeavesSchema.update( 
//          {'_id': mongoose.Types.ObjectId(ReceivingData.Leaves_Id)}, 
//          { $set: { 
//                   EmployeeName: ReceivingData.EmployeeName, 
//                   Name: ReceivingData.Name,
//                   From_Date: ReceivingData.From_Date, 
//                   To_Date: ReceivingData.To_Date,
//                   Purpose: ReceivingData.Purpose,
//                   Last_Modified_By: mongoose.Types.ObjectId(ReceivingData.Modified_By)
//                } 
//       }).exec( function(err, result) {
//          if(err) {
//             ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Hrms Leaves FindOne Query Error', 'Leaves.controller.js', err);
//             res.status(417).send({status: false, Message: "Some error occurred while Find The Leaves!."});
//          } else {
//             LeavesModel.LeavesSchema
//                .findOne({'_id': ReceivingData.Leaves_Id})
//                .populate({path : 'Employee', select: ['EmployeeName']})
//                .populate({path : 'Name', select: ['Name']})
//                .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
//                .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
//                .exec(function(err_2, result_2) { // Leaves FindOne Query
//                if(err_2) {
//                   ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Hrms Leaves Find Query Error', 'Leaves.controller.js', err_2);
//                   res.status(417).send({status: false, Message: "Some error occurred while Find The Leaves!."});
//                } else {
//                   var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result_2), 'SecretKeyOut@123');
//                      ReturnData = ReturnData.toString();
//                   res.status(200).send({Status: true, Response: ReturnData });
//                }
//             });
//          }
//       });
//    }
// };
// OnDuty Update
exports.OnDuty_Update = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.OnDuty_Id || ReceivingData.OnDuty_Id === '' ) {
      res.status(400).send({Status: false, Message: "OnDuty Details can not be empty" });
   }else if(!ReceivingData.From_Date || ReceivingData.From_Date === '' ) {
      res.status(400).send({Status: false, Message: "From Date can not be empty" });
   }else if(!ReceivingData.To_Date || ReceivingData.To_Date === '' ) {
      res.status(400).send({Status: false, Message: "To Date can not be empty" });
   } else if ( !ReceivingData.EmployeeName || ReceivingData.EmployeeName === '' ) {
      res.status(400).send({Status: false, Message: "Employee Name can not be empty" });
   } else if ( !ReceivingData.From_Time || ReceivingData.From_Time === '') {
      res.status(400).send({Status: false, Message: "From Time can not be empty" });
   } else if ( !ReceivingData.To_Time || ReceivingData.To_Time === '') {
      res.status(400).send({Status: false, Message: "To Time can not be empty" });
   } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   }else {
      OnDutyModel.OnDutySchema.findOne({'_id': mongoose.Types.ObjectId(ReceivingData.OnDuty_Id)}, {}, {}, function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Leaves FindOne Query Error', 'OnDuty.controller.js', err);
            res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The OnDuty!."});
         } else {
            if (result !== null) {
               result.EmployeeName = ReceivingData.EmployeeName;
               result.From_Date = ReceivingData.From_Date;
               result.To_Date = ReceivingData.To_Date;
               result.From_Time = ReceivingData.From_Time;
               result.To_Time = ReceivingData.To_Time;
               result.Purpose = ReceivingData.Purpose,
               result.Last_Modified_By = mongoose.Types.ObjectId(ReceivingData.User_Id);
               result.save(function(err_1, result_1) { //  OnDuty Update Query
                  if(err_1) {
                     ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Leave Update Query Error', 'OnDuty.controller.js');
                     res.status(417).send({Status: false, Error: err_1, Message: "Some error occurred while Update the Leaves !."});
                  } else {
                     res.status(200).send({Status: true, Message: 'Successfully Updated'  });
                  }
               });
            } else {
               res.status(400).send({Status: false, Message: "OnDuty Details can not be valid!" });
            }
         }
      });
   }
};