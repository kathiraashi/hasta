var CryptoJS = require("crypto-js");
var CrmCustomersModel = require('./../../models/Crm/CrmCustomers.model.js');
var ErrorManagement = require('./../../../handling/ErrorHandling.js');
var mongoose = require('mongoose');



// -------------------------------------------------- Crm Customers Create -----------------------------------------------
exports.CrmCustomers_Create = function(req, res) {

   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '' ) {
      res.status(400).send({Status: false, Message: "Company Details can not be empty" });
   } else if(!ReceivingData.User_Id || ReceivingData.User_Id === '' ) {
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
         Company_Id : mongoose.Types.ObjectId(ReceivingData.Company_Id),
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

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '' ) {
      res.status(400).send({Status: false, Message: "Industry Type Id can not be empty" });
   } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   }else {
      CrmCustomersModel.CrmCustomersSchema
         .find({'Company_Id': ReceivingData.Company_Id, 'If_Deleted': false }, {CompanyName: 1, EmailAddress: 1, PhoneNumber: 1, BillingAddress: 1 }, {sort: { updatedAt: -1 }})
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

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '' ) {
      res.status(400).send({Status: false, Message: "Industry Type Id can not be empty" });
   } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   }else {
      CrmCustomersModel.CrmCustomersSchema
         .find({'Company_Id': ReceivingData.Company_Id, 'If_Deleted': false }, {CompanyName: 1 }, {sort: { updatedAt: -1 }})
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

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '' ) {
      res.status(400).send({Status: false, Message: "Industry Type Id can not be empty" });
   } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
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





// -------------------------------------------------- Crm Machines Create -----------------------------------------------
exports.CrmCustomerContact_Create = function(req, res) {

   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '' ) {
      res.status(400).send({Status: false, Message: "Company Details can not be empty" });
   } else if(!ReceivingData.User_Id || ReceivingData.User_Id === '' ) {
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
         Company_Id : mongoose.Types.ObjectId(ReceivingData.Company_Id),
         Last_Modified_By : mongoose.Types.ObjectId(ReceivingData.User_Id),
         If_Deleted: false,
         Active_Status : ReceivingData.Active_Status || true,
      });
      CrmCustomer_Contact.save(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Crm Customer Contact Creation Query Error', 'AdminManagement.controller.js', err);
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

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '' ) {
      res.status(400).send({Status: false, Message: "Industry Type Id can not be empty" });
   } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
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

   
   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '' ) {
      res.status(400).send({Status: false, Message: "Industry Type Id can not be empty" });
   } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
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

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '' ) {
      res.status(400).send({Status: false, Message: "Company Details can not be empty" });
   } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
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





