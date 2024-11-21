import { Component, inject, OnInit } from '@angular/core';
import { EventCardComponent } from '../../../shared/components/event-card/event-card.component';
import { CommonModule } from '@angular/common';
import { EventService } from '../../../core/services/event.service';
import { AuthService } from '../../../core/services/auth.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EventDetailsResponse } from '../../../shared/models/event-details-response.model';
import { EventDetailsComponent } from '../../../shared/components/event-details/event-details.component';
import { RouterOutlet } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { ApiImgPipe } from '../../../core/pipes/api-img.pipe';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet, EventCardComponent, ApiImgPipe],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css'
})
export class CatalogComponent implements OnInit{
  events: EventDetailsResponse[] = [];
  filteredEvents: EventDetailsResponse[] = [];
  searchQuery: string = '';
  isLoading: boolean = true;
  showFilters: boolean = false;
  selectedCategory: string = '';
  selectedLocation: string = '';
  selectedCountry: string = '';
  minPrice: number | null = null;
  maxPrice: number | null = null;
  categories: string[] = [];
  locations: string[] = [];
  countries: String[] = [];

  private eventService = inject(EventService);
  private authService = inject(AuthService);
  private snackBar = inject(MatSnackBar);

  constructor() {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.isLoading = true;
    this.eventService.getEventDetails().subscribe({
      next: (events) => {
        this.events = events;
        this.filteredEvents = events;
        this.categories = [...new Set(events.map(event => event.categoryName))];
        this.locations = [...new Set(events.map(event => event.locationName))];
        this.countries = [...new Set(events.map(event => event.countryName))];
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading events:', error);
        this.snackBar.open('Error al cargar los eventos', 'Cerrar', { duration: 3000 });
        this.isLoading = false;
      }
    });
  }

  onSearch(): void {
    this.applyFilters();
  }

  toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }

  applyFilters(): void {
    const query = this.searchQuery.toLowerCase();
    this.filteredEvents = this.events.filter(event =>
      (event.name.toLowerCase().includes(query) ||
       event.categoryName.toLowerCase().includes(query) ||
       event.locationName.toLowerCase().includes(query) ||
       event.cityName.toLowerCase().includes(query)) &&
      (this.selectedCategory ? event.categoryName === this.selectedCategory : true) &&
      (this.selectedLocation ?
        event.locationName === this.selectedLocation : true) &&
      (this.selectedCountry ?
        event.countryName === this.selectedCountry : true) &&
      (this.minPrice !== null ?
        event.priceValue >= this.minPrice : true) &&
      (this.maxPrice !== null ?
        event.priceValue <= this.maxPrice : true)
    );
  }

  clearFilters(): void {
    this.selectedCategory = '';
    this.selectedLocation = '';
    this.selectedCountry = '';
    this.minPrice = null;
    this.maxPrice = null;
    this.searchQuery = '';
    this.filteredEvents = this.events;
  }

}
