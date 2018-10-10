module.exports = function(app){

   var Controller = require('../../controller/Hrms/OnDuty.controller.js');
   
   // OnDuty
   app.post('/API/Hrms/OnDuty_Create', Controller.OnDuty_Create);
   app.post('/API/Hrms/OnDuty_List', Controller.OnDuty_List);
   app.post('/API/Hrms/OnDuty_Update', Controller.OnDuty_Update);
}