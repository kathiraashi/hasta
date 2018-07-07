// Default Modules
   import { NgModule } from '@angular/core';
   import { CommonModule} from '@angular/common';
   import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
   import { BrowserModule } from '@angular/platform-browser';
   import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
   import { FormsModule, ReactiveFormsModule } from '@angular/forms';
   import { HttpModule } from '@angular/http';
   import { HttpClientModule } from '@angular/common/http';
   import { RouterModule, Routes } from '@angular/router';

// Default Components
   import { AppComponent } from './app.component';

// Future Modules
import { ModalModule, AccordionModule, BsDropdownModule } from 'ngx-bootstrap';
import {CalendarModule} from 'primeng/calendar';
import {MatButtonModule, MatFormFieldModule, MatSelectModule} from '@angular/material';
// Custom Modules
   import { AppRoutingModule } from './app.routing.module';
// Custom Components
   // Header Component
   import { HeaderComponent } from './Components/Common-Components/header/header.component';
   // delete-confirmation
   import { DeleteConfirmationComponent } from './Components/Common-Components/delete-confirmation/delete-confirmation.component';
   // Component Folder
      // DashBoard Component Folder
         import { DashboardComponent } from './Components/dashboard/dashboard.component';
      // Settings Folder
         // CRM Settings Folder
            import { MainCrmSettingsComponent } from './Components/Settings/CRM-Settings/main-crm-settings/main-crm-settings.component';
            // Sub Components Folder
               import { AccountTypeCrmSettingsComponent } from './Components/Settings/CRM-Settings/Sub-Components/account-type-crm-settings/account-type-crm-settings.component';
               import { IndustryTypeCrmSettingsComponent } from './Components/Settings/CRM-Settings/Sub-Components/industry-type-crm-settings/industry-type-crm-settings.component';
               import { OwnerShipTypeCrmSettingsComponent } from './Components/Settings/CRM-Settings/Sub-Components/owner-ship-type-crm-settings/owner-ship-type-crm-settings.component';
               import { ActivityTypeCrmSettingsComponent } from './Components/Settings/CRM-Settings/Sub-Components/activity-type-crm-settings/activity-type-crm-settings.component';
               import { ActivityStatusTypeCrmSettingsComponent } from './Components/Settings/CRM-Settings/Sub-Components/activity-status-type-crm-settings/activity-status-type-crm-settings.component';
               import { ActivityPriorityTypeCrmSettingsComponent } from './Components/Settings/CRM-Settings/Sub-Components/activity-priority-type-crm-settings/activity-priority-type-crm-settings.component';
               import { PipeLineStatusTypeCrmSettingsComponent } from './Components/Settings/CRM-Settings/Sub-Components/pipe-line-status-type-crm-settings/pipe-line-status-type-crm-settings.component';
               import { ContactRoleTypeCrmSettingsComponent } from './Components/Settings/CRM-Settings/Sub-Components/contact-role-type-crm-settings/contact-role-type-crm-settings.component';
               import { QuoteTermsTypeCrmSettingsComponent } from './Components/Settings/CRM-Settings/Sub-Components/quote-terms-type-crm-settings/quote-terms-type-crm-settings.component';
         // Company Settings Folder
            import { MainCompanySettingsComponent } from './Components/Settings/Company-Settings/main-company-settings/main-company-settings.component';
            // Sub Components Folder
                import { CompanyInfoCompanySettingsComponent } from './Components/settings/Company-Settings/SubComponents/company-info-company-settings/company-info-company-settings.component';
                import { ContactInfoCompanySettingsComponent } from './Components/settings/Company-Settings/SubComponents/contact-info-company-settings/contact-info-company-settings.component';
                import { DepartmentsCompanySettingsComponent } from './Components/settings/Company-Settings/SubComponents/departments-company-settings/departments-company-settings.component';
                import { BranchCompanySettingsComponent } from './Components/settings/Company-Settings/SubComponents/branch-company-settings/branch-company-settings.component';
                import { RegistrationInfoCompanySettingsComponent } from './Components/settings/Company-Settings/SubComponents/registration-info-company-settings/registration-info-company-settings.component';
                import { ESIInfoCompanySettingsComponent } from './Components/Settings/Company-Settings/SubComponents/esiinfo-company-settings/esiinfo-company-settings.component';
                import { PFInfoCompanySettingsComponent } from './Components/Settings/Company-Settings/SubComponents/pfinfo-company-settings/pfinfo-company-settings.component';
                import { ItInfoCompanySettingsComponent } from './Components/Settings/Company-Settings/SubComponents/it-info-company-settings/it-info-company-settings.component';
                import { PTInfoCompanySettingsComponent } from './Components/Settings/Company-Settings/SubComponents/ptinfo-company-settings/ptinfo-company-settings.component';
                import { RegistrationTypeCompanySettingsComponent } from './Components/Settings/Company-Settings/SubComponents/registration-type-company-settings/registration-type-company-settings.component';
         // Hrms Settings Folder
            import { MainHrmsSettingsComponent } from './Components/Settings/HRMS-Settings/main-hrms-settings/main-hrms-settings.component';
            // Sub Components
               import { LeaveTypeHrmsSettingsComponent } from './Components/Settings/HRMS-Settings/SubComponents/leave-type-hrms-settings/leave-type-hrms-settings.component';
               import { ExpensesTypeHrmsSettingsComponent } from './Components/Settings/HRMS-Settings/SubComponents/expenses-type-hrms-settings/expenses-type-hrms-settings.component';
         // Hr Settings Folder
               import { MainHrSettingsComponent } from './Components/Settings/HR-Settings/main-hr-settings/main-hr-settings.component';
            // Sub Components
               import { EmployeeCategoryHrSettingsComponent } from './Components/Settings/HR-Settings/SubComponents/employee-category-hr-settings/employee-category-hr-settings.component';
               import { DepartmentHrSettingsComponent } from './Components/Settings/HR-Settings/SubComponents/department-hr-settings/department-hr-settings.component';
               import { DesignationHrSettingsComponent } from './Components/Settings/HR-Settings/SubComponents/designation-hr-settings/designation-hr-settings.component';
         // Account Settings Folder
               import { MainAccountSettingsComponent } from './Components/Settings/Account-Settings/main-account-settings/main-account-settings.component';
            // Sub Components
               import { TaxesAccountSettingsComponent } from './Components/Settings/Account-Settings/SubComponents/taxes-account-settings/taxes-account-settings.component';
               import { BankAccountSettingsComponent } from './Components/Settings/Account-Settings/SubComponents/bank-account-settings/bank-account-settings.component';
               import { IncomeTypeAccountSettingsComponent } from './Components/Settings/Account-Settings/SubComponents/income-type-account-settings/income-type-account-settings.component';
               import { AssetTypeAccountSettingsComponent } from './Components/Settings/Account-Settings/SubComponents/asset-type-account-settings/asset-type-account-settings.component';
               import { PaymentTermsAccountSettingsComponent } from './Components/Settings/Account-Settings/SubComponents/payment-terms-account-settings/payment-terms-account-settings.component';
         // Product Settings Folder
               import { MainProductSettingsComponent } from './Components/Settings/Product-Settings/main-product-settings/main-product-settings.component';
            // Sub Components
               import { ConfigurationProductSettingsComponent } from './Components/Settings/Product-Settings/SubComponents/configuration-product-settings/configuration-product-settings.component';
      // CRM Folder
         // Customers
            // crm-customers-list
               import { CrmCustomersListComponent } from './Components/CRM/Customers/crm-customers-list/crm-customers-list.component';
            // crm-customers-view
               // main crm customers view
                  import { MainCrmCustomersViewComponent } from './Components/CRM/Customers/Crm-Customers-View/main-crm-customers-view/main-crm-customers-view.component';
               // SubComponents
                  import { AboutCrmCustomersViewComponent } from './Components/CRM/Customers/Crm-Customers-View/SubComponents/about-crm-customers-view/about-crm-customers-view.component';
                  import { ContactCrmCustomersViewComponent } from './Components/CRM/Customers/Crm-Customers-view/SubComponents/contact-crm-customers-view/contact-crm-customers-view.component';
                  import { ActivityCrmCustomersViewComponent } from './Components/CRM/Customers/Crm-Customers-view/SubComponents/activity-crm-customers-view/activity-crm-customers-view.component';
                  import { InvoiceCrmCustomersViewComponent } from './Components/CRM/Customers/Crm-Customers-view/SubComponents/invoice-crm-customers-view/invoice-crm-customers-view.component';
            // crm-customer-create
                  import { CrmCustomersCreateComponent } from './Components/CRM/Customers/crm-customers-create/crm-customers-create.component';
         // Invoice
            // crm-invoice-create
               import { CrmInvoiceCreateComponent } from './Components/CRM/Invoice/crm-invoice-create/crm-invoice-create.component';
            // crm-invoice-List
               import { CrmInvoiceListComponent } from './Components/CRM/Invoice/crm-invoice-list/crm-invoice-list.component';
            // crm-invoice-View
               import { CrmInvoiceViewComponent } from './Components/CRM/Invoice/crm-invoice-view/crm-invoice-view.component';
         // Machines
               import { CrmMachinesListComponent } from './Components/CRM/Machines/crm-machines-list/crm-machines-list.component';
               import { CrmMachinesCreateComponent } from './Components/CRM/Machines/crm-machines-create/crm-machines-create.component';
               import { CrmMachinesViewComponent } from './Components/CRM/Machines/crm-machines-view/crm-machines-view.component';
               import { MachinesCrmCustomersViewComponent } from './Components/CRM/Customers/Crm-Customers-View/SubComponents/machines-crm-customers-view/machines-crm-customers-view.component';
         // Tickets
               import { CrmTicketsCreateComponent } from './Components/CRM/Tickets/crm-tickets-create/crm-tickets-create.component';
               import { CrmTicketsListComponent } from './Components/CRM/Tickets/crm-tickets-list/crm-tickets-list.component';
               import { CrmTicketsViewComponent } from './Components/CRM/Tickets/crm-tickets-view/crm-tickets-view.component';
               import { TicketsCrmCustomersViewComponent } from './Components/CRM/Customers/Crm-Customers-View/SubComponents/tickets-crm-customers-view/tickets-crm-customers-view.component';
      // HRMS folder
         // main hrms
            import { MainHrmsComponentsComponent } from './Components/HRMS/main-hrms-components/main-hrms-components.component';
         // SubComponents
            import { DashboardHrmsComponent } from './Components/HRMS/SubComponents/dashboard-hrms/dashboard-hrms.component';
            import { LeavesHrmsComponent } from './Components/HRMS/SubComponents/leaves-hrms/leaves-hrms.component';
            import { OndutyHrmsComponent } from './Components/HRMS/SubComponents/onduty-hrms/onduty-hrms.component';
            import { PermissionsHrmsComponent } from './Components/HRMS/SubComponents/permissions-hrms/permissions-hrms.component';
            import { AdvanceHrmsComponent } from './Components/HRMS/SubComponents/advance-hrms/advance-hrms.component';
      // Accounts Folder
         // Customer
            import { AccountsCustomerListComponent } from './Components/Accounts/Customer/accounts-customer-list/accounts-customer-list.component';
            import { AccountsCustomerInvoiceListComponent } from './Components/Accounts/customer-invoice/accounts-customer-invoice-list/accounts-customer-invoice-list.component';
            import { AccountsCustomerPaymentsListComponent } from './Components/Accounts/customer-payments/accounts-customer-payments-list/accounts-customer-payments-list.component';
            import { AccountsCustomerInvoiceViewComponent } from './Components/Accounts/customer-invoice/accounts-customer-invoice-view/accounts-customer-invoice-view.component';
         // vendor
            import { AccountsCustomerPaymentsViewComponent } from './Components/Accounts/customer-payments/accounts-customer-payments-view/accounts-customer-payments-view.component';
            import { AccountsVendorListComponent } from './Components/Accounts/Vendor/accounts-vendor-list/accounts-vendor-list.component';
            import { AccountsVendorbillsListComponent } from './Components/Accounts/Vendor-Bills/accounts-vendorbills-list/accounts-vendorbills-list.component';
         // Customer payments
            import { CustomerPaymentsCreateComponent } from './Components/Accounts/customer-payments/customer-payments-create/customer-payments-create.component';
         // Vendor payments
            import { VendorPaymentsListComponent } from './Components/Accounts/Vendor-Payments/vendor-payments-list/vendor-payments-list.component';
            import { VendorPaymentsCreateComponent } from './Components/Accounts/Vendor-Payments/vendor-payments-create/vendor-payments-create.component';
            import { VendorPaymentsViewComponent } from './Components/Accounts/Vendor-Payments/vendor-payments-view/vendor-payments-view.component';
   // models
      // settings
         // company settings
            import { ModelCompanyinfoCompanysettingsComponent } from './models/settings/company_settings/model-companyinfo-companysettings/model-companyinfo-companysettings.component';
            import { ModelContactinfoCompanysettingsComponent } from './models/settings/company_settings/model-contactinfo-companysettings/model-contactinfo-companysettings.component';
            import { ModelDepartmentsCompanysettingsComponent } from './models/settings/company_settings/model-departments-companysettings/model-departments-companysettings.component';
            import { ModelBranchCompanysettingsComponent } from './models/settings/company_settings/model-branch-companysettings/model-branch-companysettings.component';
            import { ModelRegistrationinfoCompanysettingsComponent } from './models/settings/company_settings/model-registrationinfo-companysettings/model-registrationinfo-companysettings.component';
            import { ModelPfinfoCompanysettingsComponent } from './models/settings/company_settings/model-pfinfo-companysettings/model-pfinfo-companysettings.component';
            import { ModelEsiinfoCompanysettingsComponent } from './models/settings/company_settings/model-esiinfo-companysettings/model-esiinfo-companysettings.component';
            import { ModelPtinfoCompanysettingsComponent } from './models/settings/company_settings/model-ptinfo-companysettings/model-ptinfo-companysettings.component';
            import { ModelItinfoCompanysettingsComponent } from './models/settings/company_settings/model-itinfo-companysettings/model-itinfo-companysettings.component';
            import { ModelRegistrationtypeCompanysettingsComponent } from './models/settings/company_settings/model-registrationtype-companysettings/model-registrationtype-companysettings.component';
        // CRM Settings
            import { ModelIndustrytypeCrmsettingsComponent } from './models/settings/crm_settings/model-industrytype-crmsettings/model-industrytype-crmsettings.component';
            import { ModelOwnershipytypeCrmsettingsComponent } from './models/settings/crm_settings/model-ownershipytype-crmsettings/model-ownershipytype-crmsettings.component';
            import { ModelActivitytypeCrmsettingsComponent } from './models/settings/crm_settings/model-activitytype-crmsettings/model-activitytype-crmsettings.component';
            import { ModelActivitystatusCrmsettingsComponent } from './models/settings/crm_settings/model-activitystatus-crmsettings/model-activitystatus-crmsettings.component';
            import { ModelActivitypriorityCrmsettingsComponent } from './models/settings/crm_settings/model-activitypriority-crmsettings/model-activitypriority-crmsettings.component';
            import { ModelPipelinestatusCrmsettingsComponent } from './models/settings/crm_settings/model-pipelinestatus-crmsettings/model-pipelinestatus-crmsettings.component';
            import { ModelContactroleCrmsettingsComponent } from './models/settings/crm_settings/model-contactrole-crmsettings/model-contactrole-crmsettings.component';
            import { ModelQuotetermsCrmsettingsComponent } from './models/settings/crm_settings/model-quoteterms-crmsettings/model-quoteterms-crmsettings.component';
         // HRMS settings
            import { ModelLeavetypeHrmssettingsComponent } from './models/settings/hrms_settings/model-leavetype-hrmssettings/model-leavetype-hrmssettings.component';
            import { ModelExpensestypeHrmssettingsComponent } from './models/settings/hrms_settings/model-expensestype-hrmssettings/model-expensestype-hrmssettings.component';
         // HR settings
            import { ModelEmployeecategoryHrsettingsComponent } from './models/settings/hr_settings/model-employeecategory-hrsettings/model-employeecategory-hrsettings.component';
            import { ModelDepartmentHrsettingsComponent } from './models/settings/hr_settings/model-department-hrsettings/model-department-hrsettings.component';
            import { ModelDesignationHrsettingsComponent } from './models/settings/hr_settings/model-designation-hrsettings/model-designation-hrsettings.component';
         // Account Settings
            import { ModelTaxesAccountsettingsComponent } from './models/settings/account_settings/model-taxes-accountsettings/model-taxes-accountsettings.component';
            import { ModelBankAccountsettingsComponent } from './models/settings/account_settings/model-bank-accountsettings/model-bank-accountsettings.component';
            import { ModelIncometypeAccountsettingsComponent } from './models/settings/account_settings/model-incometype-accountsettings/model-incometype-accountsettings.component';
            import { ModelAssettypeAccountsettingsComponent } from './models/settings/account_settings/model-assettype-accountsettings/model-assettype-accountsettings.component';
            import { ModelPaymenttermsAccountsettingsComponent } from './models/settings/account_settings/model-paymentterms-accountsettings/model-paymentterms-accountsettings.component';
      // HRMS
            import { ModelLeavesHrmsComponent } from './models/HRMS/model-leaves-hrms/model-leaves-hrms.component';
            import { ModelOndutyHrmsComponent } from './models/HRMS/model-onduty-hrms/model-onduty-hrms.component';
            import { ModelPermissionsHrmsComponent } from './models/HRMS/model-permissions-hrms/model-permissions-hrms.component';
            import { ModelAdvanceHrmsComponent } from './models/HRMS/model-advance-hrms/model-advance-hrms.component';


