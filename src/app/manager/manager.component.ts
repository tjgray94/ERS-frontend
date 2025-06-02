import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../employee.service';

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
    private employeeService: EmployeeService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['empId'];
    
    // Get manager details
    this.employeeService.get(this.id).subscribe(data => {
      if (data && data.col1fName) {
        this.fName = data.col1fName;
      }
    });
    
    // You would typically fetch these stats from your service
    // This is placeholder code - replace with actual API calls
    this.loadDashboardStats();
  }

  loadDashboardStats() {
    // Placeholder for loading dashboard statistics
    // Replace with actual API calls to get real data
    this.totalEmployees = 12;
    this.pendingRequests = 5;
    this.totalReimbursed = 2450;
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
