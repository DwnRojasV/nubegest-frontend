import { Routes } from "@angular/router"
import { MeasurementUnitListComponent } from "./measurement-unit-list/measurement-unit-list.component"
import { MeasurementUnitCreateComponent } from "./measurement-unit-create/measurement-unit-create.component"
import { MeasurementUnitEditComponent } from "./measurement-unit-edit/measurement-unit-edit.component"
import { MeasurementUnitShowComponent } from "./measurement-unit-show/measurement-unit-show.component"

export const MEASUREMENT_UNITS_ROUTES: Routes = [
  // Ruta por defecto ('') que carga el componente MeasurementUnitListComponent.
  // Esta ruta normalmente muestra la lista de unidades de medida.
  { path: '', component: MeasurementUnitListComponent },
  
  // Ruta para crear una nueva unidad de medida. Al navegar a 'create', se carga 
  // el componente MeasurementUnitCreateComponent, que maneja la creación de nuevas unidades de medida.
  { path: 'create', component: MeasurementUnitCreateComponent },
  
  // Ruta para editar una unidad de medida existente. Al navegar a 'edit', se carga 
  // el componente MeasurementUnitEditComponent, que permite modificar la información de una unidad de medida.
  { path: 'edit', component: MeasurementUnitEditComponent },
  
  // Ruta para mostrar los detalles de una unidad de medida. Al navegar a 'show', se carga 
  // el componente MeasurementUnitShowComponent, que muestra la información detallada de una unidad de medida específico.
  { path: 'show', component: MeasurementUnitShowComponent }
  
]