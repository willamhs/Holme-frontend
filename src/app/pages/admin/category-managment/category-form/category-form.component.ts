import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CategoryService } from '../../../../core/services/category.service';
import { Category } from '../../../../shared/models/category.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-category-form',
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
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.css'
})
export default class CategoryFormComponent implements OnInit{

  private categoryService = inject(CategoryService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  errors: string[] = [];
  categoryId?: number;

  form: FormGroup = this.fb.group({
    name: ['', Validators.required],
    
  })


  ngOnInit(): void {
    this.categoryId = Number(this.route.snapshot.paramMap.get('id'));
    if(this.categoryId){
      this.loadCategory();
    }
  }

  loadCategory(): void {
    this.categoryService.getCategoryById(this.categoryId!).subscribe({
      next: (event: Category) => {
        this.form.patchValue(event);
      },
      error: () => this.errors.push('Error loading category'),
    });
  }

  save(): void {
    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }

    const formData: Category = {
      ...this.form.value,
    };

    const request: Observable<Category> = this.categoryId
      ? this.categoryService.updateCategory(this.categoryId, formData)
      : this.categoryService.createCategory(formData);

    request.subscribe({
      next: () => {
        this.router.navigate(['/admin/categories/list']);
      },
      error: () => this.errors.push('Failed to save category'),
    });
  }

}
