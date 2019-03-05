import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from './Authentication/auth.guard';

import { LoginComponent } from './Components/Common-Components/login/login.component';
import { MainCrmSettingsComponent } from './Components/Settings/CRM-Settings/main-crm-settings/main-crm-settings.component';
import { MainHrSettingsComponent } from './Components/Settings/HR-Settings/main-hr-settings/main-hr-settings.component';
import { CrmCustomersListComponent } from './Components/CRM/Customers/crm-customers-list/crm-customers-list.component';
import { MainCrmCustomersViewComponent } from './Components/CRM/Customers/Crm-Customers-View/main-crm-customers-view/main-crm-customers-view.component';
import { CrmCustomersCreateComponent } from './Components/CRM/Customers/crm-customers-create/crm-customers-create.component';
import { CrmInvoiceListComponent } from './Components/CRM/Invoice/crm-invoice-list/crm-invoice-list.component';
import { CrmInvoiceCreateComponent } from './Components/CRM/Invoice/crm-invoice-create/crm-invoice-create.component';
import { UserManagementListComponent } from './Components/Settings/UserManagement/user-management-list/user-management-list.component';
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
import { PayrollViewComponent } from './Components/HR/SubComponents/Payroll/payroll-view/payroll-view.component';
import { PayrollMasterCreateComponent } from './Components/HR/SubComponents/Payroll-Master/payroll-master-create/payroll-master-create.component';
import { CrmTicketsViewComponent } from './Components/CRM/Tickets/crm-tickets-view/crm-tickets-view.component';
import { CrmMachinesViewComponent } from './Components/CRM/Machines/crm-machines-view/crm-machines-view.component';
import { ListEmployeesComponent } from './Components/HR/Employees/list-employees/list-employees.component';
import { CreateEmployeesComponent } from './Components/HR/Employees/create-employees/create-employees.component';
import { ViewEmployeesComponent } from './Components/HR/Employees/view-employees/view-employees.component';
import { MainAttendanceComponent } from './Components/HR/Attendance/main-attendance/main-attendance.component';
import { AttendanceReportViewComponent } from './Components/HR/Attendance/SubComponents/attendance-report-view/attendance-report-view.component';
import { MainPayrollHrComponent } from './Components/HR/SubComponents/Payroll/main-payroll-hr/main-payroll-hr.component';
import { MainPayrollMasterHrComponent } from './Components/HR/SubComponents/Payroll-Master/main-payroll-master-hr/main-payroll-master-hr.component';
import { EditEmployeesComponent } from './Components/HR/Employees/edit-employees/edit-employees.component';
import { CreateLeavesComponent } from './Components/HRMS/Leaves/create-leaves/create-leaves.component';
import { ListLeavesComponent } from './Components/HRMS/Leaves/list-leaves/list-leaves.component';
import { EditLeavesComponent } from './Components/HRMS/Leaves/edit-leaves/edit-leaves.component';
import { MainHrmsSettingsComponent } from './Components/Settings/HRMS-Settings/main-hrms-settings/main-hrms-settings.component';
import { CreateExpensesComponent } from './Components/HRMS/Expenses/create-expenses/create-expenses.component';
import { ExpensesListComponent } from './Components/HRMS/Expenses/expenses-list/expenses-list.component';
import { EditExpensesComponent } from './Components/HRMS/Expenses/edit-expenses/edit-expenses.component';
import { ExpensesViewComponent } from './Components/HRMS/Expenses/expenses-view/expenses-view.component';
import { AttendanceLogComponent } from './Components/HR/attendance-log/attendance-log.component';
import { CrmCustomersEditComponent } from './Components/CRM/Customers/crm-customers-edit/crm-customers-edit.component';
import { CrmMachinesEditComponent } from './Components/CRM/Machines/crm-machines-edit/crm-machines-edit.component';



