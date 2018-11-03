var CryptoJS = require("crypto-js");
var CrmCustomersModel = require('./../../models/Crm/CrmCustomers.model.js');
var ErrorManagement = require('./../../../handling/ErrorHandling.js');
var mongoose = require('mongoose');



// -------------------------------------------------- Crm Customers Create -----------------------------------------------
exports.CrmCustomers_Create = function(req, res) {

   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.User_Id || ReceivingData.User_Id === '' ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   } else if(!ReceivingData.CompanyName || ReceivingData.CompanyName === '' ) {
      res.status(400).send({Status: false, Message: "Company Name can not be empty" });
   } else if(!ReceivingData.EmailAddress || ReceivingData.EmailAddress === '' ) {
      res.status(400).send({Status: false, Message: "Email Address can not be empty" });
   } else if(!ReceivingData.PhoneNumber || ReceivingData.PhoneNumber === '' ) {
      res.status(400).send({Status: false, Message: "Phone Number can not be empty" });
   } else if(!ReceivingData.CompanyType || ReceivingData.CompanyType === '' ) {
      res.status(400).send({Status: false, Message: "Company Type can not be empty" });
   } else {

      if (ReceivingData.IndustryType && typeof ReceivingData.IndustryType === 'object' && Object.keys(ReceivingData.IndustryType).length > 0 ) {
         ReceivingData.IndustryType = mongoose.Types.ObjectId(ReceivingData.IndustryType._id);
      }
      if (ReceivingData.OwnershipType && typeof ReceivingData.OwnershipType === 'object' && Object.keys(ReceivingData.OwnershipType).length > 0 ) {
         ReceivingData.OwnershipType = mongoose.Types.ObjectId(ReceivingData.OwnershipType._id);
      }
      if (ReceivingData.BillingCountry && typeof ReceivingData.BillingCountry === 'object' && Object.keys(ReceivingData.BillingCountry).length > 0 ) {
         ReceivingData.BillingCountry._id = mongoose.Types.ObjectId(ReceivingData.BillingCountry._id);
      }
      if (ReceivingData.BillingState && typeof ReceivingData.BillingState === 'object' && Object.keys(ReceivingData.BillingState).length > 0 ) {
         ReceivingData.BillingState._id = mongoose.Types.ObjectId(ReceivingData.BillingState._id);
      }
      if (ReceivingData.BillingCity && typeof ReceivingData.BillingCity === 'object' && Object.keys(ReceivingData.BillingCity).length > 0 ) {
         ReceivingData.BillingCity._id = mongoose.Types.ObjectId(ReceivingData.BillingCity._id);
      }
      if (ReceivingData.ShopFloorCountry && typeof ReceivingData.ShopFloorCountry === 'object' && Object.keys(ReceivingData.ShopFloorCountry).length > 0 ) {
         ReceivingData.ShopFloorCountry._id = mongoose.Types.ObjectId(ReceivingData.ShopFloorCountry._id);
      }
      if (ReceivingData.ShopFloorState && typeof ReceivingData.ShopFloorState === 'object' && Object.keys(ReceivingData.ShopFloorState).length > 0 ) {
         ReceivingData.ShopFloorState._id = mongoose.Types.ObjectId(ReceivingData.ShopFloorState._id);
      }
      if (ReceivingData.ShopFloorCity && typeof ReceivingData.ShopFloorCity === 'object' && Object.keys(ReceivingData.ShopFloorCity).length > 0 ) {
         ReceivingData.ShopFloorCity._id = mongoose.Types.ObjectId(ReceivingData.ShopFloorCity._id);
      }
      
      var Crm_Customers = new CrmCustomersModel.CrmCustomersSchema({
         CompanyName: ReceivingData.CompanyName,
         PhoneNumber: ReceivingData.PhoneNumber,
         EmailAddress: ReceivingData.EmailAddress,
         Website: ReceivingData.Website,
         NoOfEmployees: ReceivingData.NoOfEmployees,
         CompanyType: ReceivingData.CompanyType,
         StateCode: ReceivingData.StateCode,
         IndustryType: ReceivingData.IndustryType,
         OwnershipType: ReceivingData.OwnershipType,
         GSTNo: ReceivingData.GSTNo,
         Notes: ReceivingData.Notes,
         Image: null,
         "BillingAddress.Street": ReceivingData.BillingStreet,
         "BillingAddress.Area": ReceivingData.BillingArea,
         "BillingAddress.ZipCode": ReceivingData.BillingZipCode,
         "BillingAddress.Country": ReceivingData.BillingCountry,
         "BillingAddress.State": ReceivingData.BillingState,
         "BillingAddress.City": ReceivingData.BillingCity,
         SameAddresses: ReceivingData.SameAddresses,
         "ShopFloorAddress.Street": ReceivingData.ShopFloorStreet,
         "ShopFloorAddress.Area": ReceivingData.ShopFloorArea,
         "ShopFloorAddress.ZipCode": ReceivingData.ShopFloorZipCode,
         "ShopFloorAddress.Country": ReceivingData.ShopFloorCountry,
         "ShopFloorAddress.State": ReceivingData.ShopFloorState,
         "ShopFloorAddress.City": ReceivingData.ShopFloorCity,
         Created_By : mongoose.Types.ObjectId(ReceivingData.User_Id),
         Last_Modified_By : mongoose.Types.ObjectId(ReceivingData.User_Id),
         If_Deleted: false,
         Active_Status : ReceivingData.Active_Status || true,
      });
      
      Crm_Customers.save(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Crm Customer Creation Query Error', 'AdminManagement.controller.js', err);
            res.status(400).send({Status: false, Message: "Some error occurred while creating the Crm Customer!."});
         } else {
            var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
               ReturnData = ReturnData.toString();
            res.status(200).send({Status: true, Message: 'New Customer Successfully Created' });
         }
      });
   }
};
exports.CrmCustomers_List = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   }else {
      CrmCustomersModel.CrmCustomersSchema
         .find({'If_Deleted': false }, {CompanyName: 1, EmailAddress: 1, PhoneNumber: 1, BillingAddress: 1 }, {sort: { updatedAt: -1 }})
         .exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Customers List Find Query Error', 'Crm_Customers.controller.js', err);
            res.status(417).send({status: false, Message: "Some error occurred while Find The Crm Customers List!."});
         } else {
            var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
            ReturnData = ReturnData.toString();
            res.status(200).send({Status: true, Response: ReturnData });
         }
      });
   }
};
exports.CrmCustomers_SimpleList = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   }else {
      CrmCustomersModel.CrmCustomersSchema
         .find({'If_Deleted': false }, {CompanyName: 1 }, {sort: { updatedAt: -1 }})
         .exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Customers Simple List Find Query Error', 'Crm_Customers.controller.js', err);
            res.status(417).send({status: false, Message: "Some error occurred while Find The Crm Customers Simple List!."});
         } else {
            var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
            ReturnData = ReturnData.toString();
            res.status(200).send({Status: true, Response: ReturnData });
         }
      });
   }
};
exports.CrmCustomers_View = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   } else if (!ReceivingData.Customer_Id || ReceivingData.Customer_Id === ''  ) {
      res.status(400).send({Status: false, Message: "Crm Customer Details can not be empty" });
   }else {
      CrmCustomersModel.CrmCustomersSchema
         .findOne({'_id': ReceivingData.Customer_Id }, {}, {})
         .populate({ path: 'IndustryType', select: ['Industry_Type'] })
         .populate({ path: 'OwnershipType', select: ['Ownership_Type'] })
         .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
         .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
         .exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Customers Data Find Query Error', 'Crm_Customers.controller.js', err);
            res.status(417).send({status: false, Message: "Some error occurred while Find The Crm Customers Data!."});
         } else {
            var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
            ReturnData = ReturnData.toString();
            res.status(200).send({Status: true, Response: ReturnData });
         }
      });
   }
};


// For Employee Login
exports.CrmCustomersList_ForEmployee = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   }else if (!ReceivingData.Customers || ReceivingData.Customers === ''  ) {
      res.status(400).send({Status: false, Message: "Customers can not be empty" });
   }else {
      CrmCustomersModel.CrmCustomersSchema
         .find({'If_Deleted': false, _id: { $in: ReceivingData.Customers } }, {CompanyName: 1, EmailAddress: 1, PhoneNumber: 1, BillingAddress: 1 }, {sort: { updatedAt: -1 }})
         .exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Customers List Find Query Error', 'Crm_Customers.controller.js', err);
            res.status(417).send({status: false, Message: "Some error occurred while Find The Crm Customers List!."});
         } else {
            var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
            ReturnData = ReturnData.toString();
            res.status(200).send({Status: true, Response: ReturnData });
         }
      });
   }
};
exports.CrmCustomers_SimpleList_ForEmployee = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   }else if (!ReceivingData.Customers || ReceivingData.Customers === ''  ) {
      res.status(400).send({Status: false, Message: "Customers can not be empty" });
   }else {
      CrmCustomersModel.CrmCustomersSchema
         .find({'If_Deleted': false, _id: { $in: ReceivingData.Customers }  }, {CompanyName: 1 }, {sort: { updatedAt: -1 }})
         .exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Customers Simple List Find Query Error', 'Crm_Customers.controller.js', err);
            res.status(417).send({status: false, Message: "Some error occurred while Find The Crm Customers Simple List!."});
         } else {
            var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
            ReturnData = ReturnData.toString();
            res.status(200).send({Status: true, Response: ReturnData });
         }
      });
   }
};




