import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  id!: number;
  employee!: Employee;
  jobTitle: string = '';
  currentPassword: string = '';
  newPassword: string = '';
  passwordMismatch: boolean = false;
  samePasswordError: boolean = false;

  @ViewChild('employeeForm') form!: NgForm;

  constructor(private employeeService: EmployeeService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['empId'];
    this.employeeService.get(this.id).subscribe(data => {
      this.employee = data;
    })

    const currentRoute = this.route.snapshot.url.join('/');

    if (currentRoute.includes('manager')) {
      this.jobTitle = 'manager';
    } else if (currentRoute.includes('employee')) {
      this.jobTitle = 'employee';
    }
  }

  updateJobTitle() {
    const updatedEmployee = { col5title: this.employee.col5title };

    this.employeeService.update(this.id, updatedEmployee).subscribe(() => {
      this.router.navigate([`/manager/${this.id}`]);
    });
  }

  validatePasswords(): void {
    this.samePasswordError = this.newPassword === this.currentPassword;

    if (this.currentPassword.length > 0) {
      this.employeeService.verifyPassword(this.id, this.currentPassword).subscribe(response => {
        this.passwordMismatch = !response.valid;
      },
      () => { this.passwordMismatch = true })
    }
  }

  submit() {
    if (this.samePasswordError) {
      return;
    }

    const updatedEmployee = { currentPassword: this.currentPassword, newPassword: this.newPassword };
    
    this.employeeService.update(this.id, updatedEmployee).subscribe(res => {
      this.router.navigate([`/employee/${this.id}`])
    })
  }

  goBack() {
    window.history.back();
  }
}