const appRoutes: Routes = [
   {
      path: '',
      component: LoginComponent,
      data: { animation: { value: 'Login'}  }
   },
   {
      path: 'Login',
      component: LoginComponent,
      data: { animation: { value: 'Login'}  }
   },
   {
      path: 'CRM_Settings',
      component: MainCrmSettingsComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'CRM_Settings'}   }
   },
   {
      path: 'Hr_Settings',
      component: MainHrSettingsComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'Hr_Settings'}   }
   },
   {
      path: 'Hrms_Settings',
      component: MainHrmsSettingsComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'Hrms_Settings'}   }
   },
   {
      path: 'User_Management',
      component: UserManagementListComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'User_Management'}   }
   },
   {
      path: 'Crm_Customers_List',
      component: CrmCustomersListComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'Crm_Customers_List'}   }
   },
   {
      path: 'main_crm_customers_view/:Customer_Id',
      component: MainCrmCustomersViewComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'main_crm_customers_view'}   }
   },
   {
      path: 'crm_customers_edit/:Customer_Id',
      component: CrmCustomersEditComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'crm_customers_edit'}   }
    },
   {
      path: 'crm_customers_create',
      component: CrmCustomersCreateComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'crm_customers_create'}   }
   },
   {
      path: 'crm_invoice_list',
      component: CrmInvoiceListComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'crm_invoice_list'}   }
   },
   {
      path: 'crm_invoice_create',
      component: CrmInvoiceCreateComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'crm_invoice_create'}   }
   },
   {
      path: 'crm_invoice_view',
      component: CrmInvoiceViewComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'crm_invoice_view'}   }
   },

   {
      path: 'account_customer_list',
      component: AccountsCustomerListComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'account_customer_list'}   }
   },
   {
      path: 'account_customer_invoice_list',
      component: AccountsCustomerInvoiceListComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'account_customer_invoice_list'}   }
   },
   {
      path: 'account_customer_payments_list',
      component: AccountsCustomerPaymentsListComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'account_customer_payments_list'}   }
   },
   {
      path: 'account_customer_invoice_view',
      component: AccountsCustomerInvoiceViewComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'account_customer_invoice_view'}   }
   },
   {
      path: 'customer_payment_create',
      component: CustomerPaymentsCreateComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'customer_payment_create'}   }
   },
   {
      path: 'customer_payment_view',
      component: AccountsCustomerPaymentsViewComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'customer_payment_view'}   }
   },
   {
      path: 'dashboard',
      component: DashboardComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'dashboard'}   }
   },
   {
      path: 'crm_machine_list',
      component: CrmMachinesListComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'crm_machine_list'}   }
   },
   {
      path: 'crm_machine_create',
      component: CrmMachinesCreateComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'crm_machine_create'}   }
   },
   {
      path: 'crm_ticket_list',
      component: CrmTicketsListComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'crm_ticket_list'}   }
   },
   {
      path: 'crm_ticket_create',
      component: CrmTicketsCreateComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'crm_ticket_create'}   }
   },
   {
      path: 'Attendance_Report_View/:Report_Id',
      component: AttendanceReportViewComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'Attendance_Report_View'}   }
   },
   {
      path: 'Payroll_View',
      component: PayrollViewComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'Payroll_View'}   }
   },
   {
      path: 'Payroll_master_View',
      component: PayrollMasterCreateComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'Payroll_master_View'}   }
   },
   {
      path: 'Crm_Tickets_View/:Ticket_Id',
      component: CrmTicketsViewComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'Crm_Tickets_View'}   }
   },
   {
      path: 'Crm_Machines_View/:Machine_Id',
      component: CrmMachinesViewComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'Crm_Machines_View'}   }
   },
   {
    path: 'Crm_Machines_Edit/:Machine_Id',
    component: CrmMachinesEditComponent,
    canActivate: [AuthGuard],
    data: {   animation: { value: 'Crm_Machines_Edit'}   }
  },
   {
      path: 'List_Employees',
      component: ListEmployeesComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'List_Employees'}   }
   },
   {
      path: 'Create_Employees',
      component: CreateEmployeesComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'Create_Employees'}   }
   },
   {
      path: 'View_Employees/:Employee_Id',
      component: ViewEmployeesComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'View_Employees'}   }
   },
   {
      path: 'Edit_Employees/:Employee_Id',
      component: EditEmployeesComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'Edit_Employees'}   }
   },
   {
      path: 'main_Attendance',
      component: MainAttendanceComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'main_Attendance'}   }
   },
   {
      path: 'Attendance_Report_View',
      component: AttendanceReportViewComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'Attendance_Report_View'}   }
   },
   {
      path: 'Main_Payroll',
      component: MainPayrollHrComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'Main_Payroll'}   }
   },
   {
      path: 'Main_Payroll_Master',
      component: MainPayrollMasterHrComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'Main_Payroll_Master'}   }
   },
   // HRMS
      {
         path: 'Create_Leaves',
         component: CreateLeavesComponent,
         canActivate: [AuthGuard],
         data: {   animation: { value: 'Create_Leaves'}   }
      },
      {
         path: 'Edit_Leaves/:Leave_Id',
         component: EditLeavesComponent,
         canActivate: [AuthGuard],
         data: {   animation: { value: 'Edit_Leaves'}   }
      },
      {
         path: 'List_Leaves',
         component: ListLeavesComponent,
         canActivate: [AuthGuard],
         data: {   animation: { value: 'List_Leaves'}   }
      },
      {
         path: 'Expenses_List',
         component: ExpensesListComponent,
         canActivate: [AuthGuard],
         data: {   animation: { value: 'Expenses_List'}   }
      },
      {
         path: 'Create_Expenses',
         component: CreateExpensesComponent,
         canActivate: [AuthGuard],
         data: {   animation: { value: 'Create_Expenses'}   }
      },
      {
         path: 'Edit_Expenses/:Expenses_Id',
         component: EditExpensesComponent,
         canActivate: [AuthGuard],
         data: {   animation: { value: 'Edit_Expenses'}   }
      },
      {
         path: 'Expenses_View',
         component: ExpensesViewComponent,
         canActivate: [AuthGuard],
         data: {   animation: { value: 'Expenses_View'}   }
      },
      {
         path: 'Attendance_Log',
         component: AttendanceLogComponent,
         canActivate: [AuthGuard],
         data: {   animation: { value: 'Attendance_Log'}   }
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
