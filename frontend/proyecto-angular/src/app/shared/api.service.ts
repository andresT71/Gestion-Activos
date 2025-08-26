// frontend/src/app/shared/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Activo {
  id: string;
  name: string;
  location: string;
  serial: string;
  created_at?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000/api'; // URL del backend

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  // Guardar activo en el backend
  guardarActivo(activo: Activo): Observable<any> {
    return this.http.post(`${this.apiUrl}/activos`, activo, this.httpOptions);
  }

  // Obtener todos los activos
  obtenerActivos(): Observable<Activo[]> {
    return this.http.get<Activo[]>(`${this.apiUrl}/activos`);
  }

  // Obtener activo por ID
  obtenerActivoPorId(id: string): Observable<Activo> {
    return this.http.get<Activo>(`${this.apiUrl}/activos/${id}`);
  }

  // ✅ NUEVO: Método para obtener reportes con filtros
  obtenerReportes(filtros?: any): Observable<Activo[]> {
    let params = new HttpParams();
    
    if (filtros) {
      Object.keys(filtros).forEach(key => {
        if (filtros[key]) {
          params = params.append(key, filtros[key]);
        }
      });
    }

    return this.http.get<Activo[]>(`${this.apiUrl}/activos`, { params });
  }

  // Verificar salud del backend
  healthCheck(): Observable<any> {
    return this.http.get(`${this.apiUrl.replace('/api', '')}/health`);
  }
}