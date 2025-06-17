import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Brand } from '../interfaces/brand.interface';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {
  private http = inject(HttpClient); // Uso de inject API
  private apiUrl = 'http://localhost:1837/api/parameters/brand'; // URL del API

  constructor() { }

  // Obtener todas las marcas, ahora con tipado Brand[]
  // getBrands(): Observable<Brand[]> {
  //   return this.http.get<Brand[]>(this.apiUrl);
  // }

  getBrands(): Observable<Brand[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => response.brands) // Extraer la propiedad "brands" de la respuesta
    );
  }
}
