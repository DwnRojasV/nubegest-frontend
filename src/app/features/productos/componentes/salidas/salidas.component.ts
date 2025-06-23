import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableComponent } from '../../../../shared/components/data-table/data-table.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InventoryOutputService } from '../../../../services/inventoryOutput.service';
import { Product } from '../../../../models/product.model';
import { ProductService } from '../../../../services/product.service';
import { InventoryOutput } from '../../../../models/inventoryOutput.model';

@Component({
  selector: 'app-salidas',
  standalone: true,
  imports: [CommonModule, DataTableComponent, ReactiveFormsModule],
  templateUrl: './salidas.component.html',
  styles: `
  .no-resize {
   resize: none;
  }
  `,
})
export class SalidasInventarioComponent implements OnInit {
  outputs: InventoryOutput[] = [];
  keys: string[] = [];
  columns: any[] = [];
  userId: string = 'U00001';

  //Formulario
  products: Product[] = [];
  form!: FormGroup;

  constructor(
    private inventoryOutputService: InventoryOutputService,
    private productService: ProductService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loadInventoryOutputs();
    this.loadProducts();
    this.form = this.fb.group({
      observation: ['', Validators.required],
      productId: ['', Validators.required],
      quantity: [null, [Validators.required, Validators.min(1)]],
      timestamp: [null, Validators.required],
      type: ['', Validators.required],
    });
  }

  loadInventoryOutputs(): void {
    this.inventoryOutputService
      .getInventoryOutputsByUser(this.userId)
      .subscribe({
        next: (data) => {
          this.outputs = data;
          this.getOutputColumns(data);
          this.getOutputKeys(data);
        },
        error: (err) => {
          console.error('Error al obtener las salidas', err);
        },
      });
  }

  loadProducts(): void {
    this.productService.getProductsByUser(this.userId).subscribe({
      next: (data) => {
        this.products = data;
      },
    });
  }

  getOutputKeys(outputs: InventoryOutput[]): void {
    const keys = [...new Set(outputs.flatMap((obj) => Object.keys(obj)))];
    this.keys = keys.filter((e) => e !== 'userId');
  }

  getOutputColumns(outputs: InventoryOutput[]): void {
    const columns = [...new Set(outputs.flatMap((obj) => Object.keys(obj)))]
      .filter((key) => key !== 'userId')
      .map((key) => {
        let label = key;

        switch (key) {
          case 'outputId':
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

  onSubmit():void {
    if(this.form.valid){
      this.inventoryOutputService
      .createInventoryOutput(this.userId, this.form.value)
      .subscribe({
        next: (output) => {
          alert("Salida creada exitosamente: "+  output.output_id)
          this.loadInventoryOutputs()
        }
      })
      this.form.reset();
    } else {
      this.form.markAllAsTouched()
    }
  }
}
