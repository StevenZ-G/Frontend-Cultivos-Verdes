import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: 'info',
      text: 'NEW'
    }
  },
  {
    title: true,
    name: 'Funcionalidades'
  },
  {
    name: 'Grupo de Cotizacion',
    iconComponent: { name: 'cil-pencil' },
    url: '/charts'
  },
  {
    name: 'Crear Cotizacion',
    url: '/cotizador/cotizacion',
    iconComponent: { name: 'cil-notes' }
  },
  {
    name: 'Historial Cotizaciones',
    url: '/cotizador/historialCotizacion',
    linkProps: { fragment: 'headings' },
    iconComponent: { name: 'cil-spreadsheet' }
  },
  {
    name: 'Components',
    title: true
  },
  {
    name: 'Bouquets',
    url: '/base',
    iconComponent: { name: 'cil-puzzle' },
    children: [
      {
        name: 'Insumos',
        url: '/base/insumos',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Insumos Urban Stems',
        url: '/base/insumos_us',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Complementos',
        url: '/base/complementos',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Color',
        url: '/base/color',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Cajas',
        url: '/base/cajas',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Variedades Flor',
        url: '/base/variedades_flor',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Rendimientos',
        url: '/base/rendimientos',
        icon: 'nav-icon-bullet'
      },
      // {
      //   name: 'Pagination',
      //   url: '/base/pagination',
      //   icon: 'nav-icon-bullet'
      // },
      // {
      //   name: 'Placeholder',
      //   url: '/base/placeholder',
      //   icon: 'nav-icon-bullet'
      // },
      // {
      //   name: 'Popovers',
      //   url: '/base/popovers',
      //   icon: 'nav-icon-bullet'
      // },
      // {
      //   name: 'Progress',
      //   url: '/base/progress',
      //   icon: 'nav-icon-bullet'
      // },
      // {
      //   name: 'Spinners',
      //   url: '/base/spinners',
      //   icon: 'nav-icon-bullet'
      // },
      // {
      //   name: 'Tables',
      //   url: '/base/tables',
      //   icon: 'nav-icon-bullet'
      // },
      // {
      //   name: 'Tabs',
      //   url: '/base/tabs',
      //   icon: 'nav-icon-bullet'
      // },
      // {
      //   name: 'Tooltips',
      //   url: '/base/tooltips',
      //   icon: 'nav-icon-bullet'
      // }
    ]
  },
  {
    name: 'Datos',
    url: '/datos',
    iconComponent: { name: 'cil-description' },
    children: [
      {
        name: 'Costos Mano de Obra',
        url: '/datos/costos_MDO',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Datos',
        url: '/datos/datos',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Horas Suplementarias vs Extraordinarias',
        url: '/datos/horas_SvsE',
        icon: 'nav-icon-bullet'
      },
      // {
      //   name: 'Loading Button',
      //   url: 'https://coreui.io/angular/docs/components/loading-button/',
      //   icon: 'nav-icon-bullet',
      //   badge: {
      //     color: 'danger',
      //     text: 'PRO'
      //   },
      //   attributes: { target: '_blank' }
      // }
    ]
  },
  // {
  //   name: 'Forms',
  //   url: '/forms',
  //   iconComponent: { name: 'cil-notes' },
  //   children: [
  //     {
  //       name: 'Form Control',
  //       url: '/forms/form-control',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Checks & Radios',
  //       url: '/forms/checks-radios',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Date Picker',
  //       url: 'https://coreui.io/angular/docs/forms/date-picker/',
  //       icon: 'nav-icon-bullet',
  //       badge: {
  //         color: 'danger',
  //         text: 'PRO'
  //       },
  //       attributes: { target: '_blank' }
  //     },
  //     {
  //       name: 'Date Range Picker',
  //       url: 'https://coreui.io/angular/docs/forms/date-range-picker/',
  //       icon: 'nav-icon-bullet',
  //       badge: {
  //         color: 'danger',
  //         text: 'PRO'
  //       },
  //       attributes: { target: '_blank' }
  //     },
  //     {
  //       name: 'Floating Labels',
  //       url: '/forms/floating-labels',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Input Group',
  //       url: '/forms/input-group',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Multi Select',
  //       url: 'https://coreui.io/angular/docs/forms/multi-select/',
  //       icon: 'nav-icon-bullet',
  //       badge: {
  //         color: 'danger',
  //         text: 'PRO'
  //       },
  //       attributes: { target: '_blank' }
  //     },
  //     {
  //       name: 'Password Input',
  //       url: 'https://coreui.io/angular/docs/forms/password-input/',
  //       icon: 'nav-icon-bullet',
  //       badge: {
  //         color: 'danger',
  //         text: 'PRO'
  //       },
  //       attributes: { target: '_blank' }
  //     },
  //     {
  //       name: 'Range',
  //       url: '/forms/range',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Range Slider',
  //       url: 'https://coreui.io/angular/docs/forms/range-slider/',
  //       icon: 'nav-icon-bullet',
  //       badge: {
  //         color: 'danger',
  //         text: 'PRO'
  //       },
  //       attributes: { target: '_blank' }
  //     },
  //     {
  //       name: 'Rating',
  //       url: 'https://coreui.io/angular/docs/forms/rating/',
  //       icon: 'nav-icon-bullet',
  //       badge: {
  //         color: 'danger',
  //         text: 'PRO'
  //       },
  //       attributes: { target: '_blank' }
  //     },
  //     {
  //       name: 'Select',
  //       url: '/forms/select',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Stepper',
  //       url: 'https://coreui.io/angular/docs/forms/stepper/',
  //       icon: 'nav-icon-bullet',
  //       badge: {
  //         color: 'danger',
  //         text: 'PRO'
  //       },
  //       attributes: { target: '_blank' }
  //     },
  //     {
  //       name: 'Time Picker',
  //       url: 'https://coreui.io/angular/docs/forms/time-picker/',
  //       icon: 'nav-icon-bullet',
  //       badge: {
  //         color: 'danger',
  //         text: 'PRO'
  //       },
  //       attributes: { target: '_blank' }
  //     },
  //     {
  //       name: 'Layout',
  //       url: '/forms/layout',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Validation',
  //       url: '/forms/validation',
  //       icon: 'nav-icon-bullet'
  //     }
  //   ]
  // },
  // {
  //   name: 'Charts',
  //   iconComponent: { name: 'cil-chart-pie' },
  //   url: '/charts'
  // },
  // {
  //   name: 'Icons',
  //   iconComponent: { name: 'cil-star' },
  //   url: '/icons',
  //   children: [
  //     {
  //       name: 'CoreUI Free',
  //       url: '/icons/coreui-icons',
  //       icon: 'nav-icon-bullet',
  //       badge: {
  //         color: 'success',
  //         text: 'FREE'
  //       }
  //     },
  //     {
  //       name: 'CoreUI Flags',
  //       url: '/icons/flags',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'CoreUI Brands',
  //       url: '/icons/brands',
  //       icon: 'nav-icon-bullet'
  //     }
  //   ]
  // },
  // {
  //   name: 'Notifications',
  //   url: '/notifications',
  //   iconComponent: { name: 'cil-bell' },
  //   children: [
  //     {
  //       name: 'Alerts',
  //       url: '/notifications/alerts',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Badges',
  //       url: '/notifications/badges',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Modal',
  //       url: '/notifications/modal',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Toast',
  //       url: '/notifications/toasts',
  //       icon: 'nav-icon-bullet'
  //     }
  //   ]
  // },
  // {
  //   name: 'Widgets',
  //   url: '/widgets',
  //   iconComponent: { name: 'cil-calculator' },
  //   badge: {
  //     color: 'info',
  //     text: 'NEW'
  //   }
  // },
  // {
  //   title: true,
  //   name: 'Extras'
  // },
  // {
  //   name: 'Pages',
  //   url: '/login',
  //   iconComponent: { name: 'cil-star' },
  //   children: [
  //     {
  //       name: 'Login',
  //       url: '/login',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Register',
  //       url: '/register',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Error 404',
  //       url: '/404',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Error 500',
  //       url: '/500',
  //       icon: 'nav-icon-bullet'
  //     }
  //   ]
  // },
  // {
  //   title: true,
  //   name: 'Links',
  //   class: 'mt-auto'
  // },
  // {
  //   name: 'Docs',
  //   url: 'https://coreui.io/angular/docs/',
  //   iconComponent: { name: 'cil-description' },
  //   attributes: { target: '_blank' }
  // }
];
