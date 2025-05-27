import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CandidateSkill } from '../models/candidateSkill.model';
import { Candidate } from '../models/candidate.model';

@Injectable({
  providedIn: 'root'
})
export class CandidateSkillService {
  private apiUrl = 'https://localhost:7023/api/candidates';

  constructor(private http: HttpClient) { }

  getCandidatesWithSkills(): Observable<Candidate[]> {
    return this.http.get<Candidate[]>(`${this.apiUrl}/get/all`);
  }

  addSkillToCandidate(candidateSkill: CandidateSkill): Observable<any> {
    return this.http.post(`${this.apiUrl}/skills/add`, candidateSkill);
  }

  removeSkillFromCandidate(candidateSkillId: number): Observable<any> {
    // Assuming your API supports deleting by CandidateSkillId or a combination of CandidateId and SkillId
    return this.http.delete(`<span class="math-inline">${this.apiUrl}/skills/remove/</span>${candidateSkillId}`);
  }
}