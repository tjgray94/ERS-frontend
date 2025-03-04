import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginError: String;

  constructor(private empService: EmployeeService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const username = this.loginForm.get('username')?.value;
      const password = this.loginForm.get('password')?.value;

      this.empService.login(username, password).subscribe(
        (data) => {
          if (data.jwt && data.empId) {
            const empId = data.empId;
            const title = data.col5title;

            if (title === 'EMPLOYEE') {
              this.router.navigate([`/employee/${empId}`]);
            } else if (title === 'MANAGER') {
              this.router.navigate([`/manager/${empId}`]);
            }
          }
        },
        (error) => {
          console.error('Login Error:', error);
          this.loginError = 'An error occurred. Please try again.'
        }
      )
    }
  }
}
