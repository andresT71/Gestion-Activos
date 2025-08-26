// src/app/reportes/reportes.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService, Activo } from '../../shared/api.service';

@Component({
  standalone: true,
  selector: 'app-reportes',
  imports: [CommonModule, FormsModule],
  template: `
    <div class="card p-4 shadow">
      <h3 class="mb-3">Reportes de Activos</h3>

      <!-- Filtros -->
      <div class="row mb-4">
        <div class="col-md-4">
          <label class="form-label">Buscar por nombre:</label>
          <input type="text" class="form-control" [(ngModel)]="filtroNombre" 
                 placeholder="Ej: Notebook" (input)="filtrarActivos()">
        </div>
        <div class="col-md-4">
          <label class="form-label">Filtrar por ubicación:</label>
          <select class="form-select" [(ngModel)]="filtroUbicacion" (change)="filtrarActivos()">
            <option value="">Todas las ubicaciones</option>
            <option *ngFor="let loc of ubicacionesUnicas" [value]="loc">{{ loc }}</option>
          </select>
        </div>
        <div class="col-md-4">
          <label class="form-label">Ordenar por:</label>
          <select class="form-select" [(ngModel)]="orden" (change)="filtrarActivos()">
            <option value="nombre">Nombre (A-Z)</option>
            <option value="nombre-desc">Nombre (Z-A)</option>
            <option value="fecha">Fecha (más reciente)</option>
            <option value="fecha-desc">Fecha (más antigua)</option>
          </select>
        </div>
      </div>

      <!-- Estado de carga -->
      <div *ngIf="cargando" class="alert alert-info">
        <div class="spinner-border spinner-border-sm me-2" role="status"></div>
        Cargando activos...
      </div>

      <!-- Error -->
      <div *ngIf="error" class="alert alert-danger">
        {{ error }}
      </div>

      <!-- Estadísticas -->
      <div *ngIf="!cargando && activosFiltrados.length > 0" class="mb-3">
        <div class="row">
          <div class="col-md-3">
            <div class="card text-center">
              <div class="card-body">
                <h5 class="card-title">{{ activosFiltrados.length }}</h5>
                <p class="card-text">Activos totales</p>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="card text-center">
              <div class="card-body">
                <h5 class="card-title">{{ ubicacionesUnicas.length }}</h5>
                <p class="card-text">Ubicaciones</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Tabla de activos -->
      <div *ngIf="!cargando && activosFiltrados.length > 0">
        <div class="table-responsive">
          <table class="table table-striped table-hover">
            <thead class="table-dark">
              <tr>
                <th>Código</th>
                <th>Nombre</th>
                <th>Ubicación</th>
                <th>Número de Serie</th>
                <th>Fecha de Registro</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let activo of activosFiltrados">
                <td><strong>{{ activo.id }}</strong></td>
                <td>{{ activo.name }}</td>
                <td>
                  <span class="badge bg-secondary">{{ activo.location || 'Sin ubicación' }}</span>
                </td>
                <td>{{ activo.serial || 'N/A' }}</td>
                <td>{{ activo.created_at | date:'medium' }}</td>
                <td>
                  <button class="btn btn-sm btn-outline-primary me-1" (click)="verDetalles(activo)">
                    👁️ Ver
                  </button>
                  <button class="btn btn-sm btn-outline-info" (click)="generarQR(activo)">
                    📋 QR
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Sin resultados -->
      <div *ngIf="!cargando && activosFiltrados.length === 0" class="alert alert-warning">
        No se encontraron activos con los filtros aplicados.
      </div>
    </div>
  `
})
export class ReportesComponent implements OnInit {
  activos: Activo[] = [];
  activosFiltrados: Activo[] = [];
  cargando = false;
  error = '';

  // Filtros
  filtroNombre = '';
  filtroUbicacion = '';
  orden = 'nombre';

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.cargarActivos();
  }

  cargarActivos() {
    this.cargando = true;
    this.error = '';

    this.apiService.obtenerActivos().subscribe({
      next: (activos) => {
        this.activos = activos;
        this.filtrarActivos();
        this.cargando = false;
      },
      error: (err) => {
        this.error = 'Error al cargar los activos: ' + (err.error?.error || err.message);
        this.cargando = false;
        console.error('Error:', err);
      }
    });
  }

  filtrarActivos() {
    this.activosFiltrados = this.activos.filter(activo => {
      const coincideNombre = !this.filtroNombre || 
        activo.name.toLowerCase().includes(this.filtroNombre.toLowerCase());
      
      const coincideUbicacion = !this.filtroUbicacion || 
        activo.location === this.filtroUbicacion;

      return coincideNombre && coincideUbicacion;
    });

    // Ordenar
    this.activosFiltrados.sort((a, b) => {
      switch (this.orden) {
        case 'nombre':
          return a.name.localeCompare(b.name);
        case 'nombre-desc':
          return b.name.localeCompare(a.name);
        case 'fecha':
          return new Date(b.created_at!).getTime() - new Date(a.created_at!).getTime();
        case 'fecha-desc':
          return new Date(a.created_at!).getTime() - new Date(b.created_at!).getTime();
        default:
          return 0;
      }
    });
  }

  // Getter para ubicaciones únicas
  get ubicacionesUnicas(): string[] {
    const ubicaciones = this.activos
      .map(a => a.location)
      .filter(loc => loc && loc.trim() !== '');
    return [...new Set(ubicaciones)].sort();
  }

  verDetalles(activo: Activo) {
    alert(`Detalles de ${activo.name}\nCódigo: ${activo.id}\nUbicación: ${activo.location || 'N/A'}\nSerie: ${activo.serial || 'N/A'}`);
  }

  generarQR(activo: Activo) {
    const qrData = JSON.stringify({
      id: activo.id,
      name: activo.name,
      location: activo.location,
      serial: activo.serial,
      ts: new Date().toISOString()
    });
    
    const ventana = window.open('', '_blank');
    if (ventana) {
      ventana.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>QR de ${activo.name}</title>
          <style>body { text-align: center; padding: 20px; }</style>
        </head>
        <body>
          <h3>${activo.name}</h3>
          <p><strong>Código:</strong> ${activo.id}</p>
          <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrData)}">
        </body>
        </html>
      `);
      ventana.document.close();
    }
  }
}