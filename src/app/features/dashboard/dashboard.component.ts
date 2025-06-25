import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { InventoryEntryService } from '../../services/inventoryEntry.service';
import { InventoryOutputService } from '../../services/inventoryOutput.service';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styles: ``,
})
export class DashboardComponent implements OnInit {
  highStockProducts: Product[] = [];
  userId: string = '';
  userEmail: string | null = sessionStorage.getItem('userEmail');
  totalCriticalStock: number = 0;
  totalEntries: number = 0;
  totalOutputs: number = 0;
  totalProducts: number = 0;

  constructor(
    private inventoryEntryService: InventoryEntryService,
    private inventoryOutputService: InventoryOutputService,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUserData();
    this.loadProducts();
    this.loadTotalProducts();
    this.loadTotalEntries();
    this.loadTotalOutputs();
    this.loadTotalCriticalStock();
  }
  loadProducts(): void {
    this.productService.getProductsByUser(this.userId).subscribe({
      next: (products) =>
        (this.highStockProducts = products
          .sort((a, b) => b.quantity - a.quantity)
          .slice(0, 5)),
    });
  }

  loadTotalCriticalStock(): void {
    this.productService.getLowStockProducts(this.userId).subscribe({
      next: (products) => (this.totalCriticalStock = products.length),
      error: (error) =>
        console.error(
          'Error cargando el total de productos con stock crítico',
          error
        ),
    });
  }

  loadTotalEntries(): void {
    this.inventoryEntryService.getTotalEntries(this.userId).subscribe({
      next: (totalEntries) => (this.totalEntries = totalEntries),
      error: (error) =>
        console.error('Error cargando el total de las entradas', error),
    });
  }

  loadTotalProducts(): void {
    this.productService.getTotalProducts(this.userId).subscribe({
      next: (total) => (this.totalProducts = total),
      error: (error) =>
        console.error('Error cargando el total de productos', error),
    });
  }

  loadTotalOutputs(): void {
    this.inventoryOutputService.getTotalOutputs(this.userId).subscribe({
      next: (totalOutputs) => (this.totalOutputs = totalOutputs),
      error: (error) =>
        console.error('Error cargando el total de productos', error),
    });
  }

  loadUserData() {
    const userData = sessionStorage.getItem('userData');
    if (userData) {
      const user: User = JSON.parse(userData);
      this.userId = user.userId;
    } else {
      this.router.navigate(['/login']);
    }
  }
}
