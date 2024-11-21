import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PriceService } from '../../../../core/services/price.service';
import { Price } from '../../../../shared/models/price.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-price-form',
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
  templateUrl: './price-form.component.html',
  styleUrl: './price-form.component.css'
})
export default class PriceFormComponent implements OnInit {

  private priceService = inject(PriceService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  errors: string[] = [];
  priceId?: number;

  form: FormGroup = this.fb.group({
    price: ['', [Validators.required, Validators.min(0)]],
    description: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(250)]],
  })

  ngOnInit(): void {
    this.priceId = Number(this.route.snapshot.paramMap.get('id'));
    if(this.priceId){
      this.loadPrice();
    }
  }

  loadPrice(): void {
    this.priceService.getPriceById(this.priceId!).subscribe({
      next: (event: Price) => {
        this.form.patchValue(event);
      },
      error: () => this.errors.push('Error loading price'),
    });
  }

  save(): void {
    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }

    const formData: Price = {
      ...this.form.value,
    };

    const request: Observable<Price> = this.priceId
      ? this.priceService.updatePrice(this.priceId, formData)
      : this.priceService.createPrice(formData);

    request.subscribe({
      next: () => this.router.navigate(['/admin/prices/list']),
      error: () => this.errors.push('Error saving price'),
    });

  }

}
