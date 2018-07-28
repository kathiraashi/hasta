var CryptoJS = require("crypto-js");
var AdminModel = require('./../../models/Admin/AdminManagement.model.js');
var ErrorManagement = require('./../../../handling/ErrorHandling.js');
var mongoose = require('mongoose');
var crypto = require("crypto");



// -------------------------------------------------- Company Register -----------------------------------------------
   exports.Company_Register = function(req, res) {
      var ReceivingData = req.body;
      if(!ReceivingData.Company_Name || ReceivingData.Company_Name === '' ) {
         res.status(400).send({Status: false, Message: "Name can not be empty" });
      } else if(!ReceivingData.Company_Email || ReceivingData.Company_Email === '' ) {
            res.status(400).send({Status: false, Message: "Email can not be empty" });
      } else {
         var CreateCompany_Management = new AdminModel.Company_Management({
            Company_Name : ReceivingData.Company_Name,
            Company_Address : ReceivingData.Company_Address || '-',
            Company_Phone : ReceivingData.Company_Phone || '-',
            Company_Email : ReceivingData.Company_Email,
            Company_Image : ReceivingData.Company_Image || {},
            Company_Fax : ReceivingData.Company_Fax || '',
            Company_Website : ReceivingData.Company_Website || '',
            Company_Type : ReceivingData.Company_Type || '',
            Company_Registry : ReceivingData.Company_Registry || '',
            Company_TypeOfBusiness : ReceivingData.Company_TypeOfBusiness || '',
            Renewal_Date : ReceivingData.Renewal_Date || '01-12-2018',
            Renewal_Status : ReceivingData.Renewal_Status || 0,
            Active_Status : ReceivingData.Active_Status || true,
         });
         CreateCompany_Management.save(function(err, result) {
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Company Creation Query Error', 'AdminManagement.controller.js', err);
               res.status(400).send({Status: false, Message: "Some error occurred while creating the Company!."});
            } else {
               res.status(200).send({Status: true, Response: result } );
            }
         });
   }
   };


