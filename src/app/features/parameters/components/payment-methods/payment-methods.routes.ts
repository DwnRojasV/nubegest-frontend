import { Routes } from "@angular/router"
import { PaymentMethodCreateComponent } from "./payment-method-create/payment-method-create.component"
import { PaymentMethodEditComponent } from "./payment-method-edit/payment-method-edit.component"
import { PaymentMethodListComponent } from "./payment-method-list/payment-method-list.component"
import { PaymentMethodShowComponent } from "./payment-method-show/payment-method-show.component"


export const PYMENT_METHODS_ROUTES: Routes = [
  // Ruta por defecto ('') que carga el componente PaymentMethodListComponent.
  // Esta ruta normalmente muestra la lista de metodos de pago.
  { path: '', component: PaymentMethodListComponent },
  
  // Ruta para crear una nueva metodo de pago. Al navegar a 'create', se carga 
  // el componente PaymentMethodCreateComponent, que maneja la creación de nuevos metodos de pago.
  { path: 'create', component: PaymentMethodCreateComponent },
  
  // Ruta para editar una metodo de pago existente. Al navegar a 'edit', se carga 
  // el componente PaymentMethodEditComponent, que permite modificar la información de un metodo de pago.
  { path: 'edit', component: PaymentMethodEditComponent },
  
  // Ruta para mostrar los detalles de una metodo de pago. Al navegar a 'show', se carga 
  // el componente PaymentMethodShowComponent, que muestra la información detallada de un metodo de pago específico.
  { path: 'show', component: PaymentMethodShowComponent }
  
]