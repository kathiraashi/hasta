import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { MainCrmSettingsComponent } from './Components/Settings/CRM-Settings/main-crm-settings/main-crm-settings.component';
import { MainHrmsSettingsComponent } from './Components/Settings/HRMS-Settings/main-hrms-settings/main-hrms-settings.component';
import { MainHrSettingsComponent } from './Components/Settings/HR-Settings/main-hr-settings/main-hr-settings.component';
import { CrmCustomersListComponent } from './Components/CRM/Customers/crm-customers-list/crm-customers-list.component';
import { MainCrmCustomersViewComponent } from './Components/CRM/Customers/Crm-Customers-View/main-crm-customers-view/main-crm-customers-view.component';
import { CrmCustomersCreateComponent } from './Components/CRM/Customers/crm-customers-create/crm-customers-create.component';
import { CrmInvoiceListComponent } from './Components/CRM/Invoice/crm-invoice-list/crm-invoice-list.component';
import { CrmInvoiceCreateComponent } from './Components/CRM/Invoice/crm-invoice-create/crm-invoice-create.component';
import { MainHrmsComponentsComponent } from './Components/HRMS/main-hrms-components/main-hrms-components.component';
import { CrmInvoiceViewComponent } from './Components/CRM/Invoice/crm-invoice-view/crm-invoice-view.component';
import { AccountsCustomerListComponent } from './Components/Accounts/Customer/accounts-customer-list/accounts-customer-list.component';
import { AccountsCustomerInvoiceListComponent } from './Components/Accounts/customer-invoice/accounts-customer-invoice-list/accounts-customer-invoice-list.component';
import { AccountsCustomerPaymentsListComponent } from './Components/Accounts/customer-payments/accounts-customer-payments-list/accounts-customer-payments-list.component';
import { AccountsCustomerInvoiceViewComponent } from './Components/Accounts/customer-invoice/accounts-customer-invoice-view/accounts-customer-invoice-view.component';
import { CustomerPaymentsCreateComponent } from './Components/Accounts/customer-payments/customer-payments-create/customer-payments-create.component';
import { AccountsCustomerPaymentsViewComponent } from './Components/Accounts/customer-payments/accounts-customer-payments-view/accounts-customer-payments-view.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { CrmMachinesListComponent } from './Components/CRM/Machines/crm-machines-list/crm-machines-list.component';
import { CrmMachinesCreateComponent } from './Components/CRM/Machines/crm-machines-create/crm-machines-create.component';
import { CrmTicketsListComponent } from './Components/CRM/Tickets/crm-tickets-list/crm-tickets-list.component';
import { CrmTicketsCreateComponent } from './Components/CRM/Tickets/crm-tickets-create/crm-tickets-create.component';
import { MainHrComponent } from './Components/HR/main-hr/main-hr.component';
import { AttendanceReportViewComponent } from './Components/HR/SubComponents/Attendance-Report/attendance-report-view/attendance-report-view.component';
import { PayrollViewComponent } from './Components/HR/SubComponents/Payroll/payroll-view/payroll-view.component';
import { PayrollMasterCreateComponent } from './Components/HR/SubComponents/Payroll-Master/payroll-master-create/payroll-master-create.component';
import { CrmTicketsViewComponent } from './Components/CRM/Tickets/crm-tickets-view/crm-tickets-view.component';
import { CrmMachinesViewComponent } from './Components/CRM/Machines/crm-machines-view/crm-machines-view.component';