// -------------------------------------------------- User Name Validate -----------------------------------------------
   exports.User_Name_Validate = function(req, res) {

      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

      if(!ReceivingData.User_Name || ReceivingData.User_Name === '' ) {
         res.status(400).send({Status: false, Message: "User Name can not be empty" });
      }else {
         AdminModel.User_Management.findOne({'User_Name': { $regex : new RegExp("^" + ReceivingData.User_Name + "$", "i") }, 'Active_Status': true }, {}, {}, function(err, result) { // User Name Find Query
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'User Name Find Query Error', 'AdminManagement.controller.js', err);
               res.status(417).send({status: false, Message: "Some error occurred while Find Users Name!."});
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


// -------------------------------------------------- User Validate ---------------------------------------------------
   exports.User_Login_Validate = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

      if(!ReceivingData.User_Name || ReceivingData.User_Name === '' ) {
         res.status(400).send({Status: false, Message: "User_Name can not be empty" });
      } else if (!ReceivingData.User_Password || ReceivingData.User_Password === ''  ) {
         res.status(400).send({Status: false, Message: "User Password can not be empty" });
      } else {
         AdminModel.User_Management.findOne({'User_Name': { $regex : new RegExp("^" + ReceivingData.User_Name + "$", "i") }, 'User_Password': ReceivingData.User_Password, 'Active_Status': true}, { User_Password: 0 }, {}, function(err, result) {
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'User Details Validate Query Error', 'RegisterAndLogin.controller.js', err);
               res.status(417).send({status: false, Error:err, Message: "Some error occurred while Validate The User Details!."});
            } else {
               if(result === null){
                  AdminModel.User_Management.findOne({'User_Name': ReceivingData.User_Name }, function(err_1, result_1) {
                     if(err_1) {
                        ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'User Name Validate Query Error', 'RegisterAndLogin.controller.js', err_1);
                        res.status(417).send({Status: false, Error:err_1, Message: "Some error occurred while Validate the User Name!"});           
                     } else {
                        if (result_1 === null) {
                           res.status(200).send({ Status: false, Message: "Invalid account details!" });
                        }else{
                           res.status(200).send({ Status: false, Message: "User Name and password do not match!" });
                        }
                     }
                  });
               }else{
                     AdminModel.User_Management.aggregate([
                        { $match : { _id : result._id } },
                        { $unwind: "$Permission_Groups" },
                        { $lookup: { from: 'GroupPermissions_OfModules', localField: 'Permission_Groups.PermissionsGroup_Id', foreignField: 'Group_Id', as: 'Module_Permissions' } },
                        { $unwind: "$Module_Permissions" },
                        { $match : { "Module_Permissions.Access_Permission" : true } },
                        { $lookup: { from: 'Project_Modules', localField: 'Module_Permissions.Module_Id', foreignField: '_id', as: 'Module_Permissions.AccessModules_Info' } },
                        { $unwind: "$Module_Permissions.AccessModules_Info" },
                        { $lookup: { from: 'GroupPermissions_OfSubModules', localField: 'Module_Permissions._id', foreignField: 'GroupPermission_OfModuleId', as: 'SubModule_Permissions' } },
                        { $unwind: "$SubModule_Permissions" },
                        { $match : { $or: [ 
                                             { "SubModule_Permissions.Create_Permission" : true },  
                                             { "SubModule_Permissions.Edit_Permission" : true }, 
                                             { "SubModule_Permissions.View_Permission" : true }, 
                                             { "SubModule_Permissions.Delete_Permission" : true } 
                                          ] 
                                 } 
                        },
                        { $lookup: { from: 'Project_SubModules', localField: 'SubModule_Permissions.SubModule_Id', foreignField: '_id', as: 'SubModule_Permissions.AccessSubModule_Info' } },
                        { $unwind: "$SubModule_Permissions.AccessSubModule_Info" },
                        { $group : {
                           _id:  {  _id: "$_id",
                                    User_Type: "$User_Type",
                                    User_Name: "$User_Name", 
                                    Name: "$Name",
                                    Phone: "$Phone",
                                    Email: "$Email",
                                    Reports_To: "$Reports_To",
                                    Company_Id :"$Company_Id",
                                 },
                           Permission_Groups: { $addToSet:  "$Permission_Groups" },
                           Module_Permissions: { $addToSet:  "$Module_Permissions" },
                           SubModule_Permissions: { $addToSet:  "$SubModule_Permissions" },
                        }},
                        { $project : {
                           _id: "$_id._id",
                           User_Type: "$_id.User_Type",
                           User_Name: "$_id.User_Name", 
                           Name: "$_id.Name",
                           Phone: "$_id.Phone",
                           Email: "$_id.Email",
                           Reports_To: "$_id.Reports_To",
                           Company_Id :"$_id.Company_Id",
                           Permission_GroupIds:{
                              $map: {
                                 input: "$Permission_Groups",
                                 as: "permission_Group",
                                 in: "$$permission_Group.PermissionsGroup_Id" 
                              }
                           },
                           Module_Permissions:{
                              $map: {
                                 input: "$Module_Permissions",
                                 as: "module_Permission",
                                 in:{ 
                                       Module_Id : "$$module_Permission.Module_Id",
                                       Module_Name : "$$module_Permission.AccessModules_Info.Module_Name",
                                       Module_Key : "$$module_Permission.AccessModules_Info.Module_Key",
                                       Access_Permission : "$$module_Permission.Access_Permission",
                                    } 
                              }
                           },
                           SubModule_Permissions:{
                              $map: {
                                 input: "$SubModule_Permissions",
                                 as: "subModule_Permission",
                                 in:{ 
                                       Module_Id: "$$subModule_Permission.Module_Id",
                                       SubModule_Id : "$$subModule_Permission.SubModule_Id",
                                       SubModule_Name : "$$subModule_Permission.AccessSubModule_Info.SubModule_Name",
                                       SubModule_Key : "$$subModule_Permission.AccessSubModule_Info.SubModule_Key",
                                       Create_Permission : "$$subModule_Permission.Create_Permission",
                                       Edit_Permission : "$$subModule_Permission.Edit_Permission",
                                       View_Permission : "$$subModule_Permission.View_Permission",
                                       Delete_Permission : "$$subModule_Permission.Delete_Permission",
                                    } 
                              }
                           }
                        }}
                     ]).exec(function (err_2, result_2) {
                        if(err_2) {
                           ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'User Validate Aggregate Query Error', 'RegisterAndLogin.controller.js', err_2);
                           res.status(417).send({Status: false, Message: "Some error occurred while Validate Aggregate the User Details!"});           
                        } else {
                           FinalResult = JSON.parse(JSON.stringify(result_2[0]));
                           FinalResult.Module_Permissions = Array.from(new Set(FinalResult.Module_Permissions.map(JSON.stringify))).map(JSON.parse);
                           FinalResult.SubModule_Permissions = Array.from(new Set(FinalResult.SubModule_Permissions.map(JSON.stringify))).map(JSON.parse);
                           FinalResult.SubModule_Permissions = FinalResult.SubModule_Permissions.reduce( (acc, obj) => {
                              let existObj = acc.find(({SubModule_Id}) =>  SubModule_Id == obj.SubModule_Id);
                              if(existObj){
                                 existObj.Create_Permission = existObj.Create_Permission || obj.Create_Permission;
                                 existObj.Edit_Permission = existObj.Edit_Permission || obj.Edit_Permission;
                                 existObj.View_Permission = existObj.View_Permission || obj.View_Permission;
                                 existObj.Delete_Permission = existObj.Delete_Permission || obj.Delete_Permission;
                                 return acc;
                              } else {
                                 acc.push(obj);
                                 return acc;
                              }
                           }, []);
                           
                           const Key = crypto.randomBytes(16).toString("hex");
                           var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(FinalResult), Key);
                              ReturnData = ReturnData.toString();
                              const NewReturnData = (ReturnData + Key).concat('==');
                              AdminModel.User_Management.update(
                                 { _id : FinalResult._id },
                                 { $set: { LoginToken : Key, LoginTime: new Date().toString(), LastActiveTime: new Date() }}
                              ).exec((err_3, result_3) => {
                                 if(err_3) {
                                    ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'User Validate Update Query Error', 'RegisterAndLogin.controller.js', err_3);
                                    res.status(417).send({Status: false, Message: "Some error occurred while Validate Update the User Details!"});           
                                 } else {
                                    res.status(200).send({ Status: true,  Response: NewReturnData });
                                 }
                              });
                        }
                  });
               } 
            }
         });
      }
   };


