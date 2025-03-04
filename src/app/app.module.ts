import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { ManagerComponent } from './manager/manager.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { EditComponent } from './edit/edit.component';
import { EmployeeComponent } from './employee/employee.component';
import { ReimbListComponent } from './reimb-list/reimb-list.component';
import { ReimbDetailsComponent } from './reimb-details/reimb-details.component';
import { AddReimbComponent } from './add-reimb/add-reimb.component';
import { WelcomeComponent } from './welcome/welcome.component';
  
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    ManagerComponent,
    AddEmployeeComponent,
    EmployeeListComponent,
    EmployeeDetailsComponent,
    EditComponent,
    EmployeeComponent,
    ReimbListComponent,
    ReimbDetailsComponent,
    AddReimbComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
