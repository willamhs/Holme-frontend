import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LocationService } from '../../../../core/services/location.service';
import { Location } from '../../../../shared/models/location.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-location-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
  ],
  templateUrl: './location-form.component.html',
  styleUrl: './location-form.component.css'
})
export default class LocationFormComponent implements OnInit{

  private locationService = inject(LocationService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  errors: string[] = [];
  locationId?: number;

  form: FormGroup = this.fb.group({
    location: ['', Validators.required],
    city: ['', Validators.required],
    country: ['', Validators.required],
  })

  ngOnInit(): void {
    this.locationId = Number(this.route.snapshot.paramMap.get('id'));
    if(this.locationId){
      this.loadLocation();
    }
  }

  loadLocation(): void {
    this.locationService.getLocationById(this.locationId!).subscribe({
      next: (event: Location) => {
        this.form.patchValue(event);
      },
      error: () => this.errors.push('Error loading location'),
    });
  }

  save(): void {
    if(this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formData: Location = {
      ...this.form.value,
    };

    const request: Observable<Location> = this.locationId
      ? this.locationService.updateLocation(this.locationId, formData)
      : this.locationService.createLocation(formData);

    request.subscribe({
      next: () => {
        this.router.navigate(['/admin/locations/list']);
      },
      error: () => this.errors.push('Error saving location'),
    });

  }

}
