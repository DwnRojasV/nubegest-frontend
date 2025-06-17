import { Routes } from "@angular/router";
import { ListaProductosComponent } from "./componentes/lista-productos/lista-productos.component";
import { CrearProductosComponent } from "./componentes/crear-productos/crear-productos.component";
import { EditarProductosComponent } from "./componentes/editar-productos/editar-productos.component";

export const PRODUCTOS_ROUTES : Routes = [
  {
    path: '', component: ListaProductosComponent
  },
  {
    path: 'create', component: CrearProductosComponent
  },
  {
    path: 'edit', component: EditarProductosComponent
  }
]