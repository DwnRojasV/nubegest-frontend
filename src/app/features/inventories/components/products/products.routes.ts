import { Routes } from "@angular/router";

import { ProductListComponent } from "./product-list/product-list.component";
import { ProductCreateComponent } from "./product-create/product-create.component";
import { ProductEditComponent } from "./product-edit/product-edit.component";
import { ProductShowComponent } from "./product-show/product-show.component";

export const PRODUCTS_ROUTES : Routes = [
  { path: '', component: ProductListComponent },
  { path: 'crear', component: ProductCreateComponent },
  { path: 'editar', component: ProductEditComponent },
  { path: 'mostrar', component: ProductShowComponent }
]