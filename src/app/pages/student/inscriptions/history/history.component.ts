import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InscriptionItemResponse, InscriptionResponse, InscriptionStatus } from '../../../../shared/models/inscription-response.model';
import { InscriptionService } from '../../../../core/services/inscription.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { ApiImgPipe } from '../../../../core/pipes/api-img.pipe';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EventService } from '../../../../core/services/event.service';
import { EventDetailsResponse } from '../../../../shared/models/event-details-response.model';
import { forkJoin, map, switchMap } from 'rxjs';

interface ExtendedInscriptionItemResponse extends InscriptionItemResponse {
  eventDetails?: EventDetailsResponse;
}

interface ExtendedInscriptionResponse extends InscriptionResponse {
  items: ExtendedInscriptionItemResponse[];
}

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    MatChipsModule,
    MatCardModule,
    MatProgressSpinnerModule,
    RouterModule,
    ApiImgPipe],
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})

export class HistoryComponent implements OnInit {
  inscriptions: ExtendedInscriptionResponse[] = [];
  isLoading = true;
  private inscriptionService = inject(InscriptionService);
  private eventService = inject(EventService);

  ngOnInit(): void {
    this.loadPurchaseHistory();
  }

  loadPurchaseHistory(): void {
    this.isLoading = true;
    this.inscriptionService.getInscriptionHistory().pipe(
      switchMap((inscriptions: InscriptionResponse[]) => {
        this.inscriptions = inscriptions as ExtendedInscriptionResponse[];
        const eventRequests = this.inscriptions.flatMap(inscription =>
          inscription.items.map(item =>
            this.eventService.getEventDetailsById(item.eventId).pipe(
              map(eventDetails => ({ item, eventDetails }))
            )
          )
        );
        return forkJoin(eventRequests);
      })
    ).subscribe({
      next: (results) => {
        results.forEach(({ item, eventDetails }) => {
          (item as ExtendedInscriptionItemResponse).eventDetails = eventDetails;
        });
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading inscriptions or event details:', err);
        this.isLoading = false;
      }
    });
  }

  getStatusClass(status: InscriptionStatus): string {
    switch (status) {
      case InscriptionStatus.PAID:
        return 'status-paid';
      case InscriptionStatus.PENDING:
        return 'status-pending';
      default:
        return 'status-failed';
    }
  }

  getStatusText(status: InscriptionStatus): string {
    switch (status) {
      case InscriptionStatus.PAID:
        return 'Pagado';
      case InscriptionStatus.PENDING:
        return 'Pendiente';
      default:
        return 'Fallido';
    }
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}