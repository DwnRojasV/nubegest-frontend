import { Routes } from "@angular/router"
import { CustomerCreateComponent } from "./customer-create/customer-create.component"
import { CustomerEditComponent } from "./customer-edit/customer-edit.component"
import { CustomerListComponent } from "./customer-list/customer-list.component"
import { CustomerShowComponent } from "./customer-show/customer-show.component"

export const CUSTOMERS_ROUTES: Routes = [
  // Ruta por defecto ('') que carga el componente CustomerListComponent.
  // Esta ruta normalmente muestra la lista de clientes.
  { path: '', component: CustomerListComponent },
  
  // Ruta para crear una nueva cliente. Al navegar a 'create', se carga 
  // el componente CustomerCreateComponent, que maneja la creación de nuevos clientes.
  { path: 'create', component: CustomerCreateComponent },
  
  // Ruta para editar una cliente existente. Al navegar a 'edit', se carga 
  // el componente CustomerEditComponent, que permite modificar la información de un cliente.
  { path: 'edit', component: CustomerEditComponent },
  
  // Ruta para mostrar los detalles de una cliente. Al navegar a 'show', se carga 
  // el componente CustomerShowComponent, que muestra la información detallada de un cliente específico.
  { path: 'show', component: CustomerShowComponent }
  
]