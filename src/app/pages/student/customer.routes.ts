import { Routes } from "@angular/router";

import { CatalogComponent } from "./catalog/catalog.component";
import { FavoritesComponent } from "./favorites/favorites.component";
import { CalendarComponent } from "./calendar/calendar.component";

import { UpdateProfileComponent } from "../../shared/components/update-profile/update-profile.component";
import { UserProfileComponent } from "../../shared/components/user-profile/user-profile.component";
import { CustomerLayoutComponent } from "./student-layout/student-layout.component";
import { CartComponent } from "./inscriptions/cart/cart.component";
import { HistoryComponent } from "./inscriptions/history/history.component";
import { DetailsComponent } from "./catalog/details/details.component";

export const customerRoutes: Routes = [
    {
        path: '',
        component: CustomerLayoutComponent,
        children: [
            {path: 'catalog', component: CatalogComponent},
            {path: 'catalog/details/:id', component: DetailsComponent},
            {path: 'cart', component: CartComponent},
            {path: 'favorites', component: FavoritesComponent},
            {path: 'calendar', component: CalendarComponent},
            {path: 'profile', component: UserProfileComponent},
            {path: 'profile/update', component: UpdateProfileComponent},
            {path: 'inscription/history', component: HistoryComponent },
        ]

    }
]