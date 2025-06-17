import { Routes } from "@angular/router"
import { DiscountCreateComponent } from "./discount-create/discount-create.component"
import { DiscountEditComponent } from "./discount-edit/discount-edit.component"
import { DiscountListComponent } from "./discount-list/discount-list.component"
import { DiscountShowComponent } from "./discount-show/discount-show.component"


export const DISCOUNTS_ROUTES: Routes = [
  // Ruta por defecto ('') que carga el componente DiscountListComponent.
  // Esta ruta normalmente muestra la lista de descuentos.
  { path: '', component: DiscountListComponent },
  
  // Ruta para crear una nueva descuento. Al navegar a 'create', se carga 
  // el componente DiscountCreateComponent, que maneja la creación de nuevos descuentos.
  { path: 'create', component: DiscountCreateComponent },
  
  // Ruta para editar una descuento existente. Al navegar a 'edit', se carga 
  // el componente DiscountEditComponent, que permite modificar la información de un descuento.
  { path: 'edit', component: DiscountEditComponent },
  
  // Ruta para mostrar los detalles de una descuento. Al navegar a 'show', se carga 
  // el componente DiscountShowComponent, que muestra la información detallada de un descuento específico.
  { path: 'show', component: DiscountShowComponent }
  
]