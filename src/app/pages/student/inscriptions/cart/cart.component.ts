import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../../../core/services/cart.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { CheckoutService } from '../../../../core/services/checkout.service';
import { AuthService } from '../../../../core/services/auth.service';
import { InscriptionService } from '../../../../core/services/inscription.service';
import { InscriptionCreateUpdateRequest, InscriptionItemCreateUpdateRequest } from '../../../../shared/models/inscription-create-update.model';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ApiImgPipe } from '../../../../core/pipes/api-img.pipe';
import {MatBadgeModule} from '@angular/material/badge';
import { EventDetailsResponse } from '../../../../shared/models/event-details-response.model';
import { EventService } from '../../../../core/services/event.service';
import { forkJoin, map } from 'rxjs';
import { MatDividerModule } from '@angular/material/divider';

interface ExtendedCartItem extends InscriptionItemCreateUpdateRequest {
  eventDetails?: EventDetailsResponse;
}

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    ApiImgPipe
  ],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: ExtendedCartItem[] = [];
  total: number = 0;
  loading = false;
  customerId!: number;

  private inscriptionService = inject(InscriptionService);
  private checkoutService = inject(CheckoutService);
  private cartService = inject(CartService);
  private eventService = inject(EventService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);
  private snackBar = inject(MatSnackBar);

  ngOnInit(): void {
    this.loadCart();
    this.customerId = this.authService.getUser()?.customerId || 0;

    const token = this.route.snapshot.queryParamMap.get('token');
    const payerId = this.route.snapshot.queryParamMap.get('PayerID');

    if (token && payerId) {
      this.loading = true;
      this.checkoutService.capturePaypalOrder(token)
        .subscribe({
          next: (response) => {
            if (response.completed) {
              this.clearCart();
              this.router.navigate(['/customer/cart', response.inscriptionId]);
            }
          },
          error: (error) => {
            this.loading = false;
            this.snackBar.open('Error al procesar el pago', 'Cerrar', { duration: 5000 });
            console.error('Error capturing PayPal order:', error);
          }
        });
        this.router.navigate(['/customer/cart']);
    }
  }

  loadCart(): void {
    const cartItems = this.cartService.getCartItems();
    this.total = this.cartService.getCartTotal();

    const eventRequests = cartItems.map(item =>
      this.eventService.getEventDetailsById(item.eventId).pipe(
        map(eventDetails => ({ ...item, eventDetails }))
      )
    );

    forkJoin(eventRequests).subscribe({
      next: (extendedItems) => {
        this.cartItems = extendedItems;
      },
      error: (error) => {
        console.error('Error loading event details:', error);
        this.snackBar.open('Error al cargar detalles de eventos', 'Cerrar', { duration: 5000 });
      }
    });
  }

  removeItem(eventId: number): void {
    this.cartService.removeFromCart(eventId);
    this.loadCart();
    this.snackBar.open('Evento eliminado del carrito', 'Cerrar', { duration: 3000 });
    window.location.reload();

  }

  clearCart(): void {
    this.cartService.clearCart();
    this.loadCart();
    this.snackBar.open('Carrito vaciado', 'Cerrar', { duration: 3000 });
    window.location.reload();

  }

  proceedToCheckout(): void {
    const inscriptionRequest: InscriptionCreateUpdateRequest = {
      total: this.total,
      customerId: this.customerId,
      items: this.cartItems.map((item) => ({
        eventId: item.eventId,
        nameEvent: item.nameEvent,
        quantity: item.quantity,
        price: item.price
      })),
    };

    this.loading = true;
    this.inscriptionService.create(inscriptionRequest)
      .subscribe({
        next: (inscription) => {
          this.checkoutService.createPaypalOrder(inscription.id)
            .subscribe({
              next: (response) => {
                window.location.href = response.paypalUrl;
              },
              error: (error) => {
                this.loading = false;
                this.snackBar.open('Error al crear la orden de PayPal', 'Cerrar', { duration: 5000 });
                console.error('Error creating PayPal order:', error);
              }
            });
          },
        error: (error) => {
          this.loading = false;
          this.snackBar.open('Error al crear la inscripción', 'Cerrar', { duration: 5000 });
          console.error('Error creating inscription:', error);
        }
      });
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(value);
  }
}