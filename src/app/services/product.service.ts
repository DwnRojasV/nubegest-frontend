import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Product } from '../models/product.model';
import { InventoryEntryService } from './inventoryEntry.service';
import { InventoryOutputService } from './inventoryOutput.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productApiUrl = `${environment.apiUrl}/product`;

  constructor(
    private http: HttpClient,
    private inventoryEntryService: InventoryEntryService,
    private inventoryOutputService: InventoryOutputService
  ) {}

  getLowStockProducts(userId: string): Observable<Product[]> {
    return this.getProductsByUser(userId).pipe(
      map((products) =>
        products.filter((product) => product.quantity < product.minimumStock)
      )
    );
  }

  getProductsByUser(userId: string): Observable<Product[]> {
    const products$ = this.http.get<any[]>(`${this.productApiUrl}/${userId}`);
    const entries$ =
      this.inventoryEntryService.getInventoryEntriesByUser(userId);
    const outputs$ =
      this.inventoryOutputService.getInventoryOutputsByUser(userId);
    return forkJoin([products$, entries$, outputs$]).pipe(
      map(([products, entries, outputs]) => {
        return products.map((product) => {
          const totalEntries = entries
            .filter((entry) => entry.productId === product.product_id)
            .reduce((sum, entry) => sum + entry.quantity, 0);
          const totalOutputs = outputs
            .filter((output) => output.productId === product.product_id)
            .reduce((sum, output) => sum + output.quantity, 0);
          const quantity = totalEntries - totalOutputs;

          return {
            barCode: product.bar_code,
            brand: product.brand,
            category: product.category,
            description: product.description,
            isActive: product.is_active,
            minimumStock: product.minimum_stock,
            name: product.name,
            productId: product.product_id,
            purchasePrice: product.purchase_price,
            salePrice: product.sale_price,
            unitOfMeasure: product.unit_of_measure,
            userId: product.user_id,
            quantity,
          };
        });
      })
    );
  }

  getTotalProducts(userId: string): Observable<number> {
    return forkJoin([
      this.inventoryEntryService.getTotalEntries(userId),
      this.inventoryOutputService.getTotalOutputs(userId),
    ]).pipe(map(([totalEntries, totalOutputs]) => totalEntries - totalOutputs));
  }
}
