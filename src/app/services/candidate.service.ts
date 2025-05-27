import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CandidateDTO } from '../DTOs/CandidateDTO.DTOs';
import { CreateCandidateDTO } from '../DTOs/CreateCandidateDTO.DTOs';
import { UpdateCandidateDTO } from '../DTOs/UpdateCandidateDTO.DTOs';


@Injectable({
  providedIn: 'root'
})

export class CandidateService {
  private apiUrl = 'http://localhost:5287/api/candidates';

  constructor(private http: HttpClient) { }

  getCandidates(): Observable<CandidateDTO[]> {
    return this.http.get<CandidateDTO[]>(`${this.apiUrl}/get/all`);
  }

  getCandidateById(candidateId: number): Observable<CandidateDTO> {
    return this.http.get<CandidateDTO>(`${this.apiUrl}/get/${candidateId}`)
  }

  createCandidate(candidate: CreateCandidateDTO): Observable<CreateCandidateDTO> {
    return this.http.post<CreateCandidateDTO>(`${this.apiUrl}/create`, candidate);
  }

  updateCandidate(candidateId: number, candidate: UpdateCandidateDTO): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/update/${candidateId}`, candidate);
  }

  addSkillToCandidate(candidateId: number, skillId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/skills/add`, { candidateId, skillId });
  }

  removeSkillFromCandidate(candidateId: number, skillId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/skills/remove`, { body: { candidateId, skillId} });
  }
}