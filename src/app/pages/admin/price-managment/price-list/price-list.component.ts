import { Component, inject } from '@angular/core';
import  PriceFormComponent  from '../price-form/price-form.component';
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
import { Price } from '../../../../shared/models/price.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PriceService } from '../../../../core/services/price.service';
import { PageableResponse } from '../../../../shared/models/pageable.response.model';

@Component({
  selector: 'app-price-list',
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
    PriceFormComponent
  ],
  templateUrl: './price-list.component.html',
  styleUrl: './price-list.component.css'
})
export class PriceListComponent {

  prices: Price[] = [];
  filteredPrices: Price[] = [];
  filterText: string = '';
  totalElements = 0;
  pageSize = 6;
  pageIndex = 0;

  private priceService = inject(PriceService);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);

  displayedColumns: string[] = [
    'price',
    'description',
    'actions',
  ];

  ngOnInit(): void {
    this.loadPrices();
  }

  loadPrices(pageIndex: number = 0, pageSize: number = 6): void {
    this.priceService.paginatePrices(pageIndex, pageSize).subscribe({
      next: (response: PageableResponse<Price>) => {
        this.prices = response.content;
        this.totalElements = response.totalElements;
        this.filteredPrices = this.prices;
      },
      error: (error) => {
        this.snackBar.open('Error loading prices', 'Close', { duration: 3 });
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLocaleLowerCase();

    this.filteredPrices = this.prices.filter(price => {
      return price.price.toString().includes(filterValue) ||
        price.description.toLocaleLowerCase().includes(filterValue);
    });
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadPrices(this.pageIndex, this.pageSize);
  }

  createPrice(): void {
    this.router.navigate(['admin/prices/new']);
  }

  editPrice(priceId: number): void {
    this.router.navigate(['admin/prices/edit', priceId]);
  }

  deletePrice(priceId: number): void {
    this.priceService.deletePrice(priceId).subscribe({
      next: () => {
        this.loadPrices(this.pageIndex, this.pageSize);
        this.snackBar.open('Price deleted', 'Close', { duration: 3 });
      },
      error: (error) => {
        this.snackBar.open('Error deleting price', 'Close', { duration: 3 });
      }
    });
  }

}
