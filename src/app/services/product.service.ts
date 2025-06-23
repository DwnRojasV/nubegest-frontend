import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productApiUrl = `${environment.apiUrl}/product`;

  constructor(private http: HttpClient) {}

  getProductsByUser(userId: string): Observable<Product[]> {
    return this.http.get<any[]>(`${this.productApiUrl}/${userId}`).pipe(
      map((data) =>
        data.map((item) => ({
          barCode: item.bar_code,
          brand: item.brand,
          category: item.category,
          description: item.description,
          isActive: item.is_active,
          minimumStock: item.minimum_stock,
          name: item.name,
          productId: item.product_id,
          purchasePrice: item.purchase_price,
          salePrice: item.sale_price,
          unitOfMeasure: item.unit_of_measure,
          userId: item.user_id,
        }))
      )
    );
  }
}
