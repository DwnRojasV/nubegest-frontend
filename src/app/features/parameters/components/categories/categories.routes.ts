import { Routes } from "@angular/router"
import { CategoryCreateComponent } from "./category-create/category-create.component"
import { CategoryEditComponent } from "./category-edit/category-edit.component"
import { CategoryListComponent } from "./category-list/category-list.component"
import { CategoryShowComponent } from "./category-show/category-show.component"

export const CATEGORIES_ROUTES: Routes = [
  // Ruta por defecto ('') que carga el componente CategoryListComponent.
  // Esta ruta normalmente muestra la lista de categorías.
  { path: '', component: CategoryListComponent },
  
  // Ruta para crear una nueva categoría. Al navegar a 'create', se carga 
  // el componente CategoryCreateComponent, que maneja la creación de nuevas categorías.
  { path: 'create', component: CategoryCreateComponent },
  
  // Ruta para editar una categoría existente. Al navegar a 'edit', se carga 
  // el componente CategoryEditComponent, que permite modificar la información de una categoría.
  { path: 'edit', component: CategoryEditComponent },
  
  // Ruta para mostrar los detalles de una categoría. Al navegar a 'show', se carga 
  // el componente CategoryShowComponent, que muestra la información detallada de una categoría específica.
  { path: 'show', component: CategoryShowComponent }
  
]