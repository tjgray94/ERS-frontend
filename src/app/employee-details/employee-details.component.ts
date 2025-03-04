import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';

@Component({
  selector: 'employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  currentEmployee: Employee;
  id!: number;
  showPassword: boolean = false;

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['empId'];
    this.getEmployee(this.id);
  }

  getEmployee(id: number): void {
    this.employeeService.get(id).subscribe(data => {
      this.currentEmployee = data;
      console.log(data)
    },
    error => {
      console.log(error);
    })
  }

  updateEmployee() {
    this.router.navigate([`manager/${this.id}/edit`]);
  }

  deleteEmployee(): void {
    this.employeeService.delete(this.currentEmployee.empId).subscribe(response => {
      console.log(response);
      this.router.navigate(['/employees']);
    },
    error => {
      console.log(error);
    })
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  goBack() {
    window.history.back();
  }
}