// -------------------------------------------------- Crm Machines Create -----------------------------------------------
exports.CrmMachines_Create = function(req, res) {

   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '' ) {
      res.status(400).send({Status: false, Message: "Company Details can not be empty" });
   } else if(!ReceivingData.User_Id || ReceivingData.User_Id === '' ) {
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
      var Crm_Machines = new CrmCustomersModel.CrmMachinesSchema({
         MachineName: ReceivingData.MachineName,
         Customer: ReceivingData.Customer,
         MachineModel: ReceivingData.MachineModel,
         MachineMake: ReceivingData.MachineMake,
         MfgSerialNo: ReceivingData.MfgSerialNo,
         MachineId: ReceivingData.MachineId,
         MfgYear: ReceivingData.MfgYear,
         MachineType: ReceivingData.MachineType,
         ControllerType: ReceivingData.ControllerType,
         ControllerModelNo: ReceivingData.ControllerModelNo,
         Created_By : mongoose.Types.ObjectId(ReceivingData.User_Id),
         Company_Id : mongoose.Types.ObjectId(ReceivingData.Company_Id),
         Last_Modified_By : mongoose.Types.ObjectId(ReceivingData.User_Id),
         If_Deleted: false,
         Active_Status : ReceivingData.Active_Status || true,
      });
      Crm_Machines.save(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Crm Machines Creation Query Error', 'AdminManagement.controller.js', err);
            res.status(400).send({Status: false, Message: "Some error occurred while creating the Crm Machines!."});
         } else {
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

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '' ) {
      res.status(400).send({Status: false, Message: "Industry Type Id can not be empty" });
   } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   }else {
      CrmCustomersModel.CrmMachinesSchema
         .find({'Company_Id': ReceivingData.Company_Id, 'If_Deleted': false }, {}, {sort: { updatedAt: -1 }})
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

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '' ) {
      res.status(400).send({Status: false, Message: "Industry Type Id can not be empty" });
   } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   } else if (!ReceivingData.Customer_Id || ReceivingData.Customer_Id === ''  ) {
      res.status(400).send({Status: false, Message: "Customer Details can not be empty" });
   }else {
      CrmCustomersModel.CrmMachinesSchema
         .find({'Company_Id': ReceivingData.Company_Id, 'Customer': mongoose.Types.ObjectId(ReceivingData.Customer_Id), 'If_Deleted': false }, {}, {sort: { updatedAt: -1 }})
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

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '' ) {
      res.status(400).send({Status: false, Message: "Industry Type Id can not be empty" });
   } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   }else {
      CrmCustomersModel.CrmMachinesSchema
         .find({'Company_Id': ReceivingData.Company_Id, 'If_Deleted': false }, {MachineName: 1 }, {sort: { updatedAt: -1 }})
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

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '' ) {
      res.status(400).send({Status: false, Message: "Industry Type Id can not be empty" });
   } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   } else if (!ReceivingData.Customer_Id || ReceivingData.Customer_Id === ''  ) {
      res.status(400).send({Status: false, Message: "Customer Details can not be empty" });
   }else {
      CrmCustomersModel.CrmMachinesSchema
         .find({'Company_Id': ReceivingData.Company_Id, 'Customer': mongoose.Types.ObjectId(ReceivingData.Customer_Id), 'If_Deleted': false }, {MachineName: 1 }, {sort: { updatedAt: -1 }})
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

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '' ) {
      res.status(400).send({Status: false, Message: "Industry Type Id can not be empty" });
   } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
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





