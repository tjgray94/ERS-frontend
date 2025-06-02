import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Reimbursement } from '../reimbursement';
import { ReimbService } from '../reimb.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-reimb-list',
  templateUrl: './reimb-list.component.html',
  styleUrls: ['./reimb-list.component.css']
})
export class ReimbListComponent implements OnInit {

  empId: number;
  reimbId: number;
  reimbs!: Reimbursement[];
  currentReimb?: Reimbursement;
  currentRoute: string = '';
  currentIndex = -1;
  jobTitle: string = '';
  @ViewChild('reimbursementForm') form!: NgForm;

  constructor(private reimbService: ReimbService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.empId = this.route.snapshot.params['empId'];
    this.reimbId = this.route.snapshot.params['reimbId'];

    this.currentRoute = this.route.snapshot.url.join('/');
    
    if (this.currentRoute.includes('manager')) {
      this.jobTitle = 'manager';
      this.reimbService.getAll().subscribe((data) => { 
        this.reimbs = data;
      });
    } else if (this.currentRoute.includes('employee')) {
      this.jobTitle = 'employee';
      this.reimbService.getByEmpId(this.empId).subscribe((data) => { this.reimbs = data });
    }   
  }

  setActiveReimb(reimb: Reimbursement, index: number): void {
    this.currentReimb = reimb;
    this.currentIndex = index;
  }

  selectReimb() {
    this.router.navigate([`employee/${this.empId}/reimbursements/${this.reimbId}`]);
  }

  goBack() {
    if (this.currentRoute.includes('manager')) {
      this.router.navigate([`manager/${this.empId}`]);
    } else {
      this.router.navigate([`employee/${this.empId}`]);
    }
  }
}
