import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Cotizador'
    },
    children: [
      {
        path: '',
        redirectTo: 'cotizacion',
        pathMatch: 'full'
      },
      {
        path: 'cotizacion',
        loadComponent: () => import('./cotizacion.component').then(m => m.CotizacionComponent),
        data: {
          title: 'Cotizacion'
        }
      },
      {
        path: 'historialCotizacion',
        loadComponent: () => import('./historialCotizacion.component').then(m => m.HistorialCotizacionComponent),
        data: {
          title: 'Historial Cotizacion'
        }
      }
    ]
  }
];

