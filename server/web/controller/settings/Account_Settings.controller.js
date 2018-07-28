var CryptoJS = require("crypto-js");
var AccountSettingsModel = require('./../../models/settings/Account_Settings.model.js');
var ErrorManagement = require('./../../../handling/ErrorHandling.js');

// ************************************************** Income Type *****************************************************
   // Income Type Create -----------------------------------------------
      exports.Income_Type_Create = function(req, res) {
         var CryptoBytes = CryptoJS.AES.decrypt( req.body.Info , 'SecretKeyIn@123' );
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
         
         if(!ReceivingData.Income_Type || ReceivingData.Income_Type === '' ) {
            res.status(400).send({Status: false, Message: "Income Type can not be empty" });
         } else if (!ReceivingData.Company_Id || ReceivingData.Company_Id === ''  ) {
            res.status(400).send({Status: false, Message: "Company Details can not be empty" });
         } else if (!ReceivingData.Created_By || ReceivingData.Created_By === ''  ) {
            res.status(400).send({Status: false, Message: "Creator Details can not be empty" });
         }else {
            var Create_IncomeType = new AccountSettingsModel.IncomeTypeSchema({
               Income_Type: ReceivingData.Income_Type, 
               Company_Id: ReceivingData.Company_Id,
               Created_By: ReceivingData.Created_By,
               Last_Modified_By: ReceivingData.Created_By,
               Active_Status: true,
               If_Deleted: false
            });
            Create_IncomeType.save(function(err, result) { // Income Type Save Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Account Income Type Creation Query Error', 'Account_Settings.controller.js');
                  res.status(417).send({Status: false, Error: err, Message: "Some error occurred while creating the Income Type!."});
               } else {
                  var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
                  ReturnData = ReturnData.toString();
                  res.status(200).send({Status: true, Response: ReturnData });
               }
            });
         }
      };

   // Income Type List -----------------------------------------------
      exports.Income_Type_List = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '' ) {
            res.status(400).send({Status: false, Message: "Company Details can not be empty" });
         } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
            res.status(400).send({Status: false, Message: "User Details can not be empty" });
         }else {
            AccountSettingsModel.IncomeTypeSchema.find({'Company_Id': ReceivingData.Company_Id, 'If_Deleted': false }, {}, {sort: { updatedAt: -1 }}, function(err, result) { // Income Type FindOne Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Account Income Type Find Query Error', 'Account_Settings.controller.js', err);
                  res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Income Type!."});
               } else {
                  var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
                  ReturnData = ReturnData.toString();
                  res.status(200).send({Status: true, Response: ReturnData });
               }
            });
         }
      };

   // Income Type Simple List -----------------------------------------------
      exports.Income_Type_SimpleList = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '' ) {
            res.status(400).send({Status: false, Message: "Company Details can not be empty" });
         } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
            res.status(400).send({Status: false, Message: "User Details can not be empty" });
         }else {
            AccountSettingsModel.IncomeTypeSchema.find({'Company_Id': ReceivingData.Company_Id, 'If_Deleted': false }, { Industry_Type : 1 }, {sort: { updatedAt: -1 }}, function(err, result) { // Income Type FindOne Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Account Income Type Find Query Error', 'Account_Settings.controller.js', err);
                  res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Income Type!."});
               } else {
                  var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
                  ReturnData = ReturnData.toString();
                  res.status(200).send({Status: true, Response: ReturnData });
               }
            });
         }
      };

   // Income Type Update -----------------------------------------------
      exports. Income_Type_Update = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData. Income_Type_Id || ReceivingData.Income_Type_Id === '' ) {
            res.status(400).send({Status: false, Message: "Income Type Id can not be empty" });
         }else if(!ReceivingData.Income_Type || ReceivingData.Income_Type === '' ) {
            res.status(400).send({Status: false, Message: "Income Typecan not be empty" });
         } else if (!ReceivingData.Modified_By || ReceivingData.Modified_By === ''  ) {
            res.status(400).send({Status: false, Message: "Modified User Details can not be empty" });
         }else {
            AccountSettingsModel.IncomeTypeSchema.findOne({'_id': ReceivingData.Income_Type_Id}, {}, {}, function(err, result) { // Income Type FindOne Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Account Income Type FindOne Query Error', 'Account_Settings.controller.js', err);
                  res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Income Type!."});
               } else {
                  if (result !== null) {
                     result.Income_Type = ReceivingData.Income_Type;
                     result.Last_Modified_By = ReceivingData.Modified_By;
                     result.save(function(err_1, result_1) { // Income Type Update Query
                        if(err_1) {
                           ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Account Income Type Update Query Error', 'Account_Settings.controller.js');
                           res.status(417).send({Status: false, Error: err_1, Message: "Some error occurred while Update the Income Type!."});
                        } else {
                           var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result_1), 'SecretKeyOut@123');
                           ReturnData = ReturnData.toString();
                           res.status(200).send({Status: true, Response: ReturnData });
                        }
                     });
                  } else {
                     res.status(400).send({Status: false, Message: "Income Type Id can not be valid!" });
                  }
               }
            });
         }
      };

   // Income Type Delete -----------------------------------------------
      exports.Income_Type_Delete = function(req, res) { 
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Income_Type_Id || ReceivingData.Income_Type_Id === '' ) {
            res.status(400).send({Status: false, Message: "Income Type Id can not be empty" });
         } else if (!ReceivingData.Modified_By || ReceivingData.Modified_By === ''  ) {
            res.status(400).send({Status: false, Message: "Modified User Details can not be empty" });
         }else {
            AccountSettingsModel.IncomeTypeSchema.findOne({'_id': ReceivingData.Income_Type_Id}, {}, {}, function(err, result) { // Income Type FindOne Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Account Income Type FindOne Query Error', 'Account_Settings.controller.js', err);
                  res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Income Type!."});
               } else {
                  if (result !== null) {
                     result.If_Deleted = true;
                     result.Last_Modified_By = ReceivingData.Modified_By;
                     result.save(function(err_1, result_1) { // Income Type Delete Query
                        if(err_1) {
                           ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Account Income Type Delete Query Error', 'Account_Settings.controller.js');
                           res.status(417).send({Status: false, Error: err_1, Message: "Some error occurred while Delete the Income Type!."});
                        } else {
                           res.status(200).send({Status: true, Message: 'Successfully Deleted' });
                        }
                     });
                  } else {
                     res.status(400).send({Status: false, Message: "Income Type Id can not be valid!" });
                  }
               }
            });
         }
      };


