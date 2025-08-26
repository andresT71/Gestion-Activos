import "zone.js";
import { bootstrapApplication } from "@angular/platform-browser";
import { provideHttpClient } from "@angular/common/http"; // ← Importar esto
import { provideRouter } from "@angular/router";
import { provideAnimations } from "@angular/platform-browser/animations";
import { routes } from "./app/app.routes";
import { AppComponent } from "./app/app.component";

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(), // ← Agregar aquí
    provideRouter(routes),
    provideAnimations(),
  ],
}).catch((err) => console.error(err));
