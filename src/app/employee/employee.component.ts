import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  fName: string = '';
  id: number;
  currentEmployee: Employee

  constructor(private router: Router, private route: ActivatedRoute, private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['empId'];
    this.employeeService.get(this.id).subscribe(data => {
      this.currentEmployee = data;
      this.fName = this.currentEmployee.col1fName;
    },
    error => {
      console.log(error);
    })
  }
  
  newReimbursement(){
    this.router.navigate([`employee/${this.id}/reimbursements/add`]);
  }

  seeRequests(){
    this.router.navigate([`employee/${this.id}/reimbursements`]);
  }

  updatePassword(){
    this.router.navigate([`employee/${this.id}/edit`])
  }
}
