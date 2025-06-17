import { Routes } from "@angular/router"
import { SupplierOrderCreateComponent } from "./supplier-order-create/suplier-order-create.component"
import { SupplierOrderEditComponent } from "./supplier-order-edit/suplier-order-edit.component"
import { SupplierOrderListComponent } from "./supplier-order-list/supplier-order-list.component"
import { SupplierOrderShowComponent } from "./supplier-order-show/supplier-order-show.component"

export const SUPPLIER_ORDERS_ROUTES: Routes = [
  // Ruta por defecto ('') que carga el componente SupplierOrderListComponent.
  // Esta ruta normalmente muestra la lista de pedidos proveedor.
  { path: '', component: SupplierOrderListComponent },
  
  // Ruta para crear una nueva pedido proveedor. Al navegar a 'create', se carga 
  // el componente SupplierOrderCreateComponent, que maneja la creación de nuevas pedidos proveedor.
  { path: 'create', component: SupplierOrderCreateComponent },
  
  // Ruta para editar una pedido proveedor existente. Al navegar a 'edit', se carga 
  // el componente SupplierOrderEditComponent, que permite modificar la información de una pedido proveedor.
  { path: 'edit', component: SupplierOrderEditComponent },
  
  // Ruta para mostrar los detalles de una pedido proveedor. Al navegar a 'show', se carga 
  // el componente SupplierOrderShowComponent, que muestra la información detallada de una pedido proveedor específica.
  { path: 'show', component: SupplierOrderShowComponent }
  
]