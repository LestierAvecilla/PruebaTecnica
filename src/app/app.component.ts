import { Component, OnInit  } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient , HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule
import { ProductListComponent } from './product-list/product-list.component';
import { CartComponent } from './cart/cart.component';
import { CartService } from './cart.service';
import { Product } from './product';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ProductListComponent, CartComponent,HttpClientModule], 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'PruebaTecnica';

  constructor(private cartService: CartService, private http: HttpClient) {}

  ngOnInit() {
    this.loadProducts();
  }


  async loadProducts() {
    try {
      const data = await this.http.get<Product[]>('assets/products.json').toPromise();
      if (data) {
        console.log('Datos cargados:', data); 
        data.forEach(product => this.cartService.loadFromJson(product)); 
      } else {
        console.error('No se encontraron datos en el archivo JSON.');
      }
    } catch (error) {
      console.error('Error al cargar los datos:', error); 
    }
  }
}