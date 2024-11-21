import { CalendarService } from '../../../core/services/calendar.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions, EventClickArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { FullCalendarModule } from '@fullcalendar/angular';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { EventDetailsComponent } from '../../../shared/components/event-details/event-details.component';
import { EventService } from '../../../core/services/event.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    CommonModule,
    FullCalendarModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatSnackBarModule,
    EventDetailsComponent],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  @ViewChild('calendar') calendarComponent!: ElementRef;

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin, listPlugin, timeGridPlugin],
    initialView: 'dayGridMonth',
    locale: esLocale,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,dayGridWeek,dayGridDay,listWeek'
    },
    buttonText: {
      today: 'Hoy',
      month: 'Mes',
      week: 'Semana',
      day: 'Día',
      list: 'Lista'
    },

    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true, // Mostrar varios eventos en un día
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    height: 'auto', // Ajusta automáticamente la altura
    events: [], // Inicializa los eventos como un arreglo vacío


    //eventColor: '#FF9220', // Naranja para eventos
    //eventTextColor: '#FFFFFF', // Texto de eventos en blanco
  };

  currentEvents: any[] = [];

  constructor(
    private calendarService: CalendarService,
    private router: Router,
    private eventService: EventService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.calendarService.getUserEvents()
      .pipe(
        catchError((error) => {
          console.error('Error loading events:', error);
          this.showSnackBar('Error al cargar los eventos. Por favor, intenta de nuevo más tarde.');
          return of([]); // Retorna un arreglo vacío en caso de error
        })
      )
      .subscribe((data) => {
        console.log('Data received from server:', data);
  
        const events = data.flatMap(event =>
          event.items.map(item => ({
            id: item.eventId.toString(),
            title: item.eventDescription,
            start: `${item.eventStartDate}T${item.scheduleStart}`, // Fecha de inicio en formato ISO
            end: `${item.eventEndDate}T${item.scheduleEnd}`,       // Fecha de fin en formato ISO
            color: '#FF9220',
            textColor: '#FFFFFF'
          }))
        );
        this.calendarOptions = { ...this.calendarOptions, events: events };
      });
  }

  handleEventClick(clickInfo: EventClickArg) {
    const eventId = parseInt(clickInfo.event.id, 10);
    this.router.navigate(['/customer/catalog/details', eventId]);
  }

  handleEvents(events: any[]) {
    this.currentEvents = events;
  }

  toggleWeekends() {
    this.calendarOptions = {
      ...this.calendarOptions,
      weekends: !this.calendarOptions.weekends
    };
  }

  exportCalendar() {
    this.showSnackBar('Funcionalidad de exportación en desarrollo');
  }

  showSnackBar(message: string) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