const appRoutes: Routes = [
  {
      path: '',
      component: MainCrmSettingsComponent,
      data: { animation: { value: 'CRM_Settings'}  }
  },
  {
      path: 'CRM_Settings',
      component: MainCrmSettingsComponent,
      data: {   animation: { value: 'CRM_Settings'}   }
  },
{
    path: 'Hrms_Settings',
    component: MainHrmsSettingsComponent,
    data: {   animation: { value: 'Hrms_Settings'}   }
},
{
    path: 'Hr_Settings',
    component: MainHrSettingsComponent,
    data: {   animation: { value: 'Hr_Settings'}   }
},
{
    path: 'Crm_Customers_List',
    component: CrmCustomersListComponent,
    data: {   animation: { value: 'Crm_Customers_List'}   }
},
{
    path: 'main_crm_customers_view',
    component: MainCrmCustomersViewComponent,
    data: {   animation: { value: 'main_crm_customers_view'}   }
},
{
    path: 'crm_customers_create',
    component: CrmCustomersCreateComponent,
    data: {   animation: { value: 'crm_customers_create'}   }
},
{
    path: 'crm_invoice_list',
    component: CrmInvoiceListComponent,
    data: {   animation: { value: 'crm_invoice_list'}   }
},
{
    path: 'crm_invoice_create',
    component: CrmInvoiceCreateComponent,
    data: {   animation: { value: 'crm_invoice_create'}   }
},

{
    path: 'main_hrms',
    component: MainHrmsComponentsComponent,
    data: {   animation: { value: 'main_hrms'}   }
},

{
    path: 'crm_invoice_view',
    component: CrmInvoiceViewComponent,
    data: {   animation: { value: 'crm_invoice_view'}   }
},

{
    path: 'account_customer_list',
    component: AccountsCustomerListComponent,
    data: {   animation: { value: 'account_customer_list'}   }
},
{
    path: 'account_customer_invoice_list',
    component: AccountsCustomerInvoiceListComponent,
    data: {   animation: { value: 'account_customer_invoice_list'}   }
},
{
    path: 'account_customer_payments_list',
    component: AccountsCustomerPaymentsListComponent,
    data: {   animation: { value: 'account_customer_payments_list'}   }
},
{
    path: 'account_customer_invoice_view',
    component: AccountsCustomerInvoiceViewComponent,
    data: {   animation: { value: 'account_customer_invoice_view'}   }
},
{
    path: 'customer_payment_create',
    component: CustomerPaymentsCreateComponent,
    data: {   animation: { value: 'customer_payment_create'}   }
},
{
    path: 'customer_payment_view',
    component: AccountsCustomerPaymentsViewComponent,
    data: {   animation: { value: 'customer_payment_view'}   }
},
{
    path: 'dashboard',
    component: DashboardComponent,
    data: {   animation: { value: 'dashboard'}   }
},
{
    path: 'crm_machine_list',
    component: CrmMachinesListComponent,
    data: {   animation: { value: 'crm_machine_list'}   }
},
{
    path: 'crm_machine_create',
    component: CrmMachinesCreateComponent,
    data: {   animation: { value: 'crm_machine_create'}   }
},
{
    path: 'crm_ticket_list',
    component: CrmTicketsListComponent,
    data: {   animation: { value: 'crm_ticket_list'}   }
},
{
    path: 'crm_ticket_create',
    component: CrmTicketsCreateComponent,
    data: {   animation: { value: 'crm_ticket_create'}   }
},
{
    path: 'main_hr',
    component: MainHrComponent,
    data: {   animation: { value: 'main_hr'}   }
},
{
    path: 'Attendance_Report_View',
    component: AttendanceReportViewComponent,
    data: {   animation: { value: 'Attendance_Report_View'}   }
},
{
    path: 'Payroll_View',
    component: PayrollViewComponent,
    data: {   animation: { value: 'Payroll_View'}   }
},
{
    path: 'Payroll_master_View',
    component: PayrollMasterCreateComponent,
    data: {   animation: { value: 'Payroll_master_View'}   }
},
{
    path: 'Crm_Tickets_View',
    component: CrmTicketsViewComponent,
    data: {   animation: { value: 'Crm_Tickets_View'}   }
},
{
    path: 'Crm_Machines_View',
    component: CrmMachinesViewComponent,
    data: {   animation: { value: 'Crm_Machines_View'}   }
},




];


@NgModule({
    declarations: [ ],
    imports: [ RouterModule.forRoot(appRoutes,
        { enableTracing: true }
      )],
    providers: [],
    bootstrap: []
  })
  export class AppRoutingModule { }
