// Importamos el tipo "Routes" desde el módulo de "@angular/router", el cual 
// nos permite definir las rutas dentro del sistema de enrutamiento de Angular.
import { Routes } from "@angular/router";

// Importamos los componentes que representarán las diferentes vistas o pantallas
// dentro del módulo de cajas registradoras (cash registers). Cada componente está asociado a 
// una ruta específica.
import { CashRegisterListComponent } from "./cash-register-list/cash-register-list.component";
import { CashRegisterCreateComponent } from "./cash-register-create/cash-register-create.component";
import { CashRegisterEditComponent } from "./cash-register-edit/cash-register-edit.component";
import { CashRegisterShowComponent } from "./cash-register-show/cash-register-show.component";

// Definimos un conjunto de rutas usando el tipo "Routes" de Angular.
// Estas rutas corresponden a las diferentes operaciones que se pueden realizar 
// sobre las cajas registradoras en el sistema de inventario.
export const CASH_REGISTERS_ROUTES: Routes = [
  // Ruta por defecto ('') que carga el componente CashRegisterListComponent.
  // Esta ruta normalmente muestra la lista de cajas registradoras.
  { path: '', component: CashRegisterListComponent },
  
  // Ruta para crear una nueva caja registradora. Al navegar a 'create', se carga 
  // el componente CashRegisterCreateComponent, que maneja la creación de nuevas cajas registradoras.
  { path: 'create', component: CashRegisterCreateComponent },
  
  // Ruta para editar una caja registradora existente. Al navegar a 'edit', se carga 
  // el componente CashRegisterEditComponent, que permite modificar la información de una caja registradora.
  { path: 'edit', component: CashRegisterEditComponent },
  
  // Ruta para mostrar los detalles de una caja registradora. Al navegar a 'show', se carga 
  // el componente CashRegisterShowComponent, que muestra la información detallada de una caja registradora específica.
  { path: 'show', component: CashRegisterShowComponent }
];