// -------------------------------------------------- User Create -----------------------------------------------
   exports.User_Create = function(req, res) {

      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

      if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '' ) {
         res.status(400).send({Status: false, Message: "Company Details can not be empty" });
      } else if(!ReceivingData.User_Id || ReceivingData.User_Id === '' ) {
         res.status(400).send({Status: false, Message: "User Details can not be empty" });
      } else if(!ReceivingData.Name || ReceivingData.Name === '' ) {
         res.status(400).send({Status: false, Message: "Name can not be empty" });
      } else if(!ReceivingData.User_Name || ReceivingData.User_Name === '' ) {
         res.status(400).send({Status: false, Message: "User Name can not be empty" });
      } else if(!ReceivingData.User_Password || ReceivingData.User_Password === '' ) {
            res.status(400).send({Status: false, Message: "User Password can not be empty" });
      } else if(!ReceivingData.User_Type || typeof ReceivingData.User_Type !== 'object' || ReceivingData.User_Type._id === '' ) {
         res.status(400).send({Status: false, Message: "User Type can not be empty or not valid" });
      } else if(!ReceivingData.AccessPermissions_Groups || typeof ReceivingData.AccessPermissions_Groups !== 'object' || ReceivingData.AccessPermissions_Groups.length <= 0 ) {
         res.status(400).send({Status: false, Message: "User Access Permissions can not be empty or not valid" });
      } else {

         var Reports_To = null;
         if (ReceivingData.Reports_To && typeof ReceivingData.Reports_To === 'object' && ReceivingData.User_Type.Reports_To !== '' ) {
            Reports_To = mongoose.Types.ObjectId(ReceivingData.Reports_To._id);
         }
         ReceivingData.AccessPermissions_Groups = ReceivingData.AccessPermissions_Groups.map(Obj => {
            Obj.PermissionsGroup_Id = mongoose.Types.ObjectId(Obj._id);
            Obj.PermissionsGroup_Name = Obj.Group_Name;
            delete Obj._id;
            delete Obj.Group_Name;
            return Obj;
         });
         
         var CreateUser_Management = new AdminModel.User_Management({
            User_Name : ReceivingData.User_Name,
            User_Password : ReceivingData.User_Password || '',
            Name : ReceivingData.Name,
            If_Admin: false,
            Phone : ReceivingData.Phone || '',
            Email : ReceivingData.Email,
            "User_Type.UserType_Id": mongoose.Types.ObjectId(ReceivingData.User_Type._id),
            "User_Type.User_Type": ReceivingData.User_Type.User_Type,
            Reports_To: Reports_To,
            Permission_Groups: ReceivingData.AccessPermissions_Groups,
            Created_By : mongoose.Types.ObjectId(ReceivingData.User_Id),
            Company_Id : mongoose.Types.ObjectId(ReceivingData.Company_Id),
            Last_ModifiedBy : mongoose.Types.ObjectId(ReceivingData.User_Id),
            Active_Status : ReceivingData.Active_Status || true,
         });
         
         CreateUser_Management.save(function(err, result) {
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'User Creation Query Error', 'AdminManagement.controller.js', err);
               res.status(400).send({Status: false, Message: "Some error occurred while creating the User!."});
            } else {
               var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
                  ReturnData = ReturnData.toString();
                  res.status(200).send({Status: true, Response: ReturnData });
            }
         });
   }
   };


