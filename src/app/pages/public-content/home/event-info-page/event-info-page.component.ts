import { Component, inject } from '@angular/core';
import { EventDetailsComponent } from "../../../../shared/components/event-details/event-details.component";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event-info-page',
  standalone: true,
  imports: [EventDetailsComponent],
  templateUrl: './event-info-page.component.html',
  styleUrl: './event-info-page.component.css'
})
export class EventInfoPageComponent {
  eventId: number;
  private route = inject(ActivatedRoute);

  constructor() {
    this.eventId = +this.route.snapshot.paramMap.get('id')!;
  }
}