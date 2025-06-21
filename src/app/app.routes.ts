import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: '',
    // redirectTo: 'dashboard' ,
    // pathMatch: 'full'
    loadComponent: () => import('./features/dashboard/dashboard.component').then(c => c.DashboardComponent)

  },
  {
    path: 'login',
    loadComponent: () => import('./features/security/components/login/login-show/login-show.component').then(c => c.LoginShowComponent)
  },

    {
    path: 'newlogin',
    loadComponent: () => import('./features/security/components/newlogin/newlogin.component').then(c => c.NewloginComponent)
  },
  
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/dashboard.component').then(c => c.DashboardComponent)
  },

  {
    path: 'purchases/purchase-orders',
    loadChildren: () => import('./features/purchases/components/purchase-orders/purchase-orders.routes').then(c => c.PURCHASE_ORDERS_ROUTES )
  },
  {
    path: 'purchases/supplier-orders',
    loadChildren: () => import('./features/purchases/components/supplier-orders/supplier-orders.routes').then(c => c.SUPPLIER_ORDERS_ROUTES )
  },
  {
    path: 'parameters/brands',
    loadChildren: () => import('./features/parameters/components/brands/brands.routes').then(c => c.BRANDS_ROUTES )
  },
  {
    path: 'parameters/warehouses',
    loadChildren: () => import('./features/parameters/components/warehouses/warehouses.routes').then(c => c.WAREHOUSES_ROUTES )
  },
  {
    path: 'parameters/cash-registers',
    loadChildren: () => import('./features/parameters/components/cash-registers/cash-registers.routes').then(c => c.CASH_REGISTERS_ROUTES)
  },
  {
    path: 'parameters/categories',
    loadChildren: () => import('./features/parameters/components/categories/categories.routes').then(c => c.CATEGORIES_ROUTES)
  },
  {
    path: 'parameters/customers',
    loadChildren: () => import('./features/parameters/components/customers/customers.routes').then(c => c.CUSTOMERS_ROUTES)
  },
  {
    path: 'parameters/discounts',
    loadChildren: () => import('./features/parameters/components/discounts/discounts.routes').then(c => c.DISCOUNTS_ROUTES)
  },
  {
    path: 'parameters/payment-methods',
    loadChildren: () => import('./features/parameters/components/payment-methods/payment-methods.routes').then(c => c.PYMENT_METHODS_ROUTES)
  },
  {
    path: 'parameters/movement-types',
    loadChildren: () => import('./features/parameters/components/movement-types/movement-types.routes').then(c => c.MOVEMENT_TYPES_ROUTES)
  },
  {
    path: 'productos',
    loadChildren: () => import('./features/productos/productos.routes').then(c => c.PRODUCTOS_ROUTES)
  },
  {
      path: 'productos/entradas',
      loadChildren: () => import('./features/productos/componentes/entradas/entradas.routes').then(m => m.ENTRADAS_ROUTES)
  },
  {
     path: 'productos/salidas',
     loadChildren: () => import('./features/productos/componentes/salidas/salidas.routes').then(m => m.SALIDAS_ROUTES)

  },
  {
    path: 'register',
    loadComponent: ()=> import('./features/security/components/register/register.component').then(c => c.RegisterComponent)
  },
  {
    path: '**',
    loadComponent: () => import('./layout/page-not-found/page-not-found.component').then(c => c.PageNotFoundComponent)
  }

];
