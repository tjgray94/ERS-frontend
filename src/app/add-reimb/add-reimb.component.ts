import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Reimbursement } from '../reimbursement';
import { ReimbService } from '../reimb.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-reimb',
  templateUrl: './add-reimb.component.html',
  styleUrls: ['./add-reimb.component.css']
})
export class AddReimbComponent implements OnInit {

  id: number;
  reimbForm: FormGroup;
  submitted = false;

  constructor(
    private reimbService: ReimbService, 
    private route: ActivatedRoute, 
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['empId'];
    
    this.reimbForm = this.fb.group({
      col2amount: [0, [Validators.required, Validators.min(0.01)]],
      col3reason: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  // Convenience getter for easy access to form fields
  get f() { return this.reimbForm.controls; }

  saveReimb(): void {
    this.submitted = true;

    // Stop here if form is invalid
    if (this.reimbForm.invalid) {
      return;
    }

    const data = {
      employee: { empId: this.id },
      col2amount: this.f.col2amount.value,
      col3reason: this.f.col3reason.value,
      col4status: 'Pending'
    };
    
    this.reimbService.create(data).subscribe(response => { 
      this.submitted = true;
    });
  }

  newReimb(): void {
    this.submitted = false;
    this.reimbForm.reset({
      col2amount: 0,
      col3reason: ''
    });
  }

  home() {
    this.router.navigate([`employee/${this.id}`]);
  }

  goBack() {
    window.history.back();
  }
}
