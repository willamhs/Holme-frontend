export interface EventProgrammingDetailsResponse {
    eventId: number;
    scheduleId: number;
    startDate: string; // Format: "dd/MM/yy"
    endDate: string; // Format: "dd/MM/yy"
    eventName: string;
    eventDescription: string;
    scheduleStartHour: string; // Format: "HH:mm"
    scheduleEndHour: string; // Format: "HH:mm"
    scheduleDescription: string;
  }