// -------------------------------------------------- Crm Contact  -----------------------------------------------
exports.CrmCustomerContact_AsyncValidate = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.User_Id || ReceivingData.User_Id === '' ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   } else if(!ReceivingData.Name || ReceivingData.Name === '' ) {
      res.status(400).send({Status: false, Message: " Name can not be empty" });
   } else if(!ReceivingData.Customer || ReceivingData.Customer === '' ) {
      res.status(400).send({Status: false, Message: "Customer Details can not be empty" });
   }else {
      CrmCustomersModel.CrmCustomerContactsSchema.findOne({'Customer': ReceivingData.Customer, 'Name': { $regex : new RegExp("^" + ReceivingData.Name + "$", "i") }, 'If_Deleted': false }, {}, {}, function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Customer Contact Find Query Error', 'Crm_Customers.controller.js', err);
            res.status(417).send({status: false, Message: "Some error occurred while Find Customer Contact!."});
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
exports.CrmCustomerContact_Create = function(req, res) {

   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.User_Id || ReceivingData.User_Id === '' ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   } else if(!ReceivingData.Name || ReceivingData.Name === '' ) {
      res.status(400).send({Status: false, Message: " Name can not be empty" });
   } else if(!ReceivingData.Customer || ReceivingData.Customer === '' ) {
      res.status(400).send({Status: false, Message: "Customer Details can not be empty" });
   } else {
      if (ReceivingData.ContactRole && typeof ReceivingData.ContactRole === 'object' && Object.keys(ReceivingData.ContactRole).length > 0 ) {
         ReceivingData.ContactRole = mongoose.Types.ObjectId(ReceivingData.ContactRole._id);
      }
      var CrmCustomer_Contact = new CrmCustomersModel.CrmCustomerContactsSchema({
         Customer: mongoose.Types.ObjectId(ReceivingData.Customer),
         ContactRole: ReceivingData.ContactRole,
         Title: ReceivingData.Title,
         Name: ReceivingData.Name,
         Email: ReceivingData.Email,
         Mobile: ReceivingData.Mobile,
         JobPosition: ReceivingData.JobPosition,
         Created_By : mongoose.Types.ObjectId(ReceivingData.User_Id),
         Last_Modified_By : mongoose.Types.ObjectId(ReceivingData.User_Id),
         If_Deleted: false,
         Active_Status : ReceivingData.Active_Status || true,
      });
      CrmCustomer_Contact.save(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Crm Customer Contact Creation Query Error', 'Crm_Customers.controller.js', err);
            res.status(400).send({Status: false, Message: "Some error occurred while creating the Crm Customer Contact!."});
         } else {
            CrmCustomersModel.CrmCustomerContactsSchema
               .findOne({'_id': result._id, 'If_Deleted': false }, {}, {sort: { updatedAt: -1 }})
               .populate({ path: 'Customer', select: ['CompanyName'] })
               .populate({ path: 'ContactRole', select: ['Contact_Role'] })
               .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
               .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
               .exec(function(err, result) {
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Customer Contact List Find Query Error', 'Crm_Customers.controller.js', err);
                  res.status(417).send({status: false, Message: "Some error occurred while Find The Crm Customer Contact List!."});
               } else {
                  var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
                  ReturnData = ReturnData.toString();
                  res.status(200).send({Status: true, Response: ReturnData });
               }
            });
         }
      });
   }
};
exports.CrmCustomerContact_List = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   } else if (!ReceivingData.Customer_Id || ReceivingData.Customer_Id === ''  ) {
      res.status(400).send({Status: false, Message: "Customer Details can not be empty" });
   }else {
      CrmCustomersModel.CrmCustomerContactsSchema
         .find({'Customer': mongoose.Types.ObjectId(ReceivingData.Customer_Id), 'If_Deleted': false }, {}, {sort: { updatedAt: -1 }})
         .populate({ path: 'Customer', select: ['CompanyName'] })
         .populate({ path: 'ContactRole', select: ['Contact_Role'] })
         .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
         .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
         .exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Customer Contact List Find Query Error', 'Crm_Customers.controller.js', err);
            res.status(417).send({status: false, Message: "Some error occurred while Find The Crm Customer Contact List!."});
         } else {
            var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
            ReturnData = ReturnData.toString();
            res.status(200).send({Status: true, Response: ReturnData });
         }
      });
   }
};
exports.CrmCustomerContact_SimpleList = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   
   if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   } else if (!ReceivingData.Customer_Id || ReceivingData.Customer_Id === ''  ) {
      res.status(400).send({Status: false, Message: "Customer Details can not be empty" });
   }else {
      CrmCustomersModel.CrmCustomerContactsSchema
         .find({'Customer': mongoose.Types.ObjectId(ReceivingData.Customer_Id), 'If_Deleted': false }, { Name: 1 }, {sort: { updatedAt: -1 }})
         .exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Customer Contact Simple List Find Query Error', 'Crm_Customers.controller.js', err);
            res.status(417).send({status: false, Message: "Some error occurred while Find The Crm Customer Contact Simple List!."});
         } else {
            var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
            ReturnData = ReturnData.toString();
            res.status(200).send({Status: true, Response: ReturnData });
         }
      });
   }
};
exports.CrmCustomerContact_View = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   } else if (!ReceivingData.Contact_Id || ReceivingData.Contact_Id === ''  ) {
      res.status(400).send({Status: false, Message: "Crm Customer Contact Details can not be empty" });
   }else {
      CrmCustomersModel.CrmCustomersSchema
         .findOne({'_id': ReceivingData.Contact_Id }, {}, {})
         .populate({ path: 'Customer', select: ['CompanyName'] })
         .populate({ path: 'ContactRole', select: ['Contact_Role'] })
         .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
         .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
         .exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Customer Contact Data Find Query Error', 'Crm_Customers.controller.js', err);
            res.status(417).send({status: false, Message: "Some error occurred while Find The Crm Customer Contact Data!."});
         } else {
            var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
            ReturnData = ReturnData.toString();
            res.status(200).send({Status: true, Response: ReturnData });
         }
      });
   }
};
exports.CrmCustomerContact_Update = function(req, res) {

   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.User_Id || ReceivingData.User_Id === '' ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   } else if(!ReceivingData.Name || ReceivingData.Name === '' ) {
      res.status(400).send({Status: false, Message: " Name can not be empty" });
   } else {
      if (ReceivingData.ContactRole && typeof ReceivingData.ContactRole === 'object' && Object.keys(ReceivingData.ContactRole).length > 0 ) {
         ReceivingData.ContactRole = mongoose.Types.ObjectId(ReceivingData.ContactRole._id);
      }
      CrmCustomersModel.CrmCustomerContactsSchema.update(
         { _id : mongoose.Types.ObjectId(ReceivingData.Contact_Id)  },
         {  $set: {
               ContactRole : ReceivingData.ContactRole,
               Title: ReceivingData.Title,
               Name: ReceivingData.Name,
               Email: ReceivingData.Email,
               Mobile: ReceivingData.Mobile,
               JobPosition: ReceivingData.JobPosition,
               Last_Modified_By : mongoose.Types.ObjectId(ReceivingData.User_Id),
            } 
         }
      ).exec( function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Crm Customer Contact Updating Query Error', 'Crm_Customers.controller.js', err);
            res.status(400).send({Status: false, Message: "Some error occurred while Updating the Crm Customer Contact!."});
         } else {
            CrmCustomersModel.CrmCustomerContactsSchema
               .findOne({'_id': mongoose.Types.ObjectId(ReceivingData.Contact_Id), 'If_Deleted': false }, {}, {})
               .populate({ path: 'Customer', select: ['CompanyName'] })
               .populate({ path: 'ContactRole', select: ['Contact_Role'] })
               .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
               .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
               .exec(function(err_1, result_1) {
               if(err_1) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Customer Contact List Find Query Error', 'Crm_Customers.controller.js', err_1);
                  res.status(417).send({status: false, Message: "Some error occurred while Find The Crm Customer Contact List!."});
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
exports.CrmCustomerContact_Delete = function(req, res) {

   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Contact_Id || ReceivingData.Contact_Id === '' ) {
      res.status(400).send({Status: false, Message: "Company Details can not be empty" });
   } else if(!ReceivingData.User_Id || ReceivingData.User_Id === '' ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   } else {
      CrmCustomersModel.CrmCustomerContactsSchema.update(
         { _id : mongoose.Types.ObjectId(ReceivingData.Contact_Id)  },
         {  $set: { If_Deleted : true } }
      ).exec( function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Crm Customer Contact Delete Query Error', 'AdminManagement.controller.js', err);
            res.status(400).send({Status: false, Message: "Some error occurred while Delete the Crm Customer Contact!."});
         } else {
            res.status(200).send({Status: true, Message: 'Contact Successfully Deleted'  });
         }
      });
   }
};






// -------------------------------------------------- Crm Machines  -----------------------------------------------
exports.CrmMachines_Create = function(req, res) {

   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.User_Id || ReceivingData.User_Id === '' ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   } else if(!ReceivingData.MachineName || ReceivingData.MachineName === '' ) {
      res.status(400).send({Status: false, Message: "Machine Name can not be empty" });
   } else if(!ReceivingData.Customer || typeof ReceivingData.Customer !== 'object' || Object.keys(ReceivingData.Customer).length < 2 ) {
      res.status(400).send({Status: false, Message: "Customer Details can not be empty" });
   } else {
      if (ReceivingData.Customer && typeof ReceivingData.Customer === 'object' && Object.keys(ReceivingData.Customer).length > 0 ) {
         ReceivingData.Customer = mongoose.Types.ObjectId(ReceivingData.Customer._id);
      }
      if (ReceivingData.MachineType && typeof ReceivingData.MachineType === 'object' && Object.keys(ReceivingData.MachineType).length > 0 ) {
         ReceivingData.MachineType = mongoose.Types.ObjectId(ReceivingData.MachineType._id);
      }
      if (ReceivingData.ControllerType && typeof ReceivingData.ControllerType === 'object' && Object.keys(ReceivingData.ControllerType).length > 0 ) {
         ReceivingData.ControllerType = mongoose.Types.ObjectId(ReceivingData.ControllerType._id);
      }
      if (ReceivingData.Maintenance_Parts && typeof ReceivingData.Maintenance_Parts === 'object' && ReceivingData.Maintenance_Parts.length > 0 ) {
         ReceivingData.Maintenance_Parts.map(obj => mongoose.Types.ObjectId(obj));
      }
      
      var Crm_Machines = new CrmCustomersModel.CrmMachinesSchema({
         MachineName: ReceivingData.MachineName,
         Customer: ReceivingData.Customer,
         MachineModel: ReceivingData.MachineModel,
         MachineMake: ReceivingData.MachineMake,
         MfgSerialNo: ReceivingData.MfgSerialNo,
         MachineId: ReceivingData.MachineId,
         MfgYear: ReceivingData.MfgYear,
         MachineType: ReceivingData.MachineType,
         DateOfPlaced: new Date(ReceivingData.DateOfPlaced).setHours(0,0,0, 0) || new Date(new Date().setHours(0,0,0, 0)),
         ControllerType: ReceivingData.ControllerType,
         ControllerModelNo: ReceivingData.ControllerModelNo,
         Maintenance_Parts: ReceivingData.Maintenance_Parts,
         Created_By : mongoose.Types.ObjectId(ReceivingData.User_Id),
         Last_Modified_By : mongoose.Types.ObjectId(ReceivingData.User_Id),
         Current_Status: 'Idle',
         Open_Ticket : false,
         If_Deleted: false,
         Active_Status : ReceivingData.Active_Status || true,
      });
      Crm_Machines.save(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Crm Machines Creation Query Error', 'Crm_Customers.controller.js', err);
            res.status(400).send({Status: false, Message: "Some error occurred while creating the Crm Machines!."});
         } else {
            new CrmCustomersModel.CrmMachinesActivitiesSchema({
               Machine: mongoose.Types.ObjectId(ReceivingData._id),
               Activity: 'Idle',
               Activity_Status: 'Open',
               Activity_Date: result.DateOfPlaced,
               Activity_Time: '12:00 am',
               Description: '-',
               WorkingHours_DbId: null,
               Ticket_DbId: null,
               Ticket_Activity_DbId: null,
               If_Hidden: true,
               If_Deleted: false,
               Created_By : mongoose.Types.ObjectId(ReceivingData.User_Id),
            }).save();
            var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
               ReturnData = ReturnData.toString();
            res.status(200).send({Status: true, Message: 'New Machine Successfully Created' });
         }
      });
   }
};
exports.CrmMachines_List = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   }else {
      CrmCustomersModel.CrmMachinesSchema
         .find({'If_Deleted': false }, {}, {sort: { updatedAt: -1 }})
         .populate({ path: 'Customer', select: ['CompanyName'] })
         .populate({ path: 'MachineType', select: ['Machine_Type'] })
         .populate({ path: 'ControllerType', select: ['Controller_Type'] })
         .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
         .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
         .exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Machines List Find Query Error', 'Crm_Customers.controller.js', err);
            res.status(417).send({status: false, Message: "Some error occurred while Find The Crm Machines List!."});
         } else {
            var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
            ReturnData = ReturnData.toString();
            res.status(200).send({Status: true, Response: ReturnData });
         }
      });
   }
};
exports.CrmCustomerBasedMachines_List = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   } else if (!ReceivingData.Customer_Id || ReceivingData.Customer_Id === ''  ) {
      res.status(400).send({Status: false, Message: "Customer Details can not be empty" });
   }else {
      CrmCustomersModel.CrmMachinesSchema
         .find({'Customer': mongoose.Types.ObjectId(ReceivingData.Customer_Id), 'If_Deleted': false}, {}, {sort: { updatedAt: -1 }})
         .populate({ path: 'Customer', select: ['CompanyName'] })
         .populate({ path: 'MachineType', select: ['Machine_Type'] })
         .populate({ path: 'ControllerType', select: ['Controller_Type'] })
         .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
         .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
         .exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Customer Based Machines List Find Query Error', 'Crm_Customers.controller.js', err);
            res.status(417).send({status: false, Message: "Some error occurred while Find The Crm Customer Based Machines List!."});
         } else {
            var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
            ReturnData = ReturnData.toString();
            res.status(200).send({Status: true, Response: ReturnData });
         }
      });
   }
};
exports.CrmMachines_SimpleList = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   }else {
      CrmCustomersModel.CrmMachinesSchema
         .find({'If_Deleted': false }, {MachineName: 1, Current_Status: 1 }, {sort: { updatedAt: -1 }})
         .exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Machines Simple List Find Query Error', 'Crm_Customers.controller.js', err);
            res.status(417).send({status: false, Message: "Some error occurred while Find The Crm Machines Simple List!."});
         } else {
            var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
            ReturnData = ReturnData.toString();
            res.status(200).send({Status: true, Response: ReturnData });
         }
      });
   }
};
exports.CrmCustomerBasedMachines_SimpleList = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   } else if (!ReceivingData.Customer_Id || ReceivingData.Customer_Id === ''  ) {
      res.status(400).send({Status: false, Message: "Customer Details can not be empty" });
   }else {
      CrmCustomersModel.CrmMachinesSchema
         .find({'Customer': mongoose.Types.ObjectId(ReceivingData.Customer_Id), 'If_Deleted': false, 'Open_Ticket': false  }, {MachineName: 1, Current_Status: 1 }, {sort: { updatedAt: -1 }})
         .exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Customer Based Machines Simple List Find Query Error', 'Crm_Customers.controller.js', err);
            res.status(417).send({status: false, Message: "Some error occurred while Find The Crm Customer Based Machines Simple List!."});
         } else {
            var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
            ReturnData = ReturnData.toString();
            res.status(200).send({Status: true, Response: ReturnData });
         }
      });
   }
};
exports.CrmMachine_View = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   } else if (!ReceivingData.Machine_Id || ReceivingData.Machine_Id === ''  ) {
      res.status(400).send({Status: false, Message: "Crm Customer Details can not be empty" });
   }else {
      CrmCustomersModel.CrmMachinesSchema
         .findOne({'_id': ReceivingData.Machine_Id }, {}, {})
         .populate({ path: 'Customer', select: ['CompanyName'] })
         .populate({ path: 'MachineType', select: ['Machine_Type'] })
         .populate({ path: 'ControllerType', select: ['Controller_Type'] })
         .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
         .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
         .exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Machine Data Find Query Error', 'Crm_Customers.controller.js', err);
            res.status(417).send({status: false, Message: "Some error occurred while Find The Crm Machine Data!."});
         } else {
            var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
            ReturnData = ReturnData.toString();
            res.status(200).send({Status: true, Response: ReturnData });
         }
      });
   }
};

// For Employee Login
exports.CrmMachinesList_ForEmployee = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   }else if (!ReceivingData.Customers || ReceivingData.Customers === ''  ) {
      res.status(400).send({Status: false, Message: "Customers can not be empty" });
   }else {
      CrmCustomersModel.CrmMachinesSchema
         .find({'If_Deleted': false, Customer: { $in: ReceivingData.Customers } }, {}, {sort: { updatedAt: -1 }})
         .populate({ path: 'Customer', select: ['CompanyName'] })
         .populate({ path: 'MachineType', select: ['Machine_Type'] })
         .populate({ path: 'ControllerType', select: ['Controller_Type'] })
         .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
         .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
         .exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Machines List Find Query Error', 'Crm_Customers.controller.js', err);
            res.status(417).send({status: false, Message: "Some error occurred while Find The Crm Machines List!."});
         } else {
            var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
            ReturnData = ReturnData.toString();
            res.status(200).send({Status: true, Response: ReturnData });
         }
      });
   }
};
exports.CrmMachines_SimpleList_ForEmployee = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   }else if (!ReceivingData.Customers || ReceivingData.Customers === ''  ) {
      res.status(400).send({Status: false, Message: "Customers can not be empty" });
   }else {
      CrmCustomersModel.CrmMachinesSchema
         .find({'If_Deleted': false, Customer: { $in: ReceivingData.Customers } }, {MachineName: 1, Current_Status: 1 }, {sort: { updatedAt: -1 }})
         .exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Machines Simple List Find Query Error', 'Crm_Customers.controller.js', err);
            res.status(417).send({status: false, Message: "Some error occurred while Find The Crm Machines Simple List!."});
         } else {
            var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
            ReturnData = ReturnData.toString();
            res.status(200).send({Status: true, Response: ReturnData });
         }
      });
   }
};
                     






exports.CrmMachine_MaintenanceSchedule_Today = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   } else if (!ReceivingData.Machine_Id || ReceivingData.Machine_Id === ''  ) {
      res.status(400).send({Status: false, Message: "Crm Customer Details can not be empty" });
   }else {
      let Today = new Date();
         Today.setHours(0, 0, 0, 0);
      CrmCustomersModel.CrmMachinesMaintenanceSchema
         .find({'Machine': ReceivingData.Machine_Id, MaintenanceDate: Today }, {}, {})
         .populate({ path: 'MachineMaintenancePart', select: ['Part_Name'] })
         // .populate({ path: 'Updated_By', select: ['Name', 'User_Type'] })
         .exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Machine Maintenance Schedule Find Query Error', 'Crm_Customers.controller.js', err);
            res.status(417).send({status: false, Message: "Some error occurred while Find The Crm Machine Maintenance Schedule!."});
         } else {
            var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
            ReturnData = ReturnData.toString();
            res.status(200).send({Status: true, Response: ReturnData });
         }
      });
   }
};
exports.CrmMachine_MaintenanceSchedule_UpdateToday = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   }else {
      Promise.all(
         ReceivingData.EachMaintenance.map(Obj => {
            return CrmCustomersModel.CrmMachinesMaintenanceSchema.update(
               { _id : mongoose.Types.ObjectId(Obj._id)  },
               {  $set: {
                     Status : Obj.Status,
                     Description: Obj.Description,
                     Updated_By: ReceivingData.Update_Person,
                     If_Updated: true
                  } 
               }
            ).exec();
         })
      ).then(response => {
         res.status(200).send({Status: true, Message: 'Updated Successfully' });
      }).catch(err => {
         ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Machine Maintenance Schedule Update Query Error', 'Crm_Customers.controller.js', err);
         res.status(417).send({status: false, Message: "Some error occurred while Update The Crm Machine Maintenance Schedule!."});
      });
   }
};


