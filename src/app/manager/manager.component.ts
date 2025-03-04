import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {

  fName: string = 'Manager';
  id: number;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['empId'];
  }

  viewEmployees() {
    this.router.navigate([`manager/${this.id}/employees`]);
  }

  allReimbursements(){
    this.router.navigate([`manager/${this.id}/reimbursements`]);
  }

  newEmployee(){
    this.router.navigate(['employees/add']);
  }

  goBack() {
    window.history.back();
  }
}
