import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  employeeForm: FormGroup;
  submitted = false;
  passwordMismatch = false;

  constructor(
    private employeeService: EmployeeService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      col1fName: ['', [Validators.required, Validators.minLength(2)]],
      col2lName: ['', [Validators.required, Validators.minLength(2)]],
      col3username: ['', [Validators.required, Validators.minLength(6)]],
      col4password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
      col5title: ['', [Validators.required]]
    });
  }

  // Convenience getter for easy access to form fields
  get f() { return this.employeeForm.controls; }

  checkPasswordMatch() {
    const password = this.f.col4password.value;
    const confirmPassword = this.f.confirmPassword.value;
    
    // Only check if both fields have values
    if (password && confirmPassword) {
      this.passwordMismatch = password !== confirmPassword;
    } else if (password || confirmPassword) {
      // If only one field has a value, they don't match
      this.passwordMismatch = true;
    }
  }

  saveEmployee(): void {
    this.submitted = true;
    this.checkPasswordMatch();

    // Stop here if form is invalid or passwords don't match
    if (this.employeeForm.invalid || this.passwordMismatch) {
      // Mark all fields as touched to trigger validation display
      Object.keys(this.employeeForm.controls).forEach(key => {
        const control = this.employeeForm.get(key);
        control.markAsTouched();
      });
      return;
    }

    const data = {
      col1fName: this.f.col1fName.value,
      col2lName: this.f.col2lName.value,
      col3username: this.f.col3username.value,
      col4password: this.f.col4password.value,
      col5title: this.f.col5title.value
    };

    this.employeeService.create(data)
      .subscribe(response => { 
        this.submitted = true;
      });
  }

  newEmployee(): void {
    this.submitted = false;
    this.passwordMismatch = false;
    this.employeeForm.reset();
  }

  goBack() {
    window.history.back();
  }
}
