module.exports = function(app){

   var Controller = require('../../controller/Hrms/Leaves.controller.js');

   // Leaves
   app.post('/API/Hrms/Leaves_Create', Controller.Leaves_Create);
   app.post('/API/Hrms/Leaves_List', Controller.Leaves_List);
   app.post('/API/Hrms/Leaves_Update', Controller.Leaves_Update);

}