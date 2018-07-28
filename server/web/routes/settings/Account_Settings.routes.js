module.exports = function(app){

   var Controller = require('../../controller/settings/Account_Settings.controller.js');

   // Income Type
      app.post('/API/Account_Settings/Income_Type_Create', Controller.Income_Type_Create);
      app.post('/API/Account_Settings/Income_Type_List', Controller.Income_Type_List);
      app.post('/API/Account_Settings/Income_Type_SimpleList', Controller.Income_Type_SimpleList);
      app.post('/API/Account_Settings/Income_Type_Update', Controller.Income_Type_Update);
      app.post('/API/Account_Settings/Income_Type_Delete', Controller.Income_Type_Delete);

   // Payment Terms
      app.post('/API/Account_Settings/Payment_Terms_Create', Controller.Payment_Terms_Create);
      app.post('/API/Account_Settings/Payment_Terms_List', Controller.Payment_Terms_List);
      app.post('/API/Account_Settings/Payment_Terms_SimpleList', Controller.Payment_Terms_SimpleList);
      app.post('/API/Account_Settings/Payment_Terms_Update', Controller.Payment_Terms_Update);
      app.post('/API/Account_Settings/Payment_Terms_Delete', Controller.Payment_Terms_Delete);

   // Bank
      app.post('/API/Account_Settings/Bank_Create', Controller.Bank_Create);
      app.post('/API/Account_Settings/Bank_List', Controller.Bank_List);
      app.post('/API/Account_Settings/Bank_Simple_List', Controller.Bank_Simple_List);
      app.post('/API/Account_Settings/Bank_Update', Controller.Bank_Update);
      app.post('/API/Account_Settings/Bank_Delete', Controller.Bank_Delete);

}; 