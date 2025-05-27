import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common'; // For *ngIf, *ngFor
import { RouterModule } from '@angular/router'; // For routerLink
import { CandidateService } from '../services/candidate.service';
import { Candidate } from '../models/candidate.model';
import { CandidateDTO } from '../DTOs/CandidateDTO.DTOs';
import { ToastrService } from '../services/toastr.service';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})

export class CandidateListComponent implements OnInit {

  candidates: CandidateDTO[] = [];

  constructor(private candidateService: CandidateService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadCandidates();
  }

  loadCandidates(): void {
    this.candidateService.getCandidates().subscribe({
      next: data => {
        this.candidates = data;
        console.log(data);
      },
      error: error => {
        console.error('Error fetching candidates:', error);
      }
    });
  }

  editCandidate(candidate: Candidate): void {
    console.log('Edit candidate:', candidate);
  }

  deleteCandidate(candidateId: number): void {
    console.log('Delete candidate:', candidateId);
    this.toastr.success("Candidate Deleted");
  }
}