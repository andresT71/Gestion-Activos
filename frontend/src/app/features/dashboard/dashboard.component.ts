import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  template:   `
       <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container-fluid">
        <a class="navbar-brand" >Activos QR</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <a class="nav-link" 
                 [routerLink]="['registro']" 
                 routerLinkActive="active" 
                 [routerLinkActiveOptions]="{ exact: true }">
                 Registro
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" 
                 [routerLink]="['escaneo']" 
                 routerLinkActive="active" 
                 [routerLinkActiveOptions]="{ exact: true }">
                 Escaneo
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" 
                 [routerLink]="['reportes']" 
                 routerLinkActive="active" 
                 [routerLinkActiveOptions]="{ exact: true }">
                 Reportes
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="container mt-4">
      <router-outlet></router-outlet>
    </div>
  `,
    styles: [`
    .nav-link.active {
      font-weight: bold;
      background-color: rgba(255,255,255,0.2);
      border-radius: 5px;
    }
  `]
})
export class DashboardComponent {

}
