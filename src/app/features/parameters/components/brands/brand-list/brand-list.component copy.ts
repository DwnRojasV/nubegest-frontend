import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { Brand } from '../../interfaces/brand.interface';
import { BrandsService } from '../../services/brands.service';
import { RouterModule } from '@angular/router';
import { NgxDatatableModule, SortType, } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-brand-list',
  standalone: true,
  imports: [RouterModule, NgxDatatableModule],
  templateUrl: './brand-list.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA] ,// Agrega CUSTOM_ELEMENTS_SCHEMA
  styles: ``
})
export class BrandListComponent {

  brands: Brand[] = []; // Tipar la lista de marcas con la interfaz Brand[]

  // Definir las columnas para la tabla 
  columns = [
    { key: 'id', title: 'ID' },
    { key: 'name', title: 'NOMBRE' },
    { key: 'is_active', title: 'ACTIVO', cellTemplate: 'Sí/No' }
  ];

  sortType = SortType.multi; // Asignar SortType
  optionsWithCaption = {}

  // Usamos inject API para inyectar el servicio
  private brandsService = inject(BrandsService);

  ngOnInit(): void {
    this.loadBrands();
  }

  // Carga las marcas desde el servicio
  loadBrands() {
    this.brandsService.getBrands().subscribe({
      next: (data: Brand[]) => {
        console.log('Datos recibidos:', data); // Log para verificar si los datos llegan
        this.brands = data; // Almacena los datos en el array brands
      },
      error: (err) => {
        console.error('Error al cargar las marcas:', err); // Log de errores
      }
    });
  }

}


/**npm install @swimlane/ngx-datatable pra el uso de tablas */