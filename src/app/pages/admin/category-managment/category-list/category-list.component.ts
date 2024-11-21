import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Router, RouterOutlet } from '@angular/router';
import { ApiImgPipe } from '../../../../core/pipes/api-img.pipe';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { NavbarComponent } from '../../../../shared/components/navbar/navbar.component';
import { Category } from '../../../../shared/models/category.model';
import { CategoryService } from '../../../../core/services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PageableResponse } from '../../../../shared/models/pageable.response.model';
import { MatTableModule } from '@angular/material/table';
import  CategoryFormComponent  from '../category-form/category-form.component';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-category-list',
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
    ApiImgPipe,
    MatPaginatorModule,
    CategoryFormComponent
  ],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent {

  categories: Category[] = [];
  filteredCategories: Category[] = [];
  filterText: string = '';
  totalElements = 0;
  pageSize = 6;
  pageIndex = 0;

  private categoryService = inject(CategoryService);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);

  displayedColumns: string[] = [
    'name',
    'actions',
  ];

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(pageIndex: number = 0, pageSize: number = 6): void {
    this.categoryService.paginateCategories(pageIndex, pageSize).subscribe({
      next: (response: PageableResponse<Category>) => {
        this.categories = response.content;
        this.totalElements = response.totalElements;
        this.filteredCategories = this.categories;
      },
      error: (error) => {
        this.snackBar.open('Error al cargar las categorias', 'Cerrar', { duration: 3 });
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value
    .trim()
    .toLocaleLowerCase();
    this.filteredCategories = this.categories.filter((category) =>
      category.name.toLowerCase().includes(filterValue) 
    );
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadCategories(this.pageIndex, this.pageSize);
  }

  createCategory(): void {
    this.router.navigate(['admin/categories/new']);
  }

  editCategory(categoryId: number): void {
    this.router.navigate(['admin/categories/edit', categoryId]);
  }

  deleteCategory(categoryId: number): void {
    this.categoryService.deleteCategory(categoryId).subscribe({
      next: () => {
        this.loadCategories(this.pageIndex, this.pageSize);
        this.snackBar.open('Categoria eliminada', 'Cerrar', { duration: 3 });
      },
      error: (error) => {
        this.snackBar.open('Error al eliminar la categoria', 'Cerrar', { duration: 3 });
      }
    });
  }

}
