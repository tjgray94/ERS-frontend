import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  constructor(private employeeService: EmployeeService, private router: Router) { }

  employees!: Employee[];

  ngOnInit(): void {
    this.employeeService.getAll().subscribe(data => {
      this.employees = data;
    },
    error => {
      console.log(error)
    });
  }

  gotoDetails(employee: Employee): void {
    this.router.navigate([`/manager/${employee.empId}/employee-details`])
  }

  delete(id: number | undefined) {
    this.employeeService.delete(id).subscribe(res => {this.employees = this.employees.filter(employee => employee.empId !==id)})
  }

  removeAllEmployees(): void {
    this.employeeService.deleteAll().subscribe(response => {
      console.log(response);
    },
    error => {
      console.log(error);
    });
  }

  goBack() {
    window.history.back();
  }
}
