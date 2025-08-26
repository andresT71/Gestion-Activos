import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  template: `
        <div class="container mt-5">
          <div class="card p-4 shadow-lg">
            <h2 class="text-center text-primary">Acceso Inventario Ti</h2>
            <form [formGroup]="form" (ngSubmit)="login()">
              <div class="mb-3">
                <label for="email" class="form-label">Correo</label>
                <input type="email" formControlName="email"  id="email" class="form-control">
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Contraseña</label>
                <input type="password" id="password" class="form-control" formControlName="password" required>
              </div>

              <button class="btn btn-primary" type="submit" [disabled]="form.invalid">Ingresar</button>

            </form>
          </div>
        </div> 

  `
})
export class LoginComponent {
  form = this.fb.group({ email: ['', [Validators.required, Validators.email]], password: ['', Validators.required] });
  constructor(private fb: FormBuilder, private router: Router) {}
  login() { if (this.form.valid) this.router.navigateByUrl('/dashboard'); }
}