exports.ScheduleActivity_AsyncValidate = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.User_Id || ReceivingData.User_Id === '' ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   } else if(!ReceivingData.Schedule_Activity || typeof ReceivingData.Schedule_Activity !== 'object' || Object.keys(ReceivingData.Schedule_Activity).length < 2 ) {
      res.status(400).send({Status: false, Message: "Schedule Activity Details can not be empty" });
   } else if(!ReceivingData.Machine_Id || ReceivingData.Machine_Id === '' ) {
      res.status(400).send({Status: false, Message: "Machine Details can not be empty" });
   }else {
      ReceivingData.Schedule_Activity = mongoose.Types.ObjectId(ReceivingData.Schedule_Activity._id);
      CrmCustomersModel.CrmMachinesScheduleActivitySchema
         .findOne({ 
            Machine: mongoose.Types.ObjectId(ReceivingData.Machine_Id),
            Schedule_Activity: mongoose.Types.ObjectId(ReceivingData.Schedule_Activity),
            'If_Deleted': false, 'Active_Status': true 
         }, function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Machine Schedule Activity Find Query Error', 'Crm_Customers.controller.js', err);
            res.status(417).send({status: false, Message: "Some error occurred while Find Machine Schedule Activity!."});
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
exports.CrmMachine_ScheduleActivity_Create = function(req, res) {
   
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.User_Id || ReceivingData.User_Id === '' ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   } else if(!ReceivingData.Machine_Id || ReceivingData.Machine_Id === '' ) {
      res.status(400).send({Status: false, Message: "Machine Details can not be empty" });
   } else if(!ReceivingData.Schedule_Date || ReceivingData.Schedule_Date === '' ) {
      res.status(400).send({Status: false, Message: "Schedule Date can not be empty" });
   } else if(!ReceivingData.Schedule_Activity || typeof ReceivingData.Schedule_Activity !== 'object' || Object.keys(ReceivingData.Schedule_Activity).length < 2 ) {
      res.status(400).send({Status: false, Message: "Schedule Activity Details can not be empty" });
   } else {
      ReceivingData.Schedule_Activity = mongoose.Types.ObjectId(ReceivingData.Schedule_Activity._id);
      var Crm_Machines_ScheduleActivity = new CrmCustomersModel.CrmMachinesScheduleActivitySchema({
         Machine: ReceivingData.Machine_Id,
         Schedule_Activity: mongoose.Types.ObjectId(ReceivingData.Schedule_Activity),
         Schedule_Date: ReceivingData.Schedule_Date,
         Description: ReceivingData.Description,
         Activity_By: '',
         Last_Activity_Id: null,
         Active_Status: true,
         If_Deleted: false,
         Created_By : mongoose.Types.ObjectId(ReceivingData.User_Id),
         Last_Modified_By: mongoose.Types.ObjectId(ReceivingData.User_Id),
      });
      Crm_Machines_ScheduleActivity.save(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Crm Machine Schedule Activity Creation Query Error', 'Crm_Customers.controller.js', err);
            res.status(400).send({Status: false, Message: "Some error occurred while creating the Crm Machine Schedule Activity!."});
         } else {
            CrmCustomersModel.CrmMachinesScheduleActivitySchema
               .findOne({'_id': mongoose.Types.ObjectId(result._id), 'If_Deleted': false }, {}, {})
               .populate({ path: 'Schedule_Activity', select: ['Activity_Name'] })
               .populate({ path: 'Last_Activity_Id', select: ['Activity_By', 'Description', 'Schedule_Date'] })
               .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
               .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
               .exec(function(err_1, result_1) {
               if(err_1) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Machine Schedule Activity Find Query Error', 'Crm_Customers.controller.js', err_1);
                  res.status(417).send({status: false, Message: "Some error occurred while Find The Crm Machine Schedule Activity!."});
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
exports.CrmMachine_ScheduleActivity_List = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   } else if (!ReceivingData.Machine_Id || ReceivingData.Machine_Id === ''  ) {
      res.status(400).send({Status: false, Message: "Machine Details can not be empty" });
   }else {
      CrmCustomersModel.CrmMachinesScheduleActivitySchema
         .find({'Machine': mongoose.Types.ObjectId(ReceivingData.Machine_Id), 'If_Deleted': false, 'Active_Status': true}, {}, {sort: { updatedAt: 1 }})
         .populate({ path: 'Schedule_Activity', select: ['Activity_Name'] })
         .populate({ path: 'Last_Activity_Id', select: ['Activity_By', 'Description', 'Schedule_Date'] })
         .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
         .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
         .exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Machine Schedule Activity List Find Query Error', 'Crm_Customers.controller.js', err);
            res.status(417).send({status: false, Message: "Some error occurred while Find The Crm Machine Schedule Activity List!."});
         } else {
            var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
            ReturnData = ReturnData.toString();
            res.status(200).send({Status: true, Response: ReturnData });
         }
      });
   }
};
exports.CrmMachine_ScheduleActivity_Update = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.User_Id || ReceivingData.User_Id === '' ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   } else if(!ReceivingData.Schedule_Id || ReceivingData.Schedule_Id === '' ) {
      res.status(400).send({Status: false, Message: "Schedule Details can not be empty" });
   } else if(!ReceivingData.Schedule_Date || ReceivingData.Schedule_Date === '' ) {
      res.status(400).send({Status: false, Message: "Schedule Date can not be empty" });
   } else if(!ReceivingData.Schedule_Activity || typeof ReceivingData.Schedule_Activity !== 'object' || Object.keys(ReceivingData.Schedule_Activity).length < 2 ) {
      res.status(400).send({Status: false, Message: "Schedule Activity Details can not be empty" });
   } else {
      ReceivingData.Schedule_Activity = mongoose.Types.ObjectId(ReceivingData.Schedule_Activity._id);
      CrmCustomersModel.CrmMachinesScheduleActivitySchema.update(
         { _id : mongoose.Types.ObjectId(ReceivingData.Schedule_Id)  },
         {  $set: {
               Schedule_Activity: mongoose.Types.ObjectId(ReceivingData.Schedule_Activity),
               Schedule_Date: ReceivingData.Schedule_Date,
               Description: ReceivingData.Description,
               Last_Modified_By: mongoose.Types.ObjectId(ReceivingData.User_Id),
            } 
         }
      ).exec( function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Crm Machine Schedule Activity Updating Query Error', 'Crm_Customers.controller.js', err);
            res.status(400).send({Status: false, Message: "Some error occurred while Updating the Crm Machine Schedule Activity!."});
         } else {
            CrmCustomersModel.CrmMachinesScheduleActivitySchema
               .findOne({'_id': mongoose.Types.ObjectId(ReceivingData.Schedule_Id), 'If_Deleted': false }, {}, {})
               .populate({ path: 'Schedule_Activity', select: ['Activity_Name'] })
               .populate({ path: 'Last_Activity_Id', select: ['Activity_By', 'Description', 'Schedule_Date'] })
               .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
               .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
               .exec(function(err_1, result_1) {
               if(err_1) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Machine Schedule Activity Find Query Error', 'Crm_Customers.controller.js', err_1);
                  res.status(417).send({status: false, Message: "Some error occurred while Find The Crm Machine Schedule Activity!."});
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
exports.CrmMachine_ScheduleActivity_ReSchedule = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.User_Id || ReceivingData.User_Id === '' ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   } else if(!ReceivingData.Machine_Id || ReceivingData.Machine_Id === '' ) {
      res.status(400).send({Status: false, Message: "Machine Details can not be empty" });
   } else if(!ReceivingData.Schedule_Id || ReceivingData.Schedule_Id === '' ) {
      res.status(400).send({Status: false, Message: "Schedule Details can not be empty" });
   } else if(!ReceivingData.Schedule_Date || ReceivingData.Schedule_Date === '' ) {
      res.status(400).send({Status: false, Message: "Schedule Date can not be empty" });
   } else if(!ReceivingData.Schedule_Activity || typeof ReceivingData.Schedule_Activity !== 'object' || Object.keys(ReceivingData.Schedule_Activity).length < 2 ) {
      res.status(400).send({Status: false, Message: "Schedule Activity Details can not be empty" });
   } else if(!ReceivingData.New_Schedule_Date || ReceivingData.New_Schedule_Date === '' ) {
      res.status(400).send({Status: false, Message: "New Schedule Date can not be empty" });
   } else {
      ReceivingData.Schedule_Activity = mongoose.Types.ObjectId(ReceivingData.Schedule_Activity._id);
      CrmCustomersModel.CrmMachinesScheduleActivitySchema.update(
         { _id : mongoose.Types.ObjectId(ReceivingData.Schedule_Id)  },
         {  $set: {
               Schedule_Activity: mongoose.Types.ObjectId(ReceivingData.Schedule_Activity),
               Schedule_Date: ReceivingData.Schedule_Date,
               Activity_By: ReceivingData.Activity_By,
               Active_Status: false,
               Last_Modified_By: mongoose.Types.ObjectId(ReceivingData.User_Id),
            } 
         }
      ).exec( function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Crm Machine Schedule Activity ReSchedule Query Error', 'Crm_Customers.controller.js', err);
            res.status(400).send({Status: false, Message: "Some error occurred while Updating the Crm Machine Schedule Activity!."});
         } else {
            var Crm_Machines_ScheduleActivity = new CrmCustomersModel.CrmMachinesScheduleActivitySchema({
               Machine: ReceivingData.Machine_Id,
               Schedule_Activity: mongoose.Types.ObjectId(ReceivingData.Schedule_Activity),
               Schedule_Date: ReceivingData.New_Schedule_Date,
               Description: ReceivingData.Description,
               Activity_By: '',
               Last_Activity_Id: mongoose.Types.ObjectId(ReceivingData.Schedule_Id),
               Active_Status: true,
               If_Deleted: false,
               Created_By : mongoose.Types.ObjectId(ReceivingData.User_Id),
               Last_Modified_By: mongoose.Types.ObjectId(ReceivingData.User_Id),
            });
            Crm_Machines_ScheduleActivity.save(function(err_0, result_0) {
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Crm Machine Schedule Activity Creation Query Error', 'Crm_Customers.controller.js', err_0);
                  res.status(400).send({Status: false, Message: "Some error occurred while creating the Crm Machine Schedule Activity!."});
               } else {
                  CrmCustomersModel.CrmMachinesScheduleActivitySchema
                     .findOne({'_id': mongoose.Types.ObjectId(result_0._id)}, {}, {})
                     .populate({ path: 'Schedule_Activity', select: ['Activity_Name'] })
                     .populate({ path: 'Last_Activity_Id', select: ['Activity_By', 'Schedule_Date'] })
                     .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
                     .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
                     .exec(function(err_1, result_1) {
                     if(err_1) {
                        ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Machine Schedule Activity Find Query Error', 'Crm_Customers.controller.js', err_1);
                        res.status(417).send({status: false, Message: "Some error occurred while Find The Crm Machine Schedule Activity!."});
                     } else {
                        var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result_1), 'SecretKeyOut@123');
                        ReturnData = ReturnData.toString();
                        res.status(200).send({Status: true, Response: ReturnData });
                     }
                  });
               }
            });
         }
      });
   }
};
exports.CrmMachine_ScheduleActivity_Delete = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Schedule_Id || ReceivingData.Schedule_Id === '' ) {
      res.status(400).send({Status: false, Message: "Schedule Details can not be empty" });
   } else if(!ReceivingData.User_Id || ReceivingData.User_Id === '' ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   } else {
      CrmCustomersModel.CrmMachinesScheduleActivitySchema.update(
         { _id : mongoose.Types.ObjectId(ReceivingData.Schedule_Id)  },
         {  $set: { If_Deleted : true } }
      ).exec( function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Crm Machine Schedule Activity Delete Query Error', 'AdminManagement.controller.js', err);
            res.status(400).send({Status: false, Message: "Some error occurred while Delete the Crm Machine Schedule Activity!."});
         } else {
            res.status(200).send({Status: true, Message: 'Schedule Activity Successfully Deleted'}); 
         }
      });
   }
};



exports.CrmMachine_IdleTime_Create = function(req, res) {
   
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.User_Id || ReceivingData.User_Id === '' ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   } else if(!ReceivingData.Machine_Id || ReceivingData.Machine_Id === '' ) {
      res.status(400).send({Status: false, Message: "Machine Details can not be empty" });
   } else if(!ReceivingData.Idle_Date || ReceivingData.Idle_Date === '' ) {
      res.status(400).send({Status: false, Message: "Idle Date can not be empty" });
   } else if(!ReceivingData.Idle_Time ||  ReceivingData.Idle_Time === '' ) {
      res.status(400).send({Status: false, Message: "Idle Time can not be empty" });
   } else {
      if (ReceivingData.Description === '') {
         ReceivingData.Description = '-';
      }
        var Crm_Machines_IdleTime= new CrmCustomersModel.CrmMachinesIdleTimeSchema({
         Machine: mongoose.Types.ObjectId(ReceivingData.Machine_Id),
         Idle_Date: ReceivingData.Idle_Date,
         Idle_Time: ReceivingData.Idle_Time,
         Description: ReceivingData.Description,
         Active_Status: true,
         If_Deleted: false,
         Created_By : mongoose.Types.ObjectId(ReceivingData.User_Id),
         Last_Modified_By: mongoose.Types.ObjectId(ReceivingData.User_Id),
      });
      Crm_Machines_IdleTime.save(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Crm Machine Idle Creation Query Error', 'Crm_Customers.controller.js', err);
            res.status(400).send({Status: false, Message: "Some error occurred while creating the Crm Machine Idle!."});
         } else {
            CrmCustomersModel.CrmMachinesSchema.update(
               { _id : mongoose.Types.ObjectId(ReceivingData.Machine_Id)  },
               {$set: { Current_Status: 'Idle' } }
            ).exec();
            new CrmCustomersModel.CrmMachinesIdleAndTicketActivitySchema({
               Machine: mongoose.Types.ObjectId(ReceivingData.Machine_Id),
               Activity: 'Idle',
               Activity_Status: 'Open',
               Activity_Date:  ReceivingData.Idle_Date,
               Activity_Time:  ReceivingData.Idle_Time,
               Description: ReceivingData.Description,
               Idle_DbId: result._id,
               Ticket_DbId: null,
               Ticket_Activity_DbId: null,
               If_Hidden: false,
               If_Deleted: false,
               Created_By : mongoose.Types.ObjectId(ReceivingData.User_Id),
            }).save();
            CrmCustomersModel.CrmMachinesIdleTimeSchema
               .findOne({'_id': mongoose.Types.ObjectId(result._id), 'If_Deleted': false }, {}, {})
               .populate({ path: 'Created_By', select: ['Name'] })
               .populate({ path: 'Last_Modified_By', select: ['Name'] })
               .exec(function(err_1, result_1) {
               if(err_1) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Machine Idle Time Find Query Error', 'Crm_Customers.controller.js', err_1);
                  res.status(417).send({status: false, Message: "Some error occurred while Find The Crm Machine Idle Time!."});
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
exports.CrmMachine_IdleTime_List = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   } else if (!ReceivingData.Machine_Id || ReceivingData.Machine_Id === ''  ) {
      res.status(400).send({Status: false, Message: "Machine Details can not be empty" });
   }else {
      CrmCustomersModel.CrmMachinesIdleTimeSchema
         .find({'Machine': mongoose.Types.ObjectId(ReceivingData.Machine_Id), 'If_Deleted': false, 'Active_Status': true}, {}, {sort: { updatedAt: -1 }})
         .populate({ path: 'Created_By', select: ['Name'] })
         .populate({ path: 'Last_Modified_By', select: ['Name'] })
         .exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Machine Idle List Find Query Error', 'Crm_Customers.controller.js', err);
            res.status(417).send({status: false, Message: "Some error occurred while Find The Crm Machine Idle List!."});
         } else {
            var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
            ReturnData = ReturnData.toString();
            res.status(200).send({Status: true, Response: ReturnData });
         }
      });
   }
};
exports.CrmMachine_IdleTime_Update = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.User_Id || ReceivingData.User_Id === '' ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   } else if(!ReceivingData.IdleTime_Id || ReceivingData.IdleTime_Id === '' ) {
      res.status(400).send({Status: false, Message: "Idle Details can not be empty" });
   } else if(!ReceivingData.Idle_CloseDate || ReceivingData.Idle_CloseDate === '' ) {
      res.status(400).send({Status: false, Message: "Idle Close Date can not be empty" });
   } else if(!ReceivingData.Idle_CloseTime ||  ReceivingData.Idle_CloseTime === '' ) {
      res.status(400).send({Status: false, Message: "Idle Close Time can not be empty" });
   } else {
      CrmCustomersModel.CrmMachinesIdleTimeSchema.update(
         { _id : mongoose.Types.ObjectId(ReceivingData.IdleTime_Id)  },
         {  $set: {
               Idle_CloseDate: ReceivingData.Idle_CloseDate,
               Idle_CloseTime: ReceivingData.Idle_CloseTime,
               Last_Modified_By: mongoose.Types.ObjectId(ReceivingData.User_Id),
            } 
         }
      ).exec( function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Crm Machine Idle Updating Query Error', 'Crm_Customers.controller.js', err);
            res.status(400).send({Status: false, Message: "Some error occurred while Updating the Crm Machine Idle!."});
         } else {
            CrmCustomersModel.CrmMachinesIdleTimeSchema
               .findOne({'_id': mongoose.Types.ObjectId(ReceivingData.IdleTime_Id), 'If_Deleted': false }, {}, {})
               .populate({ path: 'Created_By', select: ['Name'] })
               .populate({ path: 'Last_Modified_By', select: ['Name'] })
               .exec(function(err_1, result_1) {
               if(err_1) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Machine Idle Find Query Error', 'Crm_Customers.controller.js', err_1);
                  res.status(417).send({status: false, Message: "Some error occurred while Find The Crm Machine Idle!."});
               } else {
                  CrmCustomersModel.CrmMachinesSchema.update(
                     { _id : mongoose.Types.ObjectId(result_1.Machine._id)  },
                     {$set: { Current_Status: 'Up' } }
                  ).exec();
                  new CrmCustomersModel.CrmMachinesIdleAndTicketActivitySchema({
                     Machine: mongoose.Types.ObjectId(result_1.Machine._id),
                     Activity: 'Idle',
                     Activity_Status: 'Close',
                     Activity_Date: new Date(new Date(ReceivingData.Idle_CloseDate).setSeconds(new Date(ReceivingData.Idle_CloseDate).getSeconds() - 2)),
                     Activity_Time:  ReceivingData.Idle_CloseTime,
                     Description: result_1.Description,
                     Idle_DbId: mongoose.Types.ObjectId(ReceivingData.IdleTime_Id),
                     Ticket_DbId: null,
                     Ticket_Activity_DbId: null,
                     If_Hidden: false,
                     If_Deleted: false,
                     Created_By : mongoose.Types.ObjectId(ReceivingData.User_Id),
                  }).save();
                  var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result_1), 'SecretKeyOut@123');
                  ReturnData = ReturnData.toString();
                  res.status(200).send({Status: true, Response: ReturnData });
               }
            });
         }
      });
   }
};


