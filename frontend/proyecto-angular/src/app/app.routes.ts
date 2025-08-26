import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { RegistroComponent } from './features/registro/registro.component';
import { EscaneoComponent } from './features/escaneo/escaneo.component';
import { ReportesComponent } from './features/reportes/reportes.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'registro', pathMatch: 'full' }, // ✅ redirección interna
      { path: 'registro', component: RegistroComponent },
      { path: 'escaneo', component: EscaneoComponent },
      { path: 'reportes', component: ReportesComponent }
    ]
  },
    // Manejo de rutas no encontradas
  { path: '**', redirectTo: 'login' }
];
