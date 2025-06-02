import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { ReimbService } from '../reimb.service';

@Component({
  selector: 'manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {

  fName: string = 'Manager';
  id: number;
  
  // Stats for dashboard
  totalEmployees: number = 0;
  pendingRequests: number = 0;
  totalReimbursed: number = 0;

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private reimbService: ReimbService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['empId'];
    
    // Get manager details
    this.employeeService.get(this.id).subscribe(data => {
      if (data && data.col1fName) {
        this.fName = data.col1fName;
      }
    });
    
    this.loadDashboardStats();
  }

  loadDashboardStats() {
    // Get total employees count
    this.employeeService.getAll().subscribe(employees => {
      this.totalEmployees = employees.length;
    });
    
    // Get pending requests count and total reimbursed amount
    this.reimbService.getAll().subscribe(reimbursements => {
      // Count pending requests
      this.pendingRequests = reimbursements.filter(reimb => 
        reimb.col4status === 'Pending'
      ).length;
      
      // Calculate total reimbursed amount
      this.totalReimbursed = reimbursements
        .filter(reimb => reimb.col4status === 'Accepted')
        .reduce((total, reimb) => total + (reimb.col2amount || 0), 0);
    });
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
