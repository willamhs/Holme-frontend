import { Injectable } from '@angular/core';
import { InscriptionItemCreateUpdateRequest } from '../../shared/models/inscription-create-update.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartKey = 'cartItems';

  constructor() {}

  getCartItems(): InscriptionItemCreateUpdateRequest[] {
    const items = localStorage.getItem(this.cartKey);
    return items ? JSON.parse(items) : [];
  }

  addToCart(item: InscriptionItemCreateUpdateRequest): void {
    const currentItems = this.getCartItems();
    const existingItemIndex = currentItems.findIndex(
      (i) => i.eventId === item.eventId
    );

    if (existingItemIndex !== -1) {
      currentItems[existingItemIndex].quantity += item.quantity;
      currentItems[existingItemIndex].price = item.price;
    } else {
      currentItems.push(item);
    }

    this.saveCartItems(currentItems);
  }

  removeFromCart(eventId: number): void {
    const currentItems = this.getCartItems().filter(
      (item) => item.eventId !== eventId
    );
    this.saveCartItems(currentItems);
  }

  clearCart(): void {
    localStorage.removeItem(this.cartKey);
  }

  private saveCartItems(items: InscriptionItemCreateUpdateRequest[]): void {
    localStorage.setItem(this.cartKey, JSON.stringify(items));
  }

  getCartTotal(): number {
    const items = this.getCartItems();
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  // New function to update cart item
  updateCartItem(updatedItem: InscriptionItemCreateUpdateRequest): void {
    const currentItems = this.getCartItems();
    const index = currentItems.findIndex(item => item.eventId === updatedItem.eventId);
    if (index !== -1) {
      currentItems[index] = { ...currentItems[index], ...updatedItem };
      this.saveCartItems(currentItems);
    }
  }
}