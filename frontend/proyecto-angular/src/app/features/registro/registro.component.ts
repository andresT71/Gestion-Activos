import { Component, computed } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
} from "@angular/forms";
import { QRCodeModule } from "angularx-qrcode";

import { StorageService } from "../../shared/storage.service";
import { ApiService, Activo } from "src/app/shared/api.service";

@Component({
  standalone: true,
  selector: "app-registro",
  imports: [CommonModule, ReactiveFormsModule, QRCodeModule],
  template: `
    <div class="card p-4 shadow">
      <h3 class="mb-3">Registro de Activo</h3>

      <!-- Mensajes de estado -->
      <div *ngIf="loading" class="alert alert-info">
        Guardando en el servidor...
      </div>
      <div *ngIf="error" class="alert alert-danger">{{ error }}</div>
      <div *ngIf="success" class="alert alert-success">{{ success }}</div>

      <form [formGroup]="form" (ngSubmit)="save()">
        <div class="mb-3">
          <label class="form-label">Código *</label>
          <input
            class="form-control"
            formControlName="id"
            placeholder="ACT-0001"
          />
          <div
            *ngIf="form.get('id')?.invalid && form.get('id')?.touched"
            class="text-danger"
          >
            Código es requerido
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label">Nombre *</label>
          <input
            class="form-control"
            formControlName="name"
            placeholder="Notebook Lenovo"
          />
          <div
            *ngIf="form.get('name')?.invalid && form.get('name')?.touched"
            class="text-danger"
          >
            Nombre es requerido
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label">Ubicación</label>
          <input
            class="form-control"
            formControlName="location"
            placeholder="Bodega / Oficina"
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Serie</label>
          <input
            class="form-control"
            formControlName="serial"
            placeholder="SN123456"
          />
        </div>

        <div class="d-flex gap-2 mb-3">
          <button
            type="submit"
            class="btn btn-success"
            [disabled]="form.invalid || loading"
          >
            {{ loading ? "Guardando..." : "Guardar en Servidor" }}
          </button>
          <button
            type="button"
            class="btn btn-primary"
            (click)="generarQR()"
            [disabled]="form.invalid"
          >
            Generar QR
          </button>
          <button
            type="button"
            class="btn btn-outline-secondary"
            (click)="limpiarFormulario()"
          >
            Limpiar
          </button>
        </div>
      </form>

      <div *ngIf="qrData" class="mt-4 text-center">
        <h5>QR Generado:</h5>
        <qrcode
          [qrdata]="qrData"
          [width]="200"
          [errorCorrectionLevel]="'M'"
        ></qrcode>
        <div class="mt-3">
          <p class="text-muted small">
            Escanea para ver información del activo
          </p>
          <button class="btn btn-secondary me-2" (click)="imprimirQR()">
            Imprimir QR
          </button>
          <button class="btn btn-outline-danger" (click)="qrData = ''">
            Eliminar QR
          </button>
        </div>
      </div>
    </div>
  `,
})
export class RegistroComponent {
  form: FormGroup;
  qrData: string = "";
  loading = false;
  error = "";
  success = "";

  constructor(
    private fb: FormBuilder,
    private storage: StorageService,
    private apiService: ApiService
  ) {
    this.form = this.fb.group({
      id: ["", Validators.required],
      name: ["", Validators.required],
      location: [""],
      serial: [""],
    });
    // Verificar conexión con el backend al iniciar
    this.verificarConexion();
  }

  // Verificar que el backend esté respondiendo
  verificarConexion() {
    this.apiService.healthCheck().subscribe({
      next: (): void => console.log("✅ Backend conectado"),
      error: (err: any): void => console.warn("⚠️ Backend no disponible:", err),
    });
  }

  async save() {
    if (this.form.valid) {
      this.loading = true;
      this.error = "";
      this.success = "";

      try {
        const activo: Activo = {
          id: this.form.value.id!,
          name: this.form.value.name!,
          location: this.form.value.location || "",
          serial: this.form.value.serial || "",
        };

        // Guardar en el backend
        const response = await this.apiService
          .guardarActivo(activo)
          .toPromise();

        this.success = "✅ Activo guardado en el servidor";
        this.generarQR(); // Generar QR automáticamente
        this.limpiarFormulario();
      } catch (err: any) {
        console.error("Error al guardar:", err);
        this.error = err.error?.error || "Error al conectar con el servidor";
      } finally {
        this.loading = false;
      }
    }
  }

  generarQR() {
    if (this.form.valid) {
      const qrContent = {
        id: this.form.value.id || "",
        name: this.form.value.name || "",
        location: this.form.value.location || "",
        serial: this.form.value.serial || "",
        ts: new Date().toISOString(),
      };

      this.qrData = JSON.stringify(qrContent);
    }
  }

  imprimirQR() {
    const ventana = window.open("", "_blank", "width=600,height=700");
    if (ventana) {
      const qrImage = document.querySelector(
        "qrcode canvas"
      ) as HTMLCanvasElement;

      if (qrImage) {
        const qrImageData = qrImage.toDataURL("image/png");

        ventana.document.write(`
          <!DOCTYPE html>
          <html>
          <head>
            <title>Imprimir QR - ${this.form.value.name}</title>
            <style>
              body { 
                font-family: Arial, sans-serif; 
                text-align: center; 
                padding: 20px; 
              }
              .header { margin-bottom: 20px; }
              .qr-container { margin: 20px 0; }
              .info { margin-top: 20px; }
            </style>
          </head>
          <body>
            <div class="header">
              <h2>Código QR del Activo</h2>
              <h3>${this.form.value.name}</h3>
            </div>
            
            <div class="qr-container">
              <img src="${qrImageData}" width="250" height="250">
            </div>
            
            <div class="info">
              <p><strong>Código:</strong> ${this.form.value.id}</p>
              <p><strong>Ubicación:</strong> ${
                this.form.value.location || "N/A"
              }</p>
              <p><strong>Serie:</strong> ${this.form.value.serial || "N/A"}</p>
              <p><strong>Generado:</strong> ${new Date().toLocaleDateString()}</p>
            </div>
          </body>
          </html>
        `);

        ventana.document.close();
        ventana.focus();

        // Esperar a que la imagen cargue antes de imprimir
        setTimeout(() => {
          ventana.print();
        }, 500);
      }
    }
  }

  limpiarFormulario() {
    this.form.reset();
    this.qrData = "";
    this.error = "";
    this.success = "";
  }

  // save() {
  //   if (this.form.valid) {
  //     this.storage.save({
  //       id: this.form.value.id!,
  //       name: this.form.value.name!,
  //       location: this.form.value.location || "",
  //       serial: this.form.value.serial || "",
  //       createdAt: new Date().toISOString(),
  //     });

  // Opcional: Resetear el formulario después de guardar
  // this.form.reset();
  // this.qrData = '';

  //    alert("Activo guardado correctamente");
  //  }
}
