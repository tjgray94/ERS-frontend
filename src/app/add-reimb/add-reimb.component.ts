import { Component, OnInit, ViewChild } from '@angular/core';
import { Reimbursement } from '../reimbursement';
import { ReimbService } from '../reimb.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-reimb',
  templateUrl: './add-reimb.component.html',
  styleUrls: ['./add-reimb.component.css']
})
export class AddReimbComponent implements OnInit {

  id: number;
  reimb: Reimbursement = {
    employee: { empId: 0},
    col2amount: 0,
    col3reason: '',
    col4status: 'Pending'
  };
  submitted = false;
  @ViewChild("reimbursementForm") form: NgForm;

  constructor(private reimbService: ReimbService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['empId'];
  }

  saveReimb(): void {
    const data = {
      employee: { empId: this.id },
      col2amount: this.reimb.col2amount,
      col3reason: this.reimb.col3reason,
      col4status: this.reimb.col4status
    };
    this.reimbService.create(data).subscribe(response => { this.submitted = true })
  }

  newReimb(): void {
    this.submitted = false;
    this.reimb = {
      employee: { empId: 0},
      col2amount: 0,
      col3reason: '',
      col4status: 'Pending'
    }
  }

  home() {
    this.router.navigate([`employee/${this.id}`]);
  }

  goBack() {
    window.history.back();
  }
}
