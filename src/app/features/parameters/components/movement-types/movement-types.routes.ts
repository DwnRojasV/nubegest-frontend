import { Routes } from "@angular/router"
import { MovementTypeCreateComponent } from "./movement-type-create/movement-type-create.component"
import { MovementTypeEditComponent } from "./movement-type-edit/movement-type-edit.component"
import { MovementTypeListComponent } from "./movement-type-list/movement-type-list.component"
import { MovementTypeShowComponent } from "./movement-type-show/movement-type-show.component"

export const MOVEMENT_TYPES_ROUTES: Routes = [
  // Ruta por defecto ('') que carga el componente MovementTypeListComponent.
  // Esta ruta normalmente muestra la lista de Tipos de movimiento.
  { path: '', component: MovementTypeListComponent },
  
  // Ruta para crear una nueva Tipo de movimiento. Al navegar a 'create', se carga 
  // el componente MovementTypeCreateComponent, que maneja la creación de nuevos Tipos de movimiento.
  { path: 'create', component: MovementTypeCreateComponent },
  
  // Ruta para editar una Tipo de movimiento existente. Al navegar a 'edit', se carga 
  // el componente MovementTypeEditComponent, que permite modificar la información de un Tipo de movimiento.
  { path: 'edit', component: MovementTypeEditComponent },
  
  // Ruta para mostrar los detalles de una Tipo de movimiento. Al navegar a 'show', se carga 
  // el componente MovementTypeShowComponent, que muestra la información detallada de un Tipo de movimiento específico.
  { path: 'show', component: MovementTypeShowComponent }
  
]