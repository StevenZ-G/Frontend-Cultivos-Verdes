import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Base'
    },
    children: [
      {
        path: '',
        redirectTo: 'base',
        pathMatch: 'full'
      },
      {
        path: 'insumos',
        loadComponent: () => import('./insumos/insumos.component').then(m => m.InsumosComponent),
        data: {
          title: 'Insumos'
        }
      },
      {
        path: 'insumos_us',
        loadComponent: () => import('./insumos_us/insumos_us.component').then(m => m.InsumosUSComponent),
        data: {
          title: 'Insumos Urban Stems'
        }
      },
      {
        path: 'complementos',
        loadComponent: () => import('./complementos/complementos.component').then(m => m.ComplementosComponent),
        data: {
          title: 'Complementos'
        }
      },
      {
        path: 'color',
        loadComponent: () => import('./color/color.component').then(m => m.ColorComponent),
        data: {
          title: 'Color'
        }
      },
      {
        path: 'cajas',
        loadComponent: () => import('./cajas/cajas.component').then(m => m.CajasComponent),
        data: {
          title: 'Cajas'
        }
      },
      {
        path: 'variedades_flor',
        loadComponent: () => import('./variedades_flor/variedades_flor.component').then(m => m.VariedadesFlorComponent),
        data: {
          title: 'Variedades Flor'
        }
      },
      {
        path: 'rendimientos',
        loadComponent: () => import('./rendimientos/rendimientos.component').then(m => m.RendimientosComponent),
        data: {
          title: 'Rendimientos '
        }
      },
      // {
      //   path: 'pagination',
      //   loadComponent: () => import('./paginations/paginations.component').then(m => m.PaginationsComponent),
      //   data: {
      //     title: 'Pagination'
      //   }
      // },
      // {
      //   path: 'placeholder',
      //   loadComponent: () => import('./placeholders/placeholders.component').then(m => m.PlaceholdersComponent),
      //   data: {
      //     title: 'Placeholder'
      //   }
      // },
      // {
      //   path: 'popovers',
      //   loadComponent: () => import('./popovers/popovers.component').then(m => m.PopoversComponent),
      //   data: {
      //     title: 'Popovers'
      //   }
      // },
      // {
      //   path: 'progress',
      //   loadComponent: () => import('./progress/progress.component').then(m => m.AppProgressComponent),
      //   data: {
      //     title: 'Progress'
      //   }
      // },
      // {
      //   path: 'spinners',
      //   loadComponent: () => import('./spinners/spinners.component').then(m => m.SpinnersComponent),
      //   data: {
      //     title: 'Spinners'
      //   }
      // },
      // {
      //   path: 'tables',
      //   loadComponent: () => import('./tables/tables.component').then(m => m.TablesComponent),
      //   data: {
      //     title: 'Tables'
      //   }
      // },
      // {
      //   path: 'tabs',
      //   loadComponent: () => import('./tabs/tabs.component').then(m => m.AppTabsComponent),
      //   data: {
      //     title: 'Tabs'
      //   }
      // },
      // {
      //   path: 'tooltips',
      //   loadComponent: () => import('./tooltips/tooltips.component').then(m => m.TooltipsComponent),
      //   data: {
      //     title: 'Tooltips'
      //   }
      // }
    ]
  }
];