// ************************************************** Payment Terms *****************************************************
   // Payment Terms Create -----------------------------------------------
      exports.Payment_Terms_Create = function(req, res) {
         var CryptoBytes = CryptoJS.AES.decrypt( req.body.Info , 'SecretKeyIn@123' );
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
         
         if(!ReceivingData.Payment_Terms || ReceivingData.Payment_Terms === '' ) {
            res.status(400).send({Status: false, Message: "Payment Terms can not be empty" });
         } else if (!ReceivingData.Company_Id || ReceivingData.Company_Id === ''  ) {
            res.status(400).send({Status: false, Message: "Company Details can not be empty" });
         } else if (!ReceivingData.Created_By || ReceivingData.Created_By === ''  ) {
            res.status(400).send({Status: false, Message: "Creator Details can not be empty" });
         } else {
            var Create_PaymentTerms = new AccountSettingsModel.PaymentTermsSchema({
               Payment_Terms: ReceivingData.Payment_Terms, 
               Company_Id: ReceivingData.Company_Id,
               Created_By: ReceivingData.Created_By,
               Last_Modified_By: ReceivingData.Created_By,
               Active_Status: true,
               If_Deleted: false
            });
            Create_PaymentTerms.save(function(err, result) { // Payment Terms Save Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Account Payment Terms Creation Query Error', 'Account_Settings.controller.js');
                  res.status(417).send({Status: false, Error: err, Message: "Some error occurred while creating the Payment Terms!."});
               } else {
                  var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
                  ReturnData = ReturnData.toString();
                  res.status(200).send({Status: true, Response: ReturnData });
               }
            });
         }
      };

   // Payment Terms List -----------------------------------------------
      exports.Payment_Terms_List = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '' ) {
            res.status(400).send({Status: false, Message: "Company Details can not be empty" });
         } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
            res.status(400).send({Status: false, Message: "User Details can not be empty" });
         }else {
            AccountSettingsModel.PaymentTermsSchema.find({'Company_Id': ReceivingData.Company_Id, 'If_Deleted': false }, {}, {sort: { updatedAt: -1 }}, function(err, result) { // Payment Terms FindOne Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Account Payment Terms Find Query Error', 'Account_Settings.controller.js', err);
                  res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Payment Terms!."});
               } else {
                  var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
                  ReturnData = ReturnData.toString();
                  res.status(200).send({Status: true, Response: ReturnData });
               }
            });
         }
      };

   // Payment Terms Simple List -----------------------------------------------
      exports.Payment_Terms_SimpleList = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '' ) {
            res.status(400).send({Status: false, Message: "Company Details can not be empty" });
         } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
            res.status(400).send({Status: false, Message: "User Details can not be empty" });
         }else {
            AccountSettingsModel.PaymentTermsSchema.find({'Company_Id': ReceivingData.Company_Id, 'If_Deleted': false }, { Industry_Type : 1 }, {sort: { updatedAt: -1 }}, function(err, result) { // Payment Terms FindOne Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Account Payment Terms Find Query Error', 'Account_Settings.controller.js', err);
                  res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Payment Terms!."});
               } else {
                  var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
                  ReturnData = ReturnData.toString();
                  res.status(200).send({Status: true, Response: ReturnData });
               }
            });
         }
      };

   // Payment Terms Update -----------------------------------------------
      exports. Payment_Terms_Update = function(req, res) {
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData. Payment_Terms_Id || ReceivingData.Payment_Terms_Id === '' ) {
            res.status(400).send({Status: false, Message: "Payment Terms Id can not be empty" });
         }else if(!ReceivingData.Payment_Terms || ReceivingData.Payment_Terms === '' ) {
            res.status(400).send({Status: false, Message: "Payment Terms can not be empty" });
         } else if (!ReceivingData.Modified_By || ReceivingData.Modified_By === ''  ) {
            res.status(400).send({Status: false, Message: "Modified User Details can not be empty" });
         }else {
            AccountSettingsModel.PaymentTermsSchema.findOne({'_id': ReceivingData.Payment_Terms_Id}, {}, {}, function(err, result) { // Payment Terms FindOne Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Account Payment Terms FindOne Query Error', 'Account_Settings.controller.js', err);
                  res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Payment Terms!."});
               } else {
                  if (result !== null) {
                     result.Payment_Terms = ReceivingData.Payment_Terms;
                     result.Last_Modified_By = ReceivingData.Modified_By;
                     result.save(function(err_1, result_1) { // Payment Terms Update Query
                        if(err_1) {
                           ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Account Payment Terms Update Query Error', 'Account_Settings.controller.js');
                           res.status(417).send({Status: false, Error: err_1, Message: "Some error occurred while Update the Payment Terms!."});
                        } else {
                           var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result_1), 'SecretKeyOut@123');
                           ReturnData = ReturnData.toString();
                           res.status(200).send({Status: true, Response: ReturnData });
                        }
                     });
                  } else {
                     res.status(400).send({Status: false, Message: "Payment Terms Id can not be valid!" });
                  }
               }
            });
         }
      };

   // Payment Terms Delete -----------------------------------------------
      exports.Payment_Terms_Delete = function(req, res) { 
         var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Payment_Terms_Id || ReceivingData.Payment_Terms_Id === '' ) {
            res.status(400).send({Status: false, Message: "Payment Terms Id can not be empty" });
         } else if (!ReceivingData.Modified_By || ReceivingData.Modified_By === ''  ) {
            res.status(400).send({Status: false, Message: "Modified User Details can not be empty" });
         }else {
            AccountSettingsModel.PaymentTermsSchema.findOne({'_id': ReceivingData.Payment_Terms_Id}, {}, {}, function(err, result) { // Payment Terms FindOne Query
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Account Payment Terms FindOne Query Error', 'Account_Settings.controller.js', err);
                  res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Payment Terms!."});
               } else {
                  if (result !== null) {
                     result.If_Deleted = true;
                     result.Last_Modified_By = ReceivingData.Modified_By;
                     result.save(function(err_1, result_1) { // Payment Terms Delete Query
                        if(err_1) {
                           ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Account Payment Terms Delete Query Error', 'Account_Settings.controller.js');
                           res.status(417).send({Status: false, Error: err_1, Message: "Some error occurred while Delete the Payment Terms!."});
                        } else {
                           res.status(200).send({Status: true, Message: 'Successfully Deleted' });
                        }
                     });
                  } else {
                     res.status(400).send({Status: false, Message: "Payment Terms Id can not be valid!" });
                  }
               }
            });
         }
      };

