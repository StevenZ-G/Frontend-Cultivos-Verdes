import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Datos'
    },
    children: [
      {
        path: '',
        redirectTo: 'datos',
        pathMatch: 'full'
      },
      {
        path: 'costos_MDO',
        loadComponent: () => import('./costos_MDO/costos_MDO.component').then(m => m.CostosMDOComponent),
        data: {
          title: 'Costos Mano de Obra'
        }
      },
      {
        path: 'datos',
        loadComponent: () => import('./datos/datos.component').then(m => m.DatosComponent),
        data: {
          title: 'Datos'
        }
      },
      {
        path: 'horas_SvsE',
        loadComponent: () => import('./horas_SvsE/horas_SvsE.component').then(m => m.HorasSvsEComponent),
        data: {
          title: 'Horas Suplementarias vs Extraordinarias'
        }
      },
    ]
  }
];