// -------------------------------------------------- Users List -----------------------------------------------
   exports.Users_List = function(req, res) {

      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

      if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '' ) {
         res.status(400).send({Status: false, Message: "Company Details can not be empty" });
      }else {
         AdminModel.User_Management.find({'Company_Id': ReceivingData.Company_Id, 'Active_Status': true }, {}, {sort: { updatedAt: -1 }}, function(err, result) { // Users Find Query
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'User List Find Query Error', 'AdminManagement.controller.js', err);
               res.status(417).send({status: false, Message: "Some error occurred while Find Users List!."});
            } else {
               var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
                  ReturnData = ReturnData.toString();
               res.status(200).send({Status: true, Response: ReturnData });
            }
         });
      }
   };


// -------------------------------------------------- User Type Based Simple Users List -----------------------------------------------
   exports.UserTypeBased_SimpleUsersList = function(req, res) {

      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

      if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '' ) {
         res.status(400).send({Status: false, Message: "Company Details can not be empty" });
      }else {
         AdminModel.User_Management.find({'Active_Status': true }, { Name: 1 }, {sort: { updatedAt: -1 }}, function(err, result) {
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'User List Find Query Error', 'AdminManagement.controller.js', err);
               res.status(417).send({status: false, Message: "Some error occurred while Find Users List!."});
            } else {
               var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
                  ReturnData = ReturnData.toString();
               res.status(200).send({Status: true, Response: ReturnData });
            }
         });
      }
   };


// -------------------------------------------------- User Types Create  -----------------------------------------------
   exports.Create_UserTypes = function(req, res) {
      var ReceivingData = req.body;

      if(!ReceivingData.User_Type || ReceivingData.User_Type === '' ) {
         res.status(400).send({Status: false, Message: "User Type can not be empty" });
      } else {
         var CreateUser_Types = new AdminModel.User_Types({
            User_Type : ReceivingData.User_Type,
            Active_Status : ReceivingData.Active_Status || true,
         });
         CreateUser_Types.save(function(err, result) {
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'User Type Creation Query Error', 'AdminManagement.controller.js', err);
               res.status(400).send({Status: false, Message: "Some error occurred while creating the User Type!."});
            } else {
               res.status(200).send({Status: true, Response: result } );
            }
         });
      }
   };


// -------------------------------------------------- User Types List -----------------------------------------------
   exports.UserTypes_List = function(req, res) {

      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

      if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '' ) {
         res.status(400).send({Status: false, Message: "Company Details can not be empty" });
      }else if(!ReceivingData.User_Id || ReceivingData.User_Id === ''){
         res.status(400).send({Status: false, Message: "User Details can not be empty" });
      }else {
         AdminModel.User_Types.find({'Active_Status': true }, {User_Type: 1}, {}, function(err, result) {
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'User Types List Find Query Error', 'AdminManagement.controller.js', err);
               res.status(417).send({status: false, Message: "Some error occurred while Find User Types List!."});
            } else {
               var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
                  ReturnData = ReturnData.toString();
               res.status(200).send({Status: true, Response: ReturnData });
            }
         });
      }
   };


