import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReimbService } from '../reimb.service';
import { Reimbursement } from '../reimbursement';

@Component({
  selector: 'app-reimb-details',
  templateUrl: './reimb-details.component.html',
  styleUrls: ['./reimb-details.component.css']
})
export class ReimbDetailsComponent implements OnInit {

  empId: number;
  reimbId: number;
  reimbursement!: Reimbursement;
  reimbs!: Reimbursement[];

  constructor(private reimbService: ReimbService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.empId = this.route.snapshot.params['empId'];
    this.reimbId = this.route.snapshot.params['reimbId'];
    this.reimbService.get(this.reimbId).subscribe(data => {
      this.reimbursement = data;
      console.log(this.reimbursement)
    })
  }

  submit() {
    const data = {
      employee: this.reimbursement.employee ? { empId: this.reimbursement.employee.empId } : null,
      col2amount: this.reimbursement.col2amount,
      col3reason: this.reimbursement.col3reason,
      col4status: this.reimbursement.col4status
    };
  
    this.reimbService.update(this.reimbId, data).subscribe(res => {
      this.router.navigate([`manager/${this.empId}/reimbursements`]);
    })
  }

  getEmployeeId(): string {
    if (!this.reimbursement) return 'N/A';
    
    // Try to access empId from different possible locations
    if (this.reimbursement.hasOwnProperty('empId')) {
      return this.reimbursement['empId'];
    } else if (this.reimbursement.employee && this.reimbursement.employee.empId) {
      return this.reimbursement.employee.empId;
    } else {
      return 'N/A';
    }
  }
  
  back() {
    this.router.navigate([`manager/${this.empId}/reimbursements`]);
  }
}