exports.CrmMachine_WorkingHours_Create = function(req, res) {
   
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.User_Id || ReceivingData.User_Id === '' ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   } else if(!ReceivingData.Machine_Id || ReceivingData.Machine_Id === '' ) {
      res.status(400).send({Status: false, Message: "Machine Details can not be empty" });
   } else if(!ReceivingData.Start_Date || ReceivingData.Start_Date === '' ) {
      res.status(400).send({Status: false, Message: "Start Date can not be empty" });
   } else if(!ReceivingData.Start_Time ||  ReceivingData.Start_Time === '' ) {
      res.status(400).send({Status: false, Message: "Start Time can not be empty" });
   } else {
      if (ReceivingData.Description === '') {
         ReceivingData.Description = '-';
      }
        var Crm_Machines_WorkingHours= new CrmCustomersModel.CrmMachinesWorkingHoursSchema({
         Machine: mongoose.Types.ObjectId(ReceivingData.Machine_Id),
         Start_Date: ReceivingData.Start_Date,
         Start_Time: ReceivingData.Start_Time,
         Description: ReceivingData.Description,
         Active_Status: true,
         If_Deleted: false,
         Created_By : mongoose.Types.ObjectId(ReceivingData.User_Id),
         Last_Modified_By: mongoose.Types.ObjectId(ReceivingData.User_Id),
      });
      Crm_Machines_WorkingHours.save(function(err, result) {
         if(err) {
            console.log(err);
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Crm Machine Working Hours Creation Query Error', 'Crm_Customers.controller.js', err);
            res.status(400).send({Status: false, Message: "Some error occurred while creating the Crm Machine Working Hours!."});
         } else {
            CrmCustomersModel.CrmMachinesSchema.update(
               { _id : mongoose.Types.ObjectId(ReceivingData.Machine_Id)  },
               {$set: { Current_Status: 'Up' } }
            ).exec();
            new CrmCustomersModel.CrmMachinesActivitiesSchema({
               Machine: mongoose.Types.ObjectId(ReceivingData.Machine_Id),
               Activity: 'Idle',
               Activity_Status: 'Close',
               Activity_Date: new Date(new Date(ReceivingData.Start_Date).setSeconds(new Date(ReceivingData.Start_Date).getSeconds() - 2)),
               Activity_Time: ReceivingData.Start_Time,
               Description: ReceivingData.Description,
               WorkingHours_DbId: result._id,
               Ticket_DbId: null,
               Ticket_Activity_DbId: null,
               If_Hidden: true,
               If_Deleted: false,
               Created_By : mongoose.Types.ObjectId(ReceivingData.User_Id),
            }).save();
            new CrmCustomersModel.CrmMachinesActivitiesSchema({
               Machine: mongoose.Types.ObjectId(ReceivingData.Machine_Id),
               Activity: 'Up',
               Activity_Status: 'Open',
               Activity_Date: ReceivingData.Start_Date,
               Activity_Time: ReceivingData.Start_Time,
               Description: ReceivingData.Description,
               WorkingHours_DbId: result._id,
               Ticket_DbId: null,
               Ticket_Activity_DbId: null,
               If_Hidden: false,
               If_Deleted: false,
               Created_By : mongoose.Types.ObjectId(ReceivingData.User_Id),
            }).save();
            CrmCustomersModel.CrmMachinesWorkingHoursSchema
               .findOne({'_id': mongoose.Types.ObjectId(result._id), 'If_Deleted': false }, {}, {})
               .populate({ path: 'Created_By', select: ['Name'] })
               .populate({ path: 'Last_Modified_By', select: ['Name'] })
               .exec(function(err_1, result_1) {
               if(err_1) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Machine Working Hours Find Query Error', 'Crm_Customers.controller.js', err_1);
                  res.status(417).send({status: false, Message: "Some error occurred while Find The Crm Machine Working Hours!."});
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
exports.CrmMachine_WorkingHours_List = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   } else if (!ReceivingData.Machine_Id || ReceivingData.Machine_Id === ''  ) {
      res.status(400).send({Status: false, Message: "Machine Details can not be empty" });
   }else {
      CrmCustomersModel.CrmMachinesWorkingHoursSchema
         .find({'Machine': mongoose.Types.ObjectId(ReceivingData.Machine_Id), 'If_Deleted': false, 'Active_Status': true}, {}, {sort: { updatedAt: -1 }})
         .populate({ path: 'Created_By', select: ['Name'] })
         .populate({ path: 'Last_Modified_By', select: ['Name'] })
         .exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Machine Working Hours List Find Query Error', 'Crm_Customers.controller.js', err);
            res.status(417).send({status: false, Message: "Some error occurred while Find The Crm Machine Working Hours List!."});
         } else {
            var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
            ReturnData = ReturnData.toString();
            res.status(200).send({Status: true, Response: ReturnData });
         }
      });
   }
};
exports.CrmMachine_WorkingHours_Update = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.User_Id || ReceivingData.User_Id === '' ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   } else if(!ReceivingData.WorkingHours_Id || ReceivingData.WorkingHours_Id === '' ) {
      res.status(400).send({Status: false, Message: "Working Hours Details can not be empty" });
   } else if(!ReceivingData.Stop_Date || ReceivingData.Stop_Date === '' ) {
      res.status(400).send({Status: false, Message: "Working Stop Date can not be empty" });
   } else if(!ReceivingData.Stop_Time ||  ReceivingData.Stop_Time === '' ) {
      res.status(400).send({Status: false, Message: "Working Stop Time can not be empty" });
   } else {
      CrmCustomersModel.CrmMachinesWorkingHoursSchema.update(
         { _id : mongoose.Types.ObjectId(ReceivingData.WorkingHours_Id)  },
         {  $set: {
               Stop_Date: ReceivingData.Stop_Date,
               Stop_Time: ReceivingData.Stop_Time,
               Last_Modified_By: mongoose.Types.ObjectId(ReceivingData.User_Id),
            } 
         }
      ).exec( function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Crm Machine Working Hours Updating Query Error', 'Crm_Customers.controller.js', err);
            res.status(400).send({Status: false, Message: "Some error occurred while Updating the Crm Machine Working Hours!."});
         } else {
            CrmCustomersModel.CrmMachinesWorkingHoursSchema
               .findOne({'_id': mongoose.Types.ObjectId(ReceivingData.WorkingHours_Id), 'If_Deleted': false }, {}, {})
               .populate({ path: 'Created_By', select: ['Name'] })
               .populate({ path: 'Last_Modified_By', select: ['Name'] })
               .exec(function(err_1, result_1) {
               if(err_1) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Machine Working Hours Find Query Error', 'Crm_Customers.controller.js', err_1);
                  res.status(417).send({status: false, Message: "Some error occurred while Find The Crm Machine Working Hours!."});
               } else {
                  CrmCustomersModel.CrmMachinesSchema.update(
                     { _id : mongoose.Types.ObjectId(result_1.Machine)  },
                     {$set: { Current_Status: 'Idle' } }
                  ).exec();
                  new CrmCustomersModel.CrmMachinesActivitiesSchema({
                     Machine: mongoose.Types.ObjectId(result_1.Machine),
                     Activity: 'Up',
                     Activity_Status: 'Close',
                     Activity_Date: new Date(new Date(ReceivingData.Stop_Date).setSeconds(new Date(ReceivingData.Stop_Date).getSeconds() - 2)),
                     Activity_Time:  ReceivingData.Stop_Time,
                     Description: result_1.Description,
                     WorkingHours_DbId: mongoose.Types.ObjectId(ReceivingData.WorkingHours_Id),
                     Ticket_DbId: null,
                     Ticket_Activity_DbId: null,
                     If_Hidden: false,
                     If_Deleted: false,
                     Created_By : mongoose.Types.ObjectId(ReceivingData.User_Id),
                  }).save();
                  new CrmCustomersModel.CrmMachinesActivitiesSchema({
                     Machine: mongoose.Types.ObjectId(result_1.Machine),
                     Activity: 'Idle',
                     Activity_Status: 'Open',
                     Activity_Date: ReceivingData.Stop_Date,
                     Activity_Time: ReceivingData.Stop_Time,
                     Description: result_1.Description,
                     WorkingHours_DbId: mongoose.Types.ObjectId(ReceivingData.WorkingHours_Id),
                     Ticket_DbId: null,
                     Ticket_Activity_DbId: null,
                     If_Hidden: true,
                     If_Deleted: false,
                     Created_By : mongoose.Types.ObjectId(ReceivingData.User_Id),
                  }).save();
                  var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result_1), 'SecretKeyOut@123');
                  ReturnData = ReturnData.toString();
                  res.status(200).send({Status: true, Response: ReturnData });
               }
            });
         }
      });
   }
};


