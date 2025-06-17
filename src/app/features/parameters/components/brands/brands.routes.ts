import { Routes } from "@angular/router"
import { BrandCreateComponent } from "./brand-create/brand-create.component"
import { BrandEditComponent } from "./brand-edit/brand-edit.component"
import { BrandListComponent } from "./brand-list/brand-list.component"
import { BrandShowComponent } from "./brand-show/brand-show.component"

export const BRANDS_ROUTES: Routes = [
  // Ruta por defecto ('') que carga el componente BrandListComponent.
  // Esta ruta normalmente muestra la lista de marcas.
  { path: '', component: BrandListComponent },
  
  // Ruta para crear una nueva marca. Al navegar a 'create', se carga 
  // el componente BrandCreateComponent, que maneja la creación de nuevas marcas.
  { path: 'create', component: BrandCreateComponent },
  
  // Ruta para editar una marca existente. Al navegar a 'edit', se carga 
  // el componente BrandEditComponent, que permite modificar la información de una marca.
  { path: 'edit', component: BrandEditComponent },
  
  // Ruta para mostrar los detalles de una marca. Al navegar a 'show', se carga 
  // el componente BrandShowComponent, que muestra la información detallada de una marca específica.
  { path: 'show', component: BrandShowComponent }
  
]