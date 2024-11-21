import { Routes } from '@angular/router';
import { EventListComponent } from './event-managment/event-list/event-list.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import EventFormComponent from './event-managment/event-form/event-form.component';
import  CategoryFormComponent  from './category-managment/category-form/category-form.component';
import { CategoryListComponent } from './category-managment/category-list/category-list.component';
import  LocationFormComponent  from './location-managment/location-form/location-form.component';
import { LocationListComponent } from './location-managment/location-list/location-list.component';
import { PriceListComponent } from './price-managment/price-list/price-list.component';
import  PriceFormComponent  from './price-managment/price-form/price-form.component';
import { SalesReportComponent } from './reports/sales-report/sales-report.component';
import { MonthlySalesSummaryComponent } from './reports/monthly-sales-summary/monthly-sales-summary.component';

export const adminRoutes: Routes = [
    {
        path: '',
        component: AdminLayoutComponent,
        children: [
            {path: 'events/list', component: EventListComponent},
            {path: 'events/new', component: EventFormComponent},
            {path: 'events/edit/:id', component: EventFormComponent},

            {path: 'categories/list', component: CategoryListComponent},
            {path: 'categories/new', component: CategoryFormComponent},
            {path: 'categories/edit/:id', component: CategoryFormComponent},

            {path: 'locations/list', component: LocationListComponent},
            {path: 'locations/new', component: LocationFormComponent},
            {path: 'locations/edit/:id', component: LocationFormComponent},

            {path: 'prices/list', component: PriceListComponent},
            {path: 'prices/new', component: PriceFormComponent},
            {path: 'prices/edit/:id', component: PriceFormComponent},

            {
                path: 'reports/monthly-sales',
                component: MonthlySalesSummaryComponent,
            },
            {path: 'reports/sales', component: SalesReportComponent },
        ]
    }
]