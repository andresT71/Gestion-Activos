# Inventario TI - Angular (Standalone)

Migración del mini-proyecto a Angular 17 con componentes standalone, generación y escaneo de QR, y persistencia local (localStorage).

## Requisitos
- Node 18+
- Angular CLI 17+: `npm i -g @angular/cli` (opcional si usas `npx`)

## Pasos
```bash
npm install
npm start
# abre http://localhost:4200
```

## Funcionalidades
- **Login (mock)**: redirige al dashboard.
- **Dashboard**: accesos a Registrar, Escanear y Reportes.
- **Registro**: formulario reactivo con campos Código, Nombre, Ubicación, Serie. Genera QR con `angularx-qrcode` y guarda en `localStorage`.
- **Escaneo**: cámara con `@zxing/ngx-scanner` (permite leer QR desde el navegador).
- **Reportes**: tabla de activos y descarga a CSV.

## Estructura
- `src/app/features/*`: componentes standalone por feature.
- `src/app/shared/storage.service.ts`: servicio simple para persistencia local.

> Nota: cuando agregues backend (Firebase/REST), reemplaza el `StorageService` por un servicio HTTP.

## Estilos
Se incluye Bootstrap 5 configurado en `angular.json`.
