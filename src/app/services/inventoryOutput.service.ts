import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { InventoryOutput } from '../models/inventoryOutput.model';

@Injectable({
  providedIn: 'root',
})
export class InventoryOutputService {
  private inventoryOutputUrl = `${environment.apiUrl}/inventoryoutput`;

  constructor(private http: HttpClient) {}

  getInventoryOutputsByUser(userId: string): Observable<InventoryOutput[]> {
    return this.http.get<any[]>(`${this.inventoryOutputUrl}/${userId}`).pipe(
      map((data) =>
        data.map((item) => ({
          userId: item.user_id,
          outputId: item.output_id,
          productId: item.product_id,
          quantity: item.quantity,
          type: item.type,
          observation: item.observation,
          timestamp: new Date(item.timestamp),
        }))
      )
    );
  }
}
