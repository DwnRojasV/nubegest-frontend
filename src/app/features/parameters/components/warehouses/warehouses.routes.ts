// Importamos el tipo "Routes" desde el módulo de "@angular/router", el cual 
// nos permite definir las rutas dentro del sistema de enrutamiento de Angular.
import { Routes } from "@angular/router";

// Importamos los componentes que representarán las diferentes vistas o pantallas
// dentro del módulo de almacenes (warehouses). Cada componente está asociado a 
// una ruta específica.
import { WarehouseListComponent } from "./warehouse-list/warehouse-list.component";
import { WarehouseCreateComponent } from "./warehouse-create/warehouse-create.component";
import { WarehouseEditComponent } from "./warehouse-edit/warehouse-edit.component";
import { WarehouseShowComponent } from "./warehouse-show/warehouse-show.component";

// Definimos un conjunto de rutas usando el tipo "Routes" de Angular.
// Estas rutas corresponden a las diferentes operaciones que se pueden realizar 
// sobre los almacenes en el sistema de inventario.
export const WAREHOUSES_ROUTES: Routes = [
  // Ruta por defecto ('') que carga el componente WarehouseListComponent.
  // Esta ruta normalmente muestra la lista de almacenes.
  { path: '', component: WarehouseListComponent },
  
  // Ruta para crear un nuevo almacén. Al navegar a 'create', se carga 
  // el componente WarehouseCreateComponent, que maneja la creación de nuevos almacenes.
  { path: 'create', component: WarehouseCreateComponent },
  
  // Ruta para editar un almacén existente. Al navegar a 'edit', se carga 
  // el componente WarehouseEditComponent, que permite modificar la información de un almacén.
  { path: 'edit', component: WarehouseEditComponent },
  
  // Ruta para mostrar los detalles de un almacén. Al navegar a 'show', se carga 
  // el componente WarehouseShowComponent, que muestra la información detallada de un almacén específico.
  { path: 'show', component: WarehouseShowComponent }
];