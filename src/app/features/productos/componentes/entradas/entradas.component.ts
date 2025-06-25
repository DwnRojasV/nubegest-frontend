import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DataTableComponent } from '../../../../shared/components/data-table/data-table.component';
import { InventoryEntryService } from '../../../../services/inventoryEntry.service';
import { InventoryEntry } from '../../../../models/inventoryEntry.model';
import { Product } from '../../../../models/product.model';
import { ProductService } from '../../../../services/product.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { User } from '../../../../models/user.model';

@Component({
  selector: 'app-entradas',
  standalone: true,
  imports: [CommonModule, DataTableComponent, ReactiveFormsModule],
  templateUrl: './entradas.component.html',
  styles: `
  .no-resize {
   resize: none;
  }
  `,
})
export class EntradasInventarioComponent implements OnInit {
  entries: InventoryEntry[] = [];
  keys: string[] = [];
  columns: any[] = [];
  userId: string = '';

  //form
  products: Product[] = [];
  form!: FormGroup;

  constructor(
    private inventoryEntryService: InventoryEntryService,
    private productsService: ProductService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUserData();
    this.loadInventoryEntries();
    this.loadProducts();
    this.form = this.fb.group({
      productId: ['', Validators.required],
      quantity: [null, [Validators.required, Validators.min(1)]],
      type: ['', Validators.required],
      unitCost: [null, [Validators.required, Validators.min(0.01)]],
      timestamp: [null, Validators.required],
      observation: ['', Validators.required],
    });
  }

  loadInventoryEntries(): void {
    this.inventoryEntryService
      .getInventoryEntriesByUser(this.userId)
      .subscribe({
        next: (data) => {
          this.entries = data;
          this.getEntryColumns(data);
          this.getEntrykeys(data);
        },
        error: (err) => {
          console.error('Error al obtener las entradas', err);
        },
      });
  }

  loadProducts(): void {
    this.productsService.getProductsByUser(this.userId).subscribe({
      next: (data) => {
        this.products = data;
      },
    });
  }

  getEntrykeys(entries: InventoryEntry[]): void {
    const keys = [...new Set(entries.flatMap((obj) => Object.keys(obj)))];
    this.keys = keys.filter((e) => e !== 'userId');
  }

  getEntryColumns(entries: InventoryEntry[]): void {
    // Extrae todas las claves únicas, excepto 'userId'
    const columns = [...new Set(entries.flatMap((obj) => Object.keys(obj)))]
      .filter((key) => key !== 'userId')
      .map((key) => {
        let label = key; // Valor por defecto

        switch (key) {
          case 'entryId':
            label = 'ID';
            break;
          case 'productId':
            label = 'ID Producto';
            break;
          case 'quantity':
            label = 'Cantidad';
            break;
          case 'type':
            label = 'Tipo';
            break;
          case 'unitCost':
            label = 'Precio Unitario';
            break;
          case 'observation':
            label = 'Observación';
            break;
          case 'timestamp':
            label = 'Fecha';
            break;
        }

        return { key, label };
      });

    this.columns = columns;
  }

  onProductChange(event: Event) {}

  onSubmit(): void {
    if (this.form.valid) {
      console.log('Formulario enviado:', this.form.value);

      this.inventoryEntryService
        .createInventoryEntry(this.userId, this.form.value)
        .subscribe({
          next: (entry) => {
            console.log(entry);
            alert('Producto creado exitosamente: ' + entry.entry_id);
            this.loadInventoryEntries();
          },
        });

      this.form.reset();
    } else {
      this.form.markAllAsTouched();
    }
  }
  loadUserData(): void {
    const userData = sessionStorage.getItem('userData');
    if (userData) {
      const user: User = JSON.parse(userData);
      this.userId = user.userId;
    } else {
      this.router.navigate(['/login']);
    }
  }
}
