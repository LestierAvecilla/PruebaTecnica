import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../cart.service';
import { Product } from '../product';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  items: { product: Product, quantity: number }[];

  constructor(private cartService: CartService) {
    this.items = this.cartService.getItems();
  }

  clearCart() {
    this.items = this.cartService.clearCart();
  }

  removeItem(product: Product) {
    this.cartService.removeItem(product);
  }

  increaseQuantity(product: Product) {
    this.cartService.increaseQuantity(product);
  }

  decrementQuantity(product: Product) {
    this.cartService.decrementQuantity(product);
  }

  getTotal() {
    return this.items.reduce((total, item) => total + item.product.subtotal * item.quantity, 0);
  }

  getTax() {
    return this.items.reduce((total, item) => total + (item.product.tax ?? 0) * item.quantity, 0);
  }

  getShipping() {
    return this.items.reduce((total, item) => total + (item.product.shipping ?? 0) * item.quantity, 0);
  }

  getGrandTotal() {
    return this.getTotal() + this.getTax() + this.getShipping();
  }
}