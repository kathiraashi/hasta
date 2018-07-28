module.exports = function(app) {

   var Controller = require('./../../controller/Admin/AdminManagement.controller.js');

   app.post('/API/RegisterAndLogin/Company_Register', Controller.Company_Register);
   app.post('/API/RegisterAndLogin/User_Login_Validate', Controller.User_Login_Validate);

   app.post('/API/RegisterAndLogin/Create_UserTypes', Controller.Create_UserTypes);
   app.post('/API/RegisterAndLogin/Create_Project_Modules', Controller.Create_Project_Modules);
   app.post('/API/RegisterAndLogin/Create_Project_SubModules', Controller.Create_Project_SubModules);


};
