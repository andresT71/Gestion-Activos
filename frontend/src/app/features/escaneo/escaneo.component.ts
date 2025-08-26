import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZXingScannerModule } from '@zxing/ngx-scanner';

@Component({
  standalone: true,
  selector: 'app-escaneo',
  imports: [CommonModule, ZXingScannerModule],
  template: `
  <div class="card p-4 shadow">
    <h3 class="mb-3">Escaneo de QR</h3>

    <zxing-scanner 

      (scanSuccess)="onScanSuccess($event)"
      class="d-block mx-auto" 
      style="width:300px; height:300px;">
    </zxing-scanner>

    <div *ngIf="resultado" class="alert alert-success mt-3">
      <strong>QR Detectado:</strong> {{ resultado }}
    </div>
  </div>
  `
})
export class EscaneoComponent {
  result = '';
  onScan(text: string) { this.result = text; }

    resultado: string = '';

  onScanSuccess(result: string) {
    this.resultado = result;
  }
}