@NgModule({
   declarations: [
      // Default Components
         AppComponent,
      // Custom Components
         // Component Folder
            // Common-Components Folder
              HeaderComponent,
            // Settings Folder
               // CRM Settings Folder
                  MainCrmSettingsComponent,
                  // Sub Components Folder
                     AccountTypeCrmSettingsComponent,
                     IndustryTypeCrmSettingsComponent,
                     OwnerShipTypeCrmSettingsComponent,
                     ActivityTypeCrmSettingsComponent,
                     ActivityStatusTypeCrmSettingsComponent,
                     ActivityPriorityTypeCrmSettingsComponent,
                     PipeLineStatusTypeCrmSettingsComponent,
                     ContactRoleTypeCrmSettingsComponent,
                     QuoteTermsTypeCrmSettingsComponent,
                // Company Settings Folder
                 MainCompanySettingsComponent,
                  // Sub Components Folder
                     CompanyInfoCompanySettingsComponent,
                     ContactInfoCompanySettingsComponent,
                     DepartmentsCompanySettingsComponent,
                     BranchCompanySettingsComponent,
                     RegistrationInfoCompanySettingsComponent,
                     ESIInfoCompanySettingsComponent,
                     PFInfoCompanySettingsComponent,
                     ItInfoCompanySettingsComponent,
                     PTInfoCompanySettingsComponent,
                     RegistrationTypeCompanySettingsComponent,
                // Hrms Settings Folder
                 MainHrmsSettingsComponent,
                 // Sub Components
                    LeaveTypeHrmsSettingsComponent,
                    ExpensesTypeHrmsSettingsComponent,
                // Hr Settings Folder
                 MainHrSettingsComponent,
                 // Sub Components
                    EmployeeCategoryHrSettingsComponent,
                    DepartmentHrSettingsComponent,
                    DesignationHrSettingsComponent,
               // Account Settings Folder
                MainAccountSettingsComponent,
                 // Sub Components
                    TaxesAccountSettingsComponent,
                    BankAccountSettingsComponent,
                    IncomeTypeAccountSettingsComponent,
                    AssetTypeAccountSettingsComponent,
                    PaymentTermsAccountSettingsComponent,
                // Product Settings Folder
                 MainProductSettingsComponent,
                 // Sub Components
                    ConfigurationProductSettingsComponent,
    // models
    // settings
        // company settings
            ModelCompanyinfoCompanysettingsComponent,
            ModelContactinfoCompanysettingsComponent,
            ModelDepartmentsCompanysettingsComponent,
            ModelBranchCompanysettingsComponent,
            ModelRegistrationinfoCompanysettingsComponent,
            ModelPfinfoCompanysettingsComponent,
            ModelEsiinfoCompanysettingsComponent,
            ModelPtinfoCompanysettingsComponent,
            ModelItinfoCompanysettingsComponent,
            ModelRegistrationtypeCompanysettingsComponent,
        // CRM Settings
            ModelIndustrytypeCrmsettingsComponent,
            ModelOwnershipytypeCrmsettingsComponent,
            ModelActivitytypeCrmsettingsComponent,
            ModelActivitystatusCrmsettingsComponent,
            ModelActivitypriorityCrmsettingsComponent,
            ModelPipelinestatusCrmsettingsComponent,
            ModelContactroleCrmsettingsComponent,
            ModelQuotetermsCrmsettingsComponent,
        // HRMS settings
            ModelLeavetypeHrmssettingsComponent,
            ModelExpensestypeHrmssettingsComponent,
        // HR settings
            ModelEmployeecategoryHrsettingsComponent,
            ModelDepartmentHrsettingsComponent,
            ModelDesignationHrsettingsComponent,
       // Account Settings
            ModelTaxesAccountsettingsComponent,
            ModelBankAccountsettingsComponent,
            ModelIncometypeAccountsettingsComponent,
            ModelAssettypeAccountsettingsComponent,
            ModelPaymenttermsAccountsettingsComponent,
   // Components
    // Common-Components
        // delete-confirmation
                 DeleteConfirmationComponent,
    // CRM Folder
        // Customers
            // crm-customers-list
                CrmCustomersListComponent,
                 // main crm customers view
                    MainCrmCustomersViewComponent,
                    // SubComponents
                    AboutCrmCustomersViewComponent,
                    ContactCrmCustomersViewComponent,
                    ActivityCrmCustomersViewComponent,
                     InvoiceCrmCustomersViewComponent,
                    CrmCustomersCreateComponent,
        // Invoice
        CrmInvoiceCreateComponent,
        CrmInvoiceListComponent,
        CrmInvoiceViewComponent,

    // models
    // HRMS Folder
        // main hrms
            MainHrmsComponentsComponent,
              // SubComponents
                DashboardHrmsComponent,
                LeavesHrmsComponent,
                OndutyHrmsComponent,
                PermissionsHrmsComponent,
                AdvanceHrmsComponent,
    // models
        // HRMS
                ModelLeavesHrmsComponent,
                ModelOndutyHrmsComponent,
                ModelPermissionsHrmsComponent,
                ModelAdvanceHrmsComponent,



   // Accounts Folder
        // Customer
            AccountsCustomerListComponent,
            AccountsCustomerInvoiceListComponent,
            AccountsCustomerPaymentsListComponent,
            AccountsCustomerInvoiceViewComponent,
        // vendor
            AccountsCustomerPaymentsViewComponent,
            AccountsVendorListComponent,
            AccountsVendorbillsListComponent,

            CustomerPaymentsCreateComponent,
            VendorPaymentsListComponent,
            VendorPaymentsCreateComponent,
            VendorPaymentsViewComponent,
            DashboardComponent,
            CrmMachinesListComponent,
            CrmMachinesCreateComponent,
            CrmMachinesViewComponent,
            MachinesCrmCustomersViewComponent,
            TicketsCrmCustomersViewComponent,
            CrmTicketsCreateComponent,
            CrmTicketsListComponent,
            CrmTicketsViewComponent,











   ],
   imports: [
      // Default Modules
         BrowserModule,
         BrowserAnimationsModule,
         RouterModule,
         HttpModule,
         HttpClientModule,
        // future modules
         ModalModule.forRoot(),
         AccordionModule.forRoot(),
         BsDropdownModule.forRoot(),
         CalendarModule,
         MatButtonModule,
         MatFormFieldModule,
         MatSelectModule,
      // Custom Modules
          AppRoutingModule,
   ],
   providers: [],
   entryComponents: [ModelCompanyinfoCompanysettingsComponent,
    ModelContactinfoCompanysettingsComponent,
    ModelDepartmentsCompanysettingsComponent,
    ModelBranchCompanysettingsComponent,
    ModelRegistrationinfoCompanysettingsComponent,
    ModelPfinfoCompanysettingsComponent,
    ModelEsiinfoCompanysettingsComponent,
    ModelPtinfoCompanysettingsComponent,
    ModelItinfoCompanysettingsComponent,
    ModelRegistrationtypeCompanysettingsComponent,
    ModelIndustrytypeCrmsettingsComponent,
    ModelOwnershipytypeCrmsettingsComponent,
    ModelActivitytypeCrmsettingsComponent,
    ModelActivitystatusCrmsettingsComponent,
    ModelActivitypriorityCrmsettingsComponent,
    ModelPipelinestatusCrmsettingsComponent,
    ModelContactroleCrmsettingsComponent,
    ModelQuotetermsCrmsettingsComponent,
    ModelLeavetypeHrmssettingsComponent,
    ModelExpensestypeHrmssettingsComponent,
    ModelEmployeecategoryHrsettingsComponent,
    ModelDepartmentHrsettingsComponent,
    ModelDesignationHrsettingsComponent,
   ModelTaxesAccountsettingsComponent,
    ModelBankAccountsettingsComponent,
    ModelIncometypeAccountsettingsComponent,
    ModelAssettypeAccountsettingsComponent,
    ModelPaymenttermsAccountsettingsComponent,
    DeleteConfirmationComponent,
    ModelLeavesHrmsComponent,
    ModelOndutyHrmsComponent,
    ModelPermissionsHrmsComponent,
    ModelAdvanceHrmsComponent],
   bootstrap: [AppComponent]
})
export class AppModule { }