// -------------------------------------------------- Project Module Create -----------------------------------------------
   exports.Create_Project_Modules = function(req, res) {
      var ReceivingData = req.body;

      if(!ReceivingData.Module_Name || ReceivingData.Module_Name === '' ) {
         res.status(400).send({Status: false, Message: "Module Name can not be empty" });
      }else if(!ReceivingData.Module_Key || ReceivingData.Module_Key === '' ) {
         res.status(400).send({Status: false, Message: "Module Key can not be empty" });
      } else {
         var CreateProject_Module = new AdminModel.Project_Modules({
            Module_Name : ReceivingData.Module_Name,
            Module_Key : ReceivingData.Module_Key,
            Active_Status : ReceivingData.Active_Status || true,
         });
         CreateProject_Module.save(function(err, result) {
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Project Module Creation Query Error', 'AdminManagement.controller.js', err);
               res.status(400).send({Status: false, Message: "Some error occurred while creating the Project Module!."});
            } else {
               res.status(200).send({Status: true, Response: result } );
            }
         });
   }
   };


// -------------------------------------------------- Project Sub Module Create -----------------------------------------------
   exports.Create_Project_SubModules = function(req, res) {
      var ReceivingData = req.body;

      if(!ReceivingData.SubModule_Name || ReceivingData.SubModule_Name === '' ) {
         res.status(400).send({Status: false, Message: " Sub Module Name can not be empty" });
      } else if(!ReceivingData.Module_Id || ReceivingData.Module_Id === '' ) {
         res.status(400).send({Status: false, Message: "Module Details can not be empty" });
      } else if(!ReceivingData.SubModule_Key || ReceivingData.SubModule_Key === '' ) {
         res.status(400).send({Status: false, Message: "Sub Module Key can not be empty" });
      } else {
         var CreateProject_SubModule = new AdminModel.Project_SubModules({
            SubModule_Name : ReceivingData.SubModule_Name,
            SubModule_Key : ReceivingData.SubModule_Key,
            Module_Id : ReceivingData.Module_Id,
            Active_Status : ReceivingData.Active_Status || true
         });
         CreateProject_SubModule.save(function(err, result) {
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Project Sub Module Creation Query Error', 'AdminManagement.controller.js', err);
               res.status(400).send({Status: false, Message: "Some error occurred while creating the Project Sub Module!."});
            } else {
               res.status(200).send({Status: true, Response: result } );
            }
         });
   }
   };


// -------------------------------------------------- Modules And Sub Modules List -----------------------------------------------
   exports.ModulesAndSubModules_List = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

      if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '' ) {
         res.status(400).send({Status: false, Message: " Company Details can not be empty!" });
      } else if(!ReceivingData.User_Id || ReceivingData.User_Id === '' ) {
         res.status(400).send({Status: false, Message: "User Details can not be empty!" });
      } else {
         AdminModel.Project_Modules.aggregate([
            { $lookup: { from: 'Project_SubModules', localField: '_id', foreignField: 'Module_Id', as: 'Sub_Modules' }},
            { $match : { Active_Status : true } },
            { $project:
               {  Module_Name: 1,
                  Module_Key: 1,
                  Active_Status: 1,
                  Sub_Modules:{ 
                     $filter:{ input: "$Sub_Modules", as: "subModule", cond: { $eq: [ "$$subModule.Active_Status", true ] } } 
                  }
               }
            },
            { $project:
               {
                  "Sub_Modules.Module_Id": 0,
                  "Sub_Modules.createdAt": 0,
                  "Sub_Modules.updatedAt": 0,
                  "Sub_Modules.__v": 0
               }
            }
         ]).exec(function(err, result) {
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'User List Find Query Error', 'AdminManagement.controller.js', err);
               res.status(417).send({status: false, Message: "Some error occurred while Find the Modules List!."});
            } else {
               var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
                  ReturnData = ReturnData.toString();
               res.status(200).send({Status: true, Response: ReturnData });
            }
         });
      }
   };