// -------------------------------------------------- Crm Tickets Create -----------------------------------------------
exports.CrmTickets_Create = function(req, res) {

   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.User_Id || ReceivingData.User_Id === '' ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   } else if(!ReceivingData.TicketOpenDate || ReceivingData.TicketOpenDate === '' ) {
      res.status(400).send({Status: false, Message: "Date can not be empty" });
   } else if(!ReceivingData.Issue || ReceivingData.Issue === '' ) {
      res.status(400).send({Status: false, Message: "Issue can not be empty" });
   } else if(!ReceivingData.Machine || typeof ReceivingData.Machine !== 'object' || Object.keys(ReceivingData.Machine).length < 2 ) {
      res.status(400).send({Status: false, Message: "Machine Details can not be empty" });
   } else if(!ReceivingData.Customer || typeof ReceivingData.Customer !== 'object' || Object.keys(ReceivingData.Customer).length < 2 ) {
      res.status(400).send({Status: false, Message: "Customer Details can not be empty" });
   } else if(!ReceivingData.TicketType || typeof ReceivingData.TicketType !== 'object' || Object.keys(ReceivingData.TicketType).length < 2 ) {
      res.status(400).send({Status: false, Message: "Ticket Type Details can not be empty" });
   } else {
      if (ReceivingData.Machine && typeof ReceivingData.Machine === 'object' && Object.keys(ReceivingData.Machine).length > 0 ) {
         ReceivingData.Machine = mongoose.Types.ObjectId(ReceivingData.Machine._id);
      }
      if (ReceivingData.Customer && typeof ReceivingData.Customer === 'object' && Object.keys(ReceivingData.Customer).length > 0 ) {
         ReceivingData.Customer = mongoose.Types.ObjectId(ReceivingData.Customer._id);
      }
      if (ReceivingData.TicketType && typeof ReceivingData.TicketType === 'object' && Object.keys(ReceivingData.TicketType).length > 0 ) {
         ReceivingData.TicketType = mongoose.Types.ObjectId(ReceivingData.TicketType._id);
      }
      CrmCustomersModel.CrmTicketsSchema.find( {}, {NumberOfTicketId: 1}, {sort:{ NumberOfTicketId: -1 }, limit: 1 })
      .exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Ticket Id Search Find Query Error', 'Crm_Customers.controller.js', err);
            res.status(417).send({status: false, Message: "Some error occurred while Find The Crm Ticket Id Search!."});
         } else {
            var number = 1;
            if(result.length > 0){ 
               number = result[0].NumberOfTicketId + 1;
            }
            const length = number.toString().padStart(7, 0);
            const TicketId = "TID" + length;
            var Crm_Tickets = new CrmCustomersModel.CrmTicketsSchema({
               Machine: ReceivingData.Machine,
               Customer: ReceivingData.Customer,
               TicketType: ReceivingData.TicketType,
               TicketId: TicketId,
               NumberOfTicketId: length,
               TicketOpenDate: ReceivingData.TicketOpenDate,
               TicketOpenTime: ReceivingData.TicketOpenTime,
               Issue: ReceivingData.Issue,
               If_Idle: ReceivingData.If_Idle,
               CurrentStatus: {Type: 'Type_0', Value: 'Waiting'},
               Created_By : mongoose.Types.ObjectId(ReceivingData.User_Id),
               Last_Modified_By : mongoose.Types.ObjectId(ReceivingData.User_Id),
               If_Deleted: false,
               Active_Status : ReceivingData.Active_Status || true,
            });
            Crm_Tickets.save(function(err_1, result_1) {
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Crm Tickets Creation Query Error', 'AdminManagement.controller.js', err_1);
                  res.status(400).send({Status: false, Message: "Some error occurred while creating the Crm Tickets!."});
               } else {
                  CrmCustomersModel.CrmMachinesSchema.update(
                     { _id : mongoose.Types.ObjectId(ReceivingData.Machine)  },
                     { $set: { Open_Ticket : true } }
                  ).exec();
                  var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result_1), 'SecretKeyOut@123');
                     ReturnData = ReturnData.toString();
                  res.status(200).send({Status: true, Message:'Ticket "(' + result_1.TicketId + ')" Successfully Created' });
               }
            });
         }
      });
   }
};
exports.CrmTickets_List = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   }else {
      CrmCustomersModel.CrmTicketsSchema
         .find({'If_Deleted': false }, {}, {sort: { updatedAt: -1 }})
         .populate({ path: 'Customer', select: ['CompanyName'] })
         .populate({ path: 'Machine', select: ['MachineName'] })
         .populate({ path: 'TicketType', select: ['Ticket_Type'] })
         .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
         .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
         .exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Tickets List Find Query Error', 'Crm_Customers.controller.js', err);
            res.status(417).send({status: false, Message: "Some error occurred while Find The Crm Tickets List!."});
         } else {
            var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
            ReturnData = ReturnData.toString();
            res.status(200).send({Status: true, Response: ReturnData });
         }
      });
   }
};
exports.CrmCustomerBasedTickets_List = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   } else if (!ReceivingData.Customer_Id || ReceivingData.Customer_Id === ''  ) {
      res.status(400).send({Status: false, Message: "Machine Details can not be empty" });
   }else {
      CrmCustomersModel.CrmTicketsSchema
         .find({Customer: ReceivingData.Customer_Id, 'If_Deleted': false }, {}, {sort: { updatedAt: -1 }})
         .populate({ path: 'Customer', select: ['CompanyName'] })
         .populate({ path: 'Machine', select: ['MachineName'] })
         .populate({ path: 'TicketType', select: ['Ticket_Type'] })
         .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
         .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
         .exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Customer Based Tickets List Find Query Error', 'Crm_Customers.controller.js', err);
            res.status(417).send({status: false, Message: "Some error occurred while Find The Crm Customer Based Tickets List!."});
         } else {
            var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
            ReturnData = ReturnData.toString();
            res.status(200).send({Status: true, Response: ReturnData });
         }
      });
   }
};
exports.CrmMachineBasedTickets_List = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   } else if (!ReceivingData.Machine_Id || ReceivingData.Machine_Id === ''  ) {
      res.status(400).send({Status: false, Message: "Machine Details can not be empty" });
   }else {
      CrmCustomersModel.CrmTicketsSchema
         .find({ Machine: ReceivingData.Machine_Id, 'If_Deleted': false }, {}, {sort: { updatedAt: -1 }})
         .populate({ path: 'Customer', select: ['CompanyName'] })
         .populate({ path: 'Machine', select: ['MachineName'] })
         .populate({ path: 'TicketType', select: ['Ticket_Type'] })
         .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
         .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
         .exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Machine Based Tickets List Find Query Error', 'Crm_Customers.controller.js', err);
            res.status(417).send({status: false, Message: "Some error occurred while Find The Crm Machine Based Tickets List!."});
         } else {
            var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
            ReturnData = ReturnData.toString();
            res.status(200).send({Status: true, Response: ReturnData });
         }
      });
   }
};
exports.CrmTickets_View = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   } else if (!ReceivingData.Ticket_Id || ReceivingData.Ticket_Id === ''  ) {
      res.status(400).send({Status: false, Message: "Crm Ticket Details can not be empty" });
   }else {
      CrmCustomersModel.CrmTicketsSchema
         .findOne({'_id': ReceivingData.Ticket_Id }, {}, {})
         .populate({ path: 'Customer', select: ['CompanyName'] })
         .populate({ path: 'Machine', select: ['MachineName'] })
         .populate({ path: 'TicketType', select: ['Ticket_Type'] })
         .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
         .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
         .exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Ticket Data Find Query Error', 'Crm_Customers.controller.js', err);
            res.status(417).send({status: false, Message: "Some error occurred while Find The Crm Ticket Data!."});
         } else {
            var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
            ReturnData = ReturnData.toString();
            res.status(200).send({Status: true, Response: ReturnData });
         }
      });
   }
};

// For Employee Login
exports.CrmTicketsList_ForEmployee = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   }else if (!ReceivingData.Customers || ReceivingData.Customers === ''  ) {
      res.status(400).send({Status: false, Message: "Customers can not be empty" });
   }else {
      CrmCustomersModel.CrmTicketsSchema
         .find({'If_Deleted': false, Customer: { $in: ReceivingData.Customers } }, {}, {sort: { updatedAt: -1 }})
         .populate({ path: 'Customer', select: ['CompanyName'] })
         .populate({ path: 'Machine', select: ['MachineName'] })
         .populate({ path: 'TicketType', select: ['Ticket_Type'] })
         .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
         .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
         .exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Tickets List Find Query Error', 'Crm_Customers.controller.js', err);
            res.status(417).send({status: false, Message: "Some error occurred while Find The Crm Tickets List!."});
         } else {
            var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
            ReturnData = ReturnData.toString();
            res.status(200).send({Status: true, Response: ReturnData });
         }
      });
   }
};


// -------------------------------------------------- Crm Ticket Activities Create -----------------------------------------------
exports.CrmTicketActivities_Create = function(req, res) {

   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.User_Id || ReceivingData.User_Id === '' ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   } else if(!ReceivingData.TicketId || ReceivingData.TicketId === '' ) {
      res.status(400).send({Status: false, Message: "Ticket Details can not be empty" });
   } else if(!ReceivingData.StartDate || ReceivingData.StartDate === '' ) {
      res.status(400).send({Status: false, Message: "Activity Start Date can not be empty" });
   } else if(!ReceivingData.StartTime || ReceivingData.StartTime === '' ) {
      res.status(400).send({Status: false, Message: "Activity Start Time can not be empty" });
   } else if(!ReceivingData.Status || typeof ReceivingData.Status !== 'object' || Object.keys(ReceivingData.Status).length < 2) {
      res.status(400).send({Status: false, Message: "Activity Status can not be empty" });
   } else if(!ReceivingData.Machine || typeof ReceivingData.Machine !== 'object' || Object.keys(ReceivingData.Machine).length < 2 ) {
      res.status(400).send({Status: false, Message: "Machine Details can not be empty" });
   } else if(!ReceivingData.Customer || typeof ReceivingData.Customer !== 'object' || Object.keys(ReceivingData.Customer).length < 2 ) {
      res.status(400).send({Status: false, Message: "Customer Details can not be empty" });
   } else {
      if (ReceivingData.Machine && typeof ReceivingData.Machine === 'object' && Object.keys(ReceivingData.Machine).length > 0 ) {
         ReceivingData.Machine = mongoose.Types.ObjectId(ReceivingData.Machine._id);
      }
      if (ReceivingData.Customer && typeof ReceivingData.Customer === 'object' && Object.keys(ReceivingData.Customer).length > 0 ) {
         ReceivingData.Customer = mongoose.Types.ObjectId(ReceivingData.Customer._id);
      }
      if (ReceivingData.Contact && typeof ReceivingData.Contact === 'object' && Object.keys(ReceivingData.Contact).length > 0 ) {
         ReceivingData.Contact = mongoose.Types.ObjectId(ReceivingData.Contact._id);
      }
      if (ReceivingData.Description === '') {
         ReceivingData.Description = '-';
      }
      
      var Crm_TicketActivities = new CrmCustomersModel.CrmTicketActivitiesSchema({
         Machine: ReceivingData.Machine,
         Customer: ReceivingData.Customer,
         Ticket: mongoose.Types.ObjectId(ReceivingData.TicketId),
         Contact: ReceivingData.Contact,
         Employee: ReceivingData.Employee,
         StartDate: ReceivingData.StartDate,
         StartTime: ReceivingData.StartTime,
         EndDate: ReceivingData.EndDate,
         EndTime: ReceivingData.EndTime,
         Status: ReceivingData.Status,
         Description: ReceivingData.Description || '-',
         If_Idle: ReceivingData.If_Idle,
         Created_By : mongoose.Types.ObjectId(ReceivingData.User_Id),
         Last_Modified_By : mongoose.Types.ObjectId(ReceivingData.User_Id),
         If_Deleted: false,
         Active_Status : ReceivingData.Active_Status || true,
      });
      Crm_TicketActivities.save(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Crm Ticket Activities Creation Query Error', 'AdminManagement.controller.js', err);
            res.status(400).send({Status: false, Message: "Some error occurred while creating the Crm Ticket Activities!."});
         } else {
            CrmCustomersModel.CrmTicketsSchema.update(
               { _id : mongoose.Types.ObjectId(ReceivingData.TicketId)  },
               { $set: {CurrentStatus : result.Status } }
            ).exec();

            if (ReceivingData.Status.Type === 'Type_1' && !ReceivingData.If_Idle) {
               new CrmCustomersModel.CrmMachinesActivitiesSchema({
                  Machine: mongoose.Types.ObjectId(ReceivingData.Machine),
                  Activity: 'Up',
                  Activity_Status: 'Close',
                  Activity_Date: new Date(new Date(ReceivingData.StartDate).setSeconds(new Date(ReceivingData.StartDate).getSeconds() - 2)),
                  Activity_Time: ReceivingData.StartTime,
                  Description: ReceivingData.Description,
                  WorkingHours_DbId: null,
                  Ticket_DbId: mongoose.Types.ObjectId(ReceivingData.TicketId),
                  Ticket_Activity_DbId: mongoose.Types.ObjectId(result._id),
                  If_Hidden: true,
                  If_Deleted: false,
                  Created_By : mongoose.Types.ObjectId(ReceivingData.User_Id),
               }).save();
               new CrmCustomersModel.CrmMachinesActivitiesSchema({
                  Machine: mongoose.Types.ObjectId(ReceivingData.Machine),
                  Activity: 'Down',
                  Activity_Status: 'Open',
                  Activity_Date:  new Date(ReceivingData.StartDate),
                  Activity_Time: ReceivingData.StartTime,
                  Description: ReceivingData.Description,
                  WorkingHours_DbId: null,
                  Ticket_DbId: mongoose.Types.ObjectId(ReceivingData.TicketId),
                  Ticket_Activity_DbId: mongoose.Types.ObjectId(result._id),
                  If_Hidden: false,
                  If_Deleted: false,
                  Created_By : mongoose.Types.ObjectId(ReceivingData.User_Id),
               }).save();
            }
            if (ReceivingData.Status.Type === 'Type_3' && !ReceivingData.If_Idle) {
               new CrmCustomersModel.CrmMachinesActivitiesSchema({
                  Machine: mongoose.Types.ObjectId(ReceivingData.Machine),
                  Activity: 'Down',
                  Activity_Status: 'Close',
                  Activity_Date: new Date(new Date(ReceivingData.StartDate).setSeconds(new Date(ReceivingData.StartDate).getSeconds() - 2)),
                  Activity_Time: ReceivingData.StartTime,
                  Description: ReceivingData.Description,
                  WorkingHours_DbId: null,
                  Ticket_DbId: mongoose.Types.ObjectId(ReceivingData.TicketId),
                  Ticket_Activity_DbId: mongoose.Types.ObjectId(result._id),
                  If_Hidden: true,
                  If_Deleted: false,
                  Created_By : mongoose.Types.ObjectId(ReceivingData.User_Id),
               }).save();
               new CrmCustomersModel.CrmMachinesActivitiesSchema({
                  Machine: mongoose.Types.ObjectId(ReceivingData.Machine),
                  Activity: 'Waiting',
                  Activity_Status: 'Open',
                  Activity_Date: new Date(ReceivingData.StartDate),
                  Activity_Time: ReceivingData.StartTime,
                  Description: ReceivingData.Description,
                  WorkingHours_DbId: null,
                  Ticket_DbId: mongoose.Types.ObjectId(ReceivingData.TicketId),
                  Ticket_Activity_DbId: mongoose.Types.ObjectId(result._id),
                  If_Hidden: false,
                  If_Deleted: false,
                  Created_By : mongoose.Types.ObjectId(ReceivingData.User_Id),
               }).save();
            }
            if (ReceivingData.Status.Type === 'Type_4' && !ReceivingData.If_Idle) {
               new CrmCustomersModel.CrmMachinesActivitiesSchema({
                  Machine: mongoose.Types.ObjectId(ReceivingData.Machine),
                  Activity: 'Waiting',
                  Activity_Status: 'Close',
                  Activity_Date: new Date(new Date(ReceivingData.StartDate).setSeconds(new Date(ReceivingData.StartDate).getSeconds() - 2)),
                  Activity_Time: ReceivingData.StartTime,
                  Description: ReceivingData.Description,
                  WorkingHours_DbId: null,
                  Ticket_DbId: mongoose.Types.ObjectId(ReceivingData.TicketId),
                  Ticket_Activity_DbId: mongoose.Types.ObjectId(result._id),
                  If_Hidden: false,
                  If_Deleted: false,
                  Created_By : mongoose.Types.ObjectId(ReceivingData.User_Id),
               }).save();
               new CrmCustomersModel.CrmMachinesActivitiesSchema({
                  Machine: mongoose.Types.ObjectId(ReceivingData.Machine),
                  Activity: 'Down',
                  Activity_Status: 'Open',
                  Activity_Date: new Date(ReceivingData.StartDate),
                  Activity_Time: ReceivingData.StartTime,
                  Description: ReceivingData.Description,
                  WorkingHours_DbId: null,
                  Ticket_DbId: mongoose.Types.ObjectId(ReceivingData.TicketId),
                  Ticket_Activity_DbId: mongoose.Types.ObjectId(result._id),
                  If_Hidden: true,
                  If_Deleted: false,
                  Created_By : mongoose.Types.ObjectId(ReceivingData.User_Id),
               }).save();
            }
            if (ReceivingData.Status.Type === 'Type_6' && !ReceivingData.If_Idle) {
               new CrmCustomersModel.CrmMachinesActivitiesSchema({
                  Machine: mongoose.Types.ObjectId(ReceivingData.Machine),
                  Activity: 'Down',
                  Activity_Status: 'Close',
                  Activity_Date: new Date(new Date(ReceivingData.StartDate).setSeconds(new Date(ReceivingData.StartDate).getSeconds() - 2)),
                  Activity_Time: ReceivingData.StartTime,
                  Description: ReceivingData.Description,
                  WorkingHours_DbId: null,
                  Ticket_DbId: mongoose.Types.ObjectId(ReceivingData.TicketId),
                  Ticket_Activity_DbId: mongoose.Types.ObjectId(result._id),
                  If_Hidden: false,
                  If_Deleted: false,
                  Created_By : mongoose.Types.ObjectId(ReceivingData.User_Id),
               }).save();
               new CrmCustomersModel.CrmMachinesActivitiesSchema({
                  Machine: mongoose.Types.ObjectId(ReceivingData.Machine),
                  Activity: 'Up',
                  Activity_Status: 'Open',
                  Activity_Date: new Date(ReceivingData.StartDate),
                  Activity_Time: ReceivingData.StartTime,
                  Description: ReceivingData.Description,
                  WorkingHours_DbId: null,
                  Ticket_DbId: mongoose.Types.ObjectId(ReceivingData.TicketId),
                  Ticket_Activity_DbId: mongoose.Types.ObjectId(result._id),
                  If_Hidden: false,
                  If_Deleted: false,
                  Created_By : mongoose.Types.ObjectId(ReceivingData.User_Id),
               }).save();
            }

            if ( !ReceivingData.If_Idle) {
               if (ReceivingData.Status.Type === 'Type_1') {
                  CrmCustomersModel.CrmMachinesSchema.update(
                     { _id : mongoose.Types.ObjectId(ReceivingData.Machine)  },
                     {$set: { Current_Status: 'Down' } }
                  ).exec();
               }
               if ( ReceivingData.Status.Type === 'Type_6') {
                  CrmCustomersModel.CrmMachinesSchema.update(
                     { _id : mongoose.Types.ObjectId(ReceivingData.Machine)  },
                     {$set: { Current_Status: 'Up' } }
                  ).exec();
               }
            }
            if (ReceivingData.Status.Type === 'Type_6') {
               CrmCustomersModel.CrmTicketsSchema.update(
                  { _id : mongoose.Types.ObjectId(ReceivingData.TicketId)  },
                  { $set: { TicketCloseDate : ReceivingData.StartDate, TicketCloseTime: ReceivingData.StartTime } }
               ).exec();
               CrmCustomersModel.CrmMachinesSchema.update(
                  { _id : mongoose.Types.ObjectId(ReceivingData.Machine)  },
                  { $set: { Open_Ticket : false } }
               ).exec();
            }
            CrmCustomersModel.CrmTicketActivitiesSchema
               .findOne({'_id': result._id}, {}, {})
               .populate({ path: 'Customer', select: ['CompanyName'] })
               .populate({ path: 'Machine', select: ['MachineName'] })
               .populate({ path: 'Ticket', select: ['TicketId'] })
               .populate({ path: 'Contact', select: ['Name'] })
               .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
               .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
               .exec(function(err, result) {
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Ticket Activity Data Find Query Error', 'Crm_Customers.controller.js', err);
                  res.status(417).send({status: false, Message: "Some error occurred while Find The Crm Ticket Activity Data!."});
               } else {
                  var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
                  ReturnData = ReturnData.toString();
                  res.status(200).send({Status: true, Response: ReturnData });
               }
            });
         }
      });
   }
};
exports.CrmTicketActivities_List = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   } else if (!ReceivingData.Ticket_Id || ReceivingData.Ticket_Id === ''  ) {
      res.status(400).send({Status: false, Message: "Ticket Details can not be empty" });
   }else {
      CrmCustomersModel.CrmTicketActivitiesSchema
         .find({'Ticket': ReceivingData.Ticket_Id, 'If_Deleted': false }, {}, {sort: { updatedAt: -1 }})
         .populate({ path: 'Customer', select: ['CompanyName'] })
         .populate({ path: 'Machine', select: ['MachineName'] })
         .populate({ path: 'Ticket', select: ['TicketId'] })
         .populate({ path: 'Contact', select: ['Name'] })
         .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
         .populate({ path: 'Last_Modified_By', select: ['Name', 'User_Type'] })
         .exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Ticket Activity List Find Query Error', 'Crm_Customers.controller.js', err);
            res.status(417).send({status: false, Message: "Some error occurred while Find The Crm Ticket Activity List!."});
         } else {
            var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
            ReturnData = ReturnData.toString();
            res.status(200).send({Status: true, Response: ReturnData });
         }
      });
   }
};




