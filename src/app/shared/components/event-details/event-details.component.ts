import { CommonModule } from '@angular/common';
import { Component, inject, Inject, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ApiImgPipe } from '../../../core/pipes/api-img.pipe';
import { EventDetailsResponse } from '../../models/event-details-response.model';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';
import { EventService } from '../../../core/services/event.service';
import { AuthService } from '../../../core/services/auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CartService } from '../../../core/services/cart.service';
import { InscriptionItemCreateUpdateRequest } from '../../models/inscription-create-update.model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { InterestService } from '../../../core/services/interest.service';
import { Location } from '@angular/common';
import {MatDividerModule} from '@angular/material/divider';
import {MatChipsModule} from '@angular/material/chips';
import { forkJoin } from 'rxjs';
import { InscriptionService } from '../../../core/services/inscription.service';
import { CalendarService } from '../../../core/services/calendar.service';
import { EventItem, UserEventProgrammingDTO } from '../../models/user-event-programming-response.model';
import { InscriptionResponse, InscriptionStatus } from '../../models/inscription-response.model';
import { HomeService } from '../../../core/services/home.service';
import { EventProgrammingDetailsResponse } from '../../models/event-programming-details.response.model';
import { EventProgrammingService } from '../../../core/services/event-programming.service';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatDividerModule,
    ApiImgPipe],
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.css'
})
export class EventDetailsComponent implements OnInit {
  @Input() eventId!: number;
  event: EventDetailsResponse | null = null;
  isAuthenticated = false;
  isEnrolled = false;
  isFavorite = false;
  isStudent = false;
  isAdmin = false;
  isLoading = true;
  isEnrollLoading = false;
  isFavoriteLoading = false;
  error: string | null = null;
  enrollmentStatus: 'not-enrolled' | 'processing' | 'pending-payment' | 'pending-confirmation' | 'enrolled' = 'not-enrolled';
  eventSchedule: EventItem[] | null = null;
  eventSchedules: EventProgrammingDetailsResponse[] = [];
  private eventProgrammingService = inject(EventProgrammingService);
  private router = inject(Router);

  constructor(
    private eventService: EventService,
    private homeService: HomeService,
    private inscriptionService: InscriptionService,
    private calendarService: CalendarService,
    private authService: AuthService,
    private interestService: InterestService,
    private cartService: CartService,
    private snackBar: MatSnackBar,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.isStudent = this.authService.getUserRole() === 'CUSTOMER';
    this.isAdmin = this.authService.getUserRole() == 'ADMIN';
    
    if (this.eventId) {
      this.loadEventDetails();
      this.loadEventSchedules();
      if(this.isStudent)
      {
        this.checkEnrollmentStatus();
        this.loadFavoriteStatus();
      }
    } else {
      this.error = 'No event ID provided';
      this.isLoading = false;
    }
  }

  loadEventDetails(): void {
    this.isLoading = true;
    this.error = null;
    if(this.isStudent || this.isAdmin){
      this.eventService.getEventDetailsById(this.eventId).subscribe({
        next: (data) => {
          this.event = data;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error loading event details:', err);
          this.error = 'Error al cargar detalles la charla';
          this.isLoading = false;
          this.showSnackBar('Error al cargar detalles de la charla');
        }
      });
    }else{
      this.homeService.getEventDetailsById(this.eventId).subscribe({
        next:(data) => {
          this.event = data;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error loading event details:', err);
          this.error = 'Error al cargar detalles de la charla';
          this.isLoading = false;
          this.showSnackBar('Error al cargar detalles de la charla');
        }
      })
    }
  }

  loadEventSchedules(): void {
    this.eventProgrammingService.findByIdEvent(this.eventId).subscribe({
      next: (schedules) => {
        this.eventSchedules = schedules;
      },
      error: (error) => {
        console.error('Error loading event schedules:', error);
        this.showSnackBar('Error al cargar los horarios del evento');
      }
    });
  }

  checkEnrollmentStatus(): void {
    forkJoin({
      inscriptions: this.inscriptionService.getInscriptionHistory(),
      calendarEvents: this.calendarService.getUserEvents()
    }).subscribe({
      next: ({ inscriptions, calendarEvents }) => {
        this.processInscriptions(inscriptions);
        this.processCalendarEvents(calendarEvents);
      },
      error: (error) => {
        console.error('Error checking enrollment status:', error);
        this.showSnackBar('Error al verificar el estado de inscripción');
      }
    });
  }

