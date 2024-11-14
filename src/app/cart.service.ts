import { Injectable } from '@angular/core';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: { product: Product, quantity: number }[] = [];

  addToCart(product: Product) {
    const item = this.items.find(i => i.product.name === product.name);
    if (item) {
      item.quantity++;
    } else {
      this.items.push({ product, quantity: 1 });
    }
  }

  loadFromJson(product: Product) {
    let quantity = product.quantity ?? 1; 
    if (quantity < 0) {
      quantity = 0; 
    }
    if (quantity > 0) { 
      const item = this.items.find(i => i.product.name === product.name);
      if (item) {
        item.quantity += quantity;
      } else {
        this.items.push({ product, quantity });
      }
    }
  }

  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
    return this.items;
  }

  removeItem(product: Product) {
    const index = this.items.findIndex(i => i.product.name === product.name);
    if (index > -1) {
      this.items.splice(index, 1);
    }
  }

  increaseQuantity(product: Product) {
    const item = this.items.find(i => i.product.name === product.name);
    if (item) {
      item.quantity++;
    }
  }

  decrementQuantity(product: Product) {
    const item = this.items.find(i => i.product.name === product.name);
    if (item) {
      item.quantity--;
      if (item.quantity === 0) {
        this.removeItem(product);
      }
    }
  }
}