// -------------------------------------------------- Create Permissions Group -----------------------------------------------
   exports.Create_Permissions_Group = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
   
   
      if(!ReceivingData.Group_Name || ReceivingData.Group_Name === '' ) {
         res.status(400).send({Status: false, Message: "Group Name can not be empty!" });
      } else if(!ReceivingData.Group_Module || typeof ReceivingData.Group_Module !== 'object' || ReceivingData.Group_Module._id === '' ) {
         res.status(400).send({Status: false, Message: "Group Module Details can not be empty!" });
      } else if(!ReceivingData.Group_UserType || typeof ReceivingData.Group_UserType !== 'object' || ReceivingData.Group_UserType._id === '' ) {
         res.status(400).send({Status: false, Message: "Group User Type can not be empty!" });
      } else if(!ReceivingData.Created_By || ReceivingData.Created_By === '' ) {
         res.status(400).send({Status: false, Message: "Creating User Details can not be empty!" });
      } else if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '' ) {
         res.status(400).send({Status: false, Message: "Company Details can not be empty!" });
      } else if(!ReceivingData.Module_Access || ReceivingData.Module_Access === '' ) {
         res.status(400).send({Status: false, Message: "Module Access Details can not be empty!" });
      } else if(!ReceivingData.SubModule_Permissions || ReceivingData.SubModule_Permissions === '' ) {
         res.status(400).send({Status: false, Message: "Sub Module Permissions Details can not be empty!" });
      } else {
      
         ReceivingData.Group_Module = JSON.parse(JSON.stringify(ReceivingData.Group_Module));
         ReceivingData.Group_UserType = JSON.parse(JSON.stringify(ReceivingData.Group_UserType));

         var CreatePermissions_Group = new AdminModel.Permissions_Group({
            Group_Name : ReceivingData.Group_Name,
            "Group_Module.Module_Id" : mongoose.Types.ObjectId(ReceivingData.Group_Module._id),
            "Group_Module.Module_Name" : ReceivingData.Group_Module.Module_Name,
            "Group_Module.Module_Key" : ReceivingData.Group_Module.Module_Key,
            "Group_UserType.UserType_Id" : ReceivingData.Group_UserType._id,
            "Group_UserType.User_Type" : ReceivingData.Group_UserType.User_Type,
            Group_Description : ReceivingData.Group_Description,
            Created_By : mongoose.Types.ObjectId(ReceivingData.Created_By),
            Company_Id : mongoose.Types.ObjectId(ReceivingData.Company_Id),
            Last_ModifiedBy : mongoose.Types.ObjectId(ReceivingData.Created_By),
            Active_Status : ReceivingData.Active_Status || true
         });
         CreatePermissions_Group.save(function(err, result) {
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Permissions Group Creation Query Error', 'AdminManagement.controller.js', err);
               res.status(400).send({Status: false, Message: "Some error occurred while creating the Permissions Group!."});
            } else {
               var Module_Access = JSON.parse(ReceivingData.Module_Access);
               result = JSON.parse(JSON.stringify(result));
               Module_Access = Module_Access.map( _Object => {
                  const NewObject = {};
                     NewObject.Group_Id = mongoose.Types.ObjectId(result._id);
                     NewObject.Module_Id = mongoose.Types.ObjectId(_Object.Module_Id);
                     NewObject.Access_Permission = _Object.Access_Permission;
                     NewObject.Company_Id = mongoose.Types.ObjectId(result.Company_Id);
                     NewObject.Active_Status = result.Active_Status;
                  return NewObject;
               });
               AdminModel.GroupPermissions_OfModules.collection.insert(Module_Access, function(err_1, result_1){
                  if(err_1) {
                     ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Permissions of Modules Creation Query Error', 'AdminManagement.controller.js', err_1);
                     res.status(400).send({Status: false, Message: "Some error occurred while creating the Permissions of Modules!."});
                  } else {
                     var SubModule_Permissions = JSON.parse(ReceivingData.SubModule_Permissions);
                     var Arr_InsertModules = JSON.parse(JSON.stringify(result_1.ops));
                     
                     SubModule_Permissions = SubModule_Permissions.map( _Object => {
                        const NewObject = {};
                        const _index = Arr_InsertModules.findIndex(x => x.Module_Id === _Object.Module_Id);
                           NewObject.Group_Id = mongoose.Types.ObjectId(result._id);
                           NewObject.Module_Id = mongoose.Types.ObjectId(_Object.Module_Id);
                           NewObject.GroupPermission_OfModuleId = mongoose.Types.ObjectId(Arr_InsertModules[_index]._id);
                           NewObject.SubModule_Id = mongoose.Types.ObjectId(_Object.SubModule_Id);
                           NewObject.Create_Permission = _Object.Create_Permission;
                           NewObject.Edit_Permission = _Object.Edit_Permission;
                           NewObject.View_Permission =_Object.View_Permission;
                           NewObject.Delete_Permission = _Object.Delete_Permission;
                           NewObject.Company_Id = mongoose.Types.ObjectId(result.Company_Id);
                           NewObject.Active_Status = result.Active_Status;
                        return NewObject;
                     });
                     AdminModel.GroupPermissions_OfSubModules.collection.insert(SubModule_Permissions, function(err_2, result_2){
                        if(err_2) {
                           ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Permissions of Sub Module Creation Query Error', 'AdminManagement.controller.js', err_2);
                           res.status(400).send({Status: false, Message: "Some error occurred while creating the Permissions of Sub Module!."});
                        } else {
                           res.status(200).send({Status: true, Message: 'Success' } );
                        }
                     });
                  }
               });
            }
         });
   }
   };