  private processInscriptions(inscriptions: InscriptionResponse[]): void {
    for (const inscription of inscriptions) {
      const eventItem = inscription.items.find(item => item.eventId === this.eventId);
      if (eventItem) {
        this.isEnrolled = true;
        this.updateEnrollmentStatus(inscription.inscriptionStatus, eventItem.price > 0);
        return;
      }
    }
  }

  private processCalendarEvents(calendarEvents: UserEventProgrammingDTO[]): void {
    const eventInCalendar = calendarEvents.find(event => 
      event.items.some(item => item.eventId === this.eventId.toString())
    );

    if (eventInCalendar) {
      this.isEnrolled = true;
      this.enrollmentStatus = 'enrolled';
      this.eventSchedule = eventInCalendar.items.filter(item => item.eventId === this.eventId.toString());
    } else if (!this.isEnrolled) {
      this.updateEnrollmentStatus();
    }
  }

  goToCalendar(): void {
    this.router.navigate(['/customer/calendar']);
  }

  loadFavoriteStatus(): void {
    this.interestService.isEventFavorite(this.eventId).subscribe({
      next: (isFavorite) => {
        this.isFavorite = isFavorite;
      },
      error: (error) => {
        console.error('Error checking favorite status:', error);
        this.showSnackBar('Error al verificar estado de favorito');
      }
    });
  }

  enrollInEvent(): void {
    if (!this.isStudent || this.isEnrolled) {
      return;
    }

    this.isEnrollLoading = true;
    this.enrollmentStatus = 'processing';
    const cartItem: InscriptionItemCreateUpdateRequest = {
      eventId: this.eventId,
      nameEvent: this.event?.name || '',
      quantity: 1,
      price: this.event?.priceValue || 0
    };

    try {
      this.cartService.addToCart(cartItem);
      this.updateEnrollmentStatus();
      this.showSnackBar('Evento agregado al carrito');
      window.location.reload();
    } catch (error) {
      console.error('Error adding event to cart:', error);
      this.showSnackBar('Error al agregar el evento al carrito');
      this.enrollmentStatus = 'not-enrolled';
    } finally {
      this.isEnrollLoading = false;
    }
  }

  toggleFavorite(): void {
    this.isFavoriteLoading = true;
    const action = this.isFavorite ? this.interestService.removeInterest(this.eventId) : this.interestService.addInterest(this.eventId);
    
    action.subscribe({
      next: () => {
        this.isFavorite = !this.isFavorite;
        this.showSnackBar(this.isFavorite ? 'Evento agregado a favoritos' : 'Evento eliminado de favoritos');
        this.isFavoriteLoading = false;
      },
      error: (error) => {
        console.error('Error toggling favorite:', error);
        this.showSnackBar('Error al actualizar favoritos');
        this.isFavoriteLoading = false;
      }
    });
  }

  getEnrollButtonIcon(): string {
    switch (this.enrollmentStatus) {
      case 'processing': return 'hourglass_empty';
      case 'pending-payment': return 'payment';
      case 'pending-confirmation': return 'schedule';
      case 'enrolled': return 'check_circle';
      default: return 'how_to_reg';
    }
  }

  getEnrollButtonText(): string {
    switch (this.enrollmentStatus) {
      case 'processing': return 'Procesando...';
      case 'pending-payment': return 'Pago pendiente';
      case 'pending-confirmation': return 'Confirmación pendiente';
      case 'enrolled': return 'Inscrito';
      default: return 'Inscribirse';
    }
  }

  goBackToHome(): void {
    this.location.back();
  }

  private updateEnrollmentStatus(inscriptionStatus?: InscriptionStatus, isPaidEvent: boolean = false): void {
    if (this.isEnrolled) {
      switch (inscriptionStatus) {
        case InscriptionStatus.PAID:
          this.enrollmentStatus = 'enrolled';
          break;
        case InscriptionStatus.PENDING:
          this.enrollmentStatus = isPaidEvent ? 'pending-payment' : 'pending-confirmation';
          break;
        default:
          this.enrollmentStatus = 'enrolled';
      }
    } else {
      const cartItems = this.cartService.getCartItems();
      const isInCart = cartItems.some(item => item.eventId === this.eventId);
      if (isInCart) {
        this.enrollmentStatus = this.event?.priceValue ? 'pending-payment' : 'pending-confirmation';
      } else {
        this.enrollmentStatus = 'not-enrolled';
      }
    }
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Cerrar', { duration: 3000 });
  }
}