exports.CrmCustomerBased_ActivitiesList = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   } else if (!ReceivingData.Customer_Id || ReceivingData.Customer_Id === ''  ) {
      res.status(400).send({Status: false, Message: "Customer Details can not be empty" });
   }else {

      CrmCustomersModel.CrmMachinesSchema
      .find({Customer: mongoose.Types.ObjectId(ReceivingData.Customer_Id)}, { _id: 1 } )
      .exec(function(err, result){
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Customer Machines List Find Query Error', 'Crm_Customers.controller.js', err);
            res.status(417).send({status: false, Message: "Some error occurred while Find The Crm Customer Machines List!."});
         } else {
            result = result.map(obj => obj._id);
            CrmCustomersModel.CrmMachinesIdleAndTicketActivitySchema
               .find({'If_Deleted': false, 'If_Hidden': false, Machine: {$in: result } }, {}, {sort: { Activity_Date: -1 }, limit: 10})
               .populate({ path: 'Machine', select: ['MachineName'] })
               .populate({ path: 'Created_By', select: ['Name', 'User_Type'] })
               .exec(function(err_1, result_1) {
               if(err_1) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Customer Based Activities List Find Query Error', 'Crm_Customers.controller.js', err_1);
                  res.status(417).send({status: false, Message: "Some error occurred while Find The Crm Customer Based Activities List!."});
               } else {
                  result_1 = result_1.map(obj => {
                     if (obj.Activity_Status === 'Close') {
                        obj.Activity_Date = new Date(new Date(obj.Activity_Date).setSeconds(new Date(obj.Activity_Date).getSeconds() + 2));
                     }
                     return obj;
                  });
                  var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result_1), 'SecretKeyOut@123');
                  ReturnData = ReturnData.toString();
                  res.status(200).send({Status: true, Response: ReturnData });
               }
            });
         }
      });
   }
};




// ----------------------------------------------------- Charts -------------------------------------------------------
exports.CrmCustomerBasedMachine_ChartData = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if (!ReceivingData.Customer_Id || ReceivingData.Customer_Id === ''  ) {
      res.status(400).send({Status: false, Message: "Customer Details can not be empty" });
   } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   } else if (!ReceivingData.From || ReceivingData.From === ''  ) {
      res.status(400).send({Status: false, Message: "From Date can not be empty" });
   } else if (!ReceivingData.To || ReceivingData.To === ''  ) {
      res.status(400).send({Status: false, Message: "To Date can not be empty" });
   }else {
      
      var FromDate = new Date(ReceivingData.From);
      var ToDate = new Date(ReceivingData.To);
      var TotalMilleSeconds = Math.abs( new Date(ToDate) -  new Date(FromDate));
      FromDate =  new Date(FromDate.setSeconds(FromDate.getSeconds() -2));
      CrmCustomersModel.CrmMachinesSchema
         .find({'Customer': mongoose.Types.ObjectId(ReceivingData.Customer_Id), 'If_Deleted': false }, {MachineName: 1 }, {sort: { createdAt: -1 }})
         .exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Customer Based Machines Simple List Find Query Error', 'Crm_Customers.controller.js', err);
            res.status(417).send({status: false, Message: "Some error occurred while Find The Crm Customer Based Machines Simple List!."});
         } else {
            Promise.all(
               result.map(SingleMachine => {
                  return Promise.all([
                     CrmCustomersModel.CrmMachinesActivitiesSchema
                     .find({ 'Machine': SingleMachine._id, 
                              $and: [{  Activity_Date : { $lt: ToDate } },
                                     { Activity_Date: { $gte: FromDate } } ]
                           }, { Activity: 1, Activity_Status: 1, Activity_Date: 1, Description: 1, createdAt: 1},  {sort: { Activity_Date: 1 }} 
                        ).exec(),
                     CrmCustomersModel.CrmMachinesActivitiesSchema.find({'Machine': SingleMachine._id},{}, {sort: { Activity_Date: -1 }, limit: 1}).exec()
                     ]).then( Data => {
                        var MachineTicketsData = Data[0];
                        var Last_Activity = Data[1];
                        FromDate = new Date(FromDate.setSeconds(FromDate.getSeconds() + 2));
                        
                           if (MachineTicketsData.length === 0) {
                              var Arr = [];
                              if (Last_Activity.length > 0 && Last_Activity[0].Activity_Status === 'Open' && Last_Activity[0].Activity_Date < FromDate) {
                                 Arr = [{ Status: Last_Activity[0].Activity, Percentage: 100, Description: Last_Activity[0].Description, Hours: '24 hrs', MilleSeconds: TotalMilleSeconds, From: FromDate, To: ToDate }];
                                 return { Machine : SingleMachine, ChartData: Arr, Stage: '1' };
                              }else{
                                 Arr = [{ Status: 'Idle', Percentage: 100, Description: '-', Hours: '24 hrs', MilleSeconds: TotalMilleSeconds, From: FromDate, To: ToDate }];
                                 return { Machine : SingleMachine, ChartData: Arr, Stage: '1' };
                              }
                           } else {
                              MachineTicketsData = MachineTicketsData.map(obj => {
                                 if (obj.Activity_Status === 'Close') {
                                    obj.Activity_Date = new Date(new Date(obj.Activity_Date).setSeconds(new Date(obj.Activity_Date).getSeconds() + 2));
                                 }
                                 return obj;
                              });
                              
                              var ResArray = [];
                              // First Activity Calculate Start
                                 const diff_F = Math.abs( new Date(MachineTicketsData[0].Activity_Date) -  new Date(FromDate));
                                 const Percentage_F = (( diff_F * 100 ) / TotalMilleSeconds).toFixed(1).replace(/\.0$/, '');
                                 let hh_F = Math.floor(diff_F / 1000 / 60 / 60);
                                 let mm_F = Math.ceil((diff_F - hh_F * 3600000) / 1000 / 60);
                                 if (mm_F === 60) { hh_F = hh_F + 1; mm_F = 0; }
                                 const Hour_F =  hh_F +'hr'+ (hh_F < 2 ? " " : "s ") +("0" + mm_F).slice(-2)+'min';
                                 if (Percentage_F > 0) {
                                    if (MachineTicketsData[0].Activity === 'Waiting' && MachineTicketsData[0].Activity_Status !== 'Close') {
                                       ResArray.push({ Status: 'Down', Percentage: Percentage_F, Description: MachineTicketsData[0].Description, Hours: Hour_F, MilleSeconds: diff_F, From: FromDate, To: MachineTicketsData[0].Activity_Date });
                                    }else {
                                       ResArray.push({ Status: MachineTicketsData[0].Activity, Percentage: Percentage_F, Description: MachineTicketsData[0].Description, Hours: Hour_F, MilleSeconds: diff_F, From: FromDate, To: MachineTicketsData[0].Activity_Date });
                                    }
                                 }
                              // First Activity Calculate End

                              // Middle Activity Calculate Start
                              if (MachineTicketsData[0].Activity_Status === 'Close') {
                                    const diff_M= Math.abs( new Date(MachineTicketsData[0].Activity_Date) -  new Date(MachineTicketsData[1].Activity_Date));
                                    const Percentage_M  = (( diff_M  * 100 ) / TotalMilleSeconds).toFixed(1).replace(/\.0$/, '');
                                    let hh_M = Math.floor(diff_M / 1000 / 60 / 60);
                                    let mm_M = Math.ceil((diff_M - hh_M * 3600000) / 1000 / 60);
                                    if (mm_M === 60) { hh_M = hh_M + 1; mm_M = 0; }
                                    const Hour_M  = hh_M +'hr' + (hh_M < 2 ? " " : "s ") +("0" + mm_M ).slice(-2)+'min';
                                    if (Percentage_M > 0) {
                                          ResArray.push({ Status: MachineTicketsData[0].Activity, Percentage: Percentage_M, Description: '-', Hours: Hour_M, MilleSeconds: diff_M, From: MachineTicketsData[0].Activity_Date, To: MachineTicketsData[1].Activity_Date });
                                    }
                                    MachineTicketsData.splice(0, 1);
                              }
                              MachineTicketsData.map( (obj, i) => {
                                 if ( ((i % 2) / 100) !== 0 ) {
                                    const diff_Mm = Math.abs(new Date(MachineTicketsData[i - 1].Activity_Date) - new Date(MachineTicketsData[i].Activity_Date));
                                    const Percentage_Mm = ((diff_Mm * 100) / TotalMilleSeconds).toFixed(1).replace(/\.0$/, '');
                                    let hh_Mm = Math.floor(diff_Mm / 1000 / 60 / 60);
                                    let mm_Mm = Math.ceil((diff_Mm - hh_Mm * 3600000) / 1000 / 60);
                                    if (mm_Mm === 60) { hh_Mm = hh_Mm + 1; mm_Mm = 0; }
                                    const Hour_Mm =  hh_Mm + 'hr' + (hh_Mm < 2 ? " " : "s ") + ("0" + mm_Mm).slice(-2) + 'min';
                                    if (Percentage_Mm > 0) {
                                       ResArray.push({ Status: MachineTicketsData[i].Activity, Percentage: Percentage_Mm, Description: MachineTicketsData[i].Description, Hours: Hour_Mm, MilleSeconds: diff_Mm, From: MachineTicketsData[i - 1].Activity_Date, To: MachineTicketsData[i].Activity_Date });
                                    }
                                 }
                              });
                              // Middle Activity Calculate End


                              // Last Activity Calculate Start
                                 const diff_L = Math.abs( new Date(ToDate) -  new Date(MachineTicketsData[MachineTicketsData.length - 1].Activity_Date));
                                 const Percentage_L  = (( diff_L  * 100 ) / TotalMilleSeconds).toFixed(1).replace(/\.0$/, '');
                                 let hh_L = Math.floor(diff_L / 1000 / 60 / 60);
                                 let mm_L = Math.ceil((diff_L - hh_L * 3600000) / 1000 / 60);
                                 if (mm_L === 60) { hh_L = hh_L + 1; mm_L = 0; }
                                 const Hour_L  = hh_L +'hr' + (hh_L < 2 ? " " : "s ") + ("0" + mm_L ).slice(-2)+'min';
                                 if (MachineTicketsData[MachineTicketsData.length - 1].Activity_Status === 'Open' && Percentage_L > 0) {
                                    ResArray.push({ Status: MachineTicketsData[MachineTicketsData.length - 1].Activity, Percentage: Percentage_L, Description: MachineTicketsData[MachineTicketsData.length - 1].Description, Hours: Hour_L, MilleSeconds: diff_L, From: MachineTicketsData[MachineTicketsData.length - 1].Activity_Date, To: ToDate });
                                 }else {
                                    if (Percentage_L > 0) {
                                       ResArray.push({ Status: 'Idle', Percentage: Percentage_L, Description: '-', Hours: Hour_L, MilleSeconds: diff_L, From: MachineTicketsData[MachineTicketsData.length - 1].Activity_Date, To: ToDate });
                                    }
                                 }
                              // Last Activity Calculate End
                              return { Machine : SingleMachine, ChartData: ResArray, Stage: '2' };
                           }
                        });
                  })
            ).then(FinalResult =>  {
               FinalResult = FinalResult.map(obj => {
                  var OutputData = obj.ChartData;
                  OutputData = OutputData.filter(obj => obj.Status !== 'Idle');
                  var runTime = 0;
                  var SpareWaitingTime = 0;
                  var DownTime = 0;
                  var BreakDowns = 0;
                  OutputData.map((obj_1, index) => {
                     runTime = runTime +  Math.abs( new Date(obj_1.To) -  new Date(obj_1.From));
                     if (obj_1.Status === 'Waiting') { SpareWaitingTime = SpareWaitingTime + Math.abs( new Date(obj_1.To) -  new Date(obj_1.From)); }
                     if (obj_1.Status === 'Down') { DownTime = DownTime + Math.abs( new Date(obj_1.To) -  new Date(obj_1.From));
                        if (index !== 0) {
                           if (OutputData[index - 1].Status !== 'Waiting') { BreakDowns = BreakDowns + 1; }
                        } else {  BreakDowns = BreakDowns + 1; }
                     }
                  });
                  function Hour(MS) { 
                     let hh = Math.floor(MS / 1000 / 60 / 60);
                     let mm = Math.ceil((MS - hh * 3600000) / 1000 / 60);
                     if (mm === 60) { hh = hh + 1; mm = 0; }
                     if ( mm > 0) { hh = hh + (mm / 60 ); }
                     return  hh; 
                  }
                  if (BreakDowns === 0) { BreakDowns = 1; }
                  let mtbf = Hour(runTime - DownTime) / BreakDowns;
                  let mtbf_Waiting = Hour(runTime - (DownTime + SpareWaitingTime)) / BreakDowns;
                  let mttr = Hour(DownTime) / BreakDowns;
                  let mttr_Waiting = Hour(DownTime + SpareWaitingTime) / BreakDowns;
                  let Avail = 0;
                  let Avail_Waiting = 0;
                  if (mtbf > 0) {
                     Avail = (mtbf / (mtbf + mttr) ) * 100;
                  }
                  if (mtbf_Waiting > 0) {
                     Avail_Waiting = (mtbf_Waiting / (mtbf_Waiting + mttr_Waiting) ) * 100;
                  }
                  mtbf = Math.round(mtbf * 100) / 100;
                  mtbf_Waiting = Math.round(mtbf_Waiting * 100) / 100;
                  mttr = Math.round(mttr * 100) / 100;
                  mttr_Waiting = Math.round(mttr_Waiting * 100) / 100;

                  obj.MTBF = Math.floor(mtbf) + 'hr ' + Math.ceil((mtbf - Math.floor(mtbf)) * 60) + 'min ';
                  obj.MTBF_Waiting = Math.floor(mtbf_Waiting) + 'hr ' +  Math.ceil((mtbf_Waiting - Math.floor(mtbf_Waiting)) * 60) + 'min';
                  obj.MTTR = Math.floor(mttr) + 'hr ' + Math.ceil((mttr - Math.floor(mttr)) * 60) + 'min ';
                  obj.MTTR_Waiting = Math.floor(mttr_Waiting) + 'hr ' + Math.ceil((mttr_Waiting - Math.floor(mttr_Waiting)) * 60) + 'min';
                  obj.Avail = Math.round(Avail * 100) / 100;
                  obj.Avail_Waiting = Math.round(Avail_Waiting * 100) / 100;
                  return obj;
               });
               
               var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(FinalResult), 'SecretKeyOut@123');
               ReturnData = ReturnData.toString();
               res.status(200).send({Status: true, Response: ReturnData });
            }).catch(err_2 => {
               console.log(err_2);
               
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Customer Based Machines Chart Data Find Query Error', 'Crm_Customers.controller.js', err_2);
               res.status(417).send({status: false, Message: "Some error occurred while Find The Crm Customer Based Machines Chart Data !."});
            });
         }
      });
   }
};