// -------------------------------------------------- Crm Tickets Create -----------------------------------------------
exports.CrmTicketId_Search = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '' ) {
      res.status(400).send({Status: false, Message: "Industry Type Id can not be empty" });
   } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   }else {
      CrmCustomersModel.CrmTicketsSchema
         .find({}, {NumberOfTicketId: 1}, {sort:{ NumberOfTicketId: -1 }, limit: 1 }).exec(function(err, result) {
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
            res.status(200).send({Status: true, TicketId: TicketId });
         }
      });
   }
};
exports.CrmTickets_Create = function(req, res) {

   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '' ) {
      res.status(400).send({Status: false, Message: "Company Details can not be empty" });
   } else if(!ReceivingData.User_Id || ReceivingData.User_Id === '' ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   } else if(!ReceivingData.TicketId || ReceivingData.TicketId === '' ) {
      res.status(400).send({Status: false, Message: "Ticket Id can not be empty" });
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
      const NumberOfTicketId = parseInt(ReceivingData.TicketId.slice(3));
      var Crm_Tickets = new CrmCustomersModel.CrmTicketsSchema({
         Machine: ReceivingData.Machine,
         Customer: ReceivingData.Customer,
         TicketType: ReceivingData.TicketType,
         TicketId: ReceivingData.TicketId,
         NumberOfTicketId: NumberOfTicketId,
         TicketOpenDate: ReceivingData.TicketOpenDate,
         TicketOpenTime: ReceivingData.TicketOpenTime,
         Issue: ReceivingData.Issue,
         CurrentStatus: ReceivingData.CurrentStatus || 'Waiting',
         Created_By : mongoose.Types.ObjectId(ReceivingData.User_Id),
         Company_Id : mongoose.Types.ObjectId(ReceivingData.Company_Id),
         Last_Modified_By : mongoose.Types.ObjectId(ReceivingData.User_Id),
         If_Deleted: false,
         Active_Status : ReceivingData.Active_Status || true,
      });
      Crm_Tickets.save(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Crm Tickets Creation Query Error', 'AdminManagement.controller.js', err);
            res.status(400).send({Status: false, Message: "Some error occurred while creating the Crm Tickets!."});
         } else {
            var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
               ReturnData = ReturnData.toString();
            res.status(200).send({Status: true, Message: 'New Machine Successfully Created' });
         }
      });
   }
};
exports.CrmTickets_List = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '' ) {
      res.status(400).send({Status: false, Message: "Company Details can not be empty" });
   } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   }else {
      CrmCustomersModel.CrmTicketsSchema
         .find({'Company_Id': ReceivingData.Company_Id, 'If_Deleted': false }, {}, {sort: { updatedAt: -1 }})
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

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '' ) {
      res.status(400).send({Status: false, Message: "Company Details can not be empty" });
   } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   } else if (!ReceivingData.Customer_Id || ReceivingData.Customer_Id === ''  ) {
      res.status(400).send({Status: false, Message: "Machine Details can not be empty" });
   }else {
      CrmCustomersModel.CrmTicketsSchema
         .find({'Company_Id': ReceivingData.Company_Id, Customer: ReceivingData.Customer_Id, 'If_Deleted': false }, {}, {sort: { updatedAt: -1 }})
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

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '' ) {
      res.status(400).send({Status: false, Message: "Company Details can not be empty" });
   } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   } else if (!ReceivingData.Machine_Id || ReceivingData.Machine_Id === ''  ) {
      res.status(400).send({Status: false, Message: "Machine Details can not be empty" });
   }else {
      CrmCustomersModel.CrmTicketsSchema
         .find({'Company_Id': ReceivingData.Company_Id, Machine: ReceivingData.Machine_Id, 'If_Deleted': false }, {}, {sort: { updatedAt: -1 }})
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

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '' ) {
      res.status(400).send({Status: false, Message: "Industry Type Id can not be empty" });
   } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
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



// -------------------------------------------------- Crm Ticket Activities Create -----------------------------------------------
exports.CrmTicketActivities_Create = function(req, res) {

   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '' ) {
      res.status(400).send({Status: false, Message: "Company Details can not be empty" });
   } else if(!ReceivingData.User_Id || ReceivingData.User_Id === '' ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   } else if(!ReceivingData.TicketId || ReceivingData.TicketId === '' ) {
      res.status(400).send({Status: false, Message: "Ticket Details can not be empty" });
   } else if(!ReceivingData.StartDate || ReceivingData.StartDate === '' ) {
      res.status(400).send({Status: false, Message: "Activity Start Date can not be empty" });
   } else if(!ReceivingData.StartTime || ReceivingData.StartTime === '' ) {
      res.status(400).send({Status: false, Message: "Activity Start Time can not be empty" });
   } else if(!ReceivingData.Status || ReceivingData.Status === '' ) {
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
         Description: ReceivingData.Description,
         Created_By : mongoose.Types.ObjectId(ReceivingData.User_Id),
         Company_Id : mongoose.Types.ObjectId(ReceivingData.Company_Id),
         Last_Modified_By : mongoose.Types.ObjectId(ReceivingData.User_Id),
         If_Deleted: false,
         Active_Status : ReceivingData.Active_Status || true,
      });
      Crm_TicketActivities.save(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Crm Ticket Activities Creation Query Error', 'AdminManagement.controller.js', err);
            res.status(400).send({Status: false, Message: "Some error occurred while creating the Crm Ticket Activities!."});
         } else {
            CrmCustomersModel.CrmTicketsSchema.update({ _id : mongoose.Types.ObjectId(ReceivingData.TicketId)  }, {$set: {CurrentStatus : result.Status } }).exec();
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

   if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '' ) {
      res.status(400).send({Status: false, Message: "Industry Type Id can not be empty" });
   } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
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