import { Routes } from "@angular/router"
import { TaxCreateComponent } from "./tax-create/tax-create.component"
import { TaxEditComponent } from "./tax-edit/tax-edit.component"
import { TaxListComponent } from "./tax-list/tax-list.component"
import { TaxShowComponent } from "./tax-show/tax-show.component"



export const TAX_ROUTES: Routes = [
  // Ruta por defecto ('') que carga el componente TaxListComponent.
  // Esta ruta normalmente muestra la lista de impuestos.
  { path: '', component: TaxListComponent },
  
  // Ruta para crear una nueva impuesto. Al navegar a 'create', se carga 
  // el componente TaxCreateComponent, que maneja la creación de nuevos impuestos.
  { path: 'create', component: TaxCreateComponent },
  
  // Ruta para editar una impuesto existente. Al navegar a 'edit', se carga 
  // el componente TaxEditComponent, que permite modificar la información de un impuesto.
  { path: 'edit', component: TaxEditComponent },
  
  // Ruta para mostrar los detalles de una impuesto. Al navegar a 'show', se carga 
  // el componente TaxShowComponent, que muestra la información detallada de un impuesto específico.
  { path: 'show', component: TaxShowComponent }
  
]