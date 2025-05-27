import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // For *ngIf etc.
import { RouterOutlet, RouterModule } from '@angular/router'; // For router-outlet and routerLink

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule], // <--- Add these
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CandidateSkillApp';
}