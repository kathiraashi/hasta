module.exports = function(app){

   var Controller = require('../../controller/settings/Hr_Settings.controller.js');

   // Employee Category
      app.post('/API/Hr_Settings/Employee_category_Create', Controller.Employee_category_Create);
      app.post('/API/Hr_Settings/Employee_category_List', Controller.Employee_category_List);
      app.post('/API/Hr_Settings/Employee_category_SimpleList', Controller.Employee_category_SimpleList);
      app.post('/API/Hr_Settings/Employee_category_Update', Controller.Employee_category_Update);
      app.post('/API/Hr_Settings/Employee_category_Delete', Controller.Employee_category_Delete);

   // Department
      app.post('/API/Hr_Settings/Department_Create', Controller.Department_Create);
      app.post('/API/Hr_Settings/Department_List', Controller.Department_List);
      app.post('/API/Hr_Settings/Department_SimpleList', Controller.Department_SimpleList);
      app.post('/API/Hr_Settings/Department_Update', Controller.Department_Update);
      app.post('/API/Hr_Settings/Department_Delete', Controller.Department_Delete);

   // Designation
      app.post('/API/Hr_Settings/Designation_Create', Controller.Designation_Create);
      app.post('/API/Hr_Settings/Designation_List', Controller.Designation_List);
      app.post('/API/Hr_Settings/Designation_SimpleList', Controller.Designation_SimpleList);
      app.post('/API/Hr_Settings/Designation_Update', Controller.Designation_Update);
      app.post('/API/Hr_Settings/Designation_Delete', Controller.Designation_Delete);

};