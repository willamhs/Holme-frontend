import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { Router, RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { NavbarComponent } from '../../../../shared/components/navbar/navbar.component';
import  LocationFormComponent  from '../location-form/location-form.component';
import { LocationService } from '../../../../core/services/location.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PageableResponse } from '../../../../shared/models/pageable.response.model';
import { Location } from '../../../../shared/models/location.model';

@Component({
  selector: 'app-location-list',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent, 
    FooterComponent,
    MatTableModule,
    MatFormFieldModule, 
    MatInputModule,
    MatButtonModule, 
    MatDialogModule, 
    FormsModule,
    MatPaginatorModule,
    LocationFormComponent
  ],
  templateUrl: './location-list.component.html',
  styleUrl: './location-list.component.css'
})
export class LocationListComponent {
  locations: Location[] = [];
  filteredLocations: Location[] = [];
  filterText: string = '';
  totalElements = 0;
  pageSize = 6;
  pageIndex = 0;

  private locationService = inject(LocationService);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);

  displayedColumns: string[] = [
    'location',
    'city',
    'country',
    'actions',
  ];

  ngOnInit(): void {
    this.loadLocations();
  }

  loadLocations(pageIndex: number = 0, pageSize: number = 6): void {
    this.locationService.paginateLocations(pageIndex, pageSize).subscribe({
      next: (response: PageableResponse<Location>) => {
        this.locations = response.content;
        this.totalElements = response.totalElements;
        this.filteredLocations = this.locations;
      },
      error: (error) => {
        this.snackBar.open('Error loading locations', 'Close', {duration: 3});
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value
    .trim()
    .toLocaleLowerCase();

    this.filteredLocations = this.locations.filter(location => {
      return location.location.toLocaleLowerCase().includes(filterValue) ||
      location.city.toLocaleLowerCase().includes(filterValue) ||
      location.country.toLocaleLowerCase().includes(filterValue);
    });
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadLocations(this.pageIndex, this.pageSize);
  }

  createLocation(): void {
    this.router.navigate(['admin/locations/new']);
  }

  editLocation(locationId: number): void {
    this.router.navigate(['admin/locations/edit', locationId]);
  }

  deleteLocation(locationId: number): void {
    this.locationService.deleteLocation(locationId).subscribe({
      next: () => {
        this.loadLocations(this.pageIndex, this.pageSize);
        this.snackBar.open('Location deleted successfully', 'Close', {duration: 3});
      },
      error: () => {
        this.snackBar.open('Failed to delete location', 'Close', {duration: 3});
      }
    });
  }

}
