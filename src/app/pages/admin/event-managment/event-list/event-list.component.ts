import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterOutlet } from '@angular/router';
import { ApiImgPipe } from '../../../../core/pipes/api-img.pipe';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { NavbarComponent } from '../../../../shared/components/navbar/navbar.component';
import { EventDetailsResponse } from '../../../../shared/models/event-details-response.model';
import { EventService } from '../../../../core/services/event.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EventCardComponent } from '../../../../shared/components/event-card/event-card.component';
import { PageableResponse } from '../../../../shared/models/pageable.response.model';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet, 
    NavbarComponent, 
    FooterComponent, 
    EventCardComponent, 
    MatFormFieldModule, 
    MatInputModule, 
    MatIconModule, 
    MatButtonModule, 
    FormsModule,
    ApiImgPipe,
    MatPaginatorModule,
    MatProgressBarModule
  ],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.css'
})
export class EventListComponent implements OnInit {

  events: EventDetailsResponse[] = [];
  filteredEvents: EventDetailsResponse[] = [];
  filterText: string = '';
  totalElements = 0;
  pageSize = 6;
  pageIndex = 0;
  isLoading = false;

  private eventService = inject(EventService);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(pageIndex: number = 0, pageSize: number = 6): void {
    this.isLoading = true;
    this.eventService.paginateEvents(pageIndex, pageSize).subscribe({
      next: (response: PageableResponse<EventDetailsResponse>) => {
        this.events = response.content;
        this.filteredEvents = response.content;
        this.totalElements = response.totalElements;
        this.isLoading = false;
      },
      error: (error) => {
        this.snackBar.open('Error al cargar las charlas', 'Cerrar', { duration: 3 });
        this.isLoading = false;
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value
    .trim()
    .toLowerCase();
    this.filteredEvents = this.events.filter((event) =>
      event.name.toLowerCase().includes(filterValue) ||
      event.categoryName.toLowerCase().includes(filterValue) ||
      event.locationName.toLowerCase().includes(filterValue) ||
      event.cityName.toLowerCase().includes(filterValue)
    );
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadEvents(this.pageIndex, this.pageSize);
  }

  createEvent(): void {
    this.router.navigate(['admin/events/new']);
  }

  editEvent(eventId: number): void {
    this.router.navigate(['admin/events/edit', eventId]);
  }

  deleteEvent(eventId: number): void {
    if(confirm('¿Estas seguro que deseas eliminar esta charla?')) {
      this.eventService.deleteEvent(eventId).subscribe({
        next: () => {
          this.snackBar.open('Evento eliminado correctamente', 'Cerrar', { duration: 30 });
          this.loadEvents(this.pageIndex, this.pageSize);
        },
        error: (error) => {
          this.snackBar.open('Error al eliminar la charla', 'Cerrar', { duration: 30 });
        }
      })
    }
  }

}
