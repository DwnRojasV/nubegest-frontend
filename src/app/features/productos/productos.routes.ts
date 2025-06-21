import { Routes } from "@angular/router";
import { ListaProductosComponent } from "./componentes/lista-productos/lista-productos.component";
import { UserTableComponent } from "../user/userTable/user-table.component";



export const PRODUCTOS_ROUTES : Routes = [
  {
    path: '', component: ListaProductosComponent
  },
 
  {
    path: 'edit', 
    loadComponent: ()=>UserTableComponent
  }
]