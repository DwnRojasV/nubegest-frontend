import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { InventoryEntry } from '../models/inventoryEntry.model';

@Injectable({
  providedIn: 'root',
})
export class InventoryEntryService {
  private inventoryEntryUrl = `${environment.apiUrl}/inventoryentry`;

  constructor(private http: HttpClient) {}

  getInventoryEntriesByUser(userId: string): Observable<InventoryEntry[]> {
    return this.http.get<any[]>(`${this.inventoryEntryUrl}/${userId}`).pipe(
      map((data) =>
        data.map((item) => ({
          userId: item.user_id,
          entryId: item.entry_id,
          productId: item.product_id,
          quantity: item.quantity,
          type: item.type,
          unitCost: item.unit_cost,
          observation: item.observation,
          timestamp: new Date(item.timestamp),
        }))
      )
    );
  }

  createInventoryEntry(
    userId: string,
    entry: InventoryEntry
  ): Observable<{message: string, entry_id: string}> {
    const { productId, quantity, type, unitCost, timestamp, observation } =
      entry;
    const newEntry = {
      user_id: userId,
      product_id: productId,
      quantity,
      type,
      unit_cost: unitCost,
      observation,
      timestamp
    }
    return this.http.post<{message: string, entry_id: string}>(this.inventoryEntryUrl, newEntry)
  }
}
