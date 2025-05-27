// src/app/candidate-form/candidate-form.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; // Import Validators
import { CommonModule } from '@angular/common';
import { CandidateService } from '../services/candidate.service';
import { Candidate } from '../models/candidate.model';
import { CreateCandidateDTO } from '../DTOs/CreateCandidateDTO.DTOs';
import { UpdateCandidateDTO } from '../DTOs/UpdateCandidateDTO.DTOs';
import { ToastrService } from '../services/toastr.service';
import { cssNumber } from 'jquery';

@Component({
  selector: 'app-candidate-form',
  templateUrl: './candidate-form.component.html',
  styleUrls: ['./candidate-form.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})

export class CandidateFormComponent implements OnInit {
  candidateForm!: FormGroup;
  isEditMode = false;
  candidateId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private candidateService: CandidateService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.candidateForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      DOB: ['', Validators.required],
      firstLineOfAddress: ['', Validators.maxLength(100)],
      addressCity: ['', Validators.maxLength(50)],
      addressCountry: ['', Validators.maxLength(50)],
      addressPostCode: ['', [Validators.maxLength(10), Validators.pattern(/^[A-Za-z0-9 ]+$/)]],
      homePhoneNo: ['', [Validators.maxLength(20), Validators.pattern(/^\+?[0-9\s-()]*$/)]],
      mobilePhoneNo: ['', [Validators.maxLength(20), Validators.pattern(/^\+?[0-9\s-()]*$/)]],
      workPhoneNo: ['', [Validators.maxLength(20), Validators.pattern(/^\+?[0-9\s-()]*$/)]],
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.isEditMode = true;
        this.candidateId = +id;
        this.candidateService.getCandidateById(this.candidateId).subscribe({
          next: candidate => {
            let dobForForm: string | Date = '';

            if (candidate.formattedDOB) {
                dobForForm = candidate.formattedDOB;
            }

            this.candidateForm.patchValue({
              ...candidate,
              DOB: dobForForm
            });
          },
          error: error => {
            console.error('Error fetching candidate for edit:', error);
            this.toastr.error('Failed to load candidate for editing!', 'Error');
            this.router.navigate(['/candidates']);
          }
        });
      }
    });
  }

  // Helper method to check if a form control is invalid and should show errors
  isInvalid(controlName: string): boolean {
    const control = this.candidateForm.get(controlName);
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }

  // Helper method to get specific errors
  getControlErrors(controlName: string, errorType: string): boolean {
    const control = this.candidateForm.get(controlName);
    return control ? control.errors?.[errorType] && (control.dirty || control.touched) : false;
  }

  onSubmit(): void {
    // Mark all controls as touched to display errors on untouched invalid fields
    this.candidateForm.markAllAsTouched();

    if (this.candidateForm.valid) {
      const candidate: Candidate = this.candidateForm.value;

      // Ensure DOB is a Date object if it comes as string from form input type="date"
      if (typeof candidate.DOB === 'string') {
        candidate.DOB = new Date(candidate.DOB);
      }

      if (this.isEditMode && this.candidateId) {
        const updateCandidateDTO: UpdateCandidateDTO = {
          id: candidate.id,
          name: candidate.name,
          lastName: candidate.lastName,
          DOB: candidate.DOB.toISOString(),
          firstLineOfAddress: candidate.firstLineOfAddress,
          addressCity: candidate.addressCity,
          addressCountry: candidate.addressCountry,
          addressPostCode: candidate.addressPostCode,
          homePhoneNo: candidate.homePhoneNo,
          mobilePhoneNo: candidate.mobilePhoneNo,
          workPhoneNo: candidate.workPhoneNo,
          formattedDOB: ""
        }

        this.candidateService.updateCandidate(this.candidateId, updateCandidateDTO).subscribe({
          next: (data) => {
            
            this.toastr.success('Candidate updated successfully!', 'Success');
            this.router.navigate([`/candidates/${this.candidateId}/details`]);
          },
          error: error => {
            console.error('Error updating candidate:', error);
            this.toastr.error('Failed to update candidate!', 'Error');
          }
        });
      } else {
        candidate.id = 0; // Assuming API assigns ID on creation

        const createCandidateDTO: CreateCandidateDTO = {
          id: candidate.id,
          name: candidate.name,
          lastName: candidate.lastName,
          DOB: candidate.DOB.toISOString(),
          firstLineOfAddress: candidate.firstLineOfAddress,
          addressCity: candidate.addressCity,
          addressCountry: candidate.addressCountry,
          addressPostCode: candidate.addressPostCode,
          homePhoneNo: candidate.homePhoneNo,
          mobilePhoneNo: candidate.mobilePhoneNo,
          workPhoneNo: candidate.workPhoneNo,
          formattedDOB: "",
        };
      

        this.candidateService.createCandidate(createCandidateDTO).subscribe({
          next: (createdCandidate) => {
            this.toastr.success('Candidate created successfully!', 'Success');
            this.router.navigate([`/candidates/${createdCandidate.id}/details`]);
          },
          error: error => {
            console.error('Error creating candidate:', error);
            this.toastr.error('Failed to create candidate!', 'Error');
          }
        });
      }
    } else {
      this.toastr.warning('Please correct the highlighted errors.', 'Validation Error');
    }
  }
}