// -------------------------------------------------- User Permissions Group List -----------------------------------------------
   exports.PermissionsGroup_SimpleList = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

      if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '' ) {
         res.status(400).send({Status: false, Message: " Company Details can not be empty!" });
      } else if(!ReceivingData.User_Id || ReceivingData.User_Id === '' ) {
         res.status(400).send({Status: false, Message: "User Details can not be empty!" });
      } else {
         AdminModel.Permissions_Group.find({'Company_Id': ReceivingData.Company_Id, 'Active_Status': true }, {__v:0, Active_Status:0}, {sort: { updatedAt: -1 }}, function(err, result) { // Groups List Find Query
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Permissions Group List Find Query Error', 'AdminManagement.controller.js', err);
               res.status(417).send({status: false, Message: "Some error occurred while Find Permissions Group List!."});
            } else {
               var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
                  ReturnData = ReturnData.toString();
               res.status(200).send({Status: true, Response: ReturnData });
            }
         });
      }
   };


// -------------------------------------------------- UserTypeBased Permissions Group Simple List -----------------------------------------------
   exports.UserTypeBased_PermissionsGroup_SimpleList = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

      if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '' ) {
         res.status(400).send({Status: false, Message: " Company Details can not be empty!" });
      } else if(!ReceivingData.User_Id || ReceivingData.User_Id === '' ) {
         res.status(400).send({Status: false, Message: "User Details can not be empty!" });
      } else {
         AdminModel.Permissions_Group.find({'Active_Status': true }, {Group_Name: 1}, {}, function(err, result) { // Groups List Find Query
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Permissions Group List Find Query Error', 'AdminManagement.controller.js', err);
               res.status(417).send({status: false, Message: "Some error occurred while Find Permissions Group List!."});
            } else {
               var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
                  ReturnData = ReturnData.toString();
               res.status(200).send({Status: true, Response: ReturnData });
            }
         });
      }
   };


// -------------------------------------------------- Modules And Sub Modules List -----------------------------------------------
   exports.GroupPermission_ModulesAndSubModules_List = function(req, res) {

      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

      if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '' ) {
         res.status(400).send({Status: false, Message: " Company Details can not be empty!" });
      } else if(!ReceivingData.User_Id || ReceivingData.User_Id === '' ) {
         res.status(400).send({Status: false, Message: "User Details can not be empty!" });
      } else if(!ReceivingData.Group_Id || ReceivingData.Group_Id === '' ) {
         res.status(400).send({Status: false, Message: "Group Details can not be empty!" });
      } else {
         AdminModel.GroupPermissions_OfModules.aggregate([ 
            { $match : { Active_Status : true, Group_Id: mongoose.Types.ObjectId(ReceivingData.Group_Id)} },
            { $lookup: { localField: "Module_Id", from: "Project_Modules", foreignField: "_id", as: "ModuleInfo" } },
            { $lookup: { localField: "_id", from: "GroupPermissions_OfSubModules", foreignField: "GroupPermission_OfModuleId", as: "SubModules" } },
            { $unwind: "$SubModules" },
            { $lookup: { localField: "SubModules.SubModule_Id", from: "Project_SubModules", foreignField: "_id", as: "SubModules.SubModule_Info" } },
            { $unwind: "$SubModules.SubModule_Info" },
            { $unwind: "$ModuleInfo" },
            { $unwind: "$SubModules" },
            { $group : {
               _id:  {  _id: "$_id",
                        Module_Id: "$Module_Id",
                        Module_Name: "$ModuleInfo.Module_Name",
                        Module_Key: "$ModuleInfo.Module_Key", 
                        Module_AccessPermission: "$Access_Permission",
                        Group_Id: "$Group_Id",
                        Company_Id: "$Company_Id",
                     },
               Sub_Modules: { $addToSet:  "$SubModules" },
            }},
            { $project: {
               _id: "$_id._id",
               Module_Id : "$_id.Module_Id",
               Module_Name : "$_id.Module_Name",
               Module_Key : "$_id.Module_Key",
               Access_Permission : "$_id.Module_AccessPermission",
               Group_Id : "$_id.Group_Id",
               Company_Id : "$_id.Company_Id",
               Sub_Modules: { 
                  $map:{ 
                     input: {
                        $filter:{ 
                                 input: "$Sub_Modules", 
                                 as: "subModule", 
                                 cond: { $and:  [  { $eq: [ "$$subModule.Active_Status", true ] },
                                                   { $eq: [ "$$subModule.SubModule_Info.Active_Status", true ] } ]  
                                       } 
                              } 
                     }, 
                     as: "subModule", 
                     in:{
                           _id: "$$subModule._id",
                           SubModule_Id: "$$subModule.SubModule_Id",
                           SubModule_Name: "$$subModule.SubModule_Info.SubModule_Name",
                           SubModule_Key: "$$subModule.SubModule_Info.SubModule_Key",
                           Create_Permission: "$$subModule.Create_Permission",
                           Edit_Permission: "$$subModule.Edit_Permission",
                           View_Permission: "$$subModule.View_Permission",
                           Delete_Permission: "$$subModule.Delete_Permission",
                        } 
                  } 
               }
            }},
         ]).exec(function(err, result) {
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'User List Find Query Error', 'AdminManagement.controller.js', err);
               res.status(417).send({status: false, Message: "Some error occurred while Find the Modules List!."});
            } else {
               var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
                  ReturnData = ReturnData.toString();
               res.status(200).send({Status: true, Response: ReturnData });
            }
         });
      }
   };




