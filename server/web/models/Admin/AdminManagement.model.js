var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CompanyManagementSchema = mongoose.Schema({
   Company_Name: { type : String , required : true },
   Company_Address: { type : String, required : true },
   Company_Phone : { type : String , required : true },
   Company_Email: { type : String , required : true },
   Company_Prefix: { type : String, unique: true, required : true },
   Company_Image: { type : Object },
   Company_Fax: { type : String },
   Company_Website: { type : String },
   Company_Type: { type : String },
   Company_Registry: { type : String },
   Company_TypeOfBusiness: { type : String },
   Renewal_Date: { type : String, required : true },
   Renewal_Status: { type : Number, required : true }, // 0-already renewal, 1-renewal soon, 2-renewal warning, 3-not renewable
   Active_Status: { type : Boolean, required : true },
   Last_ModifiedBy: { type: Schema.Types.ObjectId, ref: 'User_Management' }
   },
   { timestamps: true }
);


var UserManagementSchema = mongoose.Schema({
   User_Name: { type : String , unique: true, required : true },
   User_Password: { type : String, required : true,  },
   Name: { type : String , required : true },
   Phone : { type : String},
   Email: { type : String , required : true },
   If_Admin: { type : Boolean, required : true },
   User_Type: {
      UserType_Id:  { type: Schema.Types.ObjectId, ref: 'User_Types' },
      User_Type: { type : String , required : true } 
   },
   Reports_To: { type: Schema.Types.ObjectId, ref: 'User_Management' },
   Permission_Groups: [{
         PermissionsGroup_Id: { type: Schema.Types.ObjectId, ref: 'Permissions_Group' },
         PermissionsGroup_Name: { type : String , required : true }
      }],
   Created_By: { type: Schema.Types.ObjectId, ref: 'User_Management' },
   Company_Id: { type: Schema.Types.ObjectId, ref: 'Company_Management' },
   Last_ModifiedBy: { type: Schema.Types.ObjectId, ref: 'User_Management' },
   Active_Status: { type : Boolean, required : true },
   LoginToken: { type : String },
   LoginTime: { type : Date },
   LastActiveTime: { type : Date },
   LogOutTime: { type : Date },
   },
   { timestamps: true }
);


var UserActivityManagementSchema = mongoose.Schema({
   Activity_Type: { type : String , required : true }, // "Create", "Update", "Delete"
   Module_Name: { type : String, required : true }, // "CRM", "Leads", "HRMS", "Purchase", "HR", "Inventory", "Accounts", "Settings"
   SubModule_Name : { type : String }, // Ex- Module > Settings Sub Module > CRM Settings
   Activity_Name: { type : String , required : true }, // Ex- New Industry Type Created
   Activity_Description: { type : String },
   User_Id: { type: Schema.Types.ObjectId, ref: 'User_Management' },
   Company_Id: { type: Schema.Types.ObjectId, ref: 'Company_Management' },
   Active_Status: { type : Boolean, required : true },
   },
   { timestamps: true }
);


var UserLoginSchema = mongoose.Schema({
   Request_Ip: { type : String , required : true },
   Request_Origin: { type : String , required : true},
   Request_From: { type : String , required : true},
   Request_DeviceInfo: { type : Object , required : true },
   If_Logged_Out: { type : Boolean},
   User_Id: { type: Schema.Types.ObjectId, ref: 'User_Management' },
   Company_Id: { type: Schema.Types.ObjectId, ref: 'Company_Management' },
   Active_Status: { type : Boolean, required : true },
   },
   { timestamps: true }
);

var UserTypesSchema = mongoose.Schema({
   User_Type: { type : String , required : true },
   Active_Status: { type : Boolean, required : true },
   },
   { timestamps: true }
);


var ProjectModulesSchema = mongoose.Schema({
   Module_Name: { type : String , required : true },
   Module_Key: {type : String, required : true},
   Active_Status: { type : Boolean, required : true },
   },
   { timestamps: true }
);


var ProjectSubModulesSchema = mongoose.Schema({
   SubModule_Name: { type : String , required : true },
   SubModule_Key: {type : String, required : true },
   Module_Id: { type: Schema.Types.ObjectId, ref: 'Project_Modules' },
   Active_Status: { type : Boolean, required : true },
   },
   { timestamps: true }
);


var PermissionsGroupSchema = mongoose.Schema({
   Group_Name:  { type : String , required : true },
   Group_Module:  { 
      Module_Id: { type: Schema.Types.ObjectId, ref: 'Project_Modules' },
      Module_Name: { type : String , required : true },
      Module_Key: { type : String , required : true }
   },
   Group_UserType:  { 
      UserType_Id:  { type: Schema.Types.ObjectId, ref: 'User_Types' },
      User_Type: { type : String , required : true }
   },
   Group_Description:  { type : String},
   Created_By: { type: Schema.Types.ObjectId, ref: 'User_Management' },
   Company_Id: { type: Schema.Types.ObjectId, ref: 'Company_Management' },
   Last_ModifiedBy: { type: Schema.Types.ObjectId, ref: 'User_Management' },
   Active_Status: { type : Boolean, required : true },
   },
   { timestamps: true }
);


