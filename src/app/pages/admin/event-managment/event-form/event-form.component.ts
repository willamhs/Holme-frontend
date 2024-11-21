import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiImgPipe } from '../../../../core/pipes/api-img.pipe';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { EventService } from '../../../../core/services/event.service';
import { MediaService } from '../../../../core/services/media.service';
import { CategoryService } from '../../../../core/services/category.service';
import { LocationService } from '../../../../core/services/location.service';
import { PriceService } from '../../../../core/services/price.service';
import { Category } from '../../../../shared/models/category.model';
import { Price } from '../../../../shared/models/price.model';
import { Location } from '../../../../shared/models/location.model';
import { EventDetailsResponse } from '../../../../shared/models/event-details-response.model';
import { EventCreateUpdateRequest } from '../../../../shared/models/event-create-update-request.model';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ApiImgPipe,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatSnackBarModule,
    MatPaginatorModule,
  ],
  templateUrl: './event-form.component.html',
  styleUrl: './event-form.component.css'
})
export default class EventFormComponent implements OnInit {

  private eventService = inject(EventService);
  private mediaService = inject(MediaService);
  private categoryService = inject(CategoryService);
  private locationService = inject(LocationService);
  private priceService = inject(PriceService);

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);

  categories: Category[] = [];
  locations: Location[] = [];
  prices: Price[] = [];
  errors: string[] = [];
  eventId?: number;

  form: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(250)]],
    capacity: ['', [Validators.required, Validators.min(0)]],
    description: ['', [Validators.required, Validators.maxLength(500)]],
    imagePath: ['', Validators.required],
    categoryId: ['', Validators.required],
    locationId: ['', Validators.required],
    priceId: ['', Validators.required],
  });

  ngOnInit(): void {
    this.eventId = Number(this.route.snapshot.paramMap.get('id'));
    
    this.loadCategories();
    this.loadLocations();
    this.loadPrices();
  }

  private loadCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (categories) => {
        
        this.categories = categories;
        if (this.eventId) this.loadEventForEdit();
      },
      error: () => this.errors.push('Failed to load categories'),
    });
  }

  private loadLocations(): void {
    this.locationService.getAllLocations().subscribe({
      next: (locations) => {
        this.locations = locations;
      },
      error: () => this.errors.push('Failed to load locations'),
    });    
  }

  private loadPrices(): void {
    this.priceService.getAllPrices().subscribe({
      next: (prices) => {
        this.prices = prices;
      },
      error: () => this.errors.push('Failed to load prices'),
    });
  }

  private loadEventForEdit(): void {
    this.eventService.getEventDetailsById(this.eventId!).subscribe({
      next: (event: EventDetailsResponse) => {
        const category = this.categories.find((cat) => cat.name === event.categoryName);
        const location = this.locations.find((loc) => loc.location === event.locationName);
        const price = this.prices.find((pr) => pr.price === event.priceValue);

        if (category && location && price) {
          this.form.patchValue({
            ...event,
            categoryId: category.id,
            locationId: location.id,
            priceId: price.id,
          });
        }
      },
      error: () => this.errors.push('Failed to load event for edit'),
    });
  }
  
  uploadFile(event: Event, control: string): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      this.mediaService.upload(formData).subscribe({
        next: (response) => this.form.controls[control].setValue(response.path),
        error: () => this.errors.push('Failed to upload image'),
      });
    }
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formData: EventCreateUpdateRequest = {
      ...this.form.value,
    };

    const request: Observable<EventDetailsResponse> = this.eventId
      ? this.eventService.updateEvent(this.eventId, formData)
      : this.eventService.createEvent(formData);

    request.subscribe({
      next: () => {
        this.snackBar.open('Event saved successfully', 'Close', { duration: 30 });
        this.router.navigate(['/admin/events']);
      },
      error: () => this.errors.push('Failed to save event'),
    });
  }


}