import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EventCardComponent } from '../../../shared/components/event-card/event-card.component';
import { InterestService } from '../../../core/services/interest.service';
import { EventService } from '../../../core/services/event.service';
import { EventDetailsResponse } from '../../../shared/models/event-details-response.model';
import { EventDetailsComponent } from '../../../shared/components/event-details/event-details.component';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule,
    RouterModule,
    EventCardComponent,
    MatDialogModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatSnackBarModule],
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  favoriteEvents: EventDetailsResponse[] = [];
  isLoading: boolean = true;

  constructor(
    private interestService: InterestService,
    private eventService: EventService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadFavoriteEvents();
  }

  loadFavoriteEvents(): void {
    this.isLoading = true;
    this.interestService.getUserInterests().subscribe({
      next: (favoriteEventDTOs) => {
        const eventDetailsObservables = favoriteEventDTOs.map(dto =>
          this.eventService.getEventDetailsById(dto.eventId)
        );

        Promise.all(eventDetailsObservables.map(obs => obs.toPromise()))
          .then(eventDetails => {
            this.favoriteEvents = eventDetails as EventDetailsResponse[];
            this.isLoading = false;
          })
          .catch(error => {
            console.error('Error loading full event details:', error);
            this.showSnackBar('Error al cargar detalles completos de eventos favoritos');
            this.isLoading = false;
          });
      },
      error: (error) => {
        console.error('Error loading favorite events:', error);
        this.showSnackBar('Error al cargar los eventos favoritos');
        this.isLoading = false;
      }
    });
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Cerrar', { duration: 3000 });
  }
}
