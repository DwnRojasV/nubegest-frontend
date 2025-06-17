import { Routes } from "@angular/router"
import { PurchaseOrderListComponent } from "./purchase-order-list/purchase-order-list.component"
import { PurchaseOrderCreateComponent } from "./purchase-order-create/purchase-order-create.component"
import { PurchaseOrderEditComponent } from "./purchase-order-edit/purchase-order-edit.component"
import { PurchaseOrderShowComponent } from "./purchase-order-show/purchase-order-show.component"

export const PURCHASE_ORDERS_ROUTES: Routes = [
  // Ruta por defecto ('') que carga el componente PurchaseOrderListComponent.
  // Esta ruta normalmente muestra la lista de ordenes de compra.
  { path: '', component: PurchaseOrderListComponent },
  
  // Ruta para crear una nueva orden de compra. Al navegar a 'create', se carga 
  // el componente PurchaseOrderCreateComponent, que maneja la creación de nuevas ordenes de compra.
  { path: 'create', component: PurchaseOrderCreateComponent },
  
  // Ruta para editar una orden de compra existente. Al navegar a 'edit', se carga 
  // el componente PurchaseOrderEditComponent, que permite modificar la información de una orden de compra.
  { path: 'edit', component: PurchaseOrderEditComponent },
  
  // Ruta para mostrar los detalles de una orden de compra. Al navegar a 'show', se carga 
  // el componente PurchaseOrderShowComponent, que muestra la información detallada de una orden de compra específica.
  { path: 'show', component: PurchaseOrderShowComponent }
  
]