module.exports = function(app){

   var Controller = require('../../controller/settings/Leads_Settings.controller.js');

   // Lead Source
      app.post('/API/Leads_Settings/LeadSource_AsyncValidate', Controller.LeadSource_AsyncValidate);
      app.post('/API/Leads_Settings/Lead_Source_Create', Controller.Lead_Source_Create);
      app.post('/API/Leads_Settings/Lead_Source_List', Controller.Lead_Source_List);
      app.post('/API/Leads_Settings/Lead_Source_SimpleList', Controller.Lead_Source_SimpleList);
      app.post('/API/Leads_Settings/Lead_Source_Update', Controller.Lead_Source_Update);
      app.post('/API/Leads_Settings/Lead_Source_Delete', Controller.Lead_Source_Delete);

};