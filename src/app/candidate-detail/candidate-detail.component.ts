import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router'; // For routing
import { CommonModule } from '@angular/common'; // For *ngIf, *ngFor
import { FormsModule } from '@angular/forms'; // For ngModel (for select dropdown)

import { CandidateService } from '../services/candidate.service';
import { SkillService } from '../services/skill.service';
import { Skill } from '../models/skill.model';
import { CandidateSkillService } from '../services/candidate-skill.service';
import { CandidateDTO } from '../DTOs/CandidateDTO.DTOs';
import { ToastrService } from '../services/toastr.service';

@Component({
  selector: 'app-candidate-detail',
  templateUrl: './candidate-detail.component.html',
  styleUrls: ['./candidate-detail.component.css'],
  standalone: true, // This component is standalone
  imports: [CommonModule, FormsModule, RouterModule] 
})

export class CandidateDetailComponent implements OnInit {
  candidate: CandidateDTO | null = null;
  allSkills: Skill[] = [];
  selectedSkillIdToAdd: number | null = null;
  isUpdatingSkills: boolean = false;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private candidateService: CandidateService,
    private candidateSkillService: CandidateSkillService,
    private skillService: SkillService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const candidateId = params.get('id');
      if (candidateId) {
        this.loadCandidateWithSkills(+candidateId);
        this.loadAllSkills();
      }
    });
  }

  loadCandidateWithSkills(candidateId: number): void {
    this.candidateService.getCandidateById(candidateId).subscribe({
      next: data => {
        this.candidate = data;
        console.log(data);
      },
      error: error => {
        console.error('Error fetching candidate with skills:', error);
      }
    });
  }

  loadAllSkills(): void {
    this.skillService.getSkills().subscribe({
      next: data => {
        this.allSkills = data;
        console.log(data);
      },
      error: error => {
        console.error('Error fetching skills:', error);
      }
    });
  }

  addSkill(): void {
    //check for selected skill
    if (!this.selectedSkillIdToAdd) {
      this.toastr.warning('Please select a skill to add.', 'Selection Required');
      return;
    }

    //ensure we have a candidate
    if (!this.candidate || !this.candidate.id) {
      this.toastr.error('Candidate data not loaded.', 'Error');
      return;
    }

    //make sure they dont have the skill already
    const isSkillAlreadyAdded = this.candidate.skills.some(
      s => s.id === this.selectedSkillIdToAdd
    );

    if (isSkillAlreadyAdded) {
      const skillName = this.allSkills.find(s => s.id === this.selectedSkillIdToAdd)?.skillName || 'Selected Skill';
      this.toastr.info(`'${skillName}' is already assigned to this candidate.`, 'Duplicate Skill');
      return;
    }

    this.isUpdatingSkills = true;
    let candidateId = this.candidate.id;
    this.candidateService.addSkillToCandidate(this.candidate.id, this.selectedSkillIdToAdd).subscribe({
      next: () => {
        const skillName = this.allSkills.find(s => s.id === this.selectedSkillIdToAdd)?.skillName || 'Skill';
        this.toastr.success(`Skill '${skillName}' added successfully!`, 'Success');
        this.selectedSkillIdToAdd = null; // Reset dropdown
        this.isUpdatingSkills = false;
        this.loadCandidateWithSkills(candidateId);
      },
      error: error => {
        console.error('Error adding skill:', error);
        this.toastr.error('Failed to add skill!', 'Error');
        this.isUpdatingSkills = false;
      }
    });
  }

  removeSkill(skillIdToRemove: number, skillName: string): void {
    if (!this.candidate || !this.candidate.id) {
      this.toastr.error('Candidate data not loaded.', 'Error');
      return;
    }

    if (confirm(`Are you sure you want to remove skill '${skillName}'?`)) {
      this.isUpdatingSkills = true;
      let candidateId = this.candidate.id;
      this.candidateService.removeSkillFromCandidate(candidateId, skillIdToRemove).subscribe({
        next: () => {
          this.toastr.success(`Skill '${skillName}' removed successfully!`, 'Success');
          this.isUpdatingSkills = false;
          //reload
          this.loadCandidateWithSkills(candidateId);
        },
        error: error => {
          console.error('Error removing skill:', error);
          this.toastr.error('Failed to remove skill!', 'Error');
          this.isUpdatingSkills = false;
        }
      });
    }
  }

  // Method to navigate to the edit page
  editCandidate(): void {
    if (this.candidate && this.candidate.id) {
      this.router.navigate(['/candidates/edit', this.candidate.id]);
    }
  }

  goBack(): void {
    this.router.navigate(['/candidates']);
  }
}