// -------------------------------------------------- Countries List----------------------------------------------------------
   exports.Country_List = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

      if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '' ) {
         res.status(400).send({Status: false, Message: " Company Details can not be empty!" });
      } else if(!ReceivingData.User_Id || ReceivingData.User_Id === '' ) {
         res.status(400).send({Status: false, Message: "User Details can not be empty!" });
      } else {
         AdminModel.Global_Country.find({}, {Country_Name: 1}, {}, function(err, result) {
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Countries Find Query Error', 'AdminManagement.controller.js', err);
               res.status(417).send({status: false, Message: "Some error occurred while Find the Countries List!."});
            } else {
               var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
                  ReturnData = ReturnData.toString();
               res.status(200).send({Status: true, Response: ReturnData });
            }
         });
      }
   };
  
// -------------------------------------------------- States List ----------------------------------------------------------
   exports.State_List = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

      if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '' ) {
         res.status(400).send({Status: false, Message: " Company Details can not be empty!" });
      } else if(!ReceivingData.User_Id || ReceivingData.User_Id === '' ) {
         res.status(400).send({Status: false, Message: "User Details can not be empty!" });
      }else if(!ReceivingData.Country_Id || ReceivingData.Country_Id === '') {
         res.status(200).send({Status:"True", Output:"False", Message: "Country Id can not be empty" });
      }else{
         AdminModel.Global_State.find({ Country_DatabaseId: ReceivingData.Country_Id }, { State_Name: 1}, {}, function(err, result) {
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'States List Find Query Error', 'AdminManagement.controller.js', err);
               res.status(417).send({status: false, Message: "Some error occurred while Find the States List!."});
            } else {
               var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
                  ReturnData = ReturnData.toString();
               res.status(200).send({Status: true, Response: ReturnData });
            }
         });
      }
   };
  
// -------------------------------------------------- Cities List ----------------------------------------------------------
   exports.City_List = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

      if(!ReceivingData.Company_Id || ReceivingData.Company_Id === '' ) {
         res.status(400).send({Status: false, Message: " Company Details can not be empty!" });
      } else if(!ReceivingData.User_Id || ReceivingData.User_Id === '' ) {
         res.status(400).send({Status: false, Message: "User Details can not be empty!" });
      }else if(!ReceivingData.State_Id || ReceivingData.State_Id === '') {
               res.status(200).send({Status:"True", Output:"False", Message: "State Id can not be empty" });
         }else{
            AdminModel.Global_City.find({ State_DatabaseId: ReceivingData.State_Id }, { City_Name: 1}, {}, function(err, result) {
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Cities List Find Query Error', 'AdminManagement.controller.js', err);
                  res.status(417).send({status: false, Message: "Some error occurred while Find the Cities List!."});
               } else {
                  var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
                     ReturnData = ReturnData.toString();
                  res.status(200).send({Status: true, Response: ReturnData });
               }
            });
         }
   };