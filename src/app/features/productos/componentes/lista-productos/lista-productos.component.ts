import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Product } from '../../../../models/product.model';
import { ProductService } from '../../../../services/product.service';
import { InventoryEntryService } from '../../../../services/inventoryEntry.service';
import { InventoryOutputService } from '../../../../services/inventoryOutput.service';
import { InventoryEntry } from '../../../../models/inventoryEntry.model';
import { InventoryOutput } from '../../../../models/inventoryOutput.model';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-lista-productos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css'],
})
export class ListaProductosComponent implements OnInit {
  private userId: string = 'U00001';
  products: Product[] = [];
  entries: InventoryEntry[] = [];
  outputs: InventoryOutput[] = [];

  //Table state
  searchControl = new FormControl('');
  filteredProducts: Product[] = [];
  displayedProducts: Product[] = [];

  //pagination
  currentPage = 1;
  pageSize = 5;
  totalItems = 0;
  totalPages = 0;
  pageSizeOptions = [5, 10, 25];

  isloading = false;

  constructor(
    private productService: ProductService,
    private inventoryEntryService: InventoryEntryService,
    private inventoryOutputService: InventoryOutputService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProductsByUser(this.userId).subscribe({
      next: (products) => {
        this.isloading = true;
        this.products = products;
        this.filteredProducts = [...this.products];
        this.setupSearch();
        this.updatePagination();
        this.isloading = false;
      },
    });
  }

  setupSearch(): void {
    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((searchTerm) => {
        this.filterProducts(searchTerm || '');
      });
  }
  updatePagination(): void {
    this.totalItems = this.filteredProducts.length;
    this.totalPages = Math.ceil(this.totalItems / this.pageSize);
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.displayedProducts = this.filteredProducts.slice(start, end);
  }

  onPageSizeChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.pageSize = parseInt(value);
    this.currentPage = 1;
    this.updatePagination();
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(
      1,
      this.currentPage - Math.floor(maxVisiblePages / 2)
    );
    let endPage = Math.min(this.totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }

  getPagitationInfo(): string {
    const startItem = (this.currentPage - 1) * this.pageSize + 1;
    const endItem = Math.min(this.currentPage * this.pageSize, this.totalItems);
    return `Showing ${startItem} to ${endItem} of ${this.totalItems} products`;
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  filterProducts(term: string): void {
    const lowerTerm = term.toLowerCase();
    this.filteredProducts = this.products.filter(
      (product) =>
        product.productId.toLowerCase().includes(lowerTerm) ||
        product.name.toLowerCase().includes(lowerTerm) ||
        product.description.toLowerCase().includes(lowerTerm) ||
        product.brand.toLowerCase().includes(lowerTerm) ||
        product.category.toLowerCase().includes(lowerTerm)
    );
    this.currentPage = 1;
    this.updatePagination();
  }

  editProduct(id: string): void {
    console.log('productId: ', id);
    const producto = this.products.find((p) => p.productId === id);
    if (producto) {
      alert(`Editar producto: ${producto.name}`);
    }
  }

  eliminarProducto(id: string): void {
    const producto = this.products.find((p) => p.productId === id);
    if (producto) {
      const confirmar = confirm(
        `¿Deseas eliminar el producto "${producto.name}"?`
      );
      if (confirmar) {
        this.products = this.products.filter((p) => p.productId !== id);
        alert(`Producto eliminado: ${producto.name}`);
      }
    }
  }

  onAddProduct(): void {
    alert('Añadiendo producto');
  }
}