exports.CrmSingleMachine_ChartData = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if (!ReceivingData.Machine_Id || ReceivingData.Machine_Id === ''  ) {
      res.status(400).send({Status: false, Message: "Customer Details can not be empty" });
   } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   } else if (!ReceivingData.From || ReceivingData.From === ''  ) {
      res.status(400).send({Status: false, Message: "From Date can not be empty" });
   } else if (!ReceivingData.To || ReceivingData.To === ''  ) {
      res.status(400).send({Status: false, Message: "To Date can not be empty" });
   }else {

      var From = new Date(ReceivingData.From);
      var To = new Date(ReceivingData.To);
      var MilleSeconds = Math.abs( new Date(To) -  new Date(From));
      var DatArr = [];
      while (From <= To) {
         DatArr.push(new Date(From));
         From.setDate(From.getDate() + 1);
      }

      Promise.all(
         DatArr.map( DateObj => {
            const ChangeDate = DateObj;
            const FromDate = new Date(DateObj.setHours(0, 0, 0));
            const ToDate = new Date(DateObj.setHours(23, 59, 59));

            const Show_Date = FromDate.getDate() + '/' + (FromDate.getMonth() + 1) + '/' + FromDate.getUTCFullYear() ;
            const TotalMilleSeconds = Math.abs( new Date(ToDate) -  new Date(FromDate));
            
            const Temp_FromDate = new Date(new Date(ChangeDate.setDate(ChangeDate.getDate() - 1)).setHours(23, 59, 58));
            return Promise.all([
               CrmCustomersModel.CrmMachinesIdleAndTicketActivitySchema
               .find({ 'Machine': ReceivingData.Machine_Id, 
                        $and: [{  Activity_Date : { $lt: ToDate } },
                               { Activity_Date: { $gte: Temp_FromDate } } ]
                     }, { Activity: 1, Activity_Status: 1, Description: 1, Activity_Date: 1, createdAt: 1},  {sort: { Activity_Date: 1 }} 
                  ).exec(),
               CrmCustomersModel.CrmMachinesIdleAndTicketActivitySchema.find({'Machine': ReceivingData.Machine_Id},{}, {sort: { Activity_Date: -1 }, limit: 1}).exec(),
               CrmCustomersModel.CrmMachinesIdleAndTicketActivitySchema.find({'Machine': ReceivingData.Machine_Id},{}, {sort: { Activity_Date: 1 }, limit: 1}).exec(),
               CrmCustomersModel.CrmMachinesSchema.findOne({'_id': ReceivingData.Machine_Id},{}, {}).exec()
               ]).then( Data => {
                  var MachineTicketsData = Data[0];
                  var Last_Activity = Data[1];
                  var First_Activity = Data[2];
                  var Machine_Create = Data[3];

                  MachineTicketsData = MachineTicketsData.map(obj => {
                     if (obj.Activity_Status === 'Close') {
                        obj.Activity_Date = new Date(new Date(obj.Activity_Date).setSeconds(new Date(obj.Activity_Date).getSeconds() + 2));
                     }
                     return obj;
                  });

                  MachineTicketsData = MachineTicketsData.filter(obj => obj.Activity_Date >= FromDate );
                  MachineTicketsData = MachineTicketsData.filter(obj => obj.Activity_Date <= ToDate);

                  MachineTicketsData.sort((a, b) => new Date(b.Activity_Date) - new Date(a.Activity_Date));
                  MachineTicketsData.reverse();

                     if (MachineTicketsData.length === 0) {
                        var Arr = [];
                        if (Last_Activity.length > 0 && Last_Activity[0].Activity_Status === 'Open') {
                           if (First_Activity.length > 0 && First_Activity[0].Activity_Date < FromDate && new Date().setHours(23, 59, 59, 999) >= ToDate ) {
                              Arr = [{ Status: Last_Activity[0].Activity, Percentage: 100, Description: Last_Activity[0].Description, Hours: 24, Show_Hours: '24 hrs', MilleSeconds: TotalMilleSeconds, From: FromDate, To: ToDate }];
                              return { Date : Show_Date, ChartData: Arr, Stage: '1' };
                           } else {
                              if (Machine_Create.DateOfPlaced <= FromDate && new Date().setHours(23, 59, 59, 999) >= ToDate) {
                                 Arr = [{ Status: 'Up', Percentage: 100, Description: '-', Hours: 24, Show_Hours: '24 hrs', MilleSeconds: TotalMilleSeconds, From: FromDate, To: ToDate }];
                                 return { Date : Show_Date, ChartData: Arr, Stage: '2' };
                              }else{
                                 return { Date : Show_Date, ChartData: Arr, Stage: '3' };
                              }
                           }
                        }else{
                           if (First_Activity.length > 0 && First_Activity[0].Activity_Date <= FromDate && new Date().setHours(23, 59, 59, 999) >= ToDate) {
                              Arr = [{ Status: 'Up', Percentage: 100, Description: '-', Hours: 24, Show_Hours: '24 hrs', MilleSeconds: TotalMilleSeconds, From: FromDate, To: ToDate }];
                              return { Date : Show_Date, ChartData: Arr, Stage: '4' };
                           } else {
                              if (Machine_Create.DateOfPlaced <= FromDate && new Date().setHours(23, 59, 59, 999) >= ToDate) {
                                 Arr = [{ Status: 'Up', Percentage: 100, Description: '-', Hours: 24, Show_Hours: '24 hrs', MilleSeconds: TotalMilleSeconds, From: FromDate, To: ToDate }];
                                 return { Date : Show_Date, ChartData: Arr, Stage: '5' };
                              }else{
                                 return { Date : Show_Date, ChartData: Arr, Stage: '6' };
                              }
                           }
                        }
                     } else {
                        MachineTicketsData = MachineTicketsData.map(obj => {
                           if (obj.Activity_Status === 'Close') {
                              obj.Activity_Date = new Date(new Date(obj.Activity_Date).setSeconds(new Date(obj.Activity_Date).getSeconds() + 2));
                           }
                           return obj;
                        });
                        
                        var ResArray = [];
                        // First Activity Calculate Start
                           const diff_F = Math.abs( new Date(MachineTicketsData[0].Activity_Date) -  new Date(FromDate));
                           const Percentage_F = (( diff_F * 100 ) / TotalMilleSeconds).toFixed(1).replace(/\.0$/, '');
                           let hh_F = Math.floor(diff_F / 1000 / 60 / 60);
                           let mm_F = Math.ceil((diff_F - hh_F * 3600000) / 1000 / 60);
                           if (mm_F === 60) { hh_F = hh_F + 1; mm_F = 0; }
                           const Show_Hour_F =  hh_F +'hr' + (hh_F < 2 ? " " : "s ") +("0" + mm_F).slice(-2)+'min';
                           const Hour_F = hh_F + Math.round((mm_F / 60)  * 100) / 100;
                           if (Percentage_F > 0 && MachineTicketsData[0].Activity === 'Waiting' && MachineTicketsData[0].Activity_Status !== 'Close') {
                              ResArray.push({ Status: 'Waiting', Percentage: Percentage_F, Description: MachineTicketsData[0].Description, Hours: Hour_F, Show_Hours: Show_Hour_F, MilleSeconds: diff_F, From: FromDate, To: MachineTicketsData[0].Activity_Date });
                           }
                           else if (Percentage_F > 0 && MachineTicketsData[0].Activity !== 'Waiting' && MachineTicketsData[0].Activity_Status !== 'Close') {
                              ResArray.push({ Status: 'Up', Percentage: Percentage_F, Description: '-', Hours: Hour_F, Show_Hours: Show_Hour_F, MilleSeconds: diff_F, From: FromDate, To: MachineTicketsData[0].Activity_Date });
                           }else {
                              if (Percentage_F > 0) {
                                 ResArray.push({ Status: MachineTicketsData[0].Activity, Percentage: Percentage_F, Description: MachineTicketsData[0].Description, Hours: Hour_F, Show_Hours: Show_Hour_F, MilleSeconds: diff_F, From: FromDate, To: MachineTicketsData[0].Activity_Date });
                              }
                           }
                        // First Activity Calculate End

                        // Middle Activity Calculate Start
                        if (MachineTicketsData[0].Activity_Status === 'Close' && MachineTicketsData.length > 1) {
                              const diff_M= Math.abs( new Date(MachineTicketsData[0].Activity_Date) -  new Date(MachineTicketsData[1].Activity_Date));
                              const Percentage_M  = (( diff_M  * 100 ) / TotalMilleSeconds).toFixed(1).replace(/\.0$/, '');
                              let hh_M = Math.floor(diff_M / 1000 / 60 / 60);
                              let mm_M = Math.ceil((diff_M - hh_M * 3600000) / 1000 / 60);
                              if (mm_M === 60) { hh_M = hh_M + 1; mm_M = 0; }
                              const Show_Hour_M  = hh_M +'hr' + (hh_M < 2 ? " " : "s ")+("0" + mm_M ).slice(-2)+'min';
                              const Hour_M = hh_M + Math.round((mm_M / 60)  * 100) / 100;
                              if (Percentage_M > 0) {
                                    ResArray.push({ Status: 'Up', Percentage: Percentage_M, Description: '-', Hours: Hour_M, Show_Hours: Show_Hour_M, MilleSeconds: diff_M, From: MachineTicketsData[0].Activity_Date, To: MachineTicketsData[1].Activity_Date });
                              }
                              MachineTicketsData.splice(0, 1);
                        }
                        MachineTicketsData.map( (obj, i) => {
                           if ( ((i % 2) / 100) !== 0 ) {
                              const diff_Mm = Math.abs(new Date(MachineTicketsData[i - 1].Activity_Date) - new Date(MachineTicketsData[i].Activity_Date));
                              const Percentage_Mm = ((diff_Mm * 100) / TotalMilleSeconds).toFixed(1).replace(/\.0$/, '');
                              let hh_Mm = Math.floor(diff_Mm / 1000 / 60 / 60);
                              let mm_Mm = Math.ceil((diff_Mm - hh_Mm * 3600000) / 1000 / 60);
                              if (mm_Mm === 60) { hh_Mm = hh_Mm + 1; mm_Mm = 0; }
                              const Show_Hour_Mm =  hh_Mm + 'hr' + (hh_Mm < 2 ? " " : "s ") + ("0" + mm_Mm).slice(-2) + 'min';
                              const Hour_Mm = hh_Mm + Math.round((mm_Mm / 60)  * 100) / 100;
                              if (Percentage_Mm > 0) {
                                 ResArray.push({ Status: MachineTicketsData[i].Activity, Percentage: Percentage_Mm, Description: MachineTicketsData[i].Description, Hours: Hour_Mm, Show_Hours: Show_Hour_Mm, MilleSeconds: diff_Mm, From: MachineTicketsData[i - 1].Activity_Date, To: MachineTicketsData[i].Activity_Date });
                              }
                           } else {
                              if (i > 1) {
                                 const diff_Mm = Math.abs(new Date(MachineTicketsData[i - 1].Activity_Date) - new Date(MachineTicketsData[i].Activity_Date));
                                 const Percentage_Mm = ((diff_Mm * 100) / TotalMilleSeconds).toFixed(1).replace(/\.0$/, '');
                                 let hh_Mm = Math.floor(diff_Mm / 1000 / 60 / 60);
                                 let mm_Mm = Math.ceil((diff_Mm - hh_Mm * 3600000) / 1000 / 60);
                                 if (mm_Mm === 60) { hh_Mm = hh_Mm + 1; mm_Mm = 0; }
                                 const Show_Hour_Mm = hh_Mm + 'hr' + (hh_Mm < 2 ? " " : "s ") + ("0" + mm_Mm).slice(-2) + 'min';
                                 const Hour_Mm = hh_Mm + Math.round((mm_Mm / 60)  * 100) / 100;
                                 if (Percentage_Mm > 0) {
                                    ResArray.push({ Status: 'Up', Percentage: Percentage_Mm, Description: '-', Hours: Hour_Mm, Show_Hours: Show_Hour_Mm, MilleSeconds: diff_Mm, From: MachineTicketsData[i-1].Activity_Date, To: MachineTicketsData[i].Activity_Date });
                                 }
                              }
                           }
                        });
                        // Middle Activity Calculate End

                        // Last Activity Calculate Start
                           const diff_L = Math.abs( new Date(ToDate) -  new Date(MachineTicketsData[MachineTicketsData.length - 1].Activity_Date));
                           const Percentage_L  = (( diff_L  * 100 ) / TotalMilleSeconds).toFixed(1).replace(/\.0$/, '');
                           let hh_L = Math.floor(diff_L / 1000 / 60 / 60);
                           let mm_L = Math.ceil((diff_L - hh_L * 3600000) / 1000 / 60);
                           if (mm_L === 60) { hh_L = hh_L + 1; mm_L = 0; }
                           const Show_Hour_L  = hh_L +'hr' + (hh_L < 2 ? " " : "s ")+("0" + mm_L ).slice(-2)+'min';
                           const Hour_L = hh_L + Math.round((mm_L / 60)  * 100) / 100;
                           if (MachineTicketsData[MachineTicketsData.length - 1].Activity_Status === 'Open' && Percentage_L > 0) {
                              ResArray.push({ Status: MachineTicketsData[MachineTicketsData.length - 1].Activity, Percentage: Percentage_L, Description: MachineTicketsData[MachineTicketsData.length - 1].Description, Hours: Hour_L, Show_Hours: Show_Hour_L, MilleSeconds: diff_L, From: MachineTicketsData[MachineTicketsData.length - 1].Activity_Date, To: ToDate });
                           }else {
                              if (Percentage_L > 0) {
                                    ResArray.push({ Status: 'Up', Percentage: Percentage_L, Description: '-', Hours: Hour_L, Show_Hours: Show_Hour_L, MilleSeconds: diff_L, From: MachineTicketsData[MachineTicketsData.length - 1].Activity_Date, To: ToDate });
                              }
                           }
                        // Last Activity Calculate End
                        return {  Date : Show_Date, ChartData: ResArray, Stage: '7' };
                     }
                  });
         })
      ).then(response => {
         var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(response), 'SecretKeyOut@123');
         ReturnData = ReturnData.toString();
         res.status(200).send({Status: true, Response: ReturnData });
      }).catch(error => {
         console.log(error);
      })
   }
};



