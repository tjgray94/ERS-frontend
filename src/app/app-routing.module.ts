import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { AddReimbComponent } from './add-reimb/add-reimb.component';
import { EditComponent } from './edit/edit.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeComponent } from './employee/employee.component';
import { ManagerComponent } from './manager/manager.component';
import { ReimbListComponent } from './reimb-list/reimb-list.component';
import { ReimbDetailsComponent } from './reimb-details/reimb-details.component'; 
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'employee/:empId', component: EmployeeComponent },
  { path: 'employee/:empId/edit', component: EditComponent },
  { path: 'employee/:empId/reimbursements', component: ReimbListComponent },
  { path: 'employee/:empId/reimbursements/add', component: AddReimbComponent },
  { path: 'employees/add', component: AddEmployeeComponent },
  { path: 'manager/:empId', component: ManagerComponent },
  { path: 'manager/:empId/reimbursements', component: ReimbListComponent },
  { path: 'manager/:empId/reimbursements/:reimbId', component: ReimbDetailsComponent },
  { path: 'manager/:empId/edit', component: EditComponent },
  { path: 'manager/:empId/employees', component: EmployeeListComponent },
  { path: 'manager/:empId/employee-details', component: EmployeeDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