//*************************************** Bank **********************************************
   // Bank Create
      exports.Bank_Create =  function(req, res) {
         var CryptoBytes = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Bank_Name || ReceivingData.Bank_Name === ''){
            res.status(400).send({ Status: false, Message: "Bank Name Cannot be Empty"});
         }else if(!ReceivingData.Account_Name || ReceivingData.Account_Name === ''){
            res.status(400).send({ Status: false, Message: "Account Name Cannot be Empty"});
         }else if(!ReceivingData.Account_No || ReceivingData.Account_No === ''){
            res.status(400).send({ Status: false, Message: "Account No cannot be Empty"});
         }else if(!ReceivingData.IFSC_Code || ReceivingData.IFSC_Code === ''){
            res.status(400).send({ Status: false, Message: "IFSC Code cannot be Empty"});
         }else if (!ReceivingData.Company_Id || ReceivingData.Company_Id === ''  ) {
            res.status(400).send({Status: false, Message: "Company Details can not be empty" });
         }else if (!ReceivingData.Created_By || ReceivingData.Created_By === ''  ) {
            res.status(400).send({Status: false, Message: "Creator Details can not be empty" });
         }else{
            var Create_Bank = new AccountSettingsModel.BankSchema({
               Bank_Name: ReceivingData.Bank_Name,
               Account_Name: ReceivingData.Account_Name,
               Account_No: ReceivingData.Account_No,
               IFSC_Code: ReceivingData.IFSC_Code,
               Address: ReceivingData.Address,
               Company_Id: ReceivingData.Company_Id,
               Created_By: ReceivingData.Created_By,
               Last_Modified_By: ReceivingData.Created_By,
               Active_Status: true,
               If_Deleted: false
            });
            Create_Bank.save(function(err, result){
               if(err){
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, "Accout Bank Creation Query Error", 'Account_Settings.controller.js', err);
                  res.status(417).send({ Status :false, Message: "Some Error Occur While Creating the Bank Account"});
               }else{
                  var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result),'SecretKeyOut@123');
                  ReturnData = ReturnData.toString();
                  res.status(200).send({ Status: true, Response: ReturnData});
               }
            });
         }
      };

   // Bank List
      exports.Bank_List = function(req, res){
         var CryptoBytes = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
         
         if(!ReceivingData.Company_Id || ReceivingData.Company_Id === ''){
            res.status(400).send({ Status: false, Message: "Company Details Cannot be empty"});
         }else if(!ReceivingData.User_Id || ReceivingData.User_Id === ''){
            res.status(400).send({ Status: false, Message: "User Details Cannot Be empty"});
         }else{
            AccountSettingsModel.BankSchema.find({'Company_Id': ReceivingData.Company_Id, 'If_Deleted': false}, {}, {sort:{updatedAt:-1}}, function(err, result){
               if(err){
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, "Accout Bank Creation Query Error", 'Account_Settings.controller.js',err);
                  res.status(417).send({ Status :false, Message: "Some Error Occur While Creating the Bank Account"});
               }else{
                  var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result),'SecretKeyOut@123');
                  ReturnData = ReturnData.toString();
                  res.status(200).send({ Status: true, Response: ReturnData});
               }
               
            });
         }
      };

   // Bank Simple List
   exports.Bank_Simple_List = function(req, res){
      var CryptoBytes = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

      if(!ReceivingData.Company_Id || ReceivingData.Company_Id === ''){
         res.status(400).send({ Status: false, Message: "Company Details Cannot be empty"});
      }else if(!ReceivingData.User_Id || ReceivingData.User_Id === ''){
         res.status(400).send({ Status: false, Message: "User Details Cannot Be empty"});
      }else{
         AccountSettingsModel.BankSchema.find({'Company_Id': ReceivingData.Company_Id, 'If_Deleted': false}, {}, {sort:{updatedAt:-1}},function(err, result){
            if(err){
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, "Accout Bank find Query Error", 'Account_Settings.controller.js',err);
               res.status(417).send({ Status :false, Message: "Some Error Occur While Creating the Bank Account"});
            }else{
               var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result),'SecretKeyOut@123');
               ReturnData = ReturnData.toString();
               res.status(200).send({ Status: true, Response: ReturnData});
            }
            
         });
      }
   };

   // Bank Update
      exports.Bank_Update = function(req, res){
         var CryptoBytes = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Bank_Id || ReceivingData.Bank_Id === ''){
            res.status.send({ Status: false, Message: "Bank Id cannot be Empty"});
         }else if(!ReceivingData.Bank_Name || ReceivingData.Bank_Name === ''){
            res.status(400).send({ Status: false, Message: "Bank Name Cannot be Empty"});
         }else if(!ReceivingData.Account_Name || ReceivingData.Account_Name === ''){
            res.status(400).send({ Status: false, Message: "Account Name Cannot be Empty"});
         }else if(!ReceivingData.Account_No || ReceivingData.Account_No === ''){
            res.status(400).send({ Status: false, Message: "Account No cannot be Empty"});
         }else if(!ReceivingData.IFSC_Code || ReceivingData.IFSC_Code === ''){
            res.status(400).send({ Status: false, Message: "IFSC Code cannot be Empty"});
         }else if (!ReceivingData.Modified_By || ReceivingData.Modified_By === ''  ) {
            res.status(400).send({ Status: false, Message: "Modified User Details cannot be Empty"});
         }else{
            AccountSettingsModel.BankSchema.findOne({'_id' : ReceivingData.Bank_Id}, {}, {}, function(err, result){
               if (err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, "Accout Bank find one Query Error", 'Account_Settings.controller.js',err);
                  res.status(417).send({ Status :false, Message: "Some Error Occur While Creating the Bank Account"}); 
               }else{
                  if(result !== null){
                     result.Bank_Name = ReceivingData.Bank_Name;
                     result.Account_Name = ReceivingData.Account_Name;
                     result.Account_No = ReceivingData.Account_No;
                     result.IFSC_Code = ReceivingData.IFSC_Code;
                     result.Last_Modified_By = ReceivingData.Modified_By;
                     result.save(function(err_1, result_1){
                        if(err_1){
                           ErrorManagement.ErrorHandling.ErrorLogCreation(req, "Accout Bank Update Query Error", 'Account_Settings.controller.js');
                           res.status(417).send({ Status :false, Error: err_1, Message: "Some Error Occur While Creating the Bank Account"}); 
                        }else{
                           var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result_1),  'SecretKeyOut@123');
                           ReturnData = ReturnData.toString();
                           res.status(200).send({ Status: true, Response: ReturnData});
                        }
                     });
                  }else{
                     res.status(400).send({ Status: false, Message: "Bank Id cannot be valid"});
                  }
               }
            });
         }
   };

   // Bank Delete
      exports.Bank_Delete = function(req, res){
         var CryptoBytes = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
         var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

         if(!ReceivingData.Bank_Id || ReceivingData.Bank_Id === ''){
            res.status(400).send({ Status: false, Message: "Bank Id cannot be Empty"});
         }else if (!ReceivingData.Modified_By || ReceivingData.Modified_By === ''  ) {
            res.status(400).send({ Status: false, Message: "Modified User Details cannot be Empty"});
         }else{
            AccountSettingsModel.BankSchema.findOne({'_id' : ReceivingData.Bank_Id}, {}, {}, function(err, result){
               if (err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, "Accout Bank find one Query Error", 'Account_Settings.controller.js',err);
                  res.status(417).send({ Status :false, Message: "Some Error Occur While Creating the Bank Account"}); 
               }else{
                  if(result !== null){
                     result.If_Deleted = true;
                     result.Last_Modified_By = ReceivingData.Modified_By;
                     result.save(function(err_1, result_1){
                        if(err_1){
                           ErrorManagement.ErrorHandling.ErrorLogCreation(req, "Accout Bank Delete Query Error", 'Account_Settings.controller.js');
                           res.status(417).send({ Status :false, Error: err_1, Message: "Some Error Occur While Creating the Bank Account"}); 
                        } else {
                           res.status(200).send({ Status: true, Message: "Successfully Deleted"});
                        }
                     });
                  } else {
                     res.status(400).send({ Status: false, Message: "Bank Id cannot be valid"});
                  }
               }
            });
         };


      };


