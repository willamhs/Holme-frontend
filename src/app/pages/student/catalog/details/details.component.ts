import { Component, inject } from '@angular/core';
import { EventDetailsComponent } from "../../../../shared/components/event-details/event-details.component";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [EventDetailsComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  eventId: number;
  private route = inject(ActivatedRoute);

  constructor() {
    this.eventId = +this.route.snapshot.paramMap.get('id')!;
    console.log(this.eventId);
  }
}
