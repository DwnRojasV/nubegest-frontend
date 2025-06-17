import { Component, inject } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./layout/header/header.component";
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { FooterComponent } from "./layout/footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    HeaderComponent,
    SidebarComponent,
    FooterComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'inventarios-adso-frontend';

  router = inject(Router);  // Inyectar Router

  
  showTemplate() {
    // Retorna true si la ruta activa no es 'login', para mostrar el layout


    
    return this.router.url !== '/newlogin' ;
  }
  
}
