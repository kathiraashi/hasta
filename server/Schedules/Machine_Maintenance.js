var schedule = require('node-schedule');
var CrmCustomersModel = require('./../web/models/Crm/CrmCustomers.model.js');
var ErrorManagement = require('./../handling/ErrorHandling.js');
var mongoose = require('mongoose');
 
var Machine_Maintenance_Schedule = schedule.scheduleJob('0 0 0 * * *', function(){
   // console.log('1');
   
   CrmCustomersModel.CrmMachinesSchema
      .find({'If_Deleted': false }, {Maintenance_Parts: 1}, {})
      .exec(function(err, result) {
      if(err) {
         ErrorManagement.ErrorHandling.ErrorLogCreation('', 'CRM Machines Maintenance Schedule Create Machines List Find Query Error', 'Schedules/Machine_Maintenance.js', err);
      } else {
         if (result.length > 0) {
            result = result.filter(Obj => Obj.Maintenance_Parts !== null && Obj.Maintenance_Parts.length > 0);
            if (result.length > 0) {
               let Today = new Date();
               Today.setHours(0, 0, 0, 0);
               const InsertData = [];
               result = JSON.parse(JSON.stringify(result));
               result.map( _Object => {
                  return _Object.Maintenance_Parts.map( _Obj => {
                     const NewObj = {};
                     NewObj.Machine = mongoose.Types.ObjectId(_Object._id);
                     NewObj.MachineMaintenancePart = mongoose.Types.ObjectId(_Obj);
                     NewObj.Status = false;
                     NewObj.MaintenanceDate = Today;
                     NewObj.Description = '';
                     NewObj.Updated_By = '';
                     NewObj.If_Deleted = false;
                     NewObj.If_Updated = false;
                     InsertData.push(NewObj);
                     return NewObj;
                  });
               });
               CrmCustomersModel.CrmMachinesMaintenanceSchema.collection.insertMany(InsertData, function(err_2, result_2){
                  if(err_2) {
                     ErrorManagement.ErrorHandling.ErrorLogCreation('', 'CRM Machines Maintenance Schedule Create  Query Error', 'Schedules/Machine_Maintenance.js', err_2);
                  }
               });
            }
         }
      }
   });
});