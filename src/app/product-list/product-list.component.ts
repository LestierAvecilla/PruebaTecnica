import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../cart.service';
import { Product } from '../product';
import { of, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products$: Observable<Product[]> = of([]); 

  constructor(private cartService: CartService, private http: HttpClient) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.products$ = this.http.get<Product[]>('assets/products.json').pipe(
      tap(data => {
        console.log('Datos cargados:', data); 
        data.forEach(product => this.cartService.loadFromJson(product));
      }),
      catchError(error => {
        console.error('Error al cargar los datos:', error); 
        return of([]); 
      })
    );
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}