exports.CrmCustomerBasedMachinesMonthly_ChartData = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if (!ReceivingData.Customer_Id || ReceivingData.Customer_Id === ''  ) {
      res.status(400).send({Status: false, Message: "Customer Details can not be empty" });
   } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   } else if (!ReceivingData.From || ReceivingData.From === ''  ) {
      res.status(400).send({Status: false, Message: "From Date can not be empty" });
   } else if (!ReceivingData.To || ReceivingData.To === ''  ) {
      res.status(400).send({Status: false, Message: "To Date can not be empty" });
   }else {
      
      var FromDate = new Date(ReceivingData.From);
      var ToDate = new Date(ReceivingData.To);
      var TotalMilleSeconds = Math.abs( new Date(ToDate) -  new Date(FromDate));
      const ChangeDate = new Date(ReceivingData.From);
      const Temp_FromDate = new Date(new Date(ChangeDate.setDate(ChangeDate.getDate() - 1)).setHours(23, 59, 58));
      CrmCustomersModel.CrmMachinesSchema
         .find({'Customer': mongoose.Types.ObjectId(ReceivingData.Customer_Id), DateOfPlaced: { $lt : new Date(ToDate) }, 'If_Deleted': false }, {MachineName: 1, createdAt: 1, DateOfPlaced: 1}, {sort: { createdAt: -1 }})
         .exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Customer Based Machines Simple List Find Query Error', 'Crm_Customers.controller.js', err);
            res.status(417).send({status: false, Message: "Some error occurred while Find The Crm Customer Based Machines Simple List!."});
         } else {
            Promise.all(
               result.map(SingleMachine => {
                  return Promise.all([
                     CrmCustomersModel.CrmMachinesActivitiesSchema
                     .find({ 'Machine': SingleMachine._id,
                              $and: [ { Activity_Date : { $lt: ToDate } },
                                     { Activity_Date: { $gte: Temp_FromDate } } ]
                           }, { Activity: 1, Activity_Status: 1, Activity_Date: 1, createdAt: 1},  {sort: { Activity_Date: 1 }} 
                        ).exec(),
                        CrmCustomersModel.CrmMachinesActivitiesSchema.find({'Machine': SingleMachine._id},{}, {sort: { Activity_Date: -1 }, limit: 1}).exec(),
                     ]).then( Data => {
                        var MachineTicketsData = Data[0];

                        MachineTicketsData = MachineTicketsData.map(obj => {
                           if (obj.Activity_Status === 'Close') {
                              obj.Activity_Date = new Date(new Date(obj.Activity_Date).setSeconds(new Date(obj.Activity_Date).getSeconds() + 2));
                           }
                           return obj;
                        });
      
                        MachineTicketsData = MachineTicketsData.filter(obj => obj.Activity_Date >= FromDate );
                        MachineTicketsData = MachineTicketsData.filter(obj => obj.Activity_Date <= ToDate);
                        var Running_Ms = TotalMilleSeconds;
                        if (SingleMachine.DateOfPlaced > FromDate) {
                           Running_Ms = Math.abs( new Date(ToDate) -  new Date(SingleMachine.DateOfPlaced));
                        }
                        
                        
                        var Last_Activity = Data[1];
                        var Types = ['Up', 'Idle','Waiting', 'Down'];
                        var No_Of_Failures = 0;
                        var ChartData = [];
                        var Working_Ms = 0;
                        var Idle_Ms = 0;
                        var Waiting_Ms = 0;
                        var Down_Ms = 0;
                        if (MachineTicketsData.length === 0 && SingleMachine.DateOfPlaced <= ToDate) {
                           if (Last_Activity.length > 0 && Last_Activity[0]['Activity_Status'] === 'Open' && Last_Activity[0]['Activity_Date'] < ToDate ) {
                              Types.map(obj => {
                                 if (Last_Activity[0].Activity === obj) {
                                    let hh = Math.floor(Running_Ms / 1000 / 60 / 60);
                                    let mm = Math.ceil((Running_Ms - hh * 3600000) / 1000 / 60);
                                    if (mm === 60) { hh = hh + 1; mm = 0; }
                                    const Show_Hours =  hh +'hr' + (hh < 2 ? " " : "s ") +("0" + mm).slice(-2)+'mins';
                                    const Hours = hh + Math.round((mm / 60)  * 100) / 100;
                                    if (obj === 'Idle') { Idle_Ms = Running_Ms;  }
                                    if (obj === 'Waiting') { Waiting_Ms = Running_Ms; }
                                    if (obj === 'Down') { Down_Ms = Running_Ms; }
                                    if (obj === 'Up') { Working_Ms = Running_Ms; }
                                    ChartData.push({Type: obj, Percentage: 100, Hours: Hours, Show_Hours: Show_Hours })
                                 } else {
                                    ChartData.push({Type: obj, Percentage: 0, Hours: 0.00, Show_Hours: '0hr 00min' })
                                 }
                              })
                           } else {
                              Types.map(obj => {
                                 if (obj === 'Idle') {
                                    let hh = Math.floor(Running_Ms / 1000 / 60 / 60);
                                    let mm = Math.ceil((Running_Ms - hh * 3600000) / 1000 / 60);
                                    if (mm === 60) { hh = hh + 1; mm = 0; }
                                    const Show_Hours =  hh +'hr' + (hh < 2 ? " " : "s ") +("0" + mm).slice(-2)+'min';
                                    const Hours = hh + Math.round((mm / 60)  * 100) / 100;
                                    if (obj === 'Idle') { Idle_Ms = Running_Ms;  }
                                    ChartData.push({Type: obj, Percentage: 100, Hours: Hours, Show_Hours: Show_Hours  })
                                 } else {
                                    ChartData.push({Type: obj, Percentage: 0, Hours: 0.00, Show_Hours: '0hr 00min' })
                                 }
                              });
                           }
                        } else {
                           MachineTicketsData.map((obj, i) => {
                              if (obj.Activity === 'Down' ) {
                                 if (obj.Activity_Status === 'Close' && i === 0 ) {
                                    No_Of_Failures = No_Of_Failures + 1;
                                 }else{
                                    if(obj.Activity_Status === 'Open') {
                                       if (i > 1) {
                                          if (MachineTicketsData[i-2].Activity !== 'Waiting') {
                                             No_Of_Failures = No_Of_Failures + 1;
                                          }
                                       }else{
                                          No_Of_Failures = No_Of_Failures + 1;
                                       }
                                    }
                                 }
                              }
                           });
                           
                           Types = ['Up', 'Waiting', 'Down', 'Idle'];
                           var Difference = 0;
                           Types.map(obj => {
                              var Diff = 0;
                              if (obj !== 'Idle') {
                                 var ActivityData = MachineTicketsData.filter(obj_one => obj_one.Activity === obj);
                                 if (ActivityData.length > 0 && SingleMachine.DateOfPlaced <= ToDate) {
                                    if (ActivityData[0]['Activity_Status'] === 'Close') {
                                       Diff = Diff + Math.abs(new Date(FromDate) -  new Date(ActivityData[0]['Activity_Date']));
                                       ActivityData.slice(1);
                                    }
                                    if (ActivityData.length > 0 && ActivityData[ActivityData.length - 1]['Activity_Status'] === 'Open') {
                                       Diff = Diff + Math.abs( new Date(ActivityData[ActivityData.length - 1]['Activity_Date']) -  new Date(ToDate));
                                       ActivityData.slice(0, -1);
                                    }
                                    if (ActivityData.length > 0) {
                                       ActivityData.map((obj_one, i) => {
                                          if ( ((i % 2) / 100) !== 0 ) {
                                             Diff = Diff + Math.abs(new Date(ActivityData[i - 1].Activity_Date) - new Date(ActivityData[i].Activity_Date));
                                          } 
                                       })
                                    }

                                    if (obj === 'Up') {
                                       Working_Ms = Working_Ms + Diff;
                                    }
                                    if (obj === 'Waiting') {
                                       Waiting_Ms = Waiting_Ms + Diff;
                                    }
                                    if (obj === 'Down') {
                                       Down_Ms = Down_Ms + Diff;
                                    }
                                    Difference = Difference + Diff;
                                    const Percentage = Math.round(((Diff * 100) / Running_Ms) * 100) / 100;
                                    let hh = Math.floor(Diff / 1000 / 60 / 60);
                                    let mm = Math.ceil((Diff - hh * 3600000) / 1000 / 60);
                                    if (mm === 60) { hh = hh + 1; mm = 0; }
                                    const Show_Hours =  hh + 'hr' + (hh < 2 ? " " : "s ") + ("0" + mm).slice(-2) + 'min';
                                    const Hours = hh + Math.round((mm / 60)  * 100) / 100;
                                    ChartData.push({Type: obj, Percentage: Percentage, Hours: Hours, Show_Hours: Show_Hours });
                                 } else {
                                    ChartData.push({Type: obj, Percentage: 0, Hours: 0.00, Show_Hours: '0hr 00min' });
                                 }
                              } else {
                                 
                                 if (SingleMachine.DateOfPlaced <= ToDate) {
                                    Difference = Running_Ms - Difference;
                                    Idle_Ms = Difference;
                                    const Percentage = Math.round(((Difference * 100) / Running_Ms) * 100) / 100;
                                    let hh = Math.floor(Difference / 1000 / 60 / 60);
                                    let mm = Math.ceil((Difference - hh * 3600000) / 1000 / 60);
                                    if (mm === 60) { hh = hh + 1; mm = 0; }
                                    const Show_Hours =  hh + 'hr' + (hh < 2 ? " " : "s ") + ("0" + mm).slice(-2) + 'min';
                                    const Hours = hh + Math.round((mm / 60)  * 100) / 100;
                                    ChartData.splice(0, 0, {Type: obj, Percentage: Percentage, Hours: Hours, Show_Hours: Show_Hours });
                                 } else {
                                    ChartData.splice(0, 0, {Type: obj, Percentage: 0, Hours: 0.00, Show_Hours: '0hr 00min' });
                                 }
                              }
                           });
                        }
                        function Hours(MS) {
                           let hh = Math.floor(MS / 1000 / 60 / 60);
                           let mm = Math.ceil((MS - hh * 3600000) / 1000 / 60);
                           if (mm === 60) { hh = hh + 1; mm = 0; }
                           if ( mm > 0) { hh = hh + (mm / 60 ); }
                           return  hh; 
                        }
                        
                        
                        const Total_Hours = Hours(Running_Ms);
                        const Available_Hours = Hours(Running_Ms - Idle_Ms - Waiting_Ms);
                        const Down_Hours = Hours(Down_Ms);
                        const Waiting_Hours =  Hours(Waiting_Ms);
                        
                        if (No_Of_Failures === 0) {
                           No_Of_Failures = 1
                        };
                        const MTBF = Math.round( ( (Available_Hours - Down_Hours) / No_Of_Failures ) * 100) / 100;
                        const MTTR =  Math.round( ( Down_Hours / No_Of_Failures ) * 100) / 100;
                        const Availability = Math.round( ( ( MTBF / (MTBF + MTTR) ) * 100 ) * 100) / 100;

                        const Waiting_MTBF = Math.round( ( (Available_Hours - (Down_Hours + Waiting_Hours)) / No_Of_Failures ) * 100) / 100;
                        const Waiting_MTTR = Math.round( ( (Down_Hours + Waiting_Hours) / No_Of_Failures ) * 100) / 100;
                        const Waiting_Availability = Math.round( (  (Waiting_MTBF / (Waiting_MTBF + Waiting_MTTR)) * 100  ) * 100) / 100;

                        const Calculation = {   MTBF: MTBF,
                                                MTTR: MTTR,
                                                Availability: Availability,
                                                Waiting_MTBF: Waiting_MTBF,
                                                Waiting_MTTR: Waiting_MTTR,
                                                Waiting_Availability: Waiting_Availability };

                        const Show_Calculation = {   MTBF: Math.floor(MTBF) + 'hr' + (MTBF < 2 ? " " : "s ") + Math.ceil((MTBF - Math.floor(MTBF)) * 60) + 'min',
                                                      MTTR: Math.floor(MTTR) + 'hr' + (MTTR < 2 ? " " : "s ") + Math.ceil((MTTR - Math.floor(MTTR)) * 60) + 'min',
                                                      Availability: Availability,
                                                      Waiting_MTBF: Math.floor(Waiting_MTBF) + 'hr ' + (Waiting_MTBF < 2 ? " " : "s ") + Math.ceil((Waiting_MTBF - Math.floor(Waiting_MTBF)) * 60) + 'min',
                                                      Waiting_MTTR: Math.floor(Waiting_MTTR) + 'hr ' + (Waiting_MTTR < 2 ? " " : "s ") + Math.ceil((Waiting_MTTR - Math.floor(Waiting_MTTR)) * 60) + 'min',
                                                      Waiting_Availability: Waiting_Availability };

                        ChartData = ChartData.map(obj => {
                           obj.Total_Hours = Math.floor(Total_Hours) + 'hr' + (Total_Hours < 2 ? " " : "s ") + Math.ceil((Total_Hours - Math.floor(Total_Hours)) * 60) + 'min';
                           return obj;
                        })
                        return { Machine: SingleMachine, ChartData: ChartData, Calculation: Calculation, Show_Calculation: Show_Calculation};
                     });
                  })
            ).then(FinalResult =>  {
               var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(FinalResult), 'SecretKeyOut@123');
                  ReturnData = ReturnData.toString();
                  res.status(200).send({Status: true, Response: ReturnData });
            }).catch(err_2 => {
               console.log(err_2);
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'CRM Customer Based Machines Chart Data Find Query Error', 'Crm_Customers.controller.js', err_2);
               res.status(417).send({status: false, Message: "Some error occurred while Find The Crm Customer Based Machines Chart Data !."});
            });
         }
      });
   }
};