import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  employee: Employee = {
    col1fName: '',
    col2lName: '',
    col3username: '',
    col4password: '',
    col5title: ''
  };
  submitted = false;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
  }

  saveEmployee(): void {
    const data = {
      col1fName: this.employee.col1fName,
      col2lName: this.employee.col2lName,
      col3username: this.employee.col3username,
      col4password: this.employee.col4password,
      col5title: this.employee.col5title
    };
    this.employeeService.create(data)
      .subscribe(response => { this.submitted = true })
  }

  newEmployee(): void {
    this.submitted = false;
    this.employee = {
      col1fName: '',
      col2lName: '',
      col3username: '',
      col4password: '',
      col5title: ''
    }
  }

  goBack() {
    window.history.back();
  }
}
