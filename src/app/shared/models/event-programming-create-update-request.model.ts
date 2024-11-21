export interface EventProgrammingCreateUpdateRequest {
    eventId: number;
    scheduleId: number;
    startDate: string; // Format: "dd/MM/yy"
    endDate: string; // Format: "dd/MM/yy"
  }