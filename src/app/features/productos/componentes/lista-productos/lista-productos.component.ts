import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

interface Product {
  id: number;
  name: string;
  description: string;
  mark: string;
}



@Component({
  selector: 'app-lista-productos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css']
})
export class ListaProductosComponent {

  productos: Product[] = [
    { id: 1, name: 'Laptop Dell XPS 13', description: 'Portátil ultraligero con pantalla InfinityEdge', mark: 'Dell' },
    { id: 2, name: 'Monitor LG UltraWide', description: 'Pantalla curva de 34" para multitarea', mark: 'LG' },
    { id: 3, name: 'Samsung Galaxy S24', description: 'Teléfono inteligente con cámara de 200MP', mark: 'Samsung' },
    { id: 4, name: 'iPad Air', description: 'Tableta con chip M1 y pantalla Liquid Retina', mark: 'Apple' },
    { id: 5, name: 'HP LaserJet Pro', description: 'Impresora láser monocromática de alta velocidad', mark: 'HP' },
    
  ];

  editarProducto(id: number): void {
    const producto = this.productos.find(p => p.id === id);
    if (producto) {
      alert(`Editar producto: ${producto.name}`);
      
    }
  }

  eliminarProducto(id: number): void {
    const producto = this.productos.find(p => p.id === id);
    if (producto) {
      const confirmar = confirm(`¿Deseas eliminar el producto "${producto.name}"?`);
      if (confirmar) {
        this.productos = this.productos.filter(p => p.id !== id);
        alert(`Producto eliminado: ${producto.name}`);
      }
    }
  }

}