var GroupPermissionsOfModulesSchema = mongoose.Schema({
   Group_Id: { type: Schema.Types.ObjectId, ref: 'Permissions_Group' },
   Module_Id : { type: Schema.Types.ObjectId, ref: 'Project_Modules' }, 
   Access_Permission : { type : Boolean , required : true },
   Company_Id: { type: Schema.Types.ObjectId, ref: 'Company_Management' },
   Active_Status: { type : Boolean, required : true },
   },
   { timestamps: true }
);


var GroupPermissionsOfSubModulesSchema = mongoose.Schema({
   Group_Id: { type: Schema.Types.ObjectId, ref: 'Permissions_Group' },
   Module_Id : { type: Schema.Types.ObjectId, ref: 'Project_Modules' } ,
   GroupPermission_OfModuleId : { type: Schema.Types.ObjectId, ref: 'GroupPermissions_OfModules' } ,
   SubModule_Id : { type: Schema.Types.ObjectId, ref: 'Project_SubModules' } , 
   Create_Permission : { type : Boolean , required : true },
   Edit_Permission : { type : Boolean , required : true },
   View_Permission : { type : Boolean , required : true },
   Delete_Permission : { type : Boolean , required : true },
   Company_Id: { type: Schema.Types.ObjectId, ref: 'Company_Management' },
   Active_Status: { type : Boolean, required : true },
   },
   { timestamps: true }
);



var CountrySchema = mongoose.Schema({
   Continent_GeoNameId: { type : Number },
   Country_GeoNameId: { type : Number },
   Country_Code: { type : String },
   Country_Name: { type : String },
   Country_Lat: { type : String },
   Country_Lng: { type : String },
});

var StateSchema = mongoose.Schema({
   State_GeoNameId: { type : Number },
   State_Name: { type : String },
   State_Lat: { type : String },
   State_Lng: { type : String },
   Country_GeoNameId: { type : Number },
   Country_DatabaseId: { type: Schema.Types.ObjectId, ref: 'Global_Country' },
});

var CitySchema = mongoose.Schema({
   City_GeoNameId: { type : Number },
   City_Name: { type : String },
   City_Lat: { type : String },
   City_Lng: { type : String },
   Country_GeoNameId: { type : Number },
   State_GeoNameId: { type : Number },
   Country_DatabaseId: [{ type: Schema.Types.ObjectId, ref: 'Global_Country' }],
   State_DatabaseId: [{ type: Schema.Types.ObjectId, ref: 'Global_State' }],
});



var VarCompany_Management = mongoose.model('Company_Management', CompanyManagementSchema, 'Company_Management');
var VarUser_Management = mongoose.model('User_Management', UserManagementSchema, 'User_Management');
var VarUserActivity_Management = mongoose.model('UserActivity_Management', UserActivityManagementSchema, 'UserActivity_Management');
var VarUserLogin_Management = mongoose.model('UserLogin_Management', UserLoginSchema, 'UserLogin_Management');

var VarUser_Types = mongoose.model('User_Types', UserTypesSchema, 'User_Types');
var VarProject_Modules = mongoose.model('Project_Modules', ProjectModulesSchema, 'Project_Modules');
var VarProject_SubModules = mongoose.model('Project_SubModules', ProjectSubModulesSchema, 'Project_SubModules');
var VarPermissions_Group = mongoose.model('Permissions_Group', PermissionsGroupSchema, 'Permissions_Group');
var VarGroupPermissions_OfModules = mongoose.model('GroupPermissions_OfModules', GroupPermissionsOfModulesSchema, 'GroupPermissions_OfModules');
var VarGroupPermissions_OfSubModules = mongoose.model('GroupPermissions_OfSubModules', GroupPermissionsOfSubModulesSchema, 'GroupPermissions_OfSubModules');


var VarGlobal_Country = mongoose.model('Global_Country', CountrySchema, 'Global_Country');
var VarGlobal_State = mongoose.model('Global_State', StateSchema, 'Global_State');
var VarGlobal_City = mongoose.model('Global_City', CitySchema, 'Global_City');

module.exports = {
   Company_Management : VarCompany_Management,
   User_Management : VarUser_Management,
   UserActivity_Management : VarUserActivity_Management,
   UserLogin_Management : VarUserLogin_Management,

   User_Types : VarUser_Types,
   Project_Modules : VarProject_Modules,
   Project_SubModules : VarProject_SubModules,
   Permissions_Group : VarPermissions_Group,
   GroupPermissions_OfModules : VarGroupPermissions_OfModules,
   GroupPermissions_OfSubModules : VarGroupPermissions_OfSubModules,

   Global_Country : VarGlobal_Country,
   Global_State : VarGlobal_State,
   Global_City : VarGlobal_City,
   
};