module.exports = function(app){

   var Controller = require('../../controller/settings/Hr_Settings.controller.js');

   // Department
      app.post('/API/Hr_Settings/Department_AsyncValidate', Controller.Department_AsyncValidate);
      app.post('/API/Hr_Settings/Department_Create', Controller.Department_Create);
      app.post('/API/Hr_Settings/Department_List', Controller.Department_List);
      app.post('/API/Hr_Settings/Department_SimpleList', Controller.Department_SimpleList);
      app.post('/API/Hr_Settings/Department_Update', Controller.Department_Update);
      app.post('/API/Hr_Settings/Department_Delete', Controller.Department_Delete);

   // Designation
      app.post('/API/Hr_Settings/Designation_AsyncValidate', Controller.Designation_AsyncValidate);
      app.post('/API/Hr_Settings/Designation_Create', Controller.Designation_Create);
      app.post('/API/Hr_Settings/Designation_List', Controller.Designation_List);
      app.post('/API/Hr_Settings/Designation_SimpleList', Controller.Designation_SimpleList);
      app.post('/API/Hr_Settings/Designation_Update', Controller.Designation_Update);
      app.post('/API/Hr_Settings/Designation_Delete', Controller.Designation_Delete);
      
   // Earnings
      app.post('/API/Hr_Settings/Earnings_AsyncValidate', Controller.Earnings_AsyncValidate);
      app.post('/API/Hr_Settings/Earnings_Create', Controller.Earnings_Create);
      app.post('/API/Hr_Settings/Earnings_List', Controller.Earnings_List);
      app.post('/API/Hr_Settings/Earnings_SimpleList', Controller.Earnings_SimpleList);
      app.post('/API/Hr_Settings/Earnings_Update', Controller.Earnings_Update);
      app.post('/API/Hr_Settings/Earnings_Delete', Controller.Earnings_Delete);

   // Detections
      app.post('/API/Hr_Settings/Detections_AsyncValidate', Controller.Detections_AsyncValidate);
      app.post('/API/Hr_Settings/Detections_Create', Controller.Detections_Create);
      app.post('/API/Hr_Settings/Detections_List', Controller.Detections_List);
      app.post('/API/Hr_Settings/Detections_SimpleList', Controller.Detections_SimpleList);
      app.post('/API/Hr_Settings/Detections_Update', Controller.Detections_Update);
      app.post('/API/Hr_Settings/Detections_Delete', Controller.Detections_Delete);

   // Holiday
      app.post('/API/Hr_Settings/Holiday_AsyncValidate', Controller.Holiday_AsyncValidate);
      app.post('/API/Hr_Settings/Holiday_Create', Controller.Holiday_Create);
      app.post('/API/Hr_Settings/Holiday_List', Controller.Holiday_List);
      app.post('/API/Hr_Settings/Holiday_Update', Controller.Holiday_Update);
      app.post('/API/Hr_Settings/Holiday_Delete', Controller.Holiday_Delete);
};
