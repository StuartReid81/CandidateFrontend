import { Routes } from '@angular/router';
import { CandidateListComponent } from './candidate-list/candidate-list.component';
import { CandidateFormComponent } from './candidate-form/candidate-form.component';
import { CandidateDetailComponent } from './candidate-detail/candidate-detail.component';

export const routes: Routes = [
  { path: 'candidates', component: CandidateListComponent },
  { path: 'candidates/create/new', component: CandidateFormComponent },
  { path: 'candidates/edit/:id', component: CandidateFormComponent },
  { path: 'candidates/:id/details', component: CandidateDetailComponent },
  { path: '', redirectTo: '/candidates', pathMatch: 'full' },
  { path: '**', redirectTo: '